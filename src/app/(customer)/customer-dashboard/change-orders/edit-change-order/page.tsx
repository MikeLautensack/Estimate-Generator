import ChangeOrderForm from "@/components/forms/ChangeOrderForm";
import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";
import { eq } from "drizzle-orm";
import { ChangeOrderFormParams } from "@/types/formTypes";

async function getEstimate(id: number) {
  try {
    const estimate = await db.select()
                             .from(estimates)
                             .where(eq(estimates.id, id));
    return estimate;
  } catch (error) {
    console.log(error);
  }
}

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  
  const changeOrderId = searchParams.changeOrderId;
  const estimateId = searchParams.estimateId;
  const estimateResponse = await getEstimate(parseInt(estimateId as string));

  let estimate;
  if (estimateResponse && estimateResponse.length > 0) {
    estimate = estimateResponse[0];
  } 

  const data = {
    estimateName: estimate?.estimateName,
    projectAddress: estimate?.projectAddress,
    contractor_user_id: estimate?.contractor_user_id,
    customer_user_id: estimate?.customer_user_id,
    change_order_id: parseInt(changeOrderId as string),
    mode: "put"
  };

  return (
    <main className="flex flex-1 justify-center items-center">
      <ChangeOrderForm data={data as ChangeOrderFormParams} />
    </main>
  );
}
