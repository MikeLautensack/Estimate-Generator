import { estimates, lineItems } from '@/db/schemas/estimates'
import { db } from '../../../../db'
import { eq } from "drizzle-orm"
import LineItem from '@/components/LineItem'

async function getData(id: number) {
  const estimateTableData = await db.select()
                .from(estimates)
                .where(eq(estimates.id, id))
  const lineItemsTableData = await db.select()
                .from(lineItems)
                .where(eq(lineItems.estimate_id, id))
  const estimate = {
    ...estimateTableData[0],
    lineItems: lineItemsTableData
  }
  return estimate
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getData(parseInt(params.id))
  return (
    <main
      className='bg-secondary200 flex-1 p-8'
    >
      <h1>{data.estimate_name}</h1>
      <p>{data.customer_name}</p>
      <p>{data.customer_business_name}</p>
      <p>{data.project_address}</p>
      <p>{data.contractor_name}</p>
      <p>{data.contractor_address}</p>
      <p>{data.contractor_phone}</p>
      <div>
        {data.lineItems.map((item) => (
            <LineItem 
                id={item.id}
                description={item.description}
                quantity={item.quantity}
                total={item.total}
            />
        ))}
      </div>
      <p>{data.massage}</p>
      <p>{data.subtotal}</p>
      <p>{data.tax}</p>
      <p>{data.total}</p>
    </main>
  )
}
