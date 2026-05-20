import { doc, getDoc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { db } from "../lib/firestore";
import type { SiteContent } from "../data/siteContentModel";
import { SiteContentContext, type SiteContentContextValue } from "./site-content-store";

const SITE_CONTENT_DOC = "portfolio";
const SITE_CONTENT_COLLECTION = "siteContent";

type SiteContentProviderProps = {
  children: ReactNode;
};

export function SiteContentProvider({ children }: SiteContentProviderProps) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadContent() {
      try {
        const snapshot = await getDoc(doc(db, SITE_CONTENT_COLLECTION, SITE_CONTENT_DOC));

        if (!isActive) {
          return;
        }

        setContent(snapshot.exists() ? (snapshot.data() as SiteContent) : null);
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("Failed to load site content from Firestore:", error);
        setContent(null);
      } finally {
        if (isActive) {
          setIsContentReady(true);
        }
      }
    }

    void loadContent();

    return () => {
      isActive = false;
    };
  }, []);

  const saveContent = useCallback(async (nextContent: SiteContent) => {
    await setDoc(doc(db, SITE_CONTENT_COLLECTION, SITE_CONTENT_DOC), nextContent);
    setContent(nextContent);
  }, []);

  const value = useMemo<SiteContentContextValue>(
    () => ({
      content,
      isContentReady,
      isConfigured: true,
      saveContent,
    }),
    [content, isContentReady, saveContent],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}
