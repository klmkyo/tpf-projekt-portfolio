import { useEffect } from "react";
import type { SiteProject } from "../data/siteContentModel";

type ProjectLightboxProps = {
  project: SiteProject;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
};

export default function ProjectLightbox({
  project,
  onPrevious,
  onNext,
  onClose,
}: ProjectLightboxProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 px-2 py-2 backdrop-blur-sm sm:px-4 sm:py-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative mx-auto flex h-full w-full max-w-[1800px] flex-col overflow-hidden"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex items-start justify-between p-3 sm:p-5">
          <div className="max-w-[70%] text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#c7ced9]">
              {project.category}
            </p>
            <h2 className="mt-1 text-lg font-black sm:text-2xl">{project.title}</h2>
          </div>
          <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-black/30 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={onPrevious}
              className="inline-flex h-10 w-10 items-center justify-center text-2xl font-black text-white transition hover:opacity-70"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex h-10 w-10 items-center justify-center text-2xl font-black text-white transition hover:opacity-70"
              aria-label="Next image"
            >
              →
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center text-2xl font-black text-white transition hover:opacity-70"
              aria-label="Close lightbox"
            >
              ×
            </button>
          </div>
        </div>
        <div className="grid flex-1 place-items-center p-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full max-h-[calc(100vh-1rem)] w-full max-w-full object-contain shadow-2xl sm:max-h-[calc(100vh-2rem)]"
          />
        </div>
      </div>
    </div>
  );
}
