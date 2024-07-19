// import { db } from "@/db";
// import { customers } from "@/db/schemas/customers";

import { Card } from "@mui/material";

// async function getData() {
//     try {
//         const res = await db.select()
//                             .from(customers);
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// }

export default function TotalEstimateEmails() {
  //   const data = await getData();

  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex justify-between items-center rounded-lg p-4"
    >
      <h1>Total Estimate Emails</h1>
      {/* <h2>{data?.length}</h2> */}
    </Card>
  );
}
