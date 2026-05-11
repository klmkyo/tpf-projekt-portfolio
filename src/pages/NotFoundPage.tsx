import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbf7fa] px-6 text-center">
      <section>
        <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#6d7480]">404</p>
        <h1 className="mt-5 text-4xl font-black sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-[#596171]">
          The requested route does not exist in this portfolio prototype.
        </p>
        <Link to="/work" className="mt-10 inline-flex">
          <Button>Back to Work</Button>
        </Link>
      </section>
    </main>
  );
}
