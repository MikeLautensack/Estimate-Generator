import CustomersTable from "@/components/tables/contractorTables/customersTable/CustomersTable";
import { columns } from "@/components/tables/contractorTables/customersTable/columns";
import { customers } from '../../../db/schemas/customers'
import { db } from '../../../db'
import { eq } from "drizzle-orm"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

async function getData(session: any) {
  const res = await db.select()
                .from(customers)
                .where(eq(customers.contractor_user_id, session.user.id))
  return res
}

export default async function Page() {

  const session = getServerSession(authOptions)
  const data = await getData(session)

  return (
    <main className='bg-secondary300 flex-grow p-4'>
      <h1 className='mb-[8px]'>Customers</h1>
      <Link
        href={`${process.env["NEXT_PUBLIC_CUSTOMERS_FORM_URL"]}`}
      >
        <Button
          id='new-change-order-button'
          className='flex-1'
          variant={"outline"}
        >
          New Customer
        </Button>
      </Link>
      <CustomersTable columns={columns} data={data} />
    </main>
  )
}