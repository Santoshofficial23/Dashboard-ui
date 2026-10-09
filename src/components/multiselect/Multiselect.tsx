import {
  CATEGORY_TYPE_EXPENSE_OPTIONS,
  CATEGORY_TYPE_INCOME_OPTIONS,
} from "../../constants/categoryOptions";
import { Box, Text } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import FormWrapper from "../input/formField";
import { MODULE_TYPE_EXPENSE } from "../../types/type";
import { useCategoryStore } from "../../store/category.store";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type MultiselectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  type?: string;
  label: string;
};

const Multiselect = <T extends FieldValues>({
  name,
  control,
  type = MODULE_TYPE_EXPENSE.EXPENSE,
  label,
}: MultiselectProps<T>) => {
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);

  const defaultOptions =
    type === MODULE_TYPE_EXPENSE.EXPENSE
      ? CATEGORY_TYPE_EXPENSE_OPTIONS
      : CATEGORY_TYPE_INCOME_OPTIONS;

  const customOptions = categories
    .filter((category) => category.type === type)
    .map((category) => ({
      label: category.name,
      value: category.name,
    }));

  const options = [...defaultOptions, ...customOptions];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedValues = field.value
          ? String(field.value)
              .split(",")
              .map(
                (selectedValue) =>
                  options.find((option) => option.value === selectedValue) ?? {
                    label: selectedValue,
                    value: selectedValue,
                  },
              )
          : [];

        return (
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
            <Box w="full">
              <CreatableSelect
                isMulti
                options={options}
                value={selectedValues}
                placeholder="Add your category"
                onChange={(selectedOptions) => {
                  const values = selectedOptions.map((option) => option.value);
                  field.onChange(values.join(","));
                }}
                onCreateOption={(newCategory) => {
                  const normalizedCategory = newCategory.trim().toUpperCase();
                  addCategory(normalizedCategory, type);
                  const nextValue = field.value
                    ? `${field.value},${normalizedCategory}`
                    : normalizedCategory;
                  field.onChange(nextValue);
                }}
                onBlur={field.onBlur}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "40px",
                    borderColor: "#e1dddd",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    minHeight: "40px",
                  }),
                  input: (base) => ({
                    ...base,
                    textTransform: "uppercase",
                  }),
                }}
              />
            </Box>
          </FormWrapper>
        );
      }}
    />
  );
};

export default Multiselect;
