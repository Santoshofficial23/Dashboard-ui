import CommonDialog from '../../components/commondialog/commonDialog';
import { Text } from '@chakra-ui/react';
type ConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onClear:() => void;
  message:string;
  isDeleting?: boolean;
};

const Confirmationdialog = ( {
  isOpen,
  onClose,
  onClear,
  onDelete,
  message,
  isDeleting = true,
}: ConfirmationDialogProps) => {
  return (
    <CommonDialog
      isOpen={isOpen}
      onClear={onClear}
      onClose={onClose}
      onSubmit={onDelete}
      submitButton={isDeleting ? "Deleting..." : "Delete"}
      title="Delete User"
      showResetBtn={false}
    >
      <Text>
        {message}
      </Text>
    </CommonDialog>
  );
};


export default Confirmationdialog
