import EstimatesTable from '@/components/tables/contractorTables/estimatesTable/EstimatesTable'
import { db } from '../../../../../db'
import { customers } from '../../../../../db/schemas/customers'
import { eq } from "drizzle-orm"
import { columns } from '@/components/tables/contractorTables/estimatesTable/columns'
import { estimates } from '@/db/schemas/estimates'
import { formatPhoneNumber } from '../../../../../utils/formatingFunctions'

async function getCustomer(id: number) {
  const res = await db.select()
                .from(customers)
                .where(eq(customers.id, id))
  return res
}

async function getEstimates(id: number) {
  const res = await db.select()
                .from(estimates)
                .where(eq(estimates.customer_id, id))
  return res
}

export default async function page({ params }: { params: { id: string } }) {
  const customer = await getCustomer(parseInt(params.id))
  const estimates = await getEstimates(parseInt(params.id))
  return (
    <main
      className='bg-neutral400 flex flex-col gap-2 flex-1 p-8'
    >
      <div className='flex flex-col gap-2'>
        <h1 className='text-5xl'>{customer[0].name}</h1>
        <div className='flex gap-1 justify-start items-center'>
          <p className=''>Email:</p>
          <p className='text-base'>{customer[0].email}</p>
        </div>
        <div className='flex gap-1 justify-start items-center'>
          <p className=''>Phone:</p>
          <p className='text-base'>{formatPhoneNumber(customer[0].phone as string)}</p>
        </div>
        <div className='flex gap-1 justify-start items-center'>
          <p className=''>Address:</p>
          <p className='text-base'>{customer[0].address}</p>
        </div>
      </div>
      <div className='flex-1 rounded-lg relative'>
        <EstimatesTable data={estimates} columns={columns} />
      </div>
    </main>
  )
}
