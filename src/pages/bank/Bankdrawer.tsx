import { Box, Button, HStack, Stack, Switch, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../../components/input";
import SelectField from "../../components/select/SelectField";
import { INSTITUTION_TYPE_OPTIONS } from "../../constants/Bankoptions";
import { bankSchema } from "../../schemas/bank.schema";
import {
  useCreateBank,
  type CreateBankData,
} from "../../components/hooks/bank/useCreatebank";
import { useFetchBankById } from "../../components/hooks/bank/useFetchbankById";
import { useUpdateBank } from "../../components/hooks/bank/useUpdatebank";
import DropField from "../../components/Dropzone/DropField";
import { getFilePath } from "../../services/api/file.api";
import CommonDrawer from "../../components/Drawer/Commondrawer";
type DialogProps = {
  isOpen: boolean;
  open: boolean;
  onClose: () => void;
  selectedBankId: string | null;
};

type BankFormData = {
  bankName: string;
  bankCode: string;
  institutionType: string;
  partner: boolean;
  bank: boolean;
  logo: File[];
};

const emptyBank: BankFormData = {
  bankName: "",
  bankCode: "",
  institutionType: "",
  partner: false,
  bank: true,
  logo: [],
};

const Bankdrawer = ({ open, isOpen, onClose, selectedBankId }: DialogProps) => {
  const isEdit = selectedBankId !== null;
  const { control, reset, handleSubmit } = useForm<BankFormData>({
    resolver: yupResolver(bankSchema),
    mode: "onChange",
    defaultValues: emptyBank,
  });

  const { mutate: createBank, isPending: isCreating } = useCreateBank();
  const { mutate: updateBank, isPending: isUpdating } = useUpdateBank();
  const { data: bankData, isLoading: isBankLoading } = useFetchBankById(
    selectedBankId,
    isOpen,
  );
  const logoFilePath = getFilePath(bankData?.logo);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isEdit || !bankData) {
      reset(emptyBank);
      return;
    }
    reset({
      bankName: bankData.bankName,
      bankCode: bankData.bankCode,
      institutionType: bankData.institutionType,
      partner: bankData.partner,
      bank: bankData.bank,
      logo: [],
    });
  }, [bankData, isEdit, reset]);

  const handleClear = () => {
    reset(emptyBank);
  };
  const handleClose = () => {
    reset(emptyBank);
    onClose();
  };

  const onSubmit = (data: BankFormData) => {
    const formattedData: CreateBankData = {
      bankName: data.bankName.trim(),
      bankCode: data.bankCode.trim(),
      institutionType: data.institutionType,
      partner: data.partner,
      bank: data.bank,
      logo: data.logo,
    };

    if (isEdit && selectedBankId) {
      updateBank(
        {
          id: selectedBankId,
          data: {
            ...formattedData,
            active: bankData?.active ?? true,
            status: true,
          },
        },
        {
          onSuccess: () => {
            reset(emptyBank);
            onClose();
          },
        },
      );

      return;
    }

    createBank(formattedData, {
      onSuccess: (response) => {
        console.log("Bank created successfully:", response);

        reset(emptyBank);
        queryClient.invalidateQueries({ queryKey: ["banks"] });
        onClose();
      },

      onError: (error) => {
        console.error("Create bank error:", error);
      },
    });
  };

  return (
    <>
     <Box as="form" id="bank-form" onSubmit={handleSubmit(onSubmit)} pt={10}>
      <CommonDrawer
      size="md"
      placement="end"
      open={open}
      onClose={handleClose}
      title={selectedBankId ? "Edit Bank" : "Add Bank"}
      footer={
        <HStack justify="flex-end" gap={4} w="full">
          <Button variant="outline" type="button" onClick={handleClear}>
            Clear
          </Button>

          <Button variant="outline" type="button" onClick={handleClose}>
            Close
          </Button>

          <Button
            bg="blue.700"
            color="white"
            type="submit"
            form="bank-form"
            loading={isBankLoading}
          >
            {isBankLoading
              ? "Loading..."
              : isCreating
                ? "Adding..."
                : isUpdating
                  ? "Updating..."
                  : "Submit"}
          </Button>
        </HStack>
      }
    >
          <Stack gap={4}>
            <InputField
              control={control}
              label="Bank Name"
              name="bankName"
              placeholder="Enter Bank Name"
            />

            <InputField
              control={control}
              label="Bank Code"
              name="bankCode"
              placeholder="Enter Bank Code"
              disabled={isEdit}
            />

            <SelectField
              control={control}
              label="Select Institution Type"
              name="institutionType"
              placeholder="Select Institution Type"
              options={INSTITUTION_TYPE_OPTIONS}
            />

            <DropField
              name="logo"
              control={control}
              label="Logo"
              isMulti
              height="120px"
              width="100%"
              maxSize="1 *1024 *1024"
              maxFiles={1}
              filePath={logoFilePath}
            />

            <HStack gap="10" pt="2">
              <Controller
                name="partner"
                control={control}
                render={({ field }) => (
                  <HStack gap="2">
                    <Text fontSize="sm">Is Partner Bank?</Text>

                    <Switch.Root
                      checked={field.value}
                      onCheckedChange={(details) =>
                        field.onChange(details.checked)
                      }
                    >
                      <Switch.HiddenInput />
                      <Switch.Control />
                    </Switch.Root>
                  </HStack>
                )}
              />

              <Controller
                name="bank"
                control={control}
                render={({ field }) => (
                  <HStack gap="2">
                    <Text fontSize="sm">Is Bank?</Text>

                    <Switch.Root
                      checked={field.value}
                      onCheckedChange={(details) =>
                        field.onChange(details.checked)
                      }
                    >
                      <Switch.HiddenInput />
                      <Switch.Control />
                    </Switch.Root>
                  </HStack>
                )}
              />
            </HStack>
          </Stack>
      </CommonDrawer> 
      </Box>
    </>
  );
};

export default Bankdrawer;
