import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ImageUploadField from "../components/ImageUploadField";
import LoadingState from "../components/LoadingState";
import SelectField from "../components/SelectField";
import TextField from "../components/TextField";
import { useSiteContent } from "../contexts/site-content-store";
import type { ProjectOrientation, SiteProject } from "../data/siteContentModel";
import { createProjectId } from "../data/siteContentModel";
import { fileToCompressedDataUrl } from "../lib/imageData";

const emptyProject: SiteProject = {
  id: createProjectId(),
  title: "",
  category: "",
  imageUrl: "",
  orientation: "wide",
};

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { content, saveContent, isContentReady } = useSiteContent();
  const [draft, setDraft] = useState<SiteProject>(emptyProject);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!isContentReady) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-16 sm:px-12 sm:py-24 lg:px-24 lg:py-28">
        <LoadingState className="min-h-[45svh] px-0 py-0" />
      </main>
    );
  }

  if (!content) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-16 sm:px-12 sm:py-24 lg:px-24 lg:py-28">
        <div className="rounded-[8px] border border-[#e4c5c7] bg-[#fff8f8] px-6 py-5 text-[#8a4b52]">
          Firestore document <code>siteContent/portfolio</code> is missing. Create it in Firebase
          first, then add projects here.
        </div>
      </main>
    );
  }

  const currentContent = content;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!draft.imageUrl) {
      setError("Upload an image before saving the project.");
      return;
    }

    setIsSaving(true);

    try {
      await saveContent({
        ...currentContent,
        projects: [...currentContent.projects, { ...draft, id: createProjectId() }],
      });
      navigate("/admin");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to save project.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpload(file: File) {
    const url = await fileToCompressedDataUrl(file);
    setDraft((current) => ({ ...current, imageUrl: url }));
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 sm:px-12 sm:py-24 lg:px-24 lg:py-28">
      <h1 className="text-4xl font-black leading-[0.95] sm:text-6xl">Add New Project</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#596171] sm:text-lg sm:leading-8">
        Create a new item for the shared content document. The image is uploaded to Firebase
        as a compressed data URL stored in Firestore.
      </p>

      <form className="mt-12 grid gap-8" onSubmit={handleSubmit}>
        <TextField
          label="Project title"
          value={draft.title}
          onChange={(event) => setDraft({ ...draft, title: event.target.value })}
          required
        />
        <TextField
          label="Category"
          value={draft.category}
          onChange={(event) => setDraft({ ...draft, category: event.target.value })}
          required
        />
        <SelectField
          label="Orientation"
          value={draft.orientation}
          onChange={(event) =>
            setDraft({ ...draft, orientation: event.target.value as ProjectOrientation })
          }
        >
          <option value="wide">Wide</option>
          <option value="portrait">Portrait</option>
          <option value="square">Square</option>
        </SelectField>
        <ImageUploadField
          label="Project image"
          description="Upload the image shown on the public gallery and in the lightbox."
          previewUrl={draft.imageUrl}
          onFileSelected={handleUpload}
        />
        <div className="flex flex-wrap gap-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Project"}
          </Button>
          <Button variant="outline" type="button" onClick={() => navigate("/admin")}>
            Cancel
          </Button>
        </div>
        {error && <p className="text-sm text-[#8a4b52]">{error}</p>}
      </form>
    </main>
  );
}
