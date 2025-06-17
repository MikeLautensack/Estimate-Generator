import { eq } from "drizzle-orm";
import { changeOrders } from "@/db/schemas/changeOrders";
import { db } from "@/db";
import { Box, Divider, Typography } from "@mui/material";

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

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await getData(parseInt(params.id as string));

  return (
    <main className="flex flex-col flex-grow gap-4 p-4">
      <Box component="div" className="flex justify-between items-center w-full">
        <Typography variant="h6" color="primary" className="">
          {`Change Order #: ${data![0].id}`}
        </Typography>
        <Typography variant="subtitle1" color="primary" className="">
          {`status: ${data![0].status}`}
        </Typography>
      </Box>
      <Divider />
      <Typography variant="h5" color="primary" className="">
        {`Change Order Name: ${data![0]?.changeOrderName}`}
      </Typography>
      <Box
        component="div"
        className="flex flex-col gap-4 justify-start items-start"
      >
        <Typography variant="body1" color="primary" className="">
          {`Estimate Name: ${data![0]?.estimateName}`}
        </Typography>
        <Typography variant="body1" color="primary" className="">
          {`Project Address: ${data![0]?.projectAddress}`}
        </Typography>
      </Box>
      <Divider />
      <Typography variant="body1" color="primary" className="">
        Message:
      </Typography>
      <Typography variant="body1" color="primary" className="">
        {data![0]?.description}
      </Typography>
    </main>
  );
};

export default Page;
