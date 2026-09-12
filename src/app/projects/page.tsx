import { permanentRedirect } from "next/navigation";

/* The work index moved to /work. Keep the old path alive for anything already
   linking to it. */
export default function ProjectsPage(): never {
  permanentRedirect("/work");
}
