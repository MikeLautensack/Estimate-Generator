import { useEffect, useReducer } from "react";
import { Box, Divider } from "@mui/material";
import TextInput from "./TextInput";
import MVLAutocomplete from "./MVLAutocomplete";
import { states } from "@/utils/states";
import MVLStates from "./MVLStates";

type Address = {
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
};

type MVLAddressProps = {
  addressInputNames: Address;
  watchedInput?: string;
  watchedInputAssociatedAddressData?: any[];
};

type AddressAction =
  | { type: "setAddress"; payload: string }
  | { type: "setAddress2"; payload: string }
  | { type: "setCity"; payload: string }
  | { type: "setState"; payload: string }
  | { type: "setZip"; payload: string };

const reducer = (state: Address, action: AddressAction) => {
  switch (action.type) {
    case "setAddress":
      return { ...state, address: action.payload };
    case "setAddress2":
      return { ...state, address2: action.payload };
    case "setCity":
      return { ...state, city: action.payload };
    case "setState":
      return { ...state, state: action.payload };
    case "setZip":
      return { ...state, zip: action.payload };
    default:
      return state;
  }
};

const MVLAddressInput = ({
  addressInputNames,
  watchedInput = "",
  watchedInputAssociatedAddressData = [],
}: MVLAddressProps) => {
  // State
  const [address, dispatch] = useReducer(reducer, {
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  return (
    <div className="flex flex-col gap-4 justify-start items-start w-full">
      {/* Address line 1 */}
      <TextInput label={"Address"} name={addressInputNames?.address} />

      {/* Address line 2 */}
      <TextInput label={"Address Line 2"} name={addressInputNames?.address2} />

      <div className="flex gap-4 justify-center items-center w-full">
        {/* City */}
        <div className="w-1/3">
          <TextInput label={"City"} name={addressInputNames?.city} />
        </div>

        {/* State */}
        <div className="w-1/3">
          <MVLStates
            label={"State"}
            name={addressInputNames?.state}
            options={states}
          />
        </div>

        {/* Zip */}
        <div className="w-1/3">
          <TextInput label={"Zip"} name={addressInputNames?.zip} />
        </div>
      </div>
    </div>
  );
};

export default MVLAddressInput;
