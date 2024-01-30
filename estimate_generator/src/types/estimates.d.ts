import { Customers } from "./customers"

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
  id: number,
  item: string,
  description: string,
  quantity: number,
  rateType: string,
  price: any,
  amount: any
  dateCreated?: Date,
  dateUpdated?: Date,
  estimate_id?: number
}

export type EstimateFormProps = {
  estimate: any
  customers: any,
  profile: any
  changeOrders?: any
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
  profile: any,
  fields: any,
  prepend: any,
  remove: any
  changeOrders: any
  estimate: any,
  methods: any,
  preview: any,
  save: any,
  saveAndSend: any
}

export type EstimateFormTableProps = {
  fields: any
  applyTotal: any,
  remove: any
}

export type LineItemFormFieldProps = {
  field: any,
  fields: any,
  index: any,
  applyTotal: any,
  remove: any
}

export type TaxSelectorProps = {
  taxRate: any,
  setTaxRate: any
}

export type EstimateFormPartOneSelectProps = {
  customers: any,
  field: any
}