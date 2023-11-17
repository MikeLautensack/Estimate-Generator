import { db } from "@/db"
import { changeOrders } from "@/db/schemas/changeOrders"
import { eq } from "drizzle-orm"

async function getChangeOrders(id: number) {
    try {
        const changeOrder = db.select()
                              .from(changeOrders)
                              .where(eq(changeOrders.id, id))
        return changeOrder
    } catch (error) {
        console.log(error)
    }
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getChangeOrders(parseInt(params.id))
  return (
    <main>

    </main>
  )
}
