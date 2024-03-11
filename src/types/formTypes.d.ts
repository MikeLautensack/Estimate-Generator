export type profileFormProps = {
    businessName: string,
    businessAddress: string,
    businessEmail: string,
    businessPhone: string
}

export type customerFormProps = {
    name: string,
    address: string,
    email: string,
    phone: string
}

export type ChangeOrderFormParams = {
    estimateName: string | string[],
    customerName?: string | string[],
    projectAddress: string | string[],
    mode: string,
    contractor_user_id: number,
    estimate_id?: number,
    customer_user_id: number,
    change_order_id?: number
}

export type ChangeOrderForm = {
    data: ChangeOrderFormParams,
}

export type ChangeOrderFormProps = {
    changeOrderName: string,
    description: string,
}