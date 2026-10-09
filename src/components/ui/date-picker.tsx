import { Box, DatePicker, Portal, Text } from "@chakra-ui/react";
import { parseDate } from "@internationalized/date";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import FormWrapper from "../input/formField";

type DatepickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  width?: string | number;
  height?: string |number;
};

const Datepicker = <T extends FieldValues>({
  name,
  control,
  label = "Date",
  placeholder = "Select date",
  width = "574px",
  height="44px"
}: DatepickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedDate = field.value ? [parseDate(field.value)] : [];

        return (
          <Box w={width}>
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
              <DatePicker.Root
                maxWidth={width}
                height={height}
                value={selectedDate}
                selectionMode="single"
                placeholder={placeholder}
                onValueChange={(details) => {
                  field.onChange(details.value[0]?.toString() ?? "");
                }}
              >
                <DatePicker.Control height={height}>
                  <DatePicker.Input h="full" />
                  <DatePicker.IndicatorGroup>
                    <DatePicker.Trigger h="full">
                      <CalendarDays size={16} />
                    </DatePicker.Trigger>
                  </DatePicker.IndicatorGroup>
                </DatePicker.Control>
                <Portal>
                  <DatePicker.Positioner>
                    <DatePicker.Content>
                      <DatePicker.View view="day">
                        <DatePicker.Header />
                        <DatePicker.DayTable />
                      </DatePicker.View>
                      <DatePicker.View view="month">
                        <DatePicker.Header />
                        <DatePicker.MonthTable />
                      </DatePicker.View>
                      <DatePicker.View view="year">
                        <DatePicker.Header />
                        <DatePicker.YearTable />
                      </DatePicker.View>
                    </DatePicker.Content>
                  </DatePicker.Positioner>
                </Portal>
              </DatePicker.Root>
            </FormWrapper>
          </Box>
        );
      }}
    />
  );
};

export default Datepicker;
