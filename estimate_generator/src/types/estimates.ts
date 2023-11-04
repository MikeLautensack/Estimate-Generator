import { Customers } from "./customers"

export type Estimates = {
  id: number,
  estimateName: string | null,
  customerName: string | null,
  customerEmail: string | null,
  projectAddress: string | null,
  contractorName: string | null,
  contractorAddress: string | null,
  contractorPhone: string | null,
  lineItems?: LineItems[],
  massage: string | null,
  subtotal: number | null,
  taxRate: number | null,
  tax: number | null,
  total: number | null,
  customer_id: number | null
  user_id: number | null
}

export type LineItems = {
  id: number,
  item: string | null,
  description: string | null,
  quantity: number | null,
  rateType: string | null,
  price: any,
  amount: any
  estimate_id?: number | null

}

export type EstimateFormProps = {
  estimate: any
  customers: any,
  profile: any
}

export type EstimateFormValues = {
  estimateName: string | null,
  customer_id?: number | null
  customerName: string | null,
  customerEmail: string | null,
  projectAddress: string | null,
  contractorName: string | null,
  contractorAddress: string | null,
  contractorPhone: string | null,
  lineItems: {
    item: string | null,
    description: string | null,
    quantity: number | null,
    rateType: string | null,
    price: number | null,
    amount: number | null
  }[],
  taxRate: number | null,
  message: string | null,
  subtotal: number | null,
  tax: number | null,
  total: number | null
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