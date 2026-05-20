import { useRef, useState, type ChangeEvent } from "react";
import Button from "./Button";
import { cn } from "../lib/utils";

type ImageUploadFieldProps = {
  label: string;
  description?: string;
  previewUrl?: string | null;
  showPreview?: boolean;
  onFileSelected: (file: File) => Promise<void>;
  className?: string;
};

export default function ImageUploadField({
  label,
  description,
  previewUrl,
  showPreview = true,
  onFileSelected,
  className,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      await onFileSelected(file);
      event.target.value = "";
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#60636a]">{label}</p>
          {description && <p className="mt-1 text-sm leading-6 text-[#596171]">{description}</p>}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="rounded-none px-4"
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      {showPreview && (
        <div className="overflow-hidden rounded-[4px] border border-[#e4e1e7] bg-[#f7f4f7]">
          {previewUrl ? (
            <img src={previewUrl} alt={label} className="aspect-[1.7/1] w-full object-cover" />
          ) : (
            <div className="grid aspect-[1.7/1] place-items-center px-4 text-center text-sm text-[#7c8492]">
              No image uploaded yet.
            </div>
          )}
        </div>
      )}
      {error && <p className="text-sm text-[#8a4b52]">{error}</p>}
    </div>
  );
}
