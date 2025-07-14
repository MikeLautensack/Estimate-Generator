"use client";

import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useController, useFormContext } from "react-hook-form";

type AutocompleteInputProps = {
  name: string;
  label?: string;
  options: any[];
  size?: any;
  idAsValue?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
};

type Option = {
  label: string;
  id?: string;
  value?: string;
};

const AutocompleteInput = ({
  name,
  label,
  options,
  size,
  idAsValue = false,
  disabled,
  loading,
  onLoadMore,
  hasMore = false,
}: AutocompleteInputProps) => {
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

  // Ref for the listbox element
  const listboxRef = useRef<HTMLUListElement>(null);

  // Find the selected option based on the current field value
  const getSelectedOption = () => {
    if (!field.value) return null;

    if (idAsValue) {
      return (
        options.find(
          (option) => option.id === field.value || option.value === field.value,
        ) || null
      );
    } else {
      return options.find((option) => option.label === field.value) || null;
    }
  };

  const selectedOption = getSelectedOption();

  // Handle scroll to detect when user reaches bottom
  const handleListboxScroll = (event: React.SyntheticEvent) => {
    const listbox = event.currentTarget as HTMLUListElement;
    const { scrollTop, scrollHeight, clientHeight } = listbox;

    // Check if scrolled to bottom (with a small threshold)
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (hasMore && onLoadMore && !loading) {
        onLoadMore();
      }
    }
  };

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
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!errors[name]}
          helperText={errors[name]?.message as React.ReactNode}
          // sx={{ backgroundColor: "surfaceContainerHighest" }}
        />
      )}
      onChange={(_, newValue: Option | null) => {
        if (newValue) {
          if (idAsValue) {
            field.onChange(newValue.id || newValue.value || "");
          } else {
            field.onChange(newValue.label || "");
          }
        } else {
          field.onChange("");
        }
      }}
      getOptionLabel={(option) => option?.label || ""}
      isOptionEqualToValue={(option, value) => {
        if (idAsValue) {
          return option.id === value?.id || option.value === value?.value;
        } else {
          return option.label === value?.label;
        }
      }}
      value={selectedOption}
      fullWidth
      size={size}
      disabled={disabled}
      loading={loading}
      ListboxProps={{
        onScroll: handleListboxScroll,
        style: { maxHeight: 200 },
      }}
    />
  );
};

export default AutocompleteInput;
