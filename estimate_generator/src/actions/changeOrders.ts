'use server'

import { changeOrders } from '@/db/schemas/changeOrders'
import { db } from '../db/index'
import { eq } from 'drizzle-orm'
 
export async function getChangeOrders() {
  try {    
    const data = await db.select()
                         .from(changeOrders)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteChangeOrder({ id }: { id: number }) {
  try {
    const data = await db.delete(changeOrders)
                         .where(eq(changeOrders.id, id))
    return data
  } catch (error) {
    console.log(error)
  } 
}