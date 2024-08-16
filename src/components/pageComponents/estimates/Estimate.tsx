import { Estimates } from "@/types/estimates";
import { Box, Divider, Typography } from "@mui/material";
import EstimateTable from "./EstimateTable";
import {
  formatCapitalizeAll,
  formatPriceString,
} from "@/utils/formatingFunctions";
import Image from "next/image";
import { format } from "date-fns";

type PageProps = {
  estimate: Estimates;
  profile: any;
};

export default function Estimate({ estimate, profile }: PageProps) {
  return (
    <Box component="div" className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 justify-start items-start w-full">
        <div className="flex justify-between items-center gap-2 w-full">
          <Typography variant="h2" color="primary">
            Estimate
          </Typography>
          <Typography variant="body1">{`#${estimate.id}`}</Typography>
        </div>
        <div className="flex gap-4 justify-between items-start w-full">
          <div className="flex flex-col gap-2 justify-start items-start w-full">
            <Typography variant="h5">{`${estimate.contractorName}`}</Typography>
            <Typography variant="body1">{`${estimate.contractorAddress}`}</Typography>
          </div>
          <div className="">
            <Image
              src={profile[0] ? profile[0].profileImgUrl : ""}
              width={150}
              height={150}
              alt="Profile Picture"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Typography
          variant="h4"
          sx={{ marginBottom: "1rem" }}
        >{`Estimate Name: ${estimate.estimateName}`}</Typography>
        <div className="flex justify-center items-center gap-2">
          <Typography variant="body1">{`Estimate Status: ${formatCapitalizeAll(estimate.status)}`}</Typography>
          <div className={`rounded-full w-2 h-2 bg-lime-600`}></div>
        </div>
      </div>
      <Box component="div" className="flex flex-col md:flex-row gap-4 w-full">
        <Box component="div" className="flex flex-col w-full">
          <Typography variant="body1">{`Customer Name: ${estimate.customerFirstName} ${estimate.customerLastName}`}</Typography>
          <Typography variant="body1">{`Customer Email: ${estimate.customerEmail}`}</Typography>
          <Typography variant="body1">{`Project Address: ${estimate.projectAddress}`}</Typography>
        </Box>
        <Box component="div" className="flex flex-col w-full">
          <Typography variant="body1">{`Estimate Created: ${format(estimate.createdAt!, "PPpp")}`}</Typography>
          <Typography variant="body1">{`Estimate Update: ${format(estimate.updatedAt!, "PPpp")}`}</Typography>
          <Typography variant="body1">{`Estimate Expiration Date: ${format(estimate.expirationDate, "PPpp")}`}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        component="div"
        className="flex flex-col gap-4 justify-start items-start"
      >
        <EstimateTable lineItems={estimate.lineItems!} />
      </Box>
      <Divider />
      <Box
        component="div"
        className="flex gap-4 justify-start items-start w-full"
      >
        <div className="flex flex-col justify-start items-start w-full">
          <Typography variant="h6">Message:</Typography>
          <Typography variant="body1">{estimate.message}</Typography>
        </div>
        <div className="flex flex-col justify-start items-end w-full">
          <Typography variant="body1">{`Subtotal: ${formatPriceString(estimate.subtotal.toString())}`}</Typography>
          <Typography variant="body1">{`Tax: ${formatPriceString(estimate.tax.toString())}`}</Typography>
          <Typography variant="body1">{`Total: ${formatPriceString(estimate.total.toString())}`}</Typography>
        </div>
      </Box>
    </Box>
  );
}
