import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

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
      customInput={TextField}
      decimalScale={2}
      fixedDecimalScale={true}
      thousandSeparator
      valueIsNumericString
      size={size}
      {...field}
    />
  );
};

export default MVLMoneyInput;
