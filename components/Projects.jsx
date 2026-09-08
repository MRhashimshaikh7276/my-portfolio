import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Real projects. Real problems. Real solutions."
        />

        <div className="mt-16 flex flex-col gap-24 sm:gap-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
