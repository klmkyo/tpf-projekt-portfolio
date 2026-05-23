import { doc, getDoc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "../lib/firestore";
import { migrateSiteContentImages } from "../lib/storage";
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
  const isMigratingImagesRef = useRef(false);
  const { currentUser } = useAuth();

  const persistContent = useCallback(async (nextContent: SiteContent) => {
    const migratedContent = await migrateSiteContentImages(nextContent);
    await setDoc(doc(db, SITE_CONTENT_COLLECTION, SITE_CONTENT_DOC), migratedContent);
    setContent(migratedContent);
    return migratedContent;
  }, []);

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

  useEffect(() => {
    if (!currentUser || !isContentReady || !content || isMigratingImagesRef.current) {
      return undefined;
    }

    const hasLegacyDataUrls =
      content.hero.backgroundImageUrl.startsWith("data:image/") ||
      content.projects.some((project) => project.imageUrl.startsWith("data:image/"));

    if (!hasLegacyDataUrls) {
      return undefined;
    }

    let isActive = true;
    const currentContent = content;
    isMigratingImagesRef.current = true;

    async function migrateImages() {
      try {
        await persistContent(currentContent);
      } catch (error) {
        if (isActive) {
          console.error("Failed to migrate legacy image URLs:", error);
        }
      } finally {
        if (isActive) {
          isMigratingImagesRef.current = false;
        }
      }
    }

    void migrateImages();

    return () => {
      isActive = false;
    };
  }, [content, currentUser, isContentReady, persistContent]);

  const saveContent = useCallback(
    async (nextContent: SiteContent) => {
      await persistContent(nextContent);
    },
    [persistContent],
  );

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
