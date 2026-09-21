import *  as yup  from "yup"


export const ExpenseSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("title is required"),

  amount: yup
    .number()
    .typeError("Amount is required")
    .required("Amount is required"),

  type: yup
    .string()
    .required("transaction type is required"),

  category: yup
    .string()
    .required("category is required"),

  date: yup
    .string()
    .required("Date is required"),

  descriptions: yup
    .string()
    .required("description is required"),
});