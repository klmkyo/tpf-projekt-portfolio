import { useEffect, useState } from "react";
import Button from "../components/Button";
import LoadingState from "../components/LoadingState";
import ProjectCard from "../components/ProjectCard";
import ProjectLightbox from "../components/ProjectLightbox";
import { useSiteContent } from "../contexts/site-content-store";

export default function WorkPage() {
  const { content, isContentReady } = useSiteContent();
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProjectIndex(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isContentReady) {
    return (
      <main>
        <section className="relative isolate min-h-[70svh] overflow-hidden bg-[#d7d5d6] px-5 py-20 text-center sm:min-h-[78svh] sm:px-12 sm:py-28 lg:px-24">
          <div className="absolute inset-0 -z-10 bg-[#f3f1f3]/70" />
          <LoadingState className="absolute inset-0 px-0 py-0" />
        </section>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="mx-auto max-w-[1280px] px-5 py-20 sm:px-12 sm:py-28 lg:px-24">
        <p className="text-sm uppercase tracking-[0.3em] text-[#60636a]">
          Firestore document `siteContent/portfolio` is missing.
        </p>
      </main>
    );
  }

  const siteContent = content;
  const publicProjects = siteContent.projects.slice(0, 4);
  const heroBackground = siteContent.hero.backgroundImageUrl;
  const activeProject =
    activeProjectIndex === null ? null : publicProjects[activeProjectIndex] ?? null;

  function openReel() {
    window.open(siteContent.navigation.viewReelUrl, "_blank", "noopener,noreferrer");
  }

  function openArchive() {
    setActiveProjectIndex(0);
  }

  function showPreviousProject() {
    if (activeProjectIndex === null) {
      return;
    }

    setActiveProjectIndex(
      activeProjectIndex === 0 ? publicProjects.length - 1 : activeProjectIndex - 1,
    );
  }

  function showNextProject() {
    if (activeProjectIndex === null) {
      return;
    }

    setActiveProjectIndex((activeProjectIndex + 1) % publicProjects.length);
  }

  return (
    <main>
      <section className="relative isolate min-h-[70svh] overflow-hidden bg-[#d7d5d6] px-5 py-20 text-center sm:min-h-[78svh] sm:px-12 sm:py-28 lg:px-24">
        <img
          src={heroBackground}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 -z-10 bg-[#f3f1f3]/70" />

        <h1 className="mx-auto max-w-5xl text-[clamp(2.8rem,12vw,9rem)] font-black leading-[0.92] text-[#17181d]">
          {siteContent.hero.title}
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-sm leading-7 tracking-[0.02em] text-[#5f636b] sm:mt-14 sm:text-xl sm:leading-9 sm:tracking-[0.08em]">
          {siteContent.hero.description}
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:mt-16 sm:flex-row sm:items-center sm:gap-5">
          <Button onClick={openReel} type="button">
            <span className="mr-3 text-[#ff6066]">▶</span>
            {siteContent.hero.primaryCta}
          </Button>
          <Button variant="outline" onClick={openArchive} type="button">
            {siteContent.hero.secondaryCta}
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-8 px-5 pt-14 sm:px-12 sm:pt-20 lg:grid-cols-2 lg:px-24">
        {publicProjects.map((project, index) => (
          <div
            key={project.id}
            className={index === 0 ? "lg:col-span-2 lg:mx-auto lg:w-[72%]" : undefined}
          >
            <ProjectCard
              project={project}
              onClick={() => setActiveProjectIndex(index)}
              isInteractive
            />
          </div>
        ))}
      </section>

      {activeProject && (
        <ProjectLightbox
          project={activeProject}
          onPrevious={showPreviousProject}
          onNext={showNextProject}
          onClose={() => setActiveProjectIndex(null)}
        />
      )}
    </main>
  );
}
