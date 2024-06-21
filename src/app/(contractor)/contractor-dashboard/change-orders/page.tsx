import ChangeOrders from "@/components/pageComponents/contractor-dashboard/ChangeOrders";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session) return redirect("/signin");
  return (
    <main className="bg-neutral400 p-4 flex-grow">
      <h1 className="text-3xl font-semibold">Change Orders</h1>
      <ChangeOrders />
    </main>
  );
}
