import { useEffect } from "react";

type ReelLightboxProps = {
  reelUrl: string;
  title: string;
  onClose: () => void;
};

function getYouTubeVideoId(url: URL) {
  if (url.hostname === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  if (url.hostname !== "youtube.com" && !url.hostname.endsWith(".youtube.com")) {
    return null;
  }

  if (url.pathname === "/watch") {
    return url.searchParams.get("v");
  }

  const [, route, videoId] = url.pathname.split("/");

  if (route === "embed" || route === "shorts" || route === "live") {
    return videoId || null;
  }

  return null;
}

function getVimeoVideoId(url: URL) {
  if (url.hostname !== "vimeo.com" && !url.hostname.endsWith(".vimeo.com")) {
    return null;
  }

  const pathParts = url.pathname.split("/").filter(Boolean);
  return pathParts.find((part) => /^\d+$/.test(part)) ?? null;
}

function toEmbedUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    const youtubeVideoId = getYouTubeVideoId(url);

    if (youtubeVideoId) {
      return `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`;
    }

    const vimeoVideoId = getVimeoVideoId(url);

    if (vimeoVideoId) {
      return `https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1`;
    }

    return null;
  } catch {
    return null;
  }
}

export default function ReelLightbox({ reelUrl, title, onClose }: ReelLightboxProps) {
  const embedUrl = toEmbedUrl(reelUrl);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 px-2 py-2 backdrop-blur-sm sm:px-4 sm:py-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="pointer-events-none relative mx-auto flex h-full w-full max-w-[1500px] flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex items-start justify-between p-3 sm:p-5">
          <div className="max-w-[70%] text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#c7ced9]">
              Reel
            </p>
            <h2 className="mt-1 text-lg font-black sm:text-2xl">{title}</h2>
          </div>
          <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-black/30 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center text-2xl font-black text-white transition hover:opacity-70"
              aria-label="Close reel"
            >
              ×
            </button>
          </div>
        </div>

        <div className="grid flex-1 place-items-center p-0">
          <div
            className="pointer-events-auto w-full max-w-[min(100%,1400px)] overflow-hidden bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-5 px-6 text-center text-white">
                <p className="max-w-xl text-sm leading-6 text-[#d1d5db]">
                  This reel URL cannot be embedded directly.
                </p>
                <a
                  href={reelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-7 text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#111827] transition hover:bg-[#e5e7eb]"
                >
                  Open reel
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
