"use client";

import { Customers } from "@/types/customers";
import { Box, Button, TablePaginationProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  useGridApiContext,
  useGridSelector,
  GridPagination,
  gridPageCountSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import ContractorsCustomersTableMenu from "./ContractorsCustomersTableMenu";

type ContractorsCustomersTableProps = {
  customers: Customers[];
  page: string;
  pageSize: string;
  totalRows: number;
};

const columns: GridColDef[] = [
  { field: "name", headerName: "Customer Name", minWidth: 150, flex: 1 },
  { field: "email", headerName: "Customer Email", minWidth: 150, flex: 1 },
  { field: "address", headerName: "Address", minWidth: 150, flex: 1 },
  { field: "phone", headerName: "Phone", minWidth: 150, flex: 1 },
  {
    field: "actions",
    headerName: "",
    width: 48,
    renderCell: (params) => (
      <ContractorsCustomersTableMenu customer={params.row} />
    ),
  },
];

const ContractorsCustomersTable = ({
  customers,
  page,
  pageSize,
  totalRows,
}: ContractorsCustomersTableProps) => {
  // Hooks
  const router = useRouter();

  // State
  const [paginationModel, setPaginationModel] = useState({
    page: parseInt(page) - 1,
    pageSize: parseInt(pageSize),
  });
  const [loading, setLoading] = useState<boolean>(false);

  console.log("testing page params", page);
  console.log("testing page params", pageSize);

  // Create rows
  const rows: GridRowsProp = customers.map((customer) => {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      address: customer.address,
      phone: customer.phone,
    };
  });

  useEffect(() => {
    console.log("testing paginationModel", paginationModel);
    router.push(
      `/contractor-dashboard/customers?page=${paginationModel.page + 1}&pageSize=${paginationModel.pageSize}`,
    );
  }, [paginationModel, router]);

  return (
    <Box component="div" className="">
      <DataGrid
        rows={rows}
        columns={columns}
        paginationMode="server"
        paginationModel={paginationModel}
        rowCount={totalRows}
        loading={loading}
        onPaginationModelChange={setPaginationModel}
        slots={{
          pagination: CustomPagination,
        }}
        pageSizeOptions={[5, 10, 20, 30, 40, 50]}
        initialState={{
          pagination: {
            paginationModel: paginationModel,
          },
        }}
        autoHeight
        // checkboxSelection
      />
    </Box>
  );
};

export default ContractorsCustomersTable;

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
