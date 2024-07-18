import CustomersChangeOrdersTable from "@/components/tables/customerTables/changeOrdersTable/CustomersChangeOrdersTable";
import { db } from "@/db";
import { changeOrders } from "@/db/schemas/changeOrders";
import { Box, Typography } from "@mui/material";
import { eq } from "drizzle-orm";

async function getChangeOrders(id: number) {
  try {
    const changeOrdersPerEstimate = await db
      .select()
      .from(changeOrders)
      .where(eq(changeOrders.estimate_id, id));
    return changeOrdersPerEstimate;
  } catch (error) {
    console.log(error);
  }
}

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Search params
  const estimateId = searchParams["estimate-id"];
  const changeOrders = await getChangeOrders(parseInt(estimateId as string));
  return (
    <Box
      component="main"
      className="flex flex-col justify-start items-start gap-4 p-8 w-full"
    >
      <Typography variant="h4" color="primary">
        {`Change Orders For Estimate #: ${estimateId}`}
      </Typography>
      <Box component="div" className="w-full">
        <CustomersChangeOrdersTable
          changeOrders={changeOrders ? changeOrders : []}
        />
      </Box>
    </Box>
  );
};

export default Page;
