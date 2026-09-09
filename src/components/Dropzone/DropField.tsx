import { Box } from "@chakra-ui/react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import FormWrapper from "../input/formfield";
import DropZone from "./DropZone";

type DropFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  isMulti?: boolean;
  maxFiles?: number;
  maxSize:string;
  filePath?: string;
};

const DropField = <T extends FieldValues>({
  name,
  control,
  label,
  isMulti = true,
  maxFiles = 1,
  filePath,
}: DropFieldProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <FormWrapper
      label={label}
      errorText={fieldState.error?.message}
    >
      <Box w="full">
        <DropZone
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
