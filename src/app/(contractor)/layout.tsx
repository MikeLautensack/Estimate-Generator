import "../globals.css";
import Menu from "../../components/misc/Menu";

export default function ContractorLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col w-full desktop:flex-row min-h-screen bg-neutral100"
    >
      <Menu />
      {children}
    </div>
  );
}