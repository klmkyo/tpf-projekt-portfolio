import Button from "../components/Button";
import LoadingState from "../components/LoadingState";
import TextField from "../components/TextField";
import TextAreaField from "../components/TextAreaField";
import { useSiteContent } from "../contexts/site-content-store";

export default function ContactPage() {
  const { content, isContentReady } = useSiteContent();

  if (!isContentReady) {
    return (
      <main className="mx-auto grid min-h-[760px] max-w-[1600px] gap-10 px-5 py-16 sm:px-12 sm:py-24 lg:grid-cols-[0.9fr_1fr] lg:items-start lg:px-24 lg:py-32">
        <section className="max-w-2xl lg:pl-20">
          <LoadingState className="min-h-[38svh] justify-start px-0 py-0 sm:min-h-[40svh]" />
        </section>
        <div className="hidden lg:block" />
      </main>
    );
  }

  if (!content) {
    return (
      <main className="mx-auto grid min-h-[60vh] max-w-[1600px] place-items-center px-5 py-16 sm:px-12 lg:px-24">
        <p className="text-sm uppercase tracking-[0.3em] text-[#60636a]">
          Firestore document `siteContent/portfolio` is missing.
        </p>
      </main>
    );
  }

  const [headlineTop, ...headlineBottom] = content.contact.heading.split(" ");

  return (
    <main className="mx-auto grid min-h-[760px] max-w-[1600px] gap-10 px-5 py-16 sm:px-12 sm:py-24 lg:grid-cols-[0.9fr_1fr] lg:items-start lg:px-24 lg:py-32">
      <section className="max-w-2xl lg:pl-20">
        <h1 className="text-[clamp(3rem,16vw,7.5rem)] font-black leading-[0.92]">
          {headlineTop}
          <br />
          {headlineBottom.join(" ")}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-7 tracking-[0.03em] text-[#333743] sm:mt-14 sm:text-2xl sm:leading-10 sm:tracking-[0.08em]">
          {content.contact.description}
        </p>

        <div className="mt-10 space-y-8 sm:mt-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#6e7480] sm:text-[11px] sm:tracking-[0.42em]">
              {content.contact.inquiriesLabel}
            </p>
            <a
              href={`mailto:${content.contact.email}`}
              className="mt-3 block break-words text-[clamp(1.6rem,5vw,3.4rem)] font-black leading-none"
            >
              {content.contact.email}
            </a>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#6e7480] sm:text-[11px] sm:tracking-[0.42em]">
              {content.contact.studioLabel}
            </p>
            <p className="mt-3 text-base leading-7 sm:text-2xl sm:leading-9">
              {content.contact.addressLines[0]}
              <br />
              {content.contact.addressLines[1]}
            </p>
          </div>
        </div>
      </section>

      <form
        className="space-y-8 sm:space-y-12 lg:max-w-2xl lg:justify-self-end lg:pr-12"
        onSubmit={(event) => event.preventDefault()}
      >
        <TextField label={content.contact.formLabels.fullName} />
        <TextField label={content.contact.formLabels.email} type="email" />
        <TextField label={content.contact.formLabels.subject} />
        <TextAreaField label={content.contact.formLabels.details} />
        <div className="flex justify-end">
          <Button className="w-full sm:w-72">{content.contact.formLabels.submit}</Button>
        </div>
      </form>
    </main>
  );
}
