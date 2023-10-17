import { db } from '../../../../db'
import { customers } from '../../../../db/schemas/customers'
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
    <div
      className='bg-secondary200 flex-1 p-8'
    >
      <p>{data[0].id}</p>
      <p>{data[0].name}</p>
      <p>{data[0].email}</p>
      <p>{data[0].address}</p>
      <p>{data[0].phone}</p>
    </div>
  )
}
