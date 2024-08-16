"use client";

import { SubmitHandler, useFormContext } from "react-hook-form";
import EstimateFormTable from "../../tables/contractorTables/estimateFormTable/EstimateFormTable";
import TextInput from "../inputs/TextInput";
import { Box, Button, Divider, Typography } from "@mui/material";
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
import MVLAddressInput from "../inputs/MVLAddressInput";

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
  profile,
  fields,
  prepend,
  remove,
  saveStatus,
  saveAndSaveStatus,
}: EstimateFormPartTwoProps) => {
  // Hooks
  const { setValue } = useFormContext();

  // Values
  const businessName = profile.businessName;
  const businessAddress = profile.businessAddress;
  const businessAddress2 = profile.businessAddress2;
  const businessCity = profile.businessCity;
  const businessState = profile.businessState;
  const businessZip = profile.businessZip;
  const businessPhone = profile.businessPhone;

  // Effects
  useEffect(() => {
    setValue("contractorName", businessName);
    setValue("contractorAddress", businessAddress);
    setValue("contractorAddress2", businessAddress2);
    setValue("contractorCity", businessCity);
    setValue("contractorState", businessState);
    setValue("contractorZip", businessZip);
    setValue("contractorPhone", businessPhone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate id
  const newId = generateNumericId();

  return (
    <div className="p-4 flex flex-col gap-4 desktop:gap-4 w-full">
      <Typography variant="h6">Estimate Info</Typography>
      <TextInput
        name="estimateName"
        label="Estimate Name"
        disabled={
          saveStatus === "saving" ||
          saveAndSaveStatus === "saving" ||
          saveAndSaveStatus === "sending"
        }
      />
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <MVLReadOnlyInput
          label="Date Created"
          name="createdAt"
          size="small"
          type="date"
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
        <MVLReadOnlyInput
          label="Date Updated"
          name="updatedAt"
          size="small"
          type="date"
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
        <TextInput
          label="Expiration Date"
          name="expirationDate"
          size="small"
          type="date"
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
      </div>
      <Divider />
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 desktop:flex-row items-start pt-2 pb-4 w-full">
          <Box
            component="div"
            className="flex flex-col gap-4 items-start w-full desktop:w-1/2"
          >
            <Typography variant="h6">Customer Info</Typography>
            <div className="flex justify-center items-center gap-4 w-full">
              <MVLReadOnlyInput
                label="Customer First Name"
                name="customerFirstName"
                size="small"
                disabled={
                  saveStatus === "saving" ||
                  saveAndSaveStatus === "saving" ||
                  saveAndSaveStatus === "sending"
                }
              />
              <MVLReadOnlyInput
                label="Customer Last Name"
                name="customerLastName"
                size="small"
                disabled={
                  saveStatus === "saving" ||
                  saveAndSaveStatus === "saving" ||
                  saveAndSaveStatus === "sending"
                }
              />
            </div>
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
            <div className="w-full">
              <MVLAddressInput
                addressInputNames={{
                  address: "projectAddress",
                  address2: "projectAddress2",
                  city: "projectCity",
                  state: "projectState",
                  zip: "projectZip",
                }}
                size="small"
                disabled={
                  saveStatus === "saving" ||
                  saveAndSaveStatus === "saving" ||
                  saveAndSaveStatus === "sending"
                }
                readonly
              />
            </div>
          </Box>
          <Box
            component="div"
            className="flex flex-col gap-4 items-start w-full desktop:w-1/2"
          >
            <Typography variant="h6">Contractor Info</Typography>
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
            <MVLAddressInput
              addressInputNames={{
                address: "contractorAddress",
                address2: "contractorAddress2",
                city: "contractorCity",
                state: "contractorState",
                zip: "contractorZip",
              }}
              size="small"
              disabled={
                saveStatus === "saving" ||
                saveAndSaveStatus === "saving" ||
                saveAndSaveStatus === "sending"
              }
              readonly
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
