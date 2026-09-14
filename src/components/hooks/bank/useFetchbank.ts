import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../services/api/api";
import { bankApi } from "../../../services/api/apiConfig";
import { showError, showSuccess } from "../../../utils/toaster/notification";
import type { Bank, BankFilterResponse } from "../../../types/type";

type BankFilterParams = {
  page: number;
  size: number;
  searchValue?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const normalizeBankResponse = (payload: unknown): BankFilterResponse => {
  if (Array.isArray(payload)) {
    return { data: payload as Bank[], totalCount: payload.length };
  }

  if (!isRecord(payload)) {
    return { data: [], totalCount: 0 };
  }

  const rows = payload.data ?? payload.content ?? payload.items ?? payload.records;

  if (Array.isArray(rows)) {
    return {
      data: rows as Bank[],
      totalCount:
        typeof payload.totalCount === "number"
          ? payload.totalCount
          : typeof payload.totalElements === "number"
            ? payload.totalElements
            : rows.length,
    };
  }

  if (isRecord(rows)) {
    return normalizeBankResponse(rows);
  }

  return { data: [], totalCount: 0 };
};

const fetchBanks = async ({
  page,
  size,
  searchValue = "",
}: BankFilterParams): Promise<BankFilterResponse> => {
  const response = await bankApi.post<unknown>(
    API_ENDPOINTS.BANK_SETUP.FILTER,
    {
      data: {
        page,
        size,
        searchValue,
      },
    }
  );

  const bankResponse = normalizeBankResponse(response.data);

  if (bankResponse.data.length > size) {
    const start = (page - 1) * size;
    return {
      ...bankResponse,
      data: bankResponse.data.slice(start, start + size),
    };
  }

  return bankResponse;
};

const toggleBank = (toggleBank:string): Promise<void> =>{
  return bankApi.post(
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
    queryFn: () => fetchBanks({ page, size, searchValue }),
    placeholderData: (previousData) => previousData,
  });
};