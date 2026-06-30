/**
 * Public image-generation "styles" — mapped to Danial's REAL ComfyUI LoRAs.
 *
 * Source of truth: /home/muhammad/AI/ComfyUI/models
 *   diffusion_models/krea2_turbo_fp8_scaled.safetensors   (image base, turbo)
 *   loras/krea2_turbo_lora_rank_64_bf16.safetensors       (speed accelerator)
 *   loras/krea2_<style>.safetensors                       (the 10 style LoRAs below)
 *
 * The public ONLY sees `id`, `name`, `description`, `accent`, `sample`
 * (via publicStyle()). Everything under `lora` is backend-only — the server uses
 * it to build the ComfyUI workflow.
 *
 * NOTE: `trigger` words are best-guesses — verify against each LoRA's model card
 * and tune `strength` once wired to ComfyUI.
 */

/** Shared image base — applied to every style. krea2_turbo => low step count. */
export const imageBase = {
  diffusionModel: "krea2_turbo_fp8_scaled.safetensors", // models/diffusion_models
  textEncoder: "qwen3vl_4b_fp8_scaled.safetensors", // models/text_encoders
  vae: "qwen_image_vae.safetensors", // models/vae
  loraNode: "LoraLoaderModelOnly", // model-only LoRA, strength on model
  steps: 8,
  cfg: 1.0,
  sampler: "euler",
  scheduler: "simple",
} as const;

export type ImageStyle = {
  id: string;
  name: string;
  description: string;
  accent: string; // gradient for the card/thumbnail
  sample: string; // short tag shown on the chip
  default?: boolean;
  /** backend-only — never sent to the client. Omitted for the plain base look. */
  lora?: {
    file: string;
    strength: number;
    trigger?: string;
  };
};

export const imageStyles: ImageStyle[] = [
  {
    id: "none",
    name: "No style",
    description: "Plain Krea-2 — clean, neutral base look with no style LoRA.",
    accent: "from-zinc-400/30 to-slate-500/15",
    sample: "Base",
    default: true,
    // no lora — base model only
  },
  {
    id: "sunset-blur",
    name: "Sunset Blur",
    description: "Warm golden-hour haze, soft focus, dreamy light.",
    accent: "from-amber-500/40 to-rose-500/20",
    sample: "Golden",
    lora: { file: "krea2_sunsetblur.safetensors", strength: 1.0, trigger: "ethereal motion blur style" },
  },
  {
    id: "soft-watercolor",
    name: "Soft Watercolor",
    description: "Gentle washes, paper texture, hand-painted feel.",
    accent: "from-teal-500/40 to-cyan-400/20",
    sample: "Paint",
    lora: { file: "krea2_softwatercolor.safetensors", strength: 1.0, trigger: "art deco watercolor style" },
  },
  {
    id: "retro-anime",
    name: "Retro Anime",
    description: "80s/90s cel-anime look with bold linework.",
    accent: "from-sky-500/40 to-fuchsia-500/20",
    sample: "2D",
    lora: { file: "krea2_retroanime.safetensors", strength: 1.0, trigger: "purple retro anime style" },
  },
  {
    id: "neon-drip",
    name: "Neon Drip",
    description: "Neon-soaked, dripping, high-energy cyber glow.",
    accent: "from-fuchsia-600/40 to-indigo-500/20",
    sample: "Neon",
    lora: { file: "krea2_neondrip.safetensors", strength: 1.0, trigger: "textured abstract style" },
  },
  {
    id: "warm-pastel",
    name: "Warm Pastel",
    description: "Soft pastel palette, cozy and clean.",
    accent: "from-orange-400/40 to-pink-400/20",
    sample: "Pastel",
    // confirmed from workflow note
    lora: { file: "krea2_warmpastel.safetensors", strength: 0.8, trigger: "muted minimalist sketch style" },
  },
  {
    id: "dark-brush",
    name: "Dark Brush",
    description: "Moody, painterly brushwork with deep shadows.",
    accent: "from-zinc-600/40 to-slate-700/20",
    sample: "Moody",
    // confirmed from workflow note
    lora: { file: "krea2_darkbrush.safetensors", strength: 1.0, trigger: "monochrome ink wash style" },
  },
  {
    id: "dot-matrix",
    name: "Dot Matrix",
    description: "Retro halftone / dot-print, vintage comic vibe.",
    accent: "from-lime-500/40 to-emerald-400/20",
    sample: "Print",
    lora: { file: "krea2_dotmatrix.safetensors", strength: 1.0, trigger: "monochrome stippling style" },
  },
  {
    id: "kids-drawing",
    name: "Kids' Drawing",
    description: "Playful crayon / children's-drawing charm.",
    accent: "from-yellow-400/40 to-red-400/20",
    sample: "Crayon",
    lora: { file: "krea2_kidsdrawing.safetensors", strength: 1.0, trigger: "naive expressive sketch style" },
  },
  {
    id: "rainy-window",
    name: "Rainy Window",
    description: "Rain-streaked glass, soft bokeh, melancholy mood.",
    accent: "from-slate-500/40 to-blue-400/20",
    sample: "Rain",
    lora: { file: "krea2_rainywindow.safetensors", strength: 1.0, trigger: "rainy window style" },
  },
  {
    id: "vintage-tarot",
    name: "Vintage Tarot",
    description: "Ornate, illustrated vintage tarot-card art.",
    accent: "from-amber-600/40 to-purple-500/20",
    sample: "Arcane",
    lora: { file: "krea2_vintagetarot.safetensors", strength: 1.0, trigger: "vintage tarot style" },
  },
];

