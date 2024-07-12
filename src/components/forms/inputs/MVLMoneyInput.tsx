import { TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import TextInput from "./TextInput";

type MVLMoneyInputProps = {
  name: string;
  label: string;
  size?: any;
  readonly?: boolean;
};

// This is a branch level component
const MVLMoneyInput = ({
  name,
  label,
  size = "normal",
  readonly,
}: MVLMoneyInputProps) => {
  // Hooks
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    control,
    name,
    defaultValue: {},
  });
  return (
    <NumericFormat
      customInput={TextInput}
      thousandSeparator
      valueIsNumericString
      readOnly={readonly}
      size={size}
      label={label}
      {...field}
    />
  );
};

export default MVLMoneyInput;
