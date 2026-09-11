import { useQuery } from "@tanstack/react-query";
import { bankApi } from "../../../services/api/apiConfig";
import type { Bank } from "@/types/type";
import { API_ENDPOINTS } from "../../../services/api/api";


const getBankById = (id: string) => {
  return bankApi.get(
    API_ENDPOINTS.BANK_SETUP.GET_BY_ID.replace("{id}", id)
  );
};

export const useFetchBankById = (
  id: string,
  enabled = true
) => {
  return useQuery({
    queryKey: ["bank", id],

    queryFn: () => getBankById(id),

    enabled: enabled && !!id,

    select: (r) => r.data?.data as Bank,
  });
};