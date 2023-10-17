export interface Estimates {
  id: number,
  estimate_name: string | null,
  customer_name: string | null,
  customer_business_name: string | null,
  project_address: string | null,
  contractor_name: string | null,
  contractor_address: string | null,
  contractor_phone: string | null,
  massage: string | null,
  subtotal: number | null,
  tax: number | null,
  total: number | null,
  user_id: number | null
}