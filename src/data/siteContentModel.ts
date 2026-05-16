export type ProjectOrientation = "wide" | "portrait" | "square";

export type SiteProject = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  orientation: ProjectOrientation;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteContent = {
  brandName: string;
  navigation: {
    work: string;
    contact: string;
    admin: string;
    viewReel: string;
    viewReelUrl: string;
  };
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    backgroundImageUrl: string;
  };
  projects: SiteProject[];
  contact: {
    heading: string;
    description: string;
    inquiriesLabel: string;
    email: string;
    studioLabel: string;
    addressLines: [string, string];
    formLabels: {
      fullName: string;
      email: string;
      subject: string;
      details: string;
      submit: string;
    };
  };
  footer: {
    copyright: string;
    socialLinks: SocialLink[];
  };
  admin: {
    title: string;
    metrics: Array<{ label: string; value: string }>;
    intro: string;
  };
};

export function createProjectId() {
  return `p-${crypto.randomUUID().slice(0, 8)}`;
}
