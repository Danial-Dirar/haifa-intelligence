"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Tell us your name."),
  email: z.string().email("A valid email, please."),
  company: z.string().optional(),
  projectType: z.string().min(1, "Pick what you need."),
  budget: z.string().optional(),
  message: z.string().min(10, "A sentence or two about the project."),
});

type FormValues = z.infer<typeof schema>;

const budgets = ["< $2k", "$2k–$5k", "$5k–$15k", "$15k+", "Not sure yet"];

export function ContactForm() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { projectType: "", budget: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Got it! We'll get back to you within a day.");
      reset();
      setSelectedType("");
      setSelectedBudget("");
    } catch {
      toast.error("Something went wrong. Try emailing us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input placeholder="Your name" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input type="email" placeholder="you@company.com" {...register("email")} />
        </Field>
      </div>

      <Field label="Company / team" optional>
        <Input placeholder="Optional" {...register("company")} />
      </Field>

      <Field label="What do you need?" error={errors.projectType?.message}>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const active = selectedType === s.title;
            return (
              <button
                type="button"
                key={s.slug}
                onClick={() => {
                  setSelectedType(s.title);
                  setValue("projectType", s.title, { shouldValidate: true });
                }}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  active
                    ? "border-brand-1/60 bg-brand-1/15 text-foreground"
                    : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"
                )}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Budget" optional>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => {
            const active = selectedBudget === b;
            return (
              <button
                type="button"
                key={b}
                onClick={() => {
                  setSelectedBudget(b);
                  setValue("budget", b);
                }}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  active
                    ? "border-brand-1/60 bg-brand-1/15 text-foreground"
                    : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"
                )}
              >
                {b}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Tell us about it" error={errors.message?.message}>
        <Textarea
          rows={5}
          placeholder="What are you trying to build or predict? What does success look like?"
          {...register("message")}
        />
      </Field>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send project brief
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {label}
        {optional && <span className="text-xs font-normal text-muted-foreground">optional</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
