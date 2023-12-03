import { eq } from "drizzle-orm"
import { changeOrders } from '@/db/schemas/changeOrders'
import { db } from '@/db'

async function getData(id: number) {
  try {
    const changeOrder = await db.select()
                                .from(changeOrders)
                                .where(eq(changeOrders.id, id))
    return changeOrder      
  } catch (error) {
    console.log(error)
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getData(parseInt(params.id))
  return (
    <main
      className='bg-gradient-to-br from-primary200 to-secondary200 flex-1 p-8 min-h-screen'
    >

    </main>
  )
}