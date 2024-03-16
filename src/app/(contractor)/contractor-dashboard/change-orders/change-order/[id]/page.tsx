import { db } from "@/db";
import { changeOrders } from "@/db/schemas/changeOrders";
import { eq } from "drizzle-orm";

async function getData(id: number) {
    try {
      const changeOrder = await db.select()
                                  .from(changeOrders)
                                  .where(eq(changeOrders.id, id));
      return changeOrder;   
    } catch (error) {
      console.log(error);
    }
  }
  

const Page = async ({ params }: { params: { id: string } }) => {
  
  const data = await getData(parseInt(params.id));

  return (
    <main className="flex flex-col flex-1 p-4 bg-neutral400">
      <div className="flex flex-col flex-1 gap-2 p-4 rounded-md bg-neutral100">
        <div className="">
            <h1>{data![0].changeOrderName}</h1>
        </div>
        <div className="">
            <p>{data![0].estimateName}</p>
            <p>{data![0].projectAddress}</p>
            <p>{data![0].status}</p>
        </div>
        <div className="">
            <p>{data![0].description}</p>
        </div>
      </div>
    </main>
  );
}

export default Page;