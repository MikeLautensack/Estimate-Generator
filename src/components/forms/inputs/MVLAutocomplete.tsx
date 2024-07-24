"use client";

import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

type MVLAutocompleteProps = {
  name: string;
  label?: string;
  options: any[];
  size?: any;
  idAsValue?: boolean;
  disabled?: boolean;
};

type Option = {
  label: string;
  id: string;
};

const MVLAutocomplete = ({
  name,
  label,
  options,
  size,
  idAsValue = false,
  disabled,
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
  });

  // State
  const [val, setVal] = useState("");

  // Effects
  useEffect(() => {
    if (field) {
      if (idAsValue) {
        for (let i = 0; i < options.length; i++) {
          if (options[i].id === field.value) {
            setVal(options[i].label);
          }
        }
      } else {
        setVal(field.value);
      }
    } else {
      setVal("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{
        "& .MuiAutocomplete-inputRoot": {
          backgroundColor: "surfaceContainerHighest",
          padding: 0, // Remove padding from the input
        },
        "& .MuiOutlinedInput-root": {
          backgroundColor: "surfaceContainerHighest",
          padding: "0.5rem", // Adjust padding as needed
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent", // Adjust if border color needs change
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!errors[name]}
          helperText={errors[name]?.message as React.ReactNode}
        />
      )}
      onChange={(_, newValue: any) => {
        if (idAsValue) {
          setValue(name, newValue.id);
          setVal(newValue.label);
        } else {
          setValue(name, newValue.label);
          setVal(newValue.label);
        }
      }}
      value={val}
      fullWidth
      size={size}
      disabled={disabled}
    />
  );
};

export default MVLAutocomplete;
