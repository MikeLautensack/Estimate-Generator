export type Customers = {
  id: number | null,
  name: string | null,
  address: string | null,
  email: string | null,
  phone: string | null,
  password: string | null,
  contractor_user_id: number | null,
  customer_user_id: number | null
}

export type CustomerForm = {
  data: Customers | null
}

export type createUserAccountAction = {
  name: string,
  email: string,
  password: string,
  role: string
}