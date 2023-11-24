import EstimatesTable from "@/components/tables/customerTables/estimatesTable/EstimatesTable";
import { Estimates } from "@/types/estimates";
import { columns } from "@/components/tables/customerTables/estimatesTable/columns";
import { estimates } from '../../../db/schemas/estimates'
import { db } from '../../../db'
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/authOptions"

async function getData(session: any) {
  const res = await db.select()
                      .from(estimates)
                      .where(eq(estimates.customer_user_id, session.user.id))
  return res
}

export default async function Estimates() {

  const session = getServerSession(authOptions)
  const data = await getData(session) as Estimates[]

  return (
    <div>
        <h1>Estimates</h1>
        <div>
            <EstimatesTable columns={columns} data={data} />
        </div>
    </div>
  )
}
