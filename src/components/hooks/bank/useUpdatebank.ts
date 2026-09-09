import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bankApi } from "../../../services/api/apiConfig";
import type { Bank } from "@/types/type";
import { API_ENDPOINTS } from "../../../services/api/api";
import { showError, showSuccess } from "../../../utils/toaster/notification";

type UpdateBankPayload = {
	id: string;
	data: Bank;
};

export const useUpdateBank = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, data }: UpdateBankPayload) => {
			const formData = new FormData();

	formData.append("id", String(id));
	formData.append("bankCode", data.bankCode);

	formData.append("bankName", data.bankName);

	formData.append("institutionType", data.institutionType);

	formData.append("partner", String(data.partner));

	formData.append("bank", String(data.bank));

			if (Array.isArray(data.logo)) {
				data.logo.forEach((file) => {
					if (file instanceof File) {
						formData.append("logo", file);
					}
				});
			}

			const response = await bankApi.post(
				API_ENDPOINTS.BANK_SETUP.POST,
				formData,
			);

			return response.data;
		},

		onSuccess: (response, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["banks"],
			});

			queryClient.invalidateQueries({
				queryKey: ["bank", variables.id],
			});
			showSuccess(response?.message ?? "Bank updated successfully");
		},
		onError: (error) => {
			showError(error, "Failed to update bank");
		},
	});
};
