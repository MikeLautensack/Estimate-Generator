import { Estimates } from "@/types/estimates";
import { ChangeOrderForm, ChangeOrderFormProps } from "@/types/formTypes";
// import { SubmitHandler } from "react-hook-form";
import { redirect } from "next/navigation";

const submitChangeOrder =
  (data: ChangeOrderForm) => async (formData: ChangeOrderFormProps) => {
    const USER_ID = data.data.contractor_user_id;
    const CUSTOMER_ID = data.data.customer_user_id;
    const ESTIMATE_ID = data.data.estimate_id;
    const CHANGE_ORDER_ID = data.data.change_order_id;
    try {
      if (data.data?.mode == "put") {
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/change-orders/${CHANGE_ORDER_ID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              changeOrderName: formData.changeOrderName,
              description: formData.description,
            }),
          },
        );
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Change Order Requested (edited)",
            }),
          },
        );
      } else if (data.data?.mode == "post") {
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/change-orders/${CHANGE_ORDER_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              changeOrderName: formData.changeOrderName,
              description: formData.description,
              estimateName: data.data?.estimateName,
              customerName: data.data?.customerName,
              projectAddress: data.data?.projectAddress,
              contractor_user_id: data.data?.contractor_user_id,
              customer_user_id: data.data.customer_user_id,
              estimate_id: data.data.estimate_id,
            }),
          },
        );
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Change Order Requested",
            }),
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

const previewEstimate = (data: Estimates) => () => {
  // testing the function
  console.log("preview");

  // Check if form is in create mode or edit mode
  if (data) {
    // create query string
    // const queryString = new URLSearchParams(data).toString()
    // console.log('q string', queryString)
    // redirect to /contractor-dashboard/estimates/xxxxxxx
    redirect(`${process.env.NEXT_PUBLIC_HOST}/contractor-dashboard/estimates`);
  } else {
    // redirect to /contractor-dashboard/estimates/xxxxxxx
    redirect(`${process.env.NEXT_PUBLIC_HOST}/contractor-dashboard/estimates`);
  }
};

// const saveEstimate = () => async () => {};

// const saveAndSendEstim: (data: Estimates) => SubmitHandler<EstimateFormValues> = (data: Estimates) =>  async (formData: EstimateFormValues) => {
//   console.log(data)
//     const customer_user_id = getCustomerUserID(customers, data.customer_id as number)
//     if(estimate) {

//       const res = await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_EDIT_URL"]}/${estimate.id}`, {
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           ...data,
//           status: 'Work In Progress (edited)'
//         })
//       })

//     } else {

//       const res = await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_CREATE_URL"]}`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           ...data,
//           customer_user_id,
//           status: 'Work In Progress'
//         })
//       })

//     }
// }

export { submitChangeOrder, previewEstimate };
