import { Customers } from "@/types/customers";
import { customerFormProps } from "@/types/formTypes";
import { Users } from "@/types/users";
// import { SubmitHandler } from "react-hook-form";

const submitCustomer =
  (data: Customers) => async (formData: customerFormProps) => {
    const USER_ID = data.contractor_user_id;
    const CUSTOMER_ID = data.id;
    try {
      if (data != null) {
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              address: formData.address,
              email: formData.email,
              phone: formData.phone,
            }),
          },
        );
      } else {
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              address: formData.address,
              phone: formData.phone,
              email: formData.email,
              customer_user_id: USER_ID,
            }),
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

export { submitCustomer };
