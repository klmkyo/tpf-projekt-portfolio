import Button from "../components/Button";
import TextField from "../components/TextField";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 sm:px-12 sm:py-24 lg:px-24 lg:py-28">
      <h1 className="text-4xl font-black sm:text-6xl">Add New Project</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[#596171]">
        Prepare a portfolio entry for publication. This screen completes the admin flow
        exposed by the prototype’s add button.
      </p>

      <form className="mt-12 grid gap-10 sm:mt-16 sm:gap-12" onSubmit={(event) => event.preventDefault()}>
        <TextField label="Project Title" />
        <TextField label="Category" />
        <TextField label="Image URL" />
        <label className="block">
          <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#9aa2af] sm:text-[11px] sm:tracking-[0.42em]">
            Description
          </span>
          <textarea className="mt-6 min-h-40 w-full resize-y border-0 border-b border-[#9ca3af] bg-transparent px-0 pb-4 text-lg outline-none focus:border-[#111827]" />
        </label>
        <div>
          <Button>Save Project</Button>
        </div>
      </form>
    </main>
  );
}
