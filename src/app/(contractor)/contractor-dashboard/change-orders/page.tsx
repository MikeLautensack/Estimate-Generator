import ChangeOrders from "@/components/pageComponents/contractor-dashboard/ChangeOrders";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { Typography } from "@mui/material";

export default async function page() {
  const session = await auth();
  if (!session) return redirect("/signin");
  return (
    <main className="p-4 flex-grow">
      <Typography variant="h4" color="primary" className="">
        Change Orders
      </Typography>
      <ChangeOrders />
    </main>
  );
}
