import DashboardTabs from "@/components/pageComponents/customer-dashboard/DashboardTabs";
import { Typography } from "@mui/material";
import { estimates } from "@/db/schemas/estimates";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { changeOrders } from "@/db/schemas/changeOrders";
import DIContainer from "@/core/DIContainer";
import { redirect } from "next/navigation";

const Page = async () => {
  // Protect Page
  const { data, error } = await DIContainer.authUseCases.getUser();
  if (error || !data) redirect("/signin");

  // const session = await auth();
  // const estimates = await getEstimates(session!);
  // const changeOrders = await getChangeOrders(session!);

  return (
    <main className="flex flex-col p-4 flex-grow w-full h-[calc(100vh-56px)]">
      <Typography variant="h4" color="primary" className="">
        Customer Dashboard
      </Typography>
      {/* <DashboardTabs estimates={estimates} changeOrders={changeOrders} /> */}
    </main>
  );
};

export default Page;
