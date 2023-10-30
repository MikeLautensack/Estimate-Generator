import DashboardContent from '../../../components/pageComponents/dashboard/DashboardContent'

export default function Page() {
  return (
    <main className='bg-primary200 flex-grow p-4'>
        <h1 className='text-2xl desktop:text-[42px] font-bold font-sans text-primary500'>Dashboard</h1>
        <DashboardContent />
    </main>
  )
}