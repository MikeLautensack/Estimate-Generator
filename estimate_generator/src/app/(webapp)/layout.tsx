import '../globals.css'
import Menu from "../components/Menu"

export default function WebappLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='bg-primary600'
    >
      <Menu />
      {children}
    </div>
  )
}