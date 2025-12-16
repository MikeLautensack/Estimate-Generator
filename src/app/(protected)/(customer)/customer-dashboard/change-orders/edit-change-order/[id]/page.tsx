import ChangeOrderForm from "@/components/forms/ChangeOrderForm";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { Box, Typography } from "@mui/material";
import { changeOrders } from "@/db/schemas/changeOrders";

async function getChangeOrder(id: number) {
  try {
    const changeOrder = await db
      .select()
      .from(changeOrders)
      .where(eq(changeOrders.id, id));
    return changeOrder;
  } catch (error) {
    console.log(error);
  }
}

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const changeOrder = await getChangeOrder(parseInt(params.id));

  const data = {
    estimateName: changeOrder ? changeOrder![0]?.estimateName : "",
    customerName: changeOrder ? changeOrder![0]?.customerName : "",
    projectAddress: changeOrder ? changeOrder![0]?.projectAddress : "",
    contractor_user_id: changeOrder ? changeOrder![0]?.contractor_user_id : "",
    customer_user_id: changeOrder ? changeOrder![0]?.customer_user_id : "",
    customer_id: changeOrder ? changeOrder![0]?.customer_id : "",
    change_order_id: changeOrder ? changeOrder![0].id : "",
    estimate_id: changeOrder ? changeOrder![0].estimate_id : "",
    changeOrderName: changeOrder ? changeOrder![0].changeOrderName : "",
    description: changeOrder ? changeOrder![0].description : "",
  };

  return (
    <main className="flex flex-col gap-4 justify-start items-start p-8 w-full">
      <Typography variant="h4" color="primary">
        Edit Change Order
      </Typography>
      <Box
        component="div"
        className="flex justify-center items-center w-full h-full"
      >
        <ChangeOrderForm data={data} mode="edit-change-order" />
      </Box>
    </main>
  );
};

export default Page;
