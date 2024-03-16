import { EstimateFormValues, Estimates } from "@/types/estimates";
import { ChangeOrderForm, ChangeOrderFormProps } from "@/types/formTypes";
import { SubmitHandler } from "react-hook-form";
import { redirect } from 'next/navigation'

const submitChangeOrder: (data: ChangeOrderForm) => SubmitHandler<ChangeOrderFormProps> = (data: ChangeOrderForm) =>  async (formData: ChangeOrderFormProps) => {
  try {
    if(data.data?.mode == 'put') {
      await fetch(`${process.env["NEXT_PUBLIC_CHANGE_ORDERS_EDIT"]}/${data.data?.change_order_id}}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            changeOrderName: formData.changeOrderName,
            description: formData.description,
        })
      })
      await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_UPDATE_STATUS"]}/${data.data.estimate_id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: 'Change Order Requested (edited)'
        })
      })
    } else if (data.data?.mode == 'post') {
      await fetch(`${process.env["NEXT_PUBLIC_CHANGE_ORDERS_CREATE"]}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            changeOrderName: formData.changeOrderName,
            description: formData.description,
            estimateName: data.data?.estimateName,
            customerName: data.data?.customerName,
            projectAddress: data.data?.projectAddress,
            contractor_user_id: data.data?.contractor_user_id,
            customer_user_id: data.data.customer_user_id,
            estimate_id: data.data.estimate_id
        })
      })
      await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_UPDATE_STATUS"]}/${data.data.estimate_id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: 'Change Order Requested'
        })
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const previewEstimate: (data: Estimates) => SubmitHandler<EstimateFormValues> = (data: Estimates) =>  async (formData: EstimateFormValues) => {
  // testing the function
  console.log('preview') 
    
  // Check if form is in create mode or edit mode
  if(data) {
    // create query string
    // const queryString = new URLSearchParams(data).toString()
    // console.log('q string', queryString)
    // redirect to /contractor-dashboard/estimates/xxxxxxx
    redirect(`${process.env["NEXT_PUBLIC_ESTIMATE_URL"]}/`)
  } else {
    // redirect to /contractor-dashboard/estimates/xxxxxxx
    redirect(`${process.env["NEXT_PUBLIC_ESTIMATE_URL"]}/`)
  }
}

const saveEstimate: (data: Estimates) => SubmitHandler<EstimateFormValues> = (data: Estimates) =>  async (formData: EstimateFormValues) => {
  
}

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


export {
    submitChangeOrder,
}