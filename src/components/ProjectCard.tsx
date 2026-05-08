import { cva, type VariantProps } from "class-variance-authority";
import type { Project } from "../data/projects";
import { cn } from "../lib/utils";

const projectImageVariants = cva("overflow-hidden rounded-[3px] bg-[#e9e4e8]", {
  variants: {
    orientation: {
      wide: "aspect-[1.5/1]",
      portrait: "aspect-[0.72/1]",
      square: "aspect-square",
    },
  },
  defaultVariants: {
    orientation: "square",
  },
});

type ProjectCardProps = VariantProps<typeof projectImageVariants> & {
  project: Project;
};

export default function ProjectCard({
  project,
  orientation = project.orientation,
}: ProjectCardProps) {
  return (
    <article className="group">
      <div className={cn(projectImageVariants({ orientation }))}>
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h3 className="text-base font-black sm:text-lg">{project.title}</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#7c8492]">
          {project.category}
        </p>
      </div>
    </article>
  );
}
