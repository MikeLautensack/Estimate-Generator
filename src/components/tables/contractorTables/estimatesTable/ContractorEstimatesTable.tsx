"use client";

import { Estimates } from "@/types/estimates";
import { TablePaginationProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  GridPagination,
  GridRowsProp,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import EstimatesTableMenu from "./EstimatesTableMenu";
import MuiPagination from "@mui/material/Pagination";
import { formatAddress, formatPriceString } from "@/utils/formatingFunctions";

type ContractorEstimatesTableProps = {
  estimates: Estimates[];
  page: string;
  pageSize: string;
  totalRows: number;
};

const columns: GridColDef[] = [
  {
    field: "estimateName",
    headerName: "Estimate Name",
    minWidth: 150,
    flex: 1,
  },
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
  { field: "total", headerName: "Total", minWidth: 150, flex: 1 },
  { field: "status", headerName: "Status", minWidth: 150, flex: 1 },
  {
    field: "actions",
    headerName: "",
    width: 48,
    renderCell: (params) => <EstimatesTableMenu estimate={params.row} />,
  },
];

const ContractorEstimatesTable = ({
  estimates,
  page,
  pageSize,
  totalRows,
}: ContractorEstimatesTableProps) => {
  // Hooks
  const router = useRouter();

  // State
  const [paginationModel, setPaginationModel] = useState({
    page: parseInt(page) - 1,
    pageSize: parseInt(pageSize),
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Create rows
  const rows: GridRowsProp = estimates.map((estimate) => {
    return {
      id: estimate.id,
      estimateName: estimate.estimateName,
      customerName: `${estimate.customerFirstName} ${estimate.customerLastName}`,
      projectAddress: formatAddress(
        estimate.projectAddress,
        estimate.projectAddress2,
        estimate.projectCity,
        estimate.projectState,
        estimate.projectZip,
      ),
      total: formatPriceString(estimate.total.toString()),
      status: estimate.status,
    };
  });

  useEffect(() => {
    router.push(
      `/contractor-dashboard/estimates?page=${paginationModel.page + 1}&pageSize=${paginationModel.pageSize}`,
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

export default ContractorEstimatesTable;

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
