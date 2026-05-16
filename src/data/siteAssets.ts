import archiveFrame from "../assets/extracted/figma-002.png";
import cameraStill from "../assets/extracted/figma-006.png";
import coastalStill from "../assets/extracted/figma-000.png";
import concreteAtrium from "../assets/extracted/figma-012.png";
import lensStudy from "../assets/extracted/figma-016.png";
import portraitLight from "../assets/extracted/figma-004.png";
import skylineStill from "../assets/extracted/figma-008.png";
import studioFigure from "../assets/extracted/figma-014.png";

export const imageAssets = {
  archive: archiveFrame,
  atrium: concreteAtrium,
  camera: cameraStill,
  coast: coastalStill,
  figure: studioFigure,
  lens: lensStudy,
  portrait: portraitLight,
  skyline: skylineStill,
} as const;

type ImageAssetKey = keyof typeof imageAssets;

export const imageLabels: Record<ImageAssetKey, string> = {
  archive: "Concrete archive",
  atrium: "Atrium morning",
  camera: "Camera study",
  coast: "Coastal opening",
  figure: "Suit study",
  lens: "Prime lens",
  portrait: "Hard light portrait",
  skyline: "Nocturne skyline",
};

export const imageOptions = Object.keys(imageAssets) as ImageAssetKey[];

export function getImageLabel(imageKey: ImageAssetKey) {
  return imageLabels[imageKey];
}

export function resolveImageAsset(imageKey: ImageAssetKey) {
  return imageAssets[imageKey];
}
