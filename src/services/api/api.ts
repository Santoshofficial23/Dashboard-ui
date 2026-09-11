export const API_ENDPOINTS={
    AUTH:{
        LOGIN:"internal/login"
    },
   BANK_SETUP:{
       FILTER: "/master/bank/filter",
        POST: "/master/bank",
        TOGGLE: "/master/bank/toggle",
        GET_BY_ID: "/master/bank/{id}",
        DELETE: "/master/bank/delete",
   },
   MENU_SETUP:{
        POST:"/master/menu",
        FILTER: "/master/menu/filter",
        ADD_EDIT: "/master/menu",
        GET_BY_ID: "/master/menu/{id}",
        TOGGLE: "/master/menu/toggle",
        DROPDOWN: "/dropdown/menu",
   }
}