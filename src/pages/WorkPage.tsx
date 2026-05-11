import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import { publicProjects } from "../data/projects";
import coastalStill from "../assets/extracted/figma-000.png";

export default function WorkPage() {
  return (
    <main>
      <section className="relative isolate min-h-[520px] overflow-hidden bg-[#d7d5d6] px-5 py-20 text-center sm:min-h-[620px] sm:px-12 sm:py-28 lg:px-24">
        <img
          src={coastalStill}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 -z-10 bg-[#f3f1f3]/70" />

        <h1 className="mx-auto max-w-5xl text-[2.3rem] font-black leading-[0.95] text-[#17181d] sm:text-8xl lg:text-[9rem]">
          STORYTELLING IN MOTION
        </h1>
        <p className="mx-auto mt-9 max-w-3xl text-base leading-8 tracking-[0.03em] text-[#5f636b] sm:mt-14 sm:text-xl sm:leading-9 sm:tracking-[0.08em]">
          A cinematic approach to visual narratives. High-end filmmaking and editorial
          photography with an emphasis on dramatic light and structural composition.
        </p>
        <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:mt-16 sm:flex-row sm:items-center sm:gap-5">
          <Button>
            <span className="mr-3 text-[#ff6066]">▶</span>
            Watch Reel
          </Button>
          <Button variant="outline">Explore Archive</Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-10 px-5 pt-14 sm:px-12 sm:pt-20 lg:grid-cols-2 lg:px-24">
        {publicProjects.map((project, index) => (
          <div
            key={project.id}
            className={index === 0 ? "lg:col-span-2 lg:mx-auto lg:w-[72%]" : undefined}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </section>
    </main>
  );
}