/** Aspect ratios offered to the user. Actual pixels are derived from megapixels. */
export const aspectRatios = [
  { id: "1:1", label: "Square", rw: 1, rh: 1 },
  { id: "3:2", label: "Landscape", rw: 3, rh: 2 },
  { id: "2:3", label: "Portrait", rw: 2, rh: 3 },
  { id: "16:9", label: "Wide", rw: 16, rh: 9 },
] as const;

/**
 * User-tunable generation settings. Higher = slower (and more VRAM), so the UI
 * shows a live "this costs more time" hint as these go up.
 */
export const stepRange = { min: 8, max: 16, default: 8 } as const;
export const megapixelRange = { min: 1, max: 5, default: 1 } as const;

/** Round to a multiple of 16 (FLUX/krea2 likes /16 dims), never below 256. */
function round16(n: number) {
  return Math.max(256, Math.round(n / 16) * 16);
}

/** Generation dimensions from an aspect ratio + target megapixels. */
export function dimsFor(aspectId: string, megapixels: number) {
  const a = aspectRatios.find((x) => x.id === aspectId) ?? aspectRatios[0];
  const mp =
    Math.min(megapixelRange.max, Math.max(megapixelRange.min, megapixels)) * 1_000_000;
  const ratio = a.rw / a.rh;
  return { w: round16(Math.sqrt(mp * ratio)), h: round16(Math.sqrt(mp / ratio)) };
}

/**
 * Time estimate (seconds) for the home 3060 Ti (8 GB) — for UI hinting only.
 *
 * Calibrated to two REAL measured runs on the box:
 *   8 steps  @ 1 MP (1232×816)  → ~34 s
 *   16 steps @ 5 MP (2976×1680) → ~590 s
 *
 * Time is NOT linear in megapixels: with only 8 GB of VRAM, larger latents spill
 * to system RAM and the per-step cost blows up super-linearly. A single power
 * curve (mp^1.5) passes through both real anchors almost exactly, so it stays
 * honest at the extremes and interpolates sensibly in between. Aspect ratio does
 * not matter here — `megapixels` already fixes the total pixel count.
 */
const GEN_OVERHEAD_S = 8; // text-encode + VAE decode + load, roughly fixed
const GEN_PER_STEP_S = 3.25; // cost of one sampling step at 1 MP
const GEN_MP_EXPONENT = 1.5; // VRAM-spill penalty as the image grows
export function estimateSeconds(steps: number, megapixels: number) {
  return Math.round(
    GEN_OVERHEAD_S + GEN_PER_STEP_S * steps * Math.pow(megapixels, GEN_MP_EXPONENT)
  );
}

/** Public-safe view of a style (no LoRA internals). */
export function publicStyle(s: ImageStyle) {
  return { id: s.id, name: s.name, description: s.description, accent: s.accent, sample: s.sample };
}

export function getStyle(id: string) {
  return imageStyles.find((s) => s.id === id);
}

export const defaultStyle = imageStyles.find((s) => s.default) ?? imageStyles[0];
