import { Customers } from "@/types/customers";
import { customerFormProps } from "@/types/formTypes";
// import { SubmitHandler } from "react-hook-form";

const submitCustomer =
  (data: Customers) => async (formData: customerFormProps) => {
    try {
      if (data != null) {
        await fetch(
          `${process.env["NEXT_PUBLIC_CUSTOMERS_EDIT_URL"]}/${data.id}`,
          {
            method: "PUT",
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

        await fetch(
          `${process.env["NEXT_PUBLIC_USER_EDIT"]}/${data.customer_user_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
            }),
          },
        );
      } else {
        const customerUserObject = {
          name: formData.name,
          email: formData.email,
          role: "customer",
        };

        const createCustomerUserObject = await fetch(
          `${process.env["NEXT_PUBLIC_USER_CREATE"]}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customerUserObject),
          },
        );

        const data = await createCustomerUserObject.json();

        const customerObject = {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          customer_user_id: data.newUser[0].id,
        };

        await fetch(`${process.env["NEXT_PUBLIC_CUSTOMERS_CREATE_URL"]}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerObject),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export { submitCustomer };
