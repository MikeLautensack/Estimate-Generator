"use client";

import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

type MVLAutocompleteProps = {
  name: string;
  label?: string;
  options: string[];
  size?: any;
};

const MVLAutocomplete = ({
  name,
  label,
  options,
  size,
}: MVLAutocompleteProps) => {
  // Hooks
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { field } = useController({
    control,
    name,
    defaultValue: {},
  });

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ backgroundColor: "surfaceContainerHighest" }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_, value: string) => {
        setValue(name, value);
      }}
      value={field ? field.value : ""}
      fullWidth
      size={size}
    />
  );
};

export default MVLAutocomplete;
