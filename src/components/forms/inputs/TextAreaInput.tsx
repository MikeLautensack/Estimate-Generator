import { TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

type TextInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
};

const TextAreaInput = ({ name, label, disabled }: TextInputProps) => {
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
    <TextField
      sx={{
        "& .MuiInputBase-input": {
          backgroundColor: "surfaceContainerHighest",
          padding: 0, // Remove padding from the input
        },
        "& .MuiOutlinedInput-root": {
          padding: "1rem", // Add padding to the root to compensate
          backgroundColor: "surfaceContainerHighest", // Ensure root has background
        },
      }}
      id="outlined-multiline-static"
      label={label}
      multiline
      rows={7.61}
      defaultValue=""
      fullWidth
      disabled={disabled}
      error={!!errors[name]}
      helperText={errors[name]?.message as React.ReactNode}
      {...field}
    />
  );
};

export default TextAreaInput;
