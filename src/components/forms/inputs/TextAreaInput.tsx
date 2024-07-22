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
      sx={{ backgroundColor: "surfaceContainerHighest" }}
      id="outlined-multiline-static"
      label={label}
      multiline
      rows={7.61}
      defaultValue=""
      fullWidth
      disabled={disabled}
      {...field}
    />
  );
};

export default TextAreaInput;
