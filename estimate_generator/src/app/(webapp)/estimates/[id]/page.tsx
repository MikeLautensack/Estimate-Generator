import { estimates, lineItems } from '@/db/schemas/estimates'
import { db } from '../../../../db'
import { eq } from "drizzle-orm"
import LineItem from '../../../../components/misc/LineItem'

async function getData(id: number) {
  try {    
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
  } catch (error) {
    console.log(error)
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getData(parseInt(params.id))
  console.log(data)
  return (
    <main
      className='bg-secondary200 flex-1 p-8'
    >
      <h1>{data?.estimateName}</h1>
      <p>{data?.customerName}</p>
      <p>{data?.customerEmail}</p>
      <p>{data?.projectAddress}</p>
      <p>{data?.contractorName}</p>
      <p>{data?.contractorAddress}</p>
      <p>{data?.contractorPhone}</p>
      <div>
        {data?.lineItems.map((item) => (
            <LineItem
              key={item.id}
              id={item.id}
              description={item.description}
              quantity={item.quantity}
              amount={item.amount} 
              item={item.item}
              rateType={item.rateType} 
              price={item.price}            
            />
        ))}
      </div>
      <p>{data?.massage}</p>
      <p>{data?.subtotal}</p>
      <p>{data?.tax}</p>
      <p>{data?.total}</p>
    </main>
  )
}
