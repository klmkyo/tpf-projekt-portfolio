import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import Button from "../components/Button";
import ImageUploadField from "../components/ImageUploadField";
import LoadingState from "../components/LoadingState";
import ProjectCard from "../components/ProjectCard";
import SelectField from "../components/SelectField";
import TextAreaField from "../components/TextAreaField";
import TextField from "../components/TextField";
import { useSiteContent } from "../contexts/site-content-store";
import { useAuth } from "../hooks/useAuth";
import type {
  ProjectOrientation,
  SiteContent,
  SiteProject,
  SocialLink,
} from "../data/siteContentModel";
import { fileToCompressedDataUrl } from "../lib/imageData";

type ProjectKey = "title" | "category" | "orientation";

function updateProjectField<T extends ProjectKey>(
  projects: SiteProject[],
  projectId: string,
  key: T,
  value: SiteProject[T],
) {
  return projects.map((project) =>
    project.id === projectId ? { ...project, [key]: value } : project,
  );
}

function moveProject(projects: SiteProject[], fromIndex: number, toIndex: number) {
  const nextProjects = [...projects];
  const [movedProject] = nextProjects.splice(fromIndex, 1);
  nextProjects.splice(toIndex, 0, movedProject);
  return nextProjects;
}

type AdminEditorProps = {
  initialContent: SiteContent;
  isConfigured: boolean;
  saveContent: (nextContent: SiteContent) => Promise<void>;
  logout: () => Promise<void>;
};

function ProjectEditor({
  project,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onUpdate,
  onUploadImage,
}: {
  project: SiteProject;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onUpdate: <T extends ProjectKey>(key: T, value: SiteProject[T]) => void;
  onUploadImage: (file: File) => Promise<void>;
}) {
  return (
    <div className="rounded-[8px] border border-[#e5e0e6] bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#778090]">
            Project {index + 1}
          </p>
          <h3 className="mt-2 text-lg font-black text-[#111827]">{project.title || "Untitled"}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={onMoveUp} disabled={index === 0}>
            ↑
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onMoveDown}
            disabled={index === total - 1}
          >
            ↓
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <TextField
            label="Title"
            value={project.title}
            onChange={(event) => onUpdate("title", event.target.value)}
          />
          <TextField
            label="Category"
            value={project.category}
            onChange={(event) => onUpdate("category", event.target.value)}
          />
          <SelectField
            label="Orientation"
            value={project.orientation}
            onChange={(event) =>
              onUpdate("orientation", event.target.value as ProjectOrientation)
            }
          >
            <option value="wide">Wide</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>
          </SelectField>
          <ImageUploadField
            label="Project image"
            description="Upload the image that should be shown on the public gallery."
            previewUrl={project.imageUrl}
            showPreview={false}
            onFileSelected={onUploadImage}
          />
        </div>

        <div className="self-start">
          <ProjectCard project={project} />
        </div>
      </div>
    </div>
  );
}

function SocialLinkField({
  value,
  index,
  onChange,
}: {
  value: SocialLink;
  index: number;
  onChange: (nextValue: SocialLink) => void;
}) {
  return (
    <div className="grid gap-4 rounded-[8px] border border-[#ece6ea] bg-white p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#778090]">
        Social {index + 1}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Label"
          value={value.label}
          onChange={(event) => onChange({ ...value, label: event.target.value })}
        />
        <TextField
          label="URL"
          value={value.href}
          onChange={(event) => onChange({ ...value, href: event.target.value })}
        />
      </div>
    </div>
  );
}

