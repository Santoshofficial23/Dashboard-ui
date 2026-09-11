import type { MenuResponseType } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../../services/api/api";
import { authApi } from "../../../services/api/apiConfig";



const getMenuById = (id: string) => {
  return authApi.get(
   API_ENDPOINTS.MENU_SETUP.GET_BY_ID.replace("{id}", id)
  );
};

export const useFetchMenuById = (
  id: string,
  enabled = true
) => {
  return useQuery({
    queryKey: ["menu", id],

    queryFn: () => getMenuById(id),

    enabled: enabled && !!id,

    select: (r) => r.data?.data as MenuResponseType,
  });
};