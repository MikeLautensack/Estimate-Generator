import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type MVLMoneyInputProps = {
  name: string;
  label: string;
  size?: any;
  readonly?: boolean;
  disabled?: boolean;
};

// This is a branch level component
const MVLMoneyInput = ({
  name,
  label,
  size = "normal",
  readonly,
  disabled,
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
      sx={{ backgroundColor: "surfaceContainerHighest" }}
      fullWidth
      slotProps={{
        input: {
          readOnly: readonly,
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        },
      }}
      disabled={disabled}
      {...field}
    />
  );
};

export default MVLMoneyInput;
