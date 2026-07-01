/**
 * Client reviews. Curated, not user-submitted — we add each entry by hand from a
 * client who agreed to be quoted. Append an entry to publish another review.
 *
 * Photos live in /public/reviews, optimised from the original, with a tiny
 * inlined blur placeholder. `emails` are the client's own contacts, shown so a
 * reader can verify the review is real — personal first, then institutional.
 */
export type Review = {
  name: string;
  /** Where the client is from — university, company, etc. */
  affiliation: string;
  /** Optional link for the affiliation (e.g. the university's site). */
  affiliationUrl?: string;
  /** The testimonial, in the client's voice. */
  quote: string;
  /** Verification contacts, personal first then institutional. */
  emails: string[];
  /** Slug of the related project (in projects.ts), to cross-link the two. */
  projectSlug?: string;
  photo: {
    src: string;
    alt: string;
    blurDataURL: string;
    /** object-position to frame the face in a cropped container. */
    position?: string;
  };
};

export const reviews: Review[] = [
  {
    name: "Jaki Muzahid",
    affiliation: "Universiti Malaya",
    affiliationUrl: "https://www.um.edu.my/",
    quote:
      "Working with Haifa Intelligence on my local AI research assistant was genuinely excellent. Communication stayed clear and responsive from day one, and they built the tool around how I actually work in microbiology. I can drop in my research papers and it reads, understands, and references them during our conversations. My favourite part is that when an answer isn't quite right, it asks a question back to understand what I mean instead of just repeating itself, which makes the whole thing feel natural. Everything runs locally on my own machine behind a simple interface I can manage without any technical background. It came in on budget, the quality went past what I expected, and I'd happily work with them again.",
    emails: ["jaki.muzahid@gmail.com", "s2123538@siswa.um.edu.my"],
    projectSlug: "haifa-hivemind",
    photo: {
      src: "/reviews/jaki.jpg",
      alt: "Jaki Muzahid",
      position: "50% 38%",
      blurDataURL:
        "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAjABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAwUAAQT/xAAkEAACAQMCBgMAAAAAAAAAAAABAgMABBESMRMhMkFRcQUUJP/EABUBAQEAAAAAAAAAAAAAAAAAAAIB/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAESYf/aAAwDAQACEQMRAD8AazBTEwcqF8seVZrP6wcrBKjHGSAcmlkt4b67JdC8EKjTGfJq5PzzJPDBwihBbsCD2o8MW/lMaC6jheJXIRy67Hscb0D40tfTC3160PNiTjA90/niWaNlkAZW3B2oVpZQ2meFEqFjzIOauYmq0jpql6V91KlIH//Z",
    },
  },
];
