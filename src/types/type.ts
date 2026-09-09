
export type LoginFormData = {
  username: string;
  password: string;
};

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
  };
};
export type Bank = {
  id?: string;
  bankCode: string;
  bankName: string;
  partner: boolean;
  institutionType: string;
  bank: boolean;
  logo?: File[] | string | {
    id?: string | number;
    filepath?: string;
    filePath?: string;
    path?: string;
  } | Array<{
    id?: string | number;
    filepath?: string;
    filePath?: string;
    path?: string;
  }>;
  status: boolean
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

