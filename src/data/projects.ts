import archiveFrame from "../assets/extracted/figma-002.png";
import cameraStill from "../assets/extracted/figma-006.png";
import coastalStill from "../assets/extracted/figma-000.png";
import concreteAtrium from "../assets/extracted/figma-012.png";
import lensStudy from "../assets/extracted/figma-016.png";
import portraitLight from "../assets/extracted/figma-004.png";
import skylineStill from "../assets/extracted/figma-008.png";
import studioFigure from "../assets/extracted/figma-014.png";

export type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  orientation: "wide" | "portrait" | "square";
};

export const publicProjects: Project[] = [
  {
    id: 1,
    title: "Concrete Passage",
    category: "Editorial Film",
    image: archiveFrame,
    orientation: "wide",
  },
  {
    id: 2,
    title: "Hard Light Portrait",
    category: "Photography",
    image: portraitLight,
    orientation: "portrait",
  },
  {
    id: 3,
    title: "Camera Study",
    category: "Motion",
    image: cameraStill,
    orientation: "square",
  },
  {
    id: 4,
    title: "Nocturne Skyline",
    category: "Commercial",
    image: skylineStill,
    orientation: "wide",
  },
];

export const adminProjects: Project[] = [
  {
    id: 5,
    title: "Atrium Morning",
    category: "Architecture",
    image: concreteAtrium,
    orientation: "wide",
  },
  {
    id: 6,
    title: "Suit Study",
    category: "Editorial",
    image: studioFigure,
    orientation: "portrait",
  },
  {
    id: 7,
    title: "Prime Lens",
    category: "Product Film",
    image: lensStudy,
    orientation: "wide",
  },
  {
    id: 8,
    title: "Coastal Opening",
    category: "Reel",
    image: coastalStill,
    orientation: "square",
  },
];
