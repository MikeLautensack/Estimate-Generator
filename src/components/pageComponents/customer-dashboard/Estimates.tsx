import CustomersEstimatesTable from "@/components/tables/customerTables/estimatesTable/CustomersEstimatesTable";
import { Box } from "@mui/material";

type EstimatesProps = {
  estimates: any[];
};

const Estimates = ({ estimates }: EstimatesProps) => {
  return (
    <Box component="div" className="">
      <CustomersEstimatesTable estimates={estimates} />
    </Box>
  );
};

export default Estimates;
