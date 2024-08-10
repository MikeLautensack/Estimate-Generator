import { TextField } from "@mui/material";
import React from "react";
import { FieldError, useController, useFormContext } from "react-hook-form";

type FieldArrayTextInputProps = {
  name: string;
  label?: string;
  size?: any;
  readonly?: boolean;
  disabled?: boolean;
  type?: string;
  index: number;
  inputName: string;
};

const FieldArrayTextInput = ({
  name,
  label,
  size = "normal",
  readonly,
  disabled,
  type,
  index,
  inputName,
}: FieldArrayTextInputProps) => {
  // Hooks
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <TextField
      sx={{
        "& .MuiInputBase-input": {
          backgroundColor: "surfaceContainerHighest",
        },
      }}
      label={label}
      fullWidth
      size={size}
      disabled={disabled}
      slotProps={{
        input: {
          readOnly: readonly,
        },
      }}
      type={type}
      error={!!errors[name]}
      helperText={errors[name]?.message as React.ReactNode}
      {...field}
    />
  );
};

export default FieldArrayTextInput;
