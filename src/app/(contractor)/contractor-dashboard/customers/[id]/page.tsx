import EstimatesTable from "@/components/tables/contractorTables/estimatesTable/EstimatesTable";
import { db } from "../../../../../db";
import { customers } from "../../../../../db/schemas/customers";
import { eq } from "drizzle-orm";
import { columns } from "@/components/tables/contractorTables/estimatesTable/columns";
import { estimates } from "@/db/schemas/estimates";
import { formatPhoneNumber } from "../../../../../utils/formatingFunctions";
import { Estimates } from "@/types/estimates";
import { Typography } from "@mui/material";
import CustomersEstimatesTable from "@/components/tables/contractorTables/customersEstimatesTable/CustomersEstimatesTable";

async function getCustomer(id: number) {
  const res = await db.select().from(customers).where(eq(customers.id, id));
  return res;
}

async function getEstimates(id: number) {
  const res = await db
    .select()
    .from(estimates)
    .where(eq(estimates.customer_id, id));
  return res;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const customer = await getCustomer(parseInt(params.id));
  const estimates = (await getEstimates(parseInt(params.id))) as Estimates[];

  return (
    <main className="flex flex-col gap-8 flex-1 p-8">
      <div className="flex flex-col gap-2">
        <Typography variant="h3" color="primary">
          {`${customer[0].firstName} ${customer[0].lastName}`}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
        >{`Email: ${customer[0].email}`}</Typography>
        <Typography
          variant="body1"
          color="primary"
        >{`Phone: ${formatPhoneNumber(customer[0].phone)}`}</Typography>
        <Typography
          variant="body1"
          color="primary"
        >{`Address: ${customer[0].address}`}</Typography>
      </div>
      <div className="flex-1 rounded-lg relative">
        <CustomersEstimatesTable estimates={estimates} />
      </div>
    </main>
  );
};

export default Page;
