import { TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

type TextInputProps = {
  name: string;
  label?: string;
};

const TextAreaInput = ({ name, label }: TextInputProps) => {
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
      {...field}
    />
  );
};

export default TextAreaInput;
