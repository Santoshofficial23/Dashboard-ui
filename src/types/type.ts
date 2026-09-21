
export type LoginFormData = {
  username: string;
  password: string;
};

export type ExpenseFormData = {
  title: string;
  amount: number;
  type: string;
  category: string;
  date: string;
  descriptions: string;
};

export type Expense = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: string;
  description: string;
};

export const MODULE_TYPE = {
  CRM: "CRM",
  CMS: "CMS",
} as const;

export const MODULE_TYPE_EXPENSE ={
  INCOME: "INCOME",
  EXPENSE:"EXPENSE"
} as const;

export type MODULE_TYPE =
  (typeof MODULE_TYPE)[keyof typeof MODULE_TYPE];

export type LoginResponse = {
  token?: string;
  accessToken?: string;
  access_token?: string;
  data?: {
    token?: string;
    accessToken?: string;
    access_token?: string;
  };
  user?: {
    id: number;
    username: string;
    Email: string;
  };
};

export type Bank = {
  id?: string;
  bankCode: string;
  bankName: string;
  partner: boolean;
  institutionType: string;
  bank: boolean;
  active:boolean;
  logo?:
    | File[]
    | string
    | {
        id?: string | number;
        filepath?: string;
        filePath?: string;
        path?: string;
      }
    | Array<{
        id?: string | number;
        filepath?: string;
        filePath?: string;
        path?: string;
      }>;
  status: boolean;
};

export type BankFilterRequest = {
  data: {
    page?: number;
    size?: number;
    searchValue?: string;
  };
};

export type BankFilterResponse = {
  data: Bank[];
  totalCount: number;
};

export type MenuSubItem = {
  id?: string;
  displayOrder: number ;
  menuName: string;
  menuCode: string;
  moduleType: MODULE_TYPE;
  privilege: string[];
  status: boolean;
};

export type MenuResponseType =  {
  id?: string;
  menuName: string;
  menuCode: string;
  moduleType: MODULE_TYPE;
  menuUrl?: string;
  icon?: string;
  privilege: string[];
  displayOrder: number;
  active:boolean;
  parentMenu?: string;
  status: boolean;
  subMenus?: MenuSubItem[];
};

export type MenuFilterRequest = {
  data: {
    page?: number;
    size?: number;
    searchValue?: string;
  };
};

export type MenuFilterResponse = {
  data: MenuResponseType[];
  totalCount: number;
};

export interface MenuSetupPayload {
  id?: string;
  menuName: string;
  active:boolean;
  menuCode: string;
  moduleType: MODULE_TYPE;
  privilege: string[];
  displayOrder: number ;
  status: boolean;
  subMenus?: MenuSubItem[];
}

