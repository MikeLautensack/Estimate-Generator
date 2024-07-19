import { TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

type TextInputProps = {
  name: string;
  label?: string;
  size?: any;
  readonly?: boolean;
};

const TextInput = ({
  name,
  label,
  size = "normal",
  readonly,
}: TextInputProps) => {
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
      label={label}
      fullWidth
      size={size}
      slotProps={{
        input: {
          readOnly: readonly,
        },
      }}
      {...field}
    />
  );
};

export default TextInput;
