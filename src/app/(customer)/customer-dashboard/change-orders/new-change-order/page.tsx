import ChangeOrderForm from "@/components/forms/ChangeOrderForm";
import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";
import { ChangeOrderFormParams } from "@/types/formTypes";
import { Box, Typography } from "@mui/material";
import { eq } from "drizzle-orm";

async function getEstimate(id: number) {
  try {
    const estimate = await db
      .select()
      .from(estimates)
      .where(eq(estimates.id, id));
    return estimate;
  } catch (error) {
    console.log(error);
  }
}

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const estimateId = searchParams["estimate-id"];
  const estimateResponse = await getEstimate(parseInt(estimateId as any));

  let estimate;
  if (estimateResponse && estimateResponse.length > 0) {
    estimate = estimateResponse[0];
  }

  const data = {
    estimateName: estimate?.estimateName,
    customerName: estimate?.customerName,
    projectAddress: estimate?.projectAddress,
    contractor_user_id: estimate?.contractor_user_id,
    customer_user_id: estimate?.customer_user_id,
    customer_id: estimate?.customer_id,
    estimate_id: estimate?.id,
    changeOrderName: "",
    description: "",
  };

  return (
    <main className="flex flex-col gap-4 justify-start items-start p-8 w-full">
      <Typography variant="h4" color="primary">
        Create New Change Order
      </Typography>
      <Box
        component="div"
        className="flex justify-center items-center w-full h-full"
      >
        <ChangeOrderForm data={data} mode="new-change-order" />
      </Box>
    </main>
  );
};

export default Page;
