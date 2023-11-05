import { db } from "@/db"
import ChangeOrdersTable from "../../tables/changeOrderTable/ChangeOrdersTable"
import { columns } from '../../tables/changeOrderTable/columns'
import { ChangeOrders } from "@/types/changeOrders"
import { changeOrders } from "@/db/schemas/changeOrders"
import { useEffect, useState } from "react"

async function getChangeOrders() {
  try {    
    const data = await db.select()
                         .from(changeOrders)
    return data
  } catch (error) {
    console.log(error)
  }
}

export default async function ChangeOrders() {
  const data = await getChangeOrders()
  const [ changeOrders, setChangeOrders ] = useState(data!)
  return (
    <div>
      <ChangeOrdersTable columns={columns} data={changeOrders} />
    </div>
  )
}