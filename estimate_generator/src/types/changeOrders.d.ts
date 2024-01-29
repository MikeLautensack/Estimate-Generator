export type ChangeOrders = {
    id: number,
    changeOrderName: string,
    estimateName: string,
    description: string,
    customerName: string,
    projectAddress: string,
    status: string,
    estimate_id: number,
    dateCreated: Date,
    dateUpdated: Date,
    contractor_user_id: number,
    customer_user_id: number,
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