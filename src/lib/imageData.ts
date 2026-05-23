const DEFAULT_MAX_WIDTH = 1400;
const DEFAULT_JPEG_QUALITY = 0.82;

async function bitmapToBlob(bitmap: ImageBitmap, jpegQuality: number) {
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to prepare image for upload.");
  }

  context.drawImage(bitmap, 0, 0);
  bitmap.close();

  return await new Promise<Blob>((resolve, reject) => {
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
}

export async function fileToCompressedBlob(
  file: File,
  maxWidth = DEFAULT_MAX_WIDTH,
  jpegQuality = DEFAULT_JPEG_QUALITY,
) {
  const bitmap = await createImageBitmap(file);
  const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1;
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  if (scale === 1) {
    return await bitmapToBlob(bitmap, jpegQuality);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("Unable to prepare image for upload.");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return await new Promise<Blob>((resolve, reject) => {
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
}

export async function dataUrlToBlob(dataUrl: string) {
  const response = await fetch(dataUrl);

  if (!response.ok) {
    throw new Error("Unable to read image data.");
  }

  return await response.blob();
}

export function isDataImageUrl(value: string) {
  return value.startsWith("data:image/");
}
