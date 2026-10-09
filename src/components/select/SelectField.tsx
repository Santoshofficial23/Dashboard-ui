import Select from "react-select";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Box, Text } from "@chakra-ui/react";
import FormWrapper from "../input/formField";

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
  width?: string | number;
};

const SelectField = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Select...",
  width = "100%",
}: SelectFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Box w={width} mb-4 >
        <FormWrapper label={
          <>
            {label}{" "}
            <Text as="span" color="red.600">
              *
            </Text>
          </>
        }
        errorText={fieldState.error?.message}
      >
          <Select
            options={options}
            placeholder={placeholder}
            value={
              options.find((option) => option.value === field.value) || null
            }
            onChange={(option) => field.onChange(option?.value ?? "")}
            onBlur={field.onBlur}
            isClearable
            styles={{
              container: (base) => ({
                ...base,
                width: "100%",
              }),
              control: (base) => ({
                ...base,
                width: "100%",
                minHeight: "40px",
                height: "40px",
                backgroundColor: "whiteAlpha.400",
                borderColor: "#e1dddd",
                color: "white",
              }),

              valueContainer: (base) => ({
                ...base,
                height: "40px",
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
                backgroundColor: state.isFocused ? "#838181" : "gray.200",
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
          </FormWrapper>
        </Box>
      )}
    />
  );
};

export default SelectField;
