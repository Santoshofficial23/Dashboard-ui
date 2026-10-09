import * as yup from "yup";

export const bankSchema = yup.object({
  bankName: yup.string().trim().required("Bank name is required"),

  bankCode: yup.string().trim().required("Bank code is required"),

  institutionType: yup.string().required("Institution type is required"),

  logo: yup.array().of(yup.mixed<File>().required()).default([]),

  partner: yup.boolean().required(),

  bank: yup.boolean().required(),
});
