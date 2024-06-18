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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
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
  ordersSelectedID: number | null;
  setOrdersSelectedID: React.Dispatch<React.SetStateAction<number | null>>;
};

export type ChangeOrderRequest = {
  id: number;
  name: string;
  description: string;
  status: string;
};
