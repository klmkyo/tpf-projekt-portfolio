import { createContext, useContext } from "react";
import type { SiteContent } from "../data/siteContentModel";

export type SiteContentContextValue = {
  content: SiteContent | null;
  isContentReady: boolean;
  isConfigured: boolean;
  saveContent: (nextContent: SiteContent) => Promise<void>;
};

export const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function useSiteContent() {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used inside SiteContentProvider.");
  }

  return context;
}
