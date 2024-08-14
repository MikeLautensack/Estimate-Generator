import { Customers } from "./customers";
import { Profile } from "./profile";
import { ChangeOrder } from "./changeOrders";
import {
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import React from "react";
import {
  LineItemsValues,
  SaveAndSentStatus,
  SaveStatus,
} from "@/components/forms/estimate-form/EstimateForm";

export type Estimates = {
  id: number;
  estimateName: string;
  customerName: string;
  customerEmail: string;
  projectAddress: string;
  contractorName: string;
  contractorAddress: string;
  contractorPhone: string;
  expirationDate: Date;
  lineItems?: LineItems[];
  message: string;
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  customer_id: number;
  customer_user_id: string;
  contractor_user_id: string;
};

export type LineItems = {
  id?: number;
  item: string;
  description: string;
  quantity: number;
  rateType: string;
  price: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  estimate_id?: number;
};

export type EstimateFormValues = {
  estimateName: string;
  customer_id?: number;
  customerName: string;
  customerEmail: string;
  projectAddress: string;
  contractorName: string;
  contractorAddress: string;
  contractorPhone: string;
  lineItems: LineItems[];
  taxRate: number;
  message: string;
  subtotal: number;
  tax: number;
  total: number;
};

export type EstimateFormPartOneProps = {
  customers: Customers[];
  saveStatus?: SaveStatus;
  saveAndSaveStatus?: SaveAndSentStatus;
};

export type EstimateFormTableProps = {
  fields: LineItemsValues[];
  remove: (index?: number | number[]) => void;
  saveStatus?: SaveStatus;
  saveAndSaveStatus?: SaveAndSentStatus;
};

export type LineItemFormFieldProps = {
  field: LineItemsValues;
  fields: LineItemsValues[];
  index: number;
  remove: (index?: number | number[]) => void;
  saveStatus?: SaveStatus;
  saveAndSaveStatus?: SaveAndSentStatus;
};

export type TaxSelectorProps = {
  taxRate: number;
  setTaxRate: React.Dispatch<React.SetStateAction<number>>;
};

export type EstimateFormPartOneSelectProps = {
  customers: Customers[];
  field: ControllerRenderProps<FieldValues, "customer_id">;
};
