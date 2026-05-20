const DEFAULT_MAX_WIDTH = 900;
const DEFAULT_JPEG_QUALITY = 0.6;

async function blobToDataUrl(blob: Blob) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read image data."));
    };

    reader.onerror = () => {
      reject(new Error("Unable to read image data."));
    };

    reader.readAsDataURL(blob);
  });
}

export async function fileToCompressedDataUrl(
  file: File,
  maxWidth = DEFAULT_MAX_WIDTH,
  jpegQuality = DEFAULT_JPEG_QUALITY,
) {
  const bitmap = await createImageBitmap(file);
  const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1;
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to prepare image preview.");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result);
          return;
        }

        reject(new Error("Unable to encode image."));
      },
      "image/jpeg",
      jpegQuality,
    );
  });

  return await blobToDataUrl(blob);
}
