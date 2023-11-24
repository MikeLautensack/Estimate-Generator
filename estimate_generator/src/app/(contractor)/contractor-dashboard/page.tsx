import DashboardContent from '../../../components/pageComponents/contractor-dashboard/DashboardContent'

export default function Page() {
  return (
    <main className='bg-gradient-to-br from-primary200 to-secondary200 flex-grow p-4 flex flex-col gap-4'>
        <h1 className='text-2xl desktop:text-[42px] font-bold font-sans text-primary500'>Dashboard</h1>
        <div className=''>
          <DashboardContent />
        </div>
    </main>
  )
}