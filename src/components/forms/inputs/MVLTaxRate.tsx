import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type MVLTaxRateProps = {
  name: string;
  label: string;
  size?: any;
  readonly?: boolean;
};

const MVLTaxRate = ({ name, label, size, readonly }: MVLTaxRateProps) => {
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
      allowNegative={false}
      isAllowed={(values) => {
        const { floatValue } = values;
        return (
          floatValue === undefined || (floatValue >= 0 && floatValue <= 100)
        );
      }}
      size={size}
      label={label}
      sx={{ backgroundColor: "surfaceContainerHighest" }}
      fullWidth
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

export default MVLTaxRate;
