export type Customers = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  contractor_user_id: number;
  customer_user_id: string;
};

export type CustomerForm = {
  data: Customers;
};

export type createUserAccountAction = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
};
