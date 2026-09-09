import { fileApi } from "./apiConfig";

export const FILE_ENDPOINT = "file/{filepath}";

export const getFileBlob = async (filepath: string): Promise<Blob> => {
  const response = await fileApi.get<Blob>(
    FILE_ENDPOINT.replace(
      "{filepath}",
      encodeURIComponent(filepath),
    ),
    {
      responseType: "blob",
    },
  );

  return response.data;
};

export const getFilePath = (value: unknown): string | undefined => {
  if (Array.isArray(value)) {
    return getFilePath(value[0]);
  }

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (typeof value !== "object" || value === null) {
    return undefined;
  }

  const record = value as Record<string, unknown>;

  const filepath =
    record.filepath ??
    record.filePath ??
    record.path ??
    record.id;

  if (typeof filepath === "string" && filepath.trim()) {
    return filepath;
  }

  if (typeof filepath === "number") {
    return String(filepath);
  }

  return undefined;
};