import { TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

type TextInputProps = {
  name: string;
  label?: string;
  size?: any;
  readonly?: boolean;
  disabled?: boolean;
  type?: string;
};

const TextInput = ({
  name,
  label,
  size = "normal",
  readonly,
  disabled,
  type,
}: TextInputProps) => {
  // Hooks
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    control,
    name,
  });

  return (
    <TextField
      sx={{ backgroundColor: "surfaceContainerHighest" }}
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
      {...field}
    />
  );
};

export default TextInput;
