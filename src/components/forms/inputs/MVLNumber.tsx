import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type MVLNumberProps = {
  name: string;
  label: string;
  size?: any;
  readonly?: boolean;
};

const MVLNumber = ({ name, label, size, readonly }: MVLNumberProps) => {
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
      size={size}
      {...field}
    />
  );
};

export default MVLNumber;
