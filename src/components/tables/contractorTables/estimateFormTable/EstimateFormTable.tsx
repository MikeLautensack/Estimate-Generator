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

const EstimateFormTable = ({
  fields,
  remove,
  saveStatus,
  saveAndSaveStatus,
}: EstimateFormTableProps) => {
  return (
    <div>
      <Table className="flex-1 w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="pr-2">Item Name</TableHead>
            <TableHead className="px-2">Item Description</TableHead>
            <TableHead className="px-2">Quantity</TableHead>
            <TableHead className="px-2">Rate</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="pr-0 pl-2"></TableHead>
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
              saveStatus={saveStatus}
              saveAndSaveStatus={saveAndSaveStatus}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EstimateFormTable;
