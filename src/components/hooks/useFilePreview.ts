import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { getFileBlob } from "../../services/api/file.api";

export const useFilePreview = (filepath?: string) => {
  const { data: fileBlob, isLoading } = useQuery({
    queryKey: ["file", filepath],
    queryFn: () => getFileBlob(filepath as string),
    enabled: Boolean(filepath),
  });

  const previewUrl = useMemo(() => {
    return fileBlob ? URL.createObjectURL(fileBlob) : undefined;
  }, [fileBlob]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return { previewUrl, isLoading };
};
