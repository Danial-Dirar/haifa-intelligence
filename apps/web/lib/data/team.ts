/**
 * The people who build alongside the founder. Not founders themselves — they're
 * part of Haifa Intelligence. Add a new collaborator by appending an entry.
 *
 * Photos live in /public/team, optimised from the original, with a tiny inlined
 * blur placeholder. Keep bios short and public-safe — no contact details.
 */
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** A few areas they work in, shown as chips. */
  focus: string[];
  photo: {
    src: string;
    alt: string;
    blurDataURL: string;
    /** object-position to frame the face in a cropped container. */
    position?: string;
  };
};

export const team: TeamMember[] = [
  {
    name: "Dipta Mazumder",
    role: "ML & Computer Vision",
    bio: "Computer Science finalist at BRAC University. Works across machine learning and computer vision — from prediction models to multi-modal vision systems and custom LoRA image-generation pipelines for the studio.",
    focus: ["Machine Learning", "Computer Vision", "PyTorch", "Image generation"],
    photo: {
      src: "/team/dipta.jpg",
      alt: "Dipta Mazumder",
      position: "60% 28%",
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAfABADAREAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAgUDBAb/xAAkEAACAQMDAwUAAAAAAAAAAAABAgMABBEFEjETQWEhIlGBwf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCS4jt4FmvpnBiOHjdRkg4wAKDMyXEdy7kqU3kkUDDVpxLYyBWPSa5DBeMAg/tATukuivF1gyq6hAYgC3Hfx60CV3a4GXYkjt8UB21w0MiqRuABBB4IoKwbB+qAy3uB8UH/2Q==",
    },
  },
];
