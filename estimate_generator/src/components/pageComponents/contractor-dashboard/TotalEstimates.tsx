import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";

async function getData() {
    try {
        const res = await db.select()
                            .from(estimates);
        return res;
    } catch (error) {
        console.log(error);
    }
}


export default async function TotalEstimates() {

  const data = await getData();

  return (
    <div className="flex justify-between items-center rounded-lg bg-neutral100 p-4">
        <h1>Total Estimates</h1>
        <h2>{data?.length}</h2>
    </div>
  );
}
