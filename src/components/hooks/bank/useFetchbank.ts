import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../services/api/api";
import { bankApi } from "../../../services/api/apiConfig";
import { showError, showSuccess } from "../../../utils/toaster/notification";

type BankFilterParams = {
  page: number;
  size: number;
  searchValue?: string;
};

const toggleBank = async (toggleBank:string): Promise<void> =>{
  await bankApi.post(
    API_ENDPOINTS.BANK_SETUP.TOGGLE,{
    data: {id:toggleBank}
    }
  )
}
export const useToggleBank=()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:(toggleid:string) => toggleBank (toggleid),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["banks"]})
      showSuccess("Bank toggle successfully")
    },
    onError:(error) =>{
      showError(
        error instanceof Error ? error.message: "failed to toggle", "Error"
      )
    }
})}

export const useFetchBank = ({
  page,
  size,
  searchValue = "",
}: BankFilterParams) => {
  return useQuery({
    queryKey: ["banks", page, size, searchValue],

    queryFn: async () => {
      const response = await bankApi.post(
        API_ENDPOINTS.BANK_SETUP.FILTER,
        {
          data: {
            page,
            size,
            searchValue,
          },
        }
      );

      return response.data;
    },

    placeholderData: (previousData) => previousData,
  });
};