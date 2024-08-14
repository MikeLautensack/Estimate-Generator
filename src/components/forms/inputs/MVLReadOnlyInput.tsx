import { Box, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";

type MVLReadOnlyInputProps = {
  name: string;
  label?: string;
  prefix?: string;
  value?: string;
  size?: any;
  disabled?: boolean;
  type?: string;
};

const MVLReadOnlyInput = ({
  name,
  label,
  prefix,
  value,
  size,
  disabled,
  type,
}: MVLReadOnlyInputProps) => {
  // State
  const [val, setVal] = useState<string>("");

  // Hooks
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  // Values
  const field = getValues(name);

  // Effects
  useEffect(() => {
    if (name) {
      const val = getValues(name);
      if (typeof val !== "string") {
        console.log(
          "testing type check in readonly input, typeof val: ",
          typeof val,
        );
        const stringVal = val.toString();
        setVal(stringVal);
      }
      setVal(val);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field]);

  return (
    <TextField
      sx={{ backgroundColor: "surfaceContainerHighest" }}
      label={label}
      variant="outlined"
      slotProps={{
        input: {
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ),
        },
      }}
      fullWidth
      value={name ? val : value}
      size={size}
      disabled={disabled}
      type={type}
    />
  );
};

export default MVLReadOnlyInput;
