import {
  Box,
  Portal,
  Stack,
  Toast,
  Toaster as ChakraToaster,
} from "@chakra-ui/react";
import { Check, X } from "lucide-react";
import { toaster } from "../../utils/toaster/notification";

const Notification = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster}>
        {(toast) => {
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";

          return (
            <Toast.Root
              width={{ base: "340px", md: "340px" }}
              minH="72px"
              bg="white"
              color="gray.800"
              borderRadius="6px"
              borderLeft="3px solid"
              borderLeftColor={
                isSuccess
                  ? "green.400"
                  : isError
                    ? "red.400"
                    : "blue.400"
              }
              boxShadow="0 4px 15px rgba(0, 0, 0, 0.08)"
              px="4"
              py="3"
              gap="3"
              alignItems="center"
            >
              {isSuccess && (
                <Box
                  w="30px"
                  h="30px"
                  borderRadius="full"
                  bg="green.400"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Check size={19} color="white" strokeWidth={3} />
                </Box>
              )}

              {isError && (
                <Box
                  w="30px"
                  h="30px"
                  borderRadius="full"
                  bg="red.400"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <X size={19} color="white" strokeWidth={3} />
                </Box>
              )}
              {!isSuccess && !isError && (
                <Toast.Indicator flexShrink={0} />
              )}
              <Stack
                gap="0"
                flex="1"
                minW="0"
              >
                {toast.title && (
                  <Toast.Title
                    fontSize="15px"
                    fontWeight="700"
                    lineHeight="1.4"
                  >
                    {toast.title}
                  </Toast.Title>
                )}

                {toast.description && (
                  <Toast.Description
                    fontSize="12px"
                    color="gray.500"
                    lineHeight="1.4"
                  >
                    {toast.description}
                  </Toast.Description>
                )}
              </Stack>

              {toast.closable && (
                <Toast.CloseTrigger
                  position="absolute"
                  top="8px"
                  right="8px"
                  w="18px"
                  h="18px"
                  minW="18px"
                  borderRadius="full"
                  color="gray.500"
                  _hover={{
                    bg: "gray.100",
                    color: "gray.700",
                  }}
                />
              )}
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};

export default Notification;