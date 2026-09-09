import { useQuery } from "@tanstack/react-query";
import { bankApi } from "../../../services/api/apiConfig";
import type { Bank } from "@/types/type";
import { API_ENDPOINTS } from "../../../services/api/api";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const normalizeBankResponse = (payload: unknown): Bank => {
  if (isRecord(payload) && isRecord(payload.data)) {
    return normalizeBankResponse(payload.data);
  }

  return payload as Bank;
};

export const useFetchBankById = (
  id: string | null,
  enabled = true
) => {
  return useQuery({
    queryKey: ["bank", id],

    queryFn: async () => {
      const response = await bankApi.get<unknown>(
        API_ENDPOINTS.BANK_SETUP.GET_BY_ID.replace(
          "{id}",
          String(id)
        )
      );

      return normalizeBankResponse(response.data);
    },

    enabled: enabled && id !== null,
  });
};