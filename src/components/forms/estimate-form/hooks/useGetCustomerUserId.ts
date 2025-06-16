import { CustomersSelect } from "@/db/schemas/customers";
import { useEffect, useState } from "react";

const useGetCustomerUserId = (
  customers: CustomersSelect[],
  customerFirstName: string,
  customerLastName: string,
) => {
  // State
  const [id, setId] = useState<string>("");

  // Effects
  useEffect(() => {
    for (let i = 0; i < customers.length; i++) {
      if (
        customerFirstName === customers[i].firstName &&
        customerLastName === customers[i].lastName
      ) {
        setId(customers[i].customer_user_id);
      }
    }
  }, [customerFirstName, customerLastName, customers]);

  // Return
  return id;
};

export default useGetCustomerUserId;
