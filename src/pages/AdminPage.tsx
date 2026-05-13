import { Link } from "react-router-dom";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import { adminProjects } from "../data/projects";
import { useAuth } from "../hooks/useAuth";

export default function AdminPage() {
  const { logout } = useAuth();

  return (
    <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-12 sm:py-24 lg:px-24 lg:py-28">
      <section className="grid gap-10 border-b border-[#ded8de] pb-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h1 className="text-4xl font-black sm:text-6xl">Portfolio Manager</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] font-black uppercase tracking-[0.18em] text-[#60636a] sm:gap-8 sm:text-[12px] sm:tracking-[0.28em]">
            <span>▱ 24 Projects</span>
            <span className="h-6 w-px bg-[#d3d0d5]" />
            <span>◉ 1.2M Views</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Link to="/admin/new">
            <Button className="rounded-none bg-black px-10">+ Add New Project</Button>
          </Link>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </section>

      <section className="mt-12 grid gap-10 sm:mt-16 sm:gap-12 lg:grid-cols-[2fr_0.95fr]">
        {adminProjects.map((project, index) => (
          <div key={project.id} className={index === 2 ? "lg:col-start-1 lg:mx-auto lg:w-[74%]" : undefined}>
            <ProjectCard project={project} />
          </div>
        ))}
      </section>
    </main>
  );
}
