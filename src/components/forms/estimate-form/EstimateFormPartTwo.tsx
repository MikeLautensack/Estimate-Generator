"use client";

import { SubmitHandler, useFormContext } from "react-hook-form";
import EstimateFormTable from "../../tables/contractorTables/estimateFormTable/EstimateFormTable";
import TextInput from "../inputs/TextInput";
import { Box, Button } from "@mui/material";
import TextAreaInput from "../inputs/TextAreaInput";
import TaxAndTotal from "./TaxAndTotal";
import MVLReadOnlyInput from "../inputs/MVLReadOnlyInput";
import { Customers } from "@/types/customers";
import { Profile } from "@/types/profile";
import { ChangeOrder } from "@/types/changeOrders";
import {
  EstimateFormValues,
  LineItemsValues,
  SaveAndSentStatus,
  SaveStatus,
} from "./EstimateForm";
import { useEffect } from "react";
import { generateNumericId } from "@/utils/generateRandom";
import MVLPhoneNumber from "../inputs/MVLPhoneNumber";
import EstimateFormModes from "./EstimateFormModes";

export type EstimateFormPartTwoProps = {
  customers: Customers[];
  profile: Profile;
  fields: LineItemsValues[];
  prepend: (obj: LineItemsValues) => void;
  remove: (index?: number | number[]) => void;
  changeOrders: ChangeOrder[];
  estimate: EstimateFormValues;
  methods: any;
  save: SubmitHandler<EstimateFormValues>;
  saveAndSend: SubmitHandler<EstimateFormValues>;
  mode: "new-estimate" | "update-estimate";
  saveStatus?: SaveStatus;
  saveAndSaveStatus?: SaveAndSentStatus;
};

const EstimateFormPartTwo = ({
  customers,
  profile,
  fields,
  prepend,
  remove,
  methods,
  save,
  saveAndSend,
  changeOrders,
  mode,
  saveStatus,
  saveAndSaveStatus,
}: EstimateFormPartTwoProps) => {
  // Hooks
  const { setValue } = useFormContext();

  // Values
  const businessName = profile.businessName;
  const businessAddress = profile.businessAddress;
  const businessPhone = profile.businessPhone;

  // Effects
  useEffect(() => {
    setValue("contractorName", businessName);
    setValue("contractorAddress", businessAddress);
    setValue("contractorPhone", businessPhone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate id
  const newId = generateNumericId();

  return (
    <div className="p-4 flex flex-col gap-2 desktop:gap-4 w-full">
      <TextInput
        name="estimateName"
        label="Estimate Name"
        disabled={
          saveStatus === "saving" ||
          saveAndSaveStatus === "saving" ||
          saveAndSaveStatus === "sending"
        }
      />
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 desktop:gap-4 md:flex-row items-start pt-2 pb-4 w-full">
          <Box
            component="div"
            className="flex flex-col gap-4 items-start w-full"
          >
            <MVLReadOnlyInput
              label="Customer Name"
              name="customerName"
              size="small"
              disabled={
                saveStatus === "saving" ||
                saveAndSaveStatus === "saving" ||
                saveAndSaveStatus === "sending"
              }
            />
            <MVLReadOnlyInput
              label="Customer Email"
              name="customerEmail"
              size="small"
              disabled={
                saveStatus === "saving" ||
                saveAndSaveStatus === "saving" ||
                saveAndSaveStatus === "sending"
              }
            />
            <MVLReadOnlyInput
              label="Project Address"
              name="projectAddress"
              size="small"
              disabled={
                saveStatus === "saving" ||
                saveAndSaveStatus === "saving" ||
                saveAndSaveStatus === "sending"
              }
            />
          </Box>
          <Box
            component="div"
            className="flex flex-col gap-4 items-start w-full"
          >
            <MVLReadOnlyInput
              label="Contractor Name"
              name="contractorName"
              size="small"
              disabled={
                saveStatus === "saving" ||
                saveAndSaveStatus === "saving" ||
                saveAndSaveStatus === "sending"
              }
            />
            <MVLReadOnlyInput
              label="Contractor Address"
              name="contractorAddress"
              size="small"
              disabled={
                saveStatus === "saving" ||
                saveAndSaveStatus === "saving" ||
                saveAndSaveStatus === "sending"
              }
            />
            <MVLPhoneNumber
              label="Contractor Phone"
              name="contractorPhone"
              size="small"
              readonly
              disabled={
                saveStatus === "saving" ||
                saveAndSaveStatus === "saving" ||
                saveAndSaveStatus === "sending"
              }
            />
          </Box>
        </div>
        <div className="flex flex-col gap-2 desktop:gap-4">
          <Button
            type="button"
            onClick={() => {
              prepend({
                id: newId.toString(),
                item: "",
                description: "",
                quantity: "0",
                rateType: "Unit",
                price: "0",
                amount: "0",
              });
            }}
            className="w-full desktop:w-56"
            variant="contained"
            disabled={
              saveStatus === "saving" ||
              saveAndSaveStatus === "saving" ||
              saveAndSaveStatus === "sending"
            }
          >
            New Line Item
          </Button>
          <EstimateFormTable
            fields={fields}
            remove={remove}
            saveStatus={saveStatus}
            saveAndSaveStatus={saveAndSaveStatus}
          />
        </div>
        <div className="flex flex-col desktop:flex-row gap-4">
          <div className="flex-grow">
            <TextAreaInput
              name="message"
              label="Message"
              disabled={
                saveStatus === "saving" ||
                saveAndSaveStatus === "saving" ||
                saveAndSaveStatus === "sending"
              }
            />
          </div>
          <div className="flex justify-end">
            <EstimateFormModes
              saveStatus={saveStatus}
              saveAndSaveStatus={saveAndSaveStatus}
            />
          </div>
          <div className="flex justify-end">
            <TaxAndTotal
              saveStatus={saveStatus}
              saveAndSaveStatus={saveAndSaveStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateFormPartTwo;
