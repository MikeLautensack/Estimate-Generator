import { Customers } from "./customers";

export type Estimates = {
  id: number,
  estimateName: string,
  customerName: string,
  customerEmail: string,
  projectAddress: string,
  contractorName: string,
  contractorAddress: string,
  contractorPhone: string ,
  lineItems?: LineItems[],
  message: string,
  subtotal: number,
  taxRate: number,
  tax: number,
  total: number,
  status: string,
  dateCreated?: Date,
  dateUpdated?: Date,
  customer_id: number,
  customer_user_id: number,
  contractor_user_id: number,
}

export type LineItems = {
  id?: number,
  item: string,
  description: string,
  quantity: number,
  rateType: string,
  price: number,
  amount: number
  dateCreated?: Date,
  dateUpdated?: Date,
  estimate_id?: number,
}

export type EstimateFormProps = {
  estimate: Estimate,
  customers: Customer,
  profile: Profile,
  changeOrders?: ChangeOrder[],
}

export type EstimateFormValues = {
  estimateName: string,
  customer_id?: number
  customerName: string,
  customerEmail: string,
  projectAddress: string,
  contractorName: string,
  contractorAddress: string,
  contractorPhone: string,
  lineItems: LineItems[],
  taxRate: number,
  message: string,
  subtotal: number,
  tax: number,
  total: number
}

export type EstimateFormPartOneProps = {
  customers: Customers[]
}

export type EstimateFormPartTwoProps = {
  customers: Customers[],
  profile: Profile,
  fields: LineItems[],
  prepend: (obj: LineItems | LineItems[]) => void,
  remove: (index?: number | number[]) => void,
  changeOrders: ChangeOrder[]
  estimate: Estimate,
  methods: any,
  preview: (estimates: Estimates) => SubmitHandler<EstimateFormValues>,
  save: SubmitHandler<EstimateFormValues>,
  saveAndSend: SubmitHandler<EstimateFormValues>
}

export type EstimateFormTableProps = {
  fields: LineItems[]
  applyTotal: (setSubtotal: Dispatch<SetStateAction<number | null>>, setValue: (name: string, value: unknown, config?: Object) => void, getValues: (payload?: string | string[]) => string, fields: LineItems[]) => void,
  remove: (index?: number | number[]) => void,
  setSubtotal: Dispatch<SetStateAction<number | null>>
}

export type LineItemFormFieldProps = {
  field: LineItems,
  fields: LineItems[],
  index: number,
  applyTotal: (setSubtotal: Dispatch<SetStateAction<number | null>>, setValue: (name: string, value: unknown, config?: Object) => void, getValues: (payload?: string | string[]) => string, fields: LineItems[]) => void,
  remove: (index?: number | number[]) => void,
  setSubtotal: Dispatch<SetStateAction<number | null>>
}

export type TaxSelectorProps = {
  taxRate: number,
  setTaxRate: Dispatch<SetStateAction<number | null>>
}

export type EstimateFormPartOneSelectProps = {
  customers: Customers[],
  field: ControllerRenderProps<FieldValues, "customer_id">
}