import React from "react";

export type ChangeOrder = {
  id: number;
  changeOrderName: string;
  estimateName: string;
  description: string;
  customerName: string;
  projectAddress: string;
  status: string;
  estimate_id: number;
  dateCreated: Date;
  dateUpdated: Date;
  contractor_user_id: number;
  customer_user_id: number;
};

export type ChangeOrderRequestsProps = {
  changeOrders: ChangeOrder[];
};

export type ChangeOrderRequestProps = {
  changeOrder: ChangeOrder;
};

export type ChangeOrderRequestRowProps = {
  orderRequest: ChangeOrderRequest;
  setOrdersSelectedState: React.Dispatch.SetStateAction<{
    [key: number]: boolean;
  }>;
  ordersSelectedState: { [key: number]: boolean };
  id: number;
};
export type ChangeOrderRequest = {
  name: string;
  description: string;
  status: string;
};
