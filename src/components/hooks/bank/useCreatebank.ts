import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankApi } from "../../../services/api/apiConfig";
import { API_ENDPOINTS } from "../../../services/api/api";
import { showSuccess} from "../../../utils/toaster/notification";

export type BankFormData = {
  bankCode: string;
  bankName: string;
  institutionType: string;
  partner: boolean;
  bank: boolean;
  logo: File[];
};

export type CreateBankData = BankFormData;

type UpdateBankPayload = BankFormData & {
  id: string;
};

const createBank = (data: BankFormData) => {
  const formData = new FormData();

  formData.append("bankCode", data.bankCode);
  formData.append("bankName", data.bankName);
  formData.append("institutionType", data.institutionType);
  formData.append("partner", String(data.partner));
  formData.append("bank", String(data.bank));

  data.logo.forEach((file) => {
    if (file instanceof File) {
      formData.append("logo", file);
    }
  });

  const response = bankApi.post(
    API_ENDPOINTS.BANK_SETUP.POST,
    formData
  );

  return response;
};

const updateBank = (data: UpdateBankPayload) => {
  const formData = new FormData();

  formData.append("id", data.id);

  formData.append("bankCode", data.bankCode);
  formData.append("bankName", data.bankName);
  formData.append("institutionType", data.institutionType);
  formData.append("partner", String(data.partner));
  formData.append("bank", String(data.bank));

  data.logo.forEach((file) => {
    if (file instanceof File) {
      formData.append("logo", file);
    }
  });

  const response = bankApi.post(
    API_ENDPOINTS.BANK_SETUP.POST,
    formData
  );

  return response;
};

export const useCreateBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBank,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["banks"],
      });
      showSuccess(response? "Bank added successfully" : "Failed to add bank");
    },
  });
};
 

export const useUpdateBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBank,

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["banks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["bank", variables.id],
      });
      showSuccess(response? "Bank updated successfully" : "Failed to update bank");
    },
  });
};