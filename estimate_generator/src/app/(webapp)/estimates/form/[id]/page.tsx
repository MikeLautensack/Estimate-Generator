import { db } from '../../../../../db'
import { customers } from '../../../../../db/schemas/customers'
import { eq } from "drizzle-orm"

async function getData(id: number) {
  const res = await db.select()
                .from(customers)
                .where(eq(customers.id, id))
  return res
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getData(parseInt(params.id))
  return (
    <main className='bg-primary200 p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1'>

    </main>
  )
}