import CustomerForm from "@/components/forms/customer-form/CustomerForm";
import { db } from "../../../../../../db";
import { customers } from "../../../../../../db/schemas/customers";
import { eq } from "drizzle-orm";
import { Customers } from "@/types/customers";
import { Typography } from "@mui/material";

async function getData(id: number) {
  const res = await db.select().from(customers).where(eq(customers.id, id));
  return res;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const data = (await getData(parseInt(params.id))) as Customers[];

  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1">
      <Typography variant="h4" color="primary">
        Edit Customer Form
      </Typography>
      <div className="flex justify-center items-center flex-1 w-full">
        <CustomerForm data={data[0]} mode="edit-customer" />
      </div>
    </main>
  );
};

export default Page;
