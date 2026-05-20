import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import type { SiteProject } from "../data/siteContentModel";
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
  project: SiteProject;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  className?: string;
  isInteractive?: boolean;
};

export default function ProjectCard({
  project,
  orientation = project.orientation,
  className,
  onClick,
  isInteractive = false,
}: ProjectCardProps) {
  const cardClassName = cn("group", className);
  const content = (
    <>
      <div className={cn(projectImageVariants({ orientation }))}>
        <img
          src={project.imageUrl}
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
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(cardClassName, "block w-full text-left", isInteractive && "cursor-zoom-in")}
      >
        {content}
      </button>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}
