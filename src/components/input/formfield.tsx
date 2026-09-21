import { Field } from "@chakra-ui/react";
import type { ReactNode } from "react";

type FormWrapperProps = {
  label?: React.ReactNode;
  errorText?: string;
  children: ReactNode;
  required?: boolean;
};

const FormWrapper = ({
  label,
  errorText,
  children,
  required = false,
}: FormWrapperProps) => {
  return (
    <Field.Root invalid={!!errorText}>
      <Field.Label>
        {label}

        {required && (
          <Field.RequiredIndicator />
        )}
      </Field.Label>

      {children}

      {errorText && (
        <Field.ErrorText>
          {errorText}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default FormWrapper;