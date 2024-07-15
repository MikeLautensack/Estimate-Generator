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
      sx={{ backgroundColor: "surfaceContainerHighest" }}
      renderInput={(params) => <TextField {...params} label={label} />}
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
    />
  );
};

export default MVLAutocomplete;
