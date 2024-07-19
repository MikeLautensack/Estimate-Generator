import { Customers } from "@/types/customers";
import { useEffect, useState } from "react";

const useGetCustomerUserId = (customers: Customers[], customerName: string) => {
  // State
  const [id, setId] = useState<string>("");

  // Effects
  useEffect(() => {
    for (let i = 0; i < customers.length; i++) {
      if (customerName === customers[i].name) {
        setId(customers[i].customer_user_id);
      }
    }
  }, [customerName, customers]);

  // Return
  return id;
};

export default useGetCustomerUserId;
