import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type MVLPercentProps = {
  name: string;
  label: string;
  size?: any;
  readonly?: boolean;
  disabled: boolean;
};

const MVLPercent = ({
  name,
  label,
  size,
  readonly,
  disabled,
}: MVLPercentProps) => {
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
      valueIsNumericString
      size={size}
      label={label}
      sx={{ backgroundColor: "surfaceContainerHighest" }}
      fullWidth
      disabled={disabled}
      slotProps={{
        input: {
          readOnly: readonly,
          startAdornment: <InputAdornment position="start">%</InputAdornment>,
        },
      }}
      {...field}
    />
  );
};

export default MVLPercent;
