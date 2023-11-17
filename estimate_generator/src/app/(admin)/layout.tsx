import '../globals.css'
import Menu from "../../components/misc/Menu"

export default function AdminLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='desktop:flex bg-primary600 min-h-screen'
    >
      <h1 className='bg-secondary300'>dashboard menu placeholder</h1>
      {children}
    </div>
  )
}