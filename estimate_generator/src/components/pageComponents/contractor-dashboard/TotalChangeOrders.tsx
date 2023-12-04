import { db } from "@/db"
import { changeOrders } from "@/db/schemas/changeOrders"

async function getData() {
    try {
        const res = await db.select()
                            .from(changeOrders)
        return res
    } catch (error) {
        console.log(error)
    }
}

export default async function TotalChangeOrders() {

  const data = await getData()

  return (
    <div className="border border-primary900 p-4">
        <h1>Total Change Orders</h1>
        <h2>{data?.length}</h2>
    </div>
  )
}
