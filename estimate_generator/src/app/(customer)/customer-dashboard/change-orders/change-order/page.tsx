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

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const changeOrderId = searchParams.changeOrderId
  const data = await getData(parseInt(changeOrderId as string))

  let changeOrder
  if (data && data.length > 0) {
    changeOrder = data[0]
  }

  return (
    <main>
        <div>
            <h1>{changeOrder?.changeOrderName}</h1>
        </div>
        <div>
            <p>{changeOrder?.estimateName}</p>
            <p>{changeOrder?.projectAddress}</p>
            <p>{changeOrder?.status}</p>
        </div>
        <div>
            <p>{changeOrder?.description}</p>
        </div>
    </main>
  )
}