import { createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
});

type ErrorResponse = {
  message?: string;
  error?: string;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: ErrorResponse } })
      .response;
    const message = response?.data?.message ?? response?.data?.error;

    if (message) return message;
  }

  return error instanceof Error ? error.message : fallback;
};

export const showSuccess = (message: string) => {
  toaster.create({
    title: "Success",
    description: message,
    type: "success",
    closable: true,
  });
};

export const showError = (error: unknown, fallback: string) => {
  toaster.create({
    title: "Error",
    description: getErrorMessage(error, fallback),
    type: "error",
    closable: true,
  });
};
