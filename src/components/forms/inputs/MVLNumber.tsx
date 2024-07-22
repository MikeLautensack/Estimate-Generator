import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type MVLNumberProps = {
  name: string;
  label: string;
  size?: any;
  readonly?: boolean;
  disabled?: boolean;
};

const MVLNumber = ({
  name,
  label,
  size,
  readonly,
  disabled,
}: MVLNumberProps) => {
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
      fixedDecimalScale={true}
      decimalScale={0}
      valueIsNumericString
      thousandSeparator
      sx={{ backgroundColor: "surfaceContainerHighest" }}
      fullWidth
      disabled={disabled}
      slotProps={{
        input: {
          readOnly: readonly,
        },
      }}
      size={size}
      {...field}
    />
  );
};

export default MVLNumber;
