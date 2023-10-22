import EstimateForms from "@/app/components/pageComponents/estimates/EstimateForms";
import { db } from "@/db";
import { customers } from "@/db/schemas/customers";

async function getCustomers() {
  const res = await db.select()
                .from(customers)
  return res
}

export default async function Page() {
  const customers = await getCustomers()
  return (
    <main className='bg-primary200 p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1'>
      <h1 className='text-2xl desktop:text-[42px] font-bold font-sans text-primary500'>Estimate Form</h1>
      <div
        className='flex justify-center items-center flex-1 w-full'
      >
        <EstimateForms
          customers={customers} 
        />
      </div>
    </main>
  )
}