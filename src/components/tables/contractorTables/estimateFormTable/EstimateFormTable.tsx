"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { EstimateFormTableProps } from "../../../../types/estimates";
import LineItemFormField from "@/components/forms/estimate-form/LineItemFormField";
import { LineItemsValues } from "@/components/forms/estimate-form/EstimateForm";

const EstimateFormTable = ({ fields, remove }: EstimateFormTableProps) => {
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
          {fields.map((field: LineItemsValues, index: number) => (
            <LineItemFormField
              key={field.id}
              field={field}
              fields={fields}
              index={index}
              remove={remove}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EstimateFormTable;
