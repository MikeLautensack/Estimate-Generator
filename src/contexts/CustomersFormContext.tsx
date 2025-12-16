"use client";

import { CustomerFormValues } from "@/components/forms/customer-form/CustomerForm";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type Mode = "create" | "update" | "delete";

type CustomersFormContextValue = {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  data: CustomerFormValues;
  setData: Dispatch<SetStateAction<CustomerFormValues>>;
};

const CustomersFormContext = createContext<
  CustomersFormContextValue | undefined
>(undefined);

type CustomersFormProviderProps = {
  children: ReactNode;
};

export const CustomersFormProvider = ({
  children,
}: CustomersFormProviderProps) => {
  const [mode, setMode] = useState<Mode>("create");
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<CustomerFormValues>({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  });

  const value: CustomersFormContextValue = {
    mode,
    setMode,
    open,
    setOpen,
    id,
    setId,
    data,
    setData,
  };

  return (
    <CustomersFormContext.Provider value={value}>
      {children}
    </CustomersFormContext.Provider>
  );
};

export const useCustomersFormContext = (): CustomersFormContextValue => {
  const context = useContext(CustomersFormContext);
  if (!context) {
    throw new Error(
      "useCustomersFormContext must be used within a <CustomerssFormProvider>",
    );
  }
  return context;
};
