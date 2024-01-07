import { db } from "@/db"
import { customers } from "@/db/schemas/customers"

// async function getData() {
//     try {
//         const res = await db.select()
//                             .from(customers)
//         return res
//     } catch (error) {
//         console.log(error)
//     }
// }

export default async function TotalEstimateEmails() {

//   const data = await getData()

  return (
    <div className="flex justify-between items-center rounded-lg bg-neutral100 p-4">
        <h1>Total Estimate Emails</h1>
        {/* <h2>{data?.length}</h2> */}
    </div>
  )
}