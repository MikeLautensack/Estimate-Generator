"use client";

import { ChangeOrder } from "@/types/changeOrders";
import { Box, TablePaginationProps, TableRow } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  GridPagination,
  GridRowsProp,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import MuiPagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import ContractorChangeOrderTableMenu from "./ContractorChangeOrderTableMenu";

type ContractorChangeOrderTableProps = {
  changeOrders: ChangeOrder[];
  page: string;
  pageSize: string;
  totalRows: number;
};

const columns: GridColDef[] = [
  {
    field: "changeOrderName",
    headerName: "Change Order Name",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "estimateName",
    headerName: "Estimate Name",
    minWidth: 150,
    flex: 1,
  },
  { field: "description", headerName: "Description", minWidth: 150, flex: 1 },
  {
    field: "customerName",
    headerName: "Customer Name",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "projectAddress",
    headerName: "Project Address",
    minWidth: 150,
    flex: 1,
  },
  { field: "status", headerName: "Status", minWidth: 150, flex: 1 },
  {
    field: "actions",
    headerName: "",
    width: 48,
    renderCell: (params) => (
      <ContractorChangeOrderTableMenu changeOrder={params.row} />
    ),
  },
];

const ContractorChangeOrderTable = ({
  changeOrders,
  page,
  pageSize,
  totalRows,
}: ContractorChangeOrderTableProps) => {
  // Hooks
  const router = useRouter();

  // State
  const [paginationModel, setPaginationModel] = useState({
    page: parseInt(page) - 1,
    pageSize: parseInt(pageSize),
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Create rows
  const rows: GridRowsProp = changeOrders.map((order) => {
    return {
      id: order.id,
      changeOrderName: order.changeOrderName,
      estimateName: order.estimateName,
      description: order.description,
      customerName: order.customerName,
      projectAddress: order.projectAddress,
      status: order.status,
    };
  });

  useEffect(() => {
    router.push(
      `/contractor-dashboard/change-orders?page=${paginationModel.page + 1}&pageSize=${paginationModel.pageSize}`,
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

export default ContractorChangeOrderTable;

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
