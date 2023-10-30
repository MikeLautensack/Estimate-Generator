import CustomersTable from "@/components/tables/customersTable/CustomersTable";
import { columns } from "@/components/tables/customersTable/columns";
import { customers } from '../../../db/schemas/customers'
import { db } from '../../../db'
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getData() {
  const res = await db.select()
                .from(customers)
  return res
}

export default async function Page() {

  const data = await getData()

  return (
    <main className='bg-secondary300 flex-grow p-4'>
      <h1 className='mb-[8px]'>Customers</h1>
      <Link
        href={'http://localhost:3000/customers/form'}
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