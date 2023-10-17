export interface Customers {
  id: number | null,
  name: string | null,
  address: string | null,
  email: string | null,
  phone: string | null,
  user_id: number | null
}

export interface CustomerForm {
  data: Customers | null
}