import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../../../services/api/apiConfig";
import type { MenuResponseType} from "@/types/type";
import { API_ENDPOINTS } from "../../../services/api/api";
import { showError, showSuccess } from "../../../utils/toaster/notification";
import type { FilterPayloadType } from "@/types";

export type MenuFilterResponse = {
  data: MenuResponseType[];
  totalCount: number;
};

type MenuFilterParams = {
  page: number;
  size: number;
  searchValue?: string;
};

type MenuCreatePayload = Omit< MenuResponseType , "id">;
type MenuUpdatePayload = MenuResponseType;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const normalizeMenuResponse = (payload: unknown): MenuFilterResponse => {
  if (Array.isArray(payload)) {
    return { data: payload as MenuResponseType[], totalCount: payload.length };
  }

  if (!isRecord(payload)) {
    return { data: [], totalCount: 0 };
  }

  const rows = payload.data ?? payload.content ?? payload.items ?? payload.records;

  if (Array.isArray(rows)) {
    return {
      data: rows as MenuResponseType[],
      totalCount:
        typeof payload.totalCount === "number"
          ? payload.totalCount
          : typeof payload.totalElements === "number"
            ? payload.totalElements
            : rows.length,
    };
  }

  if (isRecord(rows)) {
    return normalizeMenuResponse(rows);
  }

  return { data: [], totalCount: 0 };
};

const fetchMenus = async ({
  page,
  size,
  searchValue = "",
}: MenuFilterParams): Promise<MenuFilterResponse> => {
  const response = await authApi.post<unknown>(
    API_ENDPOINTS.MENU_SETUP.FILTER,
    {
      data: {
        page,
        size,
        searchValue,
      },
    }
  );

  const menuResponse = normalizeMenuResponse(response.data);

  if (menuResponse.data.length > size) {
    const start = (page - 1) * size;

    return {
      ...menuResponse,
      data: menuResponse.data.slice(start, start + size),
    };
  }

  return menuResponse;
};

const createMenu = async (menuData: MenuCreatePayload): Promise<MenuResponseType> => {
  const response = await authApi.post<MenuResponseType>(
    API_ENDPOINTS.MENU_SETUP.POST,
    {
      data: 
        menuData
    }
  );

  return response.data;
};


const updateMenu = async (menuData: MenuUpdatePayload): Promise<MenuResponseType> => {
  const response = await authApi.post<MenuResponseType>(
    API_ENDPOINTS.MENU_SETUP.ADD_EDIT,
    {data:
    menuData }
  );

  return response.data;
};

const deleteMenu = async (menuId: string): Promise<void> => {
  await authApi.delete(
    `${API_ENDPOINTS.MENU_SETUP}/${menuId}`
  );
};

const toggleMenu = async (toggleId: string): Promise<void> => {
  await authApi.post(
    API_ENDPOINTS.MENU_SETUP.TOGGLE, {
      data: {id: toggleId}
    }
  );
};


export const useFetchMenu = ({
  page,
  size,
  searchValue = "",
}: FilterPayloadType) => {
  return useQuery({
    queryKey: [
      "menus",
      page,
      size,
      searchValue,
    ],
    queryFn: () =>
      fetchMenus({
        page,
        size,
        searchValue,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuData: MenuCreatePayload) => createMenu(menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      showSuccess("Menu created successfully");
    },
    onError: (error) => {
      showError(
        error instanceof Error ? error.message : "Failed to create menu",
        "Error"
      );
    },
  });
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuData: MenuUpdatePayload) => updateMenu(menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      showSuccess("Menu updated successfully");
    },
    onError: (error) => {
      showError(
        error instanceof Error ? error.message : "Failed to update menu",
        "Error"
      );
    },
  });
};

export const useToggleMenu=() =>{
const queryClient = useQueryClient();
return useMutation({
  mutationFn: (toggleid:string) => toggleMenu(toggleid),
  onSuccess:()=> {
    queryClient.invalidateQueries({queryKey:["menus"]});
    showSuccess("toggle successfully");
  },
  onError:(error) =>{
    showError(
      error instanceof Error ? error.message: "failed to toggle",
      "Error"
    )
  }
})
}


export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuId: string) => deleteMenu(menuId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      showSuccess("Menu deleted successfully");
    },
    onError: (error) => {
      showError(
        error instanceof Error ? error.message : "Failed to delete menu",
        "Error"
      );
    },
  });
};

