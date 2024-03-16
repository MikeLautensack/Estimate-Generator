import { customerFormProps } from "@/types/formTypes";
import router from "next/navigation";
import { SubmitHandler } from "react-hook-form";

const onSubmit: SubmitHandler<customerFormProps> = async (formData, data) => {
  try {
      if(data != null) {
          const editCustomer = await fetch(`${process.env["NEXT_PUBLIC_CUSTOMERS_EDIT_URL"]}/${data.id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  name: formData.name,
                  address: formData.address,
                  email: formData.email,
                  phone: formData.phone,
              })
          });
          const editUser = await fetch(`${process.env["NEXT_PUBLIC_USER_EDIT"]}/${data.customer_user_id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  name: formData.name,
                  email: formData.email,
              })
          });
          router.refresh();
          router.push(`${process.env["NEXT_PUBLIC_CUSTOMERS_URL"]}`);
      } else {
  
          const customerUserObject = {
              name: formData.name,
              email: formData.email,
              role: "customer"
          }
  
          const createCustomerUserObject = await fetch(`${process.env["NEXT_PUBLIC_USER_CREATE"]}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(customerUserObject)
          });
          
          const data = await createCustomerUserObject.json();
          
          const customerObject = {
              name: formData.name,
              address: formData.address,
              phone: formData.phone,
              email: formData.email,
              customer_user_id: data.newUser[0].id,
          }
  
          const createCustomerObject = await fetch(`${process.env["NEXT_PUBLIC_CUSTOMERS_CREATE_URL"]}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObject)
          }); 
  
          router.refresh();
          router.push(`${process.env["NEXT_PUBLIC_CUSTOMERS_URL"]}`);
      }
  } catch (error) {
      console.log(error);
  }
}

export {
    onSubmit
}