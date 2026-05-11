import Button from "../components/Button";
import TextField from "../components/TextField";

export default function ContactPage() {
  return (
    <main className="mx-auto grid min-h-[760px] max-w-[1600px] gap-12 px-5 py-16 sm:px-12 sm:py-24 lg:grid-cols-[0.86fr_1fr] lg:px-24 lg:py-48">
      <section className="lg:pl-40">
        <h1 className="text-[clamp(3.8rem,18vw,7.5rem)] font-black leading-[0.95]">
          GET IN
          <br />
          TOUCH
        </h1>
        <p className="mt-10 max-w-xl text-lg leading-8 tracking-[0.04em] text-[#333743] sm:mt-20 sm:text-2xl sm:leading-10 sm:tracking-[0.08em]">
          Open for commissions, gallery exhibitions, and selective editorial assignments
          worldwide.
        </p>

        <div className="mt-12 space-y-8 sm:mt-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#6e7480] sm:text-[11px] sm:tracking-[0.42em]">
              Inquiries
            </p>
            <a href="mailto:hello@studiogallery.com" className="mt-3 block break-words text-2xl font-black sm:text-4xl">
              hello@studiogallery.com
            </a>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#6e7480] sm:text-[11px] sm:tracking-[0.42em]">
              Studio
            </p>
            <p className="mt-3 text-lg leading-8 sm:text-2xl sm:leading-9">
              1200 Minimalist Ave.
              <br />
              Los Angeles, CA 90012
            </p>
          </div>
        </div>
      </section>

      <form className="space-y-10 sm:space-y-16 lg:pr-36" onSubmit={(event) => event.preventDefault()}>
        <TextField label="Full Name" />
        <TextField label="Email Address" type="email" />
        <TextField label="Subject" />
        <label className="block">
          <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#c0c4cc] sm:text-[11px] sm:tracking-[0.42em]">
            Project Details
          </span>
          <textarea className="mt-10 min-h-32 w-full resize-y border-0 border-b border-[#b7bdc6] bg-transparent px-0 pb-4 text-base outline-none focus:border-[#111827] sm:mt-24 sm:text-lg" />
        </label>
        <div className="flex justify-end">
          <Button className="w-full sm:w-72">Send Message</Button>
        </div>
      </form>
    </main>
  );
}
