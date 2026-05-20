import { useSiteContent } from "../contexts/site-content-store";

export default function Footer() {
  const { content, isContentReady } = useSiteContent();

  if (!isContentReady) {
    return <footer className="mt-28 border-t border-[#d9e0e8] bg-[#f5f8fb]" />;
  }

  if (!content) {
    return <footer className="mt-28 border-t border-[#d9e0e8] bg-[#f5f8fb]" />;
  }

  return (
    <footer className="mt-28 border-t border-[#d9e0e8] bg-[#f5f8fb]">
      <div className="mx-auto flex max-w-[2560px] flex-col gap-8 px-5 py-12 text-[10px] font-bold uppercase tracking-[0.24em] text-[#6f7f99] sm:px-8 sm:text-[11px] sm:tracking-[0.42em] md:flex-row md:items-center md:justify-between">
        <p>{content.footer.copyright}</p>
        <div className="flex flex-wrap gap-8">
          {content.footer.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#111827]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
