import "../globals.css";
import Menu from "../../components/misc/Menu";

export default function NewUserLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col w-full desktop:flex-row min-h-screen bg-neutral100"
    >
      {children}
    </div>
  );
}