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
    setValue,
  } = useFormContext();

  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <PatternFormat
      type="tel"
      customInput={TextField}
      format="(###) ###-####"
      mask="_"
      sx={{
        "& .MuiInputBase-input": {
          backgroundColor: "surfaceContainerHighest",
        },
      }}
      label={label}
      fullWidth
      slotProps={{
        input: {
          readOnly: readonly,
        },
      }}
      size={size}
      disabled={disabled}
      error={!!errors[name]}
      helperText={errors[name]?.message as React.ReactNode}
      {...field}
    />
  );
};

export default MVLPhoneNumber;
