import EstimatesTable from "@/components/tables/contractorTables/estimatesTable/EstimatesTable";
import { columns } from "@/components/tables/contractorTables/estimatesTable/columns";
import { estimates } from '../../../db/schemas/estimates'
import { db } from '../../../db'
import { Estimates } from "@/types/estimates";
import Link from "next/link";
import { eq } from "drizzle-orm"
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

async function getData(session: any) {
  const res = await db.select()
                      .from(estimates)
                      .where(eq(estimates.contractor_user_id, session.user.id))
  return res
}

export default async function Page() {

const session = getServerSession(authOptions)
const data = await getData(session) as Estimates[]

  return (
    <main className='bg-primary200 flex-grow p-4'>
      <h1 className='text-2xl desktop:text-[42px] font-bold font-sans text-primary500'>Estimates</h1>
      <Link
        href={`${process.env["ESTIMATES_FORM_URL"]}`}
      >
        <Button
          id='new-change-order-button'
          className='flex-1'
          variant={"outline"}
        >
          New Estimate
        </Button>
      </Link>
      <EstimatesTable columns={columns} data={data} />
    </main>
  )
}