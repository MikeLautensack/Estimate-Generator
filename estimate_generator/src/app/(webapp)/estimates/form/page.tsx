import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EstimateForm from "@/components/forms/EstimateForm";
import { db } from "@/db";
import { customers } from "@/db/schemas/customers";
import { estimates } from "@/db/schemas/estimates";
import { profiles } from "@/db/schemas/userProfile";
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt"
import { escape } from "querystring";

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

export default async function Page() {
  const customers = await getCustomers()
  const profile = await getProfile()
  console.log(profile)
  return (
    <main className='bg-primary200 p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1'>
      <h1 className='text-2xl desktop:text-[42px] font-bold font-sans text-primary500'>Estimate Form</h1>
      <div
        className='flex justify-center items-center flex-1 w-full'
      >
        <EstimateForm
          estimate={null}
          customers={customers} 
          profile={profile}
        />
      </div>
    </main>
  )
}