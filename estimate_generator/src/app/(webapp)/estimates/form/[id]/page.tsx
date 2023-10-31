import { estimates, lineItems } from '@/db/schemas/estimates'
import { db } from '../../../../../db'
import { eq } from "drizzle-orm"
import { customers } from '@/db/schemas/customers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { profiles } from '@/db/schemas/userProfile'
import EstimateForm from '@/components/forms/EstimateForm'
import { Estimates } from '@/types/estimates'
import { NextResponse } from 'next/server'

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

async function getCustomers() {
  const res = await db.select()
                .from(customers)
  return res
}

async function getProfile() {
  const session = await getServerSession(authOptions)
  const res = await db.select()
                .from(profiles)
                .where(eq(profiles.user_id, session.user.id))
  return res
}

export default async function page({ params }: { params: { id: string } }) {
  const estimate = await getEstimate(parseInt(params.id))
  const customers = await getCustomers()
  const profile = await getProfile()
  return (
    <main className='bg-primary200 p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1'>
      <div>
        <EstimateForm
          estimate={estimate}
          customers={customers} 
          profile={profile}
        />
      </div>
    </main>
  )
}