import { TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";

type MVLPhoneNumberProps = {
  name: string;
  label: string;
  size?: any;
  readonly?: boolean;
  disabled?: boolean;
};

const MVLPhoneNumber = ({
  name,
  label,
  size,
  readonly,
  disabled,
}: MVLPhoneNumberProps) => {
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
      disabled={disabled}
      {...field}
    />
  );
};

export default MVLPhoneNumber;
