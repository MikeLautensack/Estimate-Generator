import ChangeOrders from "@/components/pageComponents/contractor-dashboard/ChangeOrders";

export default function page() {
  return (
    <main className="bg-neutral400 p-4">
      <h1 className="text-3xl font-semibold">Change Orders</h1>
      <ChangeOrders />
    </main>
  );
}