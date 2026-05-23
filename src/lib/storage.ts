import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { SiteContent, SiteProject } from "../data/siteContentModel";
import { dataUrlToBlob, fileToCompressedBlob, isDataImageUrl } from "./imageData";
import { storage } from "./firebase";

const IMAGE_ROOT = "siteContent";

function heroImagePath() {
  return `${IMAGE_ROOT}/hero/background`;
}

function projectImagePath(projectId: string) {
  return `${IMAGE_ROOT}/projects/${projectId}`;
}

async function uploadBlobToPath(blob: Blob, path: string) {
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, blob, {
    contentType: blob.type || "image/jpeg",
  });

  return await getDownloadURL(storageRef);
}

export async function uploadHeroImage(file: File) {
  const blob = await fileToCompressedBlob(file);
  return await uploadBlobToPath(blob, heroImagePath());
}

export async function uploadProjectImage(file: File, projectId: string) {
  const blob = await fileToCompressedBlob(file);
  return await uploadBlobToPath(blob, projectImagePath(projectId));
}

async function migrateImageUrl(imageUrl: string, path: string) {
  if (!isDataImageUrl(imageUrl)) {
    return imageUrl;
  }

  const blob = await dataUrlToBlob(imageUrl);
  return await uploadBlobToPath(blob, path);
}

export async function migrateSiteContentImages(content: SiteContent) {
  const [heroBackgroundImageUrl, projects] = await Promise.all([
    migrateImageUrl(content.hero.backgroundImageUrl, heroImagePath()),
    Promise.all(
      content.projects.map(async (project: SiteProject) => ({
        ...project,
        imageUrl: await migrateImageUrl(project.imageUrl, projectImagePath(project.id)),
      })),
    ),
  ]);

  return {
    ...content,
    hero: {
      ...content.hero,
      backgroundImageUrl: heroBackgroundImageUrl,
    },
    projects,
  };
}
