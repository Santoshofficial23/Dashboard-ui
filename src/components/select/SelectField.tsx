import Select from "react-select";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Box, Text } from "@chakra-ui/react";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  placeholder?: string;
};

const SelectField = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Select...",
}: SelectFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Box mb={4}>
          <label>{label}</label>

      <Select
  options={options}
  placeholder={placeholder}
  value={
    options.find(
      (option) => option.value === field.value
    ) || null
  }
  onChange={(option) =>
    field.onChange(option?.value ?? "")
  }
  onBlur={field.onBlur}
  isClearable
  styles={{
    control: (base) => ({
      ...base,
      backgroundColor: "whiteAlpha.400",
      borderColor: "#444",
      color: "white",
    }),

    singleValue: (base) => ({
      ...base,
      color: "black",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#aaa",
    }),

    input: (base) => ({
      ...base,
      color: "white",
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#bab7b7",
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "#838181"
        : "gray.200",
      color: "white",
      cursor: "pointer",
    }),

    clearIndicator: (base) => ({
      ...base,
      color: "black",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "black",
    }),
  }}
/>
          {fieldState.error && (
            <Text style={{ color: "red", fontSize: "14px" }}>
              {fieldState.error.message}
            </Text>
          )}
        </Box>
      )}
    />
  );
};

export default SelectField;