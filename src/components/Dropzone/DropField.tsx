import { Box } from "@chakra-ui/react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import FormWrapper from "../input/formField";
import DropZone from "./dropZone";

type DropFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  isMulti?: boolean;
  maxFiles?: number;
  maxSize: string;
  height?: string;
  width?: string;
  filePath?: string;
};

const DropField = <T extends FieldValues>({
  name,
  control,
  label,
  height,
  width,
  isMulti = true,
  maxFiles = 1,
  filePath,
}: DropFieldProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <FormWrapper label={label} errorText={fieldState.error?.message}>
      <Box w="full">
        <DropZone
          height={height}
          width={width}
          onFileSelect={field.onChange}
          isMulti={isMulti}
          maxFiles={maxFiles}
          filePath={filePath}
          MaxSize={maxFiles}
        />
      </Box>
    </FormWrapper>
  );
};

export default DropField;
