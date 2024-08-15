export type Customers = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  contractor_user_id: number;
  customer_user_id: string;
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
