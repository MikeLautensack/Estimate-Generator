import { ColumnDef } from "@tanstack/react-table"
import { Customers } from "./customers"

export interface Estimates {
  id: number,
  estimate_name: string | null,
  customer_name: string | null,
  customer_business_name: string | null,
  project_address: string | null,
  contractor_name: string | null,
  contractor_address: string | null,
  contractor_phone: string | null,
  lineItems?: LineItems[],
  massage: string | null,
  subtotal: number | null,
  tax: number | null,
  total: number | null,
  user_id: number | null
}

export interface LineItems {
  id: number,
  description: string | null,
  quantity: number | null,
  rateType?: string | null
  unitType?: string | null
  unitRate?: number | null
  total: number | null | string
  estimate_id?: number | null

}

export interface EstimateFormProps {
  customers: Customers[]
}

export interface EstimateFormValues {
  customers: Customers[],
  customer?: any,
  name?: string,
  email?: string,
  address?: string,
  estimateName: string,
  lineItems: {
    item: string,
    description: string,
    quantity: number | null,
    rateType: string,
    price: number | null,
    amount: number
  }[],
  taxRate: number,
  message: string,
  subtotal: number,
  tax: number,
  total: number
}

export interface EstimateFormPartOneProps {
  customers: Customers[]
}

export interface EstimateFormPartOneValues {
  customer?: any,
  name?: string,
  email?: string,
  address?: string
}

export interface EstimateFormPartTwoValues {
  estimateName: string,
  lineItems: {
    item: string,
    description: string,
    quantity: number | null,
    rateType: string,
    price: number | null,
    amount: number
  }[],
  taxRate: number,
  message: string,
  subtotal: number,
  tax: number,
  total: number
}

export interface EstimateFormTableProps {
  fields: any
  applyTotal: any,
  remove: any
}

export interface LineItemFormFieldProps {
  field: any,
  fields: any,
  index: any,
  applyTotal: any,
  remove: any
}

export interface TaxSelectorProps {
  taxRate: any,
  setTaxRate: any
}

export interface EstimateFormPartOneSelectProps {
  customers: any,
  field: any
}