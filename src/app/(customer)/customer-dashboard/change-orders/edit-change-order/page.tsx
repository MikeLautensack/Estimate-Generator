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

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  
  const estimateResponse = await getEstimate(parseInt(searchParams.estimateId as string));

  const data = {
    estimateName: estimateResponse![0]?.estimateName,
    projectAddress: estimateResponse![0]?.projectAddress,
    contractor_user_id: estimateResponse![0]?.contractor_user_id,
    customer_user_id: estimateResponse![0]?.customer_user_id,
    change_order_id: parseInt(searchParams.changeOrderId as string),
    mode: "put"
  };

  return (
    <main className="flex flex-1 justify-center items-center">
      <ChangeOrderForm data={data as ChangeOrderFormParams} />
    </main>
  );
}

export default Page;