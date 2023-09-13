import '../globals.css'
import Menu from "../components/Menu"

export default function WebappLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Menu />
      {children}
    </section>
  )
}