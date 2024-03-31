import { ColumnDef, Table } from "@tanstack/react-table";
import { Dispatch } from "react";
import { ChangeOrder } from "./changeOrders";
import React from "react";
import { Estimates } from "./estimates";

export type FeatureCardProps = {
  icon: string;
  heading: string;
  paragraph: string;
};

export type SubscriptionCardProps = {
  heading: string;
  paragraph: string;
  annualPrice: string;
  monthlyPrice: string;
  annualSubHeading: string;
  monthlySubHeading: string;
  featuresArray: string[];
  state: boolean;
};

export type FAQProps = {
  _id: string;
  question: string;
  answer: string;
  opened: boolean;
  dispatch: Dispatch<Action>;
};
export type FAQItem = {
  _id: string;
  question: string;
  answer: string;
  opened: boolean;
};
export type Action = {
  type: string;
  payload: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SideMenuSearchFormProps = {
  search: string;
};

export type SmallStatCardProps = {
  heading: string;
  data: string;
};

export type TableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export type ChangeOrderRequestsTableProps = {
  data: ChangeOrder[];
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  id: number;
};

export type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

export type lineItem = {
  id: number;
  item: string;
  description: string;
  quantity: number;
  rateType: string;
  price: number;
  dateCreated: Date;
  dateUpdated: Date;
  amount: number;
  estimateId: number;
};

export type estimatesChartArrayProps = {
  chartArray: Estimates[];
};

export type chartArrayObj = {
  name: string;
  value: number;
};

export type chartArray = {
  chartArray: chartArrayObj[];
};

export type EstimatePriceChartProps = {
  chartArray: { name: string; meanTotal: number }[];
};
