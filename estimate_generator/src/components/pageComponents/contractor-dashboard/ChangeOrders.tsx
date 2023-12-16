import { db } from "@/db"
import ChangeOrdersTable from "../../tables/contractorTables/changeOrderTable/ChangeOrdersTable"
import { columns } from '../../tables/contractorTables/changeOrderTable/columns'
import { ChangeOrders } from "@/types/changeOrders"
import { changeOrders } from "@/db/schemas/changeOrders"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/authOptions"

async function getChangeOrders(session: any) {
  try {    
    const data = await db.select()
                         .from(changeOrders)
                         .where(eq(changeOrders.contractor_user_id, session.user.id))
    return data
  } catch (error) {
    console.log(error)
  }
}

export default async function ChangeOrders() {
  const session = await getServerSession(authOptions)
  const data = await getChangeOrders(session)
  return (
    <div>
      <ChangeOrdersTable columns={columns} data={data!} />
    </div>
  )
}