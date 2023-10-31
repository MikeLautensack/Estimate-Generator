export type Customers = {
  id: number | null,
  name: string | null,
  address: string | null,
  email: string | null,
  phone: string | null,
  user_id: number | null
}

export type CustomerForm = {
  data: Customers | null
}