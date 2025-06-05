"use client";

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
import JobsTableMenu from "./JobsTableMenu";
import MuiPagination from "@mui/material/Pagination";
import { JobsSelect } from "@/db/schemas/jobs";

type ContractorJobsProps = {
  jobs: JobsSelect[];
  page: string;
  pageSize: string;
  totalRows: number;
};

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Job Name",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "actions",
    headerName: "",
    width: 48,
    renderCell: (params) => <JobsTableMenu jobs={params.row} />,
  },
];

const ContractorJobsTable = ({
  jobs,
  page,
  pageSize,
  totalRows,
}: ContractorJobsProps) => {
  // Hooks
  const router = useRouter();

  // State
  const [paginationModel, setPaginationModel] = useState({
    page: parseInt(page) - 1,
    pageSize: parseInt(pageSize),
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Create rows
  const rows: GridRowsProp = jobs.map((job: JobsSelect) => {
    return {
      id: job.id,
      name: job.name,
      description: job.description,
      status: job.status,
    };
  });

  useEffect(() => {
    router.push(
      `/contractor-dashboard/jobs?page=${paginationModel.page + 1}&pageSize=${paginationModel.pageSize}`,
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

export default ContractorJobsTable;

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
