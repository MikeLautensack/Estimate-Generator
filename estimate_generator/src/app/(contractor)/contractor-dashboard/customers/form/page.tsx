import CustomerForm from "@/components/forms/CustomerForm";

export default async function Page() {
    return (
      <main className='bg-primary200 p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1'>
        <h1 className='text-2xl desktop:text-[42px] font-bold font-sans text-primary500'>Customer Form</h1>
        <div
          className='flex justify-center items-center flex-1 w-full'
        >
          <CustomerForm data={null}/>
        </div>
      </main>
    )
  }