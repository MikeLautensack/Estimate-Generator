export type ChangeOrders = {
    id: number,
    changeOrderName: string | null,
    estimateName: string | null,
    description: string | null,
    customerName: string | null,
    projectAddress: string | null,
    status: string | null,
    estimate_id: number | null,
    dateCreated: Date | null,
    dateUpdated: Date | null,
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

export type ChangeOrderRequestsProps = {
    changeOrders: ChangeOrders[],
}

export type ChangeOrderRequestProps = {
    changeOrder: ChangeOrders
}

export type ChangeOrderRequestRowProps = {
    orderRequest: ChangeOrderRequest,
    setOrdersSelectedState: any,
    ordersSelectedState: any
    id: number
}
export type ChangeOrderRequest = {
    name: string,
    description: string,
    status: string
}