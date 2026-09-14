// import { showSuccess } from "@/utils/toaster/notification";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useDeleteMenu = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id:string)=>{
//         const formData= new FormData();
//         formData.append("id",String(id));

//         const response=menuApi.post(
//             API_ENDPOINTS.MENU_SETUP.DELETE,
//             {
//                 data:{
//                     id,
//                 },
//             }
//         );
//         return response;
//     },
//   onSuccess: (response) => {
//       queryClient.invalidateQueries({
//         queryKey: ["menus"],
//       });
//       showSuccess(response? "Menu deleted successfully" : "Failed to delete menu");
//     }



//   }
// )} 