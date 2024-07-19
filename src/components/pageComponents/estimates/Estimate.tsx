import { Estimates } from "@/types/estimates";
import { Box, Card, Divider, Typography } from "@mui/material";
import EstimateTable from "./EstimateTable";
import { formatPriceString } from "@/utils/formatingFunctions";

export default function Estimate({ estimate }: { estimate: Estimates }) {
  return (
    <Box component="div" className="flex flex-col gap-4">
      <Box component="div" className="flex justify-between items-center">
        <Typography variant="h5">{`Estimate #: ${estimate.id}`}</Typography>
        <Typography variant="body2">{`status: ${estimate.status}`}</Typography>
      </Box>
      <Divider />
      <Typography variant="h5">{`Estimate Name: ${estimate.estimateName}`}</Typography>
      <Box
        component="div"
        className="flex flex-col desktop:flex-row gap-4 w-full"
      >
        <Box component="div" className="flex flex-col gap-4 w-full">
          <Typography variant="body1">{`Customer Name: ${estimate.customerName}`}</Typography>
          <Typography variant="body1">{`Customer Email: ${estimate.customerEmail}`}</Typography>
          <Typography variant="body1">{`Project Address: ${estimate.projectAddress}`}</Typography>
        </Box>
        <Box component="div" className="flex flex-col gap-4 w-full">
          <Typography variant="body1">{`Contractor Name: ${estimate.contractorName}`}</Typography>
          <Typography variant="body1">{`Contractor Phone: ${estimate.contractorPhone}`}</Typography>
          <Typography variant="body1">{`Contractor Address: ${estimate.contractorAddress}`}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        component="div"
        className="flex flex-col gap-4 justify-start items-start"
      >
        <Typography variant="h6">Message</Typography>
        <Typography variant="body2">{estimate.message}</Typography>
      </Box>
      <Divider />
      <Box
        component="div"
        className="flex flex-col gap-4 justify-start items-start"
      >
        <Typography variant="h6">Line Items</Typography>
        <EstimateTable lineItems={estimate.lineItems!} />
      </Box>
      <Divider />
      <Box
        component="div"
        className="flex flex-col gap-4 justify-start items-end w-full"
      >
        <Typography variant="body1">{`Subtotal: ${formatPriceString(estimate.subtotal.toString())}`}</Typography>
        <Typography variant="body1">{`Tax: ${formatPriceString(estimate.tax.toString())}`}</Typography>
        <Typography variant="body1">{`Total: ${formatPriceString(estimate.total.toString())}`}</Typography>
      </Box>
    </Box>
  );
}
