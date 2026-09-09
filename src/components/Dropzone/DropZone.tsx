import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileError,
} from "react-dropzone";
import { useFilePreview } from "../hooks/useFilePreview";
import { showError } from "../../utils/toaster/notification";
import { CircleX } from "lucide-react";

type DropZoneProps = {
  onFileSelect: (files: File[]) => void;
  isMulti?: boolean;
  maxFiles?: number;
  MaxSize: number;
  accept?: Accept;
  filePath?: string;
};

const MAXSIZE = 1 * 1024 * 1024; // 1mb
const DropZone = ({
  onFileSelect,
  isMulti = true,
  maxFiles = 1,
  accept = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
  },
  filePath,
  //   accept = {
  //   "application/pdf": [".pdf"],
  // }
}: DropZoneProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  const { previewUrl: remotePreview, isLoading } = useFilePreview(filePath);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const rejection = fileRejections[0];

    if (
      rejection?.errors?.some(
        (error: FileError) => error.code === "file-too-large",
      )
    ) {
      const message = "File size must be less than 1 MB";

      setFileError(message);
      showError(message, "File upload failed");

      return;
    }

    if (
      rejection?.errors?.some(
        (error: FileError) => error.code === "file-invalid-type",
      )
    ) {
      const message = "Only PDF files are allowed";

      setFileError(message);
      showError(message, "Invalid file");

      return;
    }

    showError("Unable to upload the selected file", "File upload failed");
  }, []);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;
      setFileError("");
      const files = isMulti
        ? acceptedFiles.slice(0, maxFiles)
        : acceptedFiles.slice(0, 1);

      onFileSelect(files);
      setSelectedFiles(files);

      const previewUrls = files.map((file) => URL.createObjectURL(file));

      setPreviews(previewUrls);
    },
    [isMulti, maxFiles, onFileSelect],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple: isMulti,
    maxSize: MAXSIZE,
    maxFiles: isMulti ? maxFiles : 1,
    onDrop,
    onDropRejected,
  });

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [previews]);

  const hasLocalPreview = previews.length > 0;

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);

    onFileSelect(newFiles);
  };
  return (
    <Box>
      <Box
        {...getRootProps()}
        border="2px dashed"
        bg="bg.subtle"
        minH="140px"
        p={6}
        textAlign="center"
        cursor="pointer"
        borderRadius="md"
        borderColor={fileError.length > 0 ? "red.400" : "blue.400"}
      >
        <input {...getInputProps()} />

        {hasLocalPreview ? (
          <SimpleGrid columns={isMulti ? 2 : 1} gap={3}>
            {previews.map((preview, index) => (
              <Box key={preview} position="relative">
                <Box position={'absolute'}
                top={'5px'}
                right={'5px'}
                >

                <CircleX
                color="white"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  />
                  </Box>
                <Image
                  src={preview}
                  alt={`Selected image ${index + 1}`}
                  h="120px"
                  w="100%"
                  borderRadius="md"
                  objectFit="cover"
                />

                <Text
                  mt={2}
                  fontSize="sm"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {selectedFiles[index]?.name}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : remotePreview ? (
          <Box>
            <Image
              src={remotePreview}
              alt="Current logo"
              h="120px"
              w="120px"
              mx="auto"
              borderRadius="md"
              objectFit="contain"
            />

            <Text mt={2} fontSize="sm">
              Current logo
            </Text>

            <Text mt={1} fontSize="xs" color="fg.muted">
              Click or drag to replace
            </Text>
          </Box>
        ) : isLoading ? (
          <Text>Loading logo...</Text>
        ) : (
          <>
            <Text>
              Drag {isMulti ? `up to ${maxFiles} logo files` : "a logo file"}
            </Text>

            <Text fontSize="sm" color="gray.500" mt={1}>
              or click to select
            </Text>

            <Text fontSize="xs" color="gray.400" mt={2}>
              PNG or JPEG
            </Text>
          </>
        )}
      </Box>
      {fileError && <Text color={"red.500"}> {fileError}</Text>}
    </Box>
  );
};

export default DropZone;
