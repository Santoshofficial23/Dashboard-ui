import { Box, Input } from "@chakra-ui/react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import FormWrapper from "./formfield";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  subType?: "NAME" | "CONTACT" | "EMAIL";
};

const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  disabled = false,
  min,
  max,
  subType,
}: InputFieldProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (subType === "NAME") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    field.onChange(value);
  };

  return (
    <Box mb={4}>
      <FormWrapper
        label={label}
        errorText={fieldState.error?.message}
      >
        <Input
          {...field}
          value={field.value ?? ""}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
         
          onChange={handleChange}
        />
      </FormWrapper>
    </Box>
  );
};

export default InputField;


