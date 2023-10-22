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

export interface EstimateFormsProps {
  customers: Customers[]
}

export interface EstimateFormOneProps {
  customers: Customers[]
}

export interface EstimateFormOneValues {
  customers: any,
  name: string,
  email: string,
  phone: string,
  address: string
}

export interface EstimateFormTwoValues {
  estimateName: string,
  lineItems: {
    item: string,
    description: string,
    quantity: number,
    rateType: number,
    price: number,
    amount: number
  }[],
  message: string
}

export interface EstimateFormTableProps {
  fields: any
  register: any
}

export interface LineItemFormFieldProps {
  field: any,
  index: any,
  register: any
}