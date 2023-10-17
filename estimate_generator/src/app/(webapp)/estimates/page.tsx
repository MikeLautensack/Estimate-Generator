import EstimatesTable from "@/app/components/tables/shadcn_ui_tables/estimatesTable/EstimatesTable";
import { columns } from "@/app/components/tables/shadcn_ui_tables/estimatesTable/columns";
import { estimates } from '../../../db/schemas/estimates'
import { db } from '../../../db'
import { Estimates } from "@/types/estimates";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

async function getData() {
  const res = await db.select()
                .from(estimates)
  return res
}

export default async function Page() {

const data: Estimates[] = await getData() as Estimates[]

  return (
    <main className='bg-primary200 flex-grow p-4'>
        <h1 className='text-2xl desktop:text-[42px] font-bold font-sans text-primary500'>Estimates</h1>
        <Link
          href={'http://localhost:3000/customerform'}
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