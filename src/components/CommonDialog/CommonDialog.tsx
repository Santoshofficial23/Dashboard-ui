import { Button, Dialog, Flex, IconButton } from "@chakra-ui/react";
import { CircleX } from "lucide-react";
import type { ReactNode } from "react";

type UserDialogProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onClear: () => void;

  title: string;
  submitButton: string;
  onSubmit: () => void;
  showResetBtn?: boolean;
  children: ReactNode;
};
const CommonDialog = ({
  isOpen,
  onClose,
  title,
  submitButton,
  onSubmit,
  onClear,
  showResetBtn = true,
  children,
}: UserDialogProps) => {
  const handleClear = () => {
    onClear();
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => onClose(e.open)}>
      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content maxH="90vh">
          <Dialog.Header>
            <Flex w="full" align="center" justify="space-between">
              <Dialog.Title>{title}</Dialog.Title>

              <IconButton
                aria-label="Close dialog"
                variant="ghost"
                size="sm"
                bg="red.50"
                color="red.600"
                onClick={handleClose}
              >
                <CircleX size={24} />
              </IconButton>
            </Flex>
          </Dialog.Header>

          <Dialog.Body overflowY="auto">{children}</Dialog.Body>

          <Dialog.Footer>
            {showResetBtn && (
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            )}

            <Button colorPalette="blue" onClick={onSubmit}>
              {submitButton}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default CommonDialog;
