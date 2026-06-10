import { useSiteContent } from "../contexts/site-content-store";

export default function Footer() {
  const { content, isContentReady } = useSiteContent();
  const currentYear = new Date().getFullYear();

  if (!isContentReady) {
    return <footer className="mt-28 border-t border-[#d9e0e8] bg-[#f5f8fb]" />;
  }

  if (!content) {
    return <footer className="mt-28 border-t border-[#d9e0e8] bg-[#f5f8fb]" />;
  }

  const footerCopyright = content.footer.copyright
    .trim()
    .replace(/^©?\s*(?:\d{4}(?:\s*[-–]\s*\d{4})?)?\s*/, "");

  return (
    <footer className="mt-28 border-t border-[#d9e0e8] bg-[#f5f8fb]">
      <div className="mx-auto flex max-w-[2560px] flex-col gap-8 px-5 py-12 text-[10px] font-bold uppercase tracking-[0.24em] text-[#6f7f99] sm:px-8 sm:text-[11px] sm:tracking-[0.42em] md:flex-row md:items-center md:justify-between">
        <p>
          © {currentYear} {footerCopyright}
        </p>
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
