export type profileFormProps = {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
};

export type customerFormProps = {
  name: string;
  address: string;
  email: string;
  phone: string;
};

export type ChangeOrderFormParams = {
  estimateName: string | string[];
  customerName: string | string[];
  projectAddress: string | string[];
  mode: string;
  contractor_user_id: string;
  estimate_id?: number;
  customer_user_id: string;
  change_order_id: number;
};

export type ChangeOrderForm = {
  data: ChangeOrderFormParams;
};

export type ChangeOrderFormProps = {
  changeOrderName: string;
  description: string;
};

export type HookFormSetValue = (
  name: string,
  value: unknown,
  config?: object,
) => void;

export type HookFormGetValues = (payload?: string | string[]) => string;
