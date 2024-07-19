import { eq } from "drizzle-orm";
import { changeOrders } from "@/db/schemas/changeOrders";
import { db } from "@/db";

async function getData(id: number) {
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
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const data = await getData(parseInt(searchParams.changeOrderId as string));

  return (
    <main>
      <div>
        <h1>{data![0]?.changeOrderName}</h1>
      </div>
      <div>
        <p>{data![0]?.estimateName}</p>
        <p>{data![0]?.projectAddress}</p>
        <p>{data![0]?.status}</p>
      </div>
      <div>
        <p>{data![0]?.description}</p>
      </div>
    </main>
  );
};

export default Page;
