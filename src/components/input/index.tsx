import {
  Box,
  IconButton,
  InputGroup,
  Textarea,
  Text,
  Input,
} from "@chakra-ui/react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import FormWrapper from "./formField";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  height?: number | string;
  textarea?: boolean;
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
  maxLength,
  subType,
  height,
  textarea = false,
}: InputFieldProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let value = e.target.value;

    if (subType === "NAME") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    if (subType === "CONTACT") {
      value = value.replace(/\D/g, "");
    }

    field.onChange(value);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <Box mb={4}>
      <FormWrapper
        label={
          <>
            {label}{" "}
            <Text as="span" color="red.600">
              *
            </Text>
          </>
        }
        errorText={fieldState.error?.message}
      >
        {textarea ? (
          <Textarea
            {...field}
            placeholder={placeholder}
            value={field.value ?? ""}
            disabled={disabled}
            maxLength={maxLength}
            rows={4}
            height={height}
            resize={"none"}
            onChange={handleChange}
          />
        ) : (
          <InputGroup
            endElement={
              type === "password" ? (
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </IconButton>
              ) : undefined
            }
          >
            <Input
              {...field}
              type={inputType}
              h="40px"
              placeholder={placeholder}
              value={field.value ?? ""}
              disabled={disabled}
              min={min}
              max={max}
              maxLength={maxLength}
              onChange={handleChange}
            />
          </InputGroup>
        )}
      </FormWrapper>
    </Box>
  );
};

export default InputField;
