import '../globals.css'
import Menu from "../components/Menu"

export default function WebappLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='desktop:flex bg-primary600 min-h-screen'
    >
      <Menu />
      {children}
    </div>
  )
}