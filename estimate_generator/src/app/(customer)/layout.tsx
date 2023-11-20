import '../globals.css'
import Menu from "../../components/misc/Menu"

export default function CustomerLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='desktop:flex bg-primary600 min-h-screen'
    >
      {children}
    </div>
  )
}