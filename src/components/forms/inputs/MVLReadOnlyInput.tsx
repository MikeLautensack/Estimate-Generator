import { Box, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";

type MVLReadOnlyInputProps = {
  name?: string;
  label?: string;
  prefix?: string;
  value?: string;
  size?: any;
};

const MVLReadOnlyInput = ({
  name,
  label,
  prefix,
  value,
  size,
}: MVLReadOnlyInputProps) => {
  // State
  const [val, setVal] = useState<string>("");
  // Hooks
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  // Effects
  useEffect(() => {
    if (name) {
      const val = watch(name);
      setVal(val);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    />
  );
};

export default MVLReadOnlyInput;
