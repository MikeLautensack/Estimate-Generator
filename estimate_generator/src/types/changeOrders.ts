export type ChangeOrders = {
    id: number,
    estimateName: string | null,
    description: string | null,
    customerName: string | null,
    dateModified: string | undefined,
    projectAddress: string | null,
    status: string | null,
    estimate_id: number | null,
    dateCreated: Date,
    dateUpdated: Date,
    contractor_user_id: number | null,
    customer_user_id: number | null,
}

export type ChangeOrderFormParams = {
    estimateName: string | string[] | undefined | null,
    customerName?: string | string[] | undefined | null,
    projectAddress: string | string[] | undefined | null,
    mode: string | null,
    contractor_user_id: number | null | undefined,
    estimate_id?: number | null | undefined,
    customer_user_id: number | null | undefined,
    change_order_id?: number | null | undefined
}

export type ChangeOrderForm = {
    data: ChangeOrderFormParams | null,
}

export type ChangeOrderFormProps = {
    changeOrderName: string | null,
    description: string | null,
}