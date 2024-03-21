import { db } from "@/db";
import { customers } from "@/db/schemas/customers";

async function getData() {
  try {
    const res = await db.select().from(customers);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default async function TotalCustomers() {
  const data = await getData();

  return (
    <div className="flex justify-between items-center p-4 rounded-lg bg-neutral100">
      <h1>Total Customers</h1>
      <h2>{data?.length}</h2>
    </div>
  );
}
