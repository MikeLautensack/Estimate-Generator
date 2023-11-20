import '../../globals.css'

export default function TestPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}