import { estimates, lineItems } from '@/db/schemas/estimates'
import { db } from '../../../../../../db'
import { eq } from "drizzle-orm"
import { customers } from '@/db/schemas/customers'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../../utils/authOptions'
import { profiles } from '@/db/schemas/userProfile'
import EstimateForm from '@/components/forms/EstimateForm'
import { changeOrders } from '@/db/schemas/changeOrders'

async function getEstimate(id: number) {
  const estimateTableData = await db.select()
                                    .from(estimates)
                                    .where(eq(estimates.id, id))
  const lineItemsTableData = await db.select()
                                     .from(lineItems)
                                     .where(eq(lineItems.estimate_id, id))
  const res = {
    ...estimateTableData[0],
    lineItems: lineItemsTableData
  }
  return res
}

async function getCustomers(id: number) {
  const res = await db.select()
                      .from(customers)
                      .where(eq(customers.contractor_user_id, id))
  return res
}

async function getProfile(id: number) {
  const res = await db.select()
                      .from(profiles)
                      .where(eq(profiles.user_id, id))
  return res
}

async function getChangeOrders(id: number) {
  const res = await db.select()
                      .from(changeOrders)
                      .where(eq(changeOrders.estimate_id, id))
  return res
}

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const estimate = await getEstimate(parseInt(params.id))
  const customers = await getCustomers(session.user.id)
  const profile = await getProfile(session.user.id)
  const changeOrders = await getChangeOrders(parseInt(params.id))
  return (
    <main className='bg-primary200 p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1'>
      <div>
        <EstimateForm
          estimate={estimate}
          customers={customers} 
          profile={profile}
          changeOrders={changeOrders}
        />
      </div>
    </main>
  )
}