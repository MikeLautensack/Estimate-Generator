import CustomersChangeOrdersTable from "@/components/tables/customerTables/changeOrdersTable/CustomersChangeOrdersTable";
import { Box } from "@mui/material";

type ChangeOrdersProps = {
  changeOrders: any[];
};

const ChangeOrders = ({ changeOrders }: ChangeOrdersProps) => {
  return (
    <Box component="div" className="">
      <CustomersChangeOrdersTable changeOrders={changeOrders} />
    </Box>
  );
};

export default ChangeOrders;
