import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankApi } from "../../../services/api/apiConfig";
import { API_ENDPOINTS } from "../../../services/api/api";
import { showError, showSuccess } from "../../../utils/toaster/notification";


export const useDeleteBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const formData = new FormData();

      formData.append("id", String(id));

      const response = await bankApi.post(
        API_ENDPOINTS.BANK_SETUP.DELETE,
        {
          data: {
            id,
          },
        }
      );
console.log(response)
      return response.data;
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["banks"],
      });
      showSuccess(response?.message ?? "Bank deleted successfully");
    },

    onError: (error) => {
      showError(error, "Failed to delete bank");
    },
  });
};