function AdminEditor({ initialContent, isConfigured, saveContent, logout }: AdminEditorProps) {
  const [draft, setDraft] = useState<SiteContent>(() => initialContent);
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setStatus(null);
    setIsSaving(true);

    try {
      await saveContent(draft);
      setStatus("Saved to Firebase.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save content.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleHeroImageUpload(file: File) {
    const url = await fileToCompressedDataUrl(file);
    setDraft((current) => ({
      ...current,
      hero: { ...current.hero, backgroundImageUrl: url },
    }));
  }

  async function handleProjectImageUpload(projectId: string, file: File) {
    const url = await fileToCompressedDataUrl(file);

    setDraft((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === projectId ? { ...project, imageUrl: url } : project,
      ),
    }));
  }

  function updateSocialLink(index: number, nextValue: SocialLink) {
    setDraft((current) => ({
      ...current,
      footer: {
        ...current.footer,
        socialLinks: current.footer.socialLinks.map((link, linkIndex) =>
          linkIndex === index ? nextValue : link,
        ),
      },
    }));
  }

  return (
    <main className="mx-auto max-w-[1600px] px-5 py-10 sm:px-12 sm:py-16 lg:px-24">
      <section className="border-b border-[#ded8de] pb-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-black sm:text-6xl">{draft.admin.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#596171]">{draft.admin.intro}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] font-black uppercase tracking-[0.18em] text-[#60636a] sm:gap-8 sm:text-[12px] sm:tracking-[0.28em]">
              {draft.admin.metrics.map((metric, index) => (
                <span key={metric.label} className="flex items-center gap-3">
                  <span>{metric.label}</span>
                  {index < draft.admin.metrics.length - 1 && (
                    <span className="h-6 w-px bg-[#d3d0d5]" />
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/new">
              <Button className="rounded-none bg-black px-10">+ Add New Project</Button>
            </Link>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      {!isConfigured && (
        <div className="mt-8 rounded-[8px] border border-[#e4c5c7] bg-[#fff8f8] px-5 py-4 text-sm text-[#8a4b52]">
          Firestore is not configured yet.
        </div>
      )}

      <div className="mt-10 space-y-10 pb-28 sm:pb-24 lg:pb-24">
        <details
          className="rounded-[8px] border border-[#e5e0e6] bg-[#faf8fb] p-6"
          open
        >
          <summary className="group flex cursor-pointer list-none items-center justify-between gap-4 text-2xl font-black outline-none">
            <span>Contact & Footer</span>
            <FiChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="mt-6 grid gap-6">
            <TextField
              label="Contact heading"
              value={draft.contact.heading}
              onChange={(event) =>
                setDraft({ ...draft, contact: { ...draft.contact, heading: event.target.value } })
              }
            />
            <TextAreaField
              label="Contact description"
              value={draft.contact.description}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  contact: { ...draft.contact, description: event.target.value },
                })
              }
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Inquiries label"
                value={draft.contact.inquiriesLabel}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, inquiriesLabel: event.target.value },
                  })
                }
              />
              <TextField
                label="Studio label"
                value={draft.contact.studioLabel}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, studioLabel: event.target.value },
                  })
                }
              />
            </div>
            <TextField
              label="Inquiry email"
              value={draft.contact.email}
              onChange={(event) =>
                setDraft({ ...draft, contact: { ...draft.contact, email: event.target.value } })
              }
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Address line 1"
                value={draft.contact.addressLines[0]}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    contact: {
                      ...draft.contact,
                      addressLines: [event.target.value, draft.contact.addressLines[1]],
                    },
                  })
                }
              />
              <TextField
                label="Address line 2"
                value={draft.contact.addressLines[1]}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    contact: {
                      ...draft.contact,
                      addressLines: [draft.contact.addressLines[0], event.target.value],
                    },
                  })
                }
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Footer copyright"
                value={draft.footer.copyright}
                onChange={(event) =>
                  setDraft({ ...draft, footer: { ...draft.footer, copyright: event.target.value } })
                }
              />
            </div>
            <div className="grid gap-4">
              {draft.footer.socialLinks.map((link, index) => (
                <SocialLinkField
                  key={`${index}-${link.label}`}
                  index={index}
                  value={link}
                  onChange={(nextValue) => updateSocialLink(index, nextValue)}
                />
              ))}
            </div>
          </div>
        </details>

        <section className="rounded-[8px] border border-[#e5e0e6] bg-[#faf8fb] p-6">
          <h2 className="text-2xl font-black">Brand & Hero</h2>
          <div className="mt-6 grid gap-6">
            <TextField
              label="Brand name"
              value={draft.brandName}
              onChange={(event) => setDraft({ ...draft, brandName: event.target.value })}
            />
            <div className="grid gap-6 sm:grid-cols-3">
              <TextField
                label="Work label"
                value={draft.navigation.work}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    navigation: { ...draft.navigation, work: event.target.value },
                  })
                }
              />
              <TextField
                label="Contact label"
                value={draft.navigation.contact}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    navigation: { ...draft.navigation, contact: event.target.value },
                  })
                }
              />
              <TextField
                label="Admin label"
                value={draft.navigation.admin}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    navigation: { ...draft.navigation, admin: event.target.value },
                  })
                }
              />
            </div>
            <TextField
              label="View reel label"
              value={draft.navigation.viewReel}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  navigation: { ...draft.navigation, viewReel: event.target.value },
                })
              }
            />
            <TextField
              label="View reel URL"
              value={draft.navigation.viewReelUrl}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  navigation: { ...draft.navigation, viewReelUrl: event.target.value },
                })
              }
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Hero title"
                value={draft.hero.title}
                onChange={(event) =>
                  setDraft({ ...draft, hero: { ...draft.hero, title: event.target.value } })
                }
              />
              <TextField
                label="Primary CTA"
                value={draft.hero.primaryCta}
                onChange={(event) =>
                  setDraft({ ...draft, hero: { ...draft.hero, primaryCta: event.target.value } })
                }
              />
            </div>
            <TextAreaField
              label="Hero description"
              value={draft.hero.description}
              onChange={(event) =>
                setDraft({ ...draft, hero: { ...draft.hero, description: event.target.value } })
              }
            />
            <TextField
              label="Secondary CTA"
              value={draft.hero.secondaryCta}
              onChange={(event) =>
                setDraft({ ...draft, hero: { ...draft.hero, secondaryCta: event.target.value } })
              }
            />
            <ImageUploadField
              label="Hero background image"
              description="Upload the fullscreen image used behind the hero copy."
              previewUrl={draft.hero.backgroundImageUrl}
              onFileSelected={handleHeroImageUpload}
            />
          </div>
        </section>

        <section className="rounded-[8px] border border-[#e5e0e6] bg-white p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-black">Projects</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#596171]">
                Reorder the list, upload new images, and edit the card copy. The public work page
                uses the same Firestore content.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6">
            {draft.projects.map((project, index) => (
              <ProjectEditor
                key={project.id}
                project={project}
                index={index}
                total={draft.projects.length}
                onMoveUp={() =>
                  setDraft((current) => ({
                    ...current,
                    projects: moveProject(current.projects, index, index - 1),
                  }))
                }
                onMoveDown={() =>
                  setDraft((current) => ({
                    ...current,
                    projects: moveProject(current.projects, index, index + 1),
                  }))
                }
                onUpdate={(key, value) =>
                  setDraft((current) => ({
                    ...current,
                    projects: updateProjectField(current.projects, project.id, key, value),
                  }))
                }
                onUploadImage={(file) => handleProjectImageUpload(project.id, file)}
              />
            ))}
          </div>
        </section>

        <div className="sticky bottom-0 -mx-5 border-t border-[#e4e0e6] bg-[#fbf7fa]/95 px-5 py-4 backdrop-blur-sm sm:-mx-12 sm:px-12 lg:-mx-24 lg:px-24">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              className="rounded-none bg-black px-12"
              onClick={handleSave}
              disabled={isSaving}
              type="button"
            >
              {isSaving ? "Saving..." : "Save Content"}
            </Button>
            {status && <p className="text-sm text-[#596171]">{status}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const { logout } = useAuth();
  const { content, isConfigured, isContentReady, saveContent } = useSiteContent();

  if (!isContentReady) {
    return (
      <main className="mx-auto max-w-[1600px] px-5 py-10 sm:px-12 sm:py-16 lg:px-24">
        <LoadingState className="min-h-[45svh] px-0 py-0" />
      </main>
    );
  }

  if (!content) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-12 sm:py-24 lg:px-24 lg:py-28">
        <div className="rounded-[8px] border border-[#e4c5c7] bg-[#fff8f8] px-6 py-5 text-[#8a4b52]">
          Firestore document <code>siteContent/portfolio</code> is missing. Create it in Firebase
          first, then reopen the admin page.
        </div>
      </main>
    );
  }

  return (
    <AdminEditor
      initialContent={content}
      isConfigured={isConfigured}
      saveContent={saveContent}
      logout={logout}
    />
  );
}
