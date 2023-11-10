import EstimatesTable from "@/components/tables/estimatesTable/EstimatesTable";
import { columns } from "@/components/tables/estimatesTable/columns";
import { estimates } from '../../../db/schemas/estimates'
import { db } from '../../../db'
import { Estimates } from "@/types/estimates";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getData() {
  const res = await db.select()
                .from(estimates)
  return res
}

export default async function Page() {

const data = await getData() as Estimates[]

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