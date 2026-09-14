import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankApi } from "../../../services/api/apiConfig";
import { API_ENDPOINTS } from "../../../services/api/api";
import { showError, showSuccess } from "../../../utils/toaster/notification";


export const useDeleteBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:  (id: string) => {
      const formData = new FormData();

      formData.append("id", String(id));

      const response =bankApi.post(
         API_ENDPOINTS.BANK_SETUP.DELETE,
        {
          data: {
            id,
          },
        }
      );
      return response;
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["banks"],
      });
      showSuccess(response? "Bank deleted successfully" : "Failed to delete bank");
    },

    onError: (error) => {
      showError(error, "Failed to delete bank");
    },
  });
};