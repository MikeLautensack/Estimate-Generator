export type Customers = {
  id?: number | null,
  name?: string | null,
  address?: string | null,
  email?: string | null,
  phone?: string | null,
  password?: string | null,
  contractor_user_id?: number | null,
  customer_user_id?: string | null
}

export type CustomerForm = {
  data: Customers | null,
}

export type createUserAccountAction = {
  id?: string,
  name: string,
  email: string,
  password?: string | null,
  role: string
}