"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { EstimateFormTableProps, LineItems } from "../../../../types/estimates";
import LineItemFormField from "@/components/forms/estimate-form/LineItemFormField";

const EstimateFormTable = ({
  fields,
  applyTotal,
  remove,
  setSubtotal,
}: EstimateFormTableProps) => {
  return (
    <div>
      <Table className="flex-1 w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="">Item Name</TableHead>
            <TableHead className="">Item Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          id="tabel-body"
          className="overflow-x-scroll scrollbar-eform"
        >
          {fields.map((field: LineItems, index: number) => (
            <LineItemFormField
              key={field.id}
              field={field}
              fields={fields}
              index={index}
              applyTotal={applyTotal}
              remove={remove}
              setSubtotal={setSubtotal}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EstimateFormTable;
