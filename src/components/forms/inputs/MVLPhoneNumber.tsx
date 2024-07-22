import { TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { NumericFormat, PatternFormat } from "react-number-format";

type MVLNumberProps = {
  name: string;
  label: string;
  size?: any;
  readonly?: boolean;
};

const MVLPhoneNumber = ({ name, label, size, readonly }: MVLNumberProps) => {
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
    <PatternFormat
      customInput={TextField}
      format="(###) ###-####"
      valueIsNumericString
      sx={{ backgroundColor: "surfaceContainerHighest" }}
      fullWidth
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

export default MVLPhoneNumber;
