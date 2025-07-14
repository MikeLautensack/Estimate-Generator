"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  insertCustomerSchema as insertJobSchema,
  JobsInsert,
} from "@/db/schemas/jobs";
import AutocompleteInput from "../inputs/AutocompleteInput";
import { useInfiniteCustomers } from "./useInfinateCustomers";
import { CustomersSelect } from "@/db/schemas/customers";

const jobFormSchema = insertJobSchema.omit({
  id: true,
  contractor_user_id: true,
  customer_user_id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

type JobFormData = z.infer<typeof jobFormSchema>;
type FormMode = "create" | "update" | "delete";

type JobFormProps = {
  mode: FormMode;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

const JobForm = ({
  mode,
  isModalOpen,
  handleOpenModal,
  handleCloseModal,
}: JobFormProps) => {
  // Hooks
  const methods = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      status: "draft",
      currency: "USD",
    },
  });
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteCustomers();

  // State
  const [customerOptions, setCustomerOptions] = useState<
    { label: string; id: string }[]
  >([]);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const customerOptions = data?.pages.flat().map((c: CustomersSelect) => ({
      label: `${c.firstName} ${c.lastName}`,
      id: c.id,
    }));
    setCustomerOptions(customerOptions || []);
  }, [data, hasNextPage, isLoading]);

  // Event Handlers
  const handleLoadMore = () => {
    fetchNextPage();
  };

  const resetForm = () => {
    methods.reset();
    setShowStartDate(false);
    setShowEndDate(false);
    setShowAddress(false);
    setSubmitMessage(null);
  };

  const onSubmit = async (formData: JobFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      let method = "POST";
      if (mode === "create") method = "POST";
      if (mode === "update") method = "PUT";
      if (mode === "delete") method = "DELETE";

      const customer: CustomersSelect = data?.pages
        .flat()
        .find(
          (customer: CustomersSelect) => customer.id === formData.customer_id,
        );
      const customerUserId = customer.customer_user_id;

      const body = {
        customer_user_id: customerUserId,
        customer_id: formData.customer_id,
        name: formData.name,
        description: formData.description,
        estimate_amount: formData.estimate_amount,
        start_date: showStartDate ? formData.start_date : null,
        end_date: showEndDate ? formData.end_date : null,
        address: showAddress ? formData.address : null,
      };

      const response = await fetch("/api/jobs", {
        headers: {
          "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          message: "Job created successfully!",
        });
        resetForm();
      } else {
        const errorData = await response.json();
        setSubmitMessage({
          type: "error",
          message: errorData.error || "Failed to create job",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <FormProvider {...methods}>
        <Typography variant="h6" gutterBottom>
          Create New Job
        </Typography>

        {submitMessage && (
          <Alert
            severity={submitMessage.type}
            sx={{ mb: 2 }}
            onClose={() => setSubmitMessage(null)}
          >
            {submitMessage.message}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Job Name"
          {...methods.register("name")}
          error={!!methods.formState.errors.name}
          helperText={methods.formState.errors.name?.message}
          margin="normal"
          disabled={isSubmitting}
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          {...methods.register("description")}
          error={!!methods.formState.errors.description}
          helperText={methods.formState.errors.description?.message}
          margin="normal"
          disabled={isSubmitting}
        />

        <AutocompleteInput
          name="customer_id"
          label="Customer"
          options={customerOptions ? customerOptions : []}
          size="small"
          loading={isLoading}
          onLoadMore={handleLoadMore}
          hasMore={hasNextPage}
          idAsValue={true}
          disabled={isSubmitting}
        />

        {/* Optional Fields Section */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Optional Fields
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={showStartDate}
                onChange={(e) => setShowStartDate(e.target.checked)}
                disabled={isSubmitting}
              />
            }
            label="Add Start Date"
          />

          {showStartDate && (
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              {...methods.register("start_date")}
              error={!!methods.formState.errors.start_date}
              helperText={methods.formState.errors.start_date?.message}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={isSubmitting}
            />
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={showEndDate}
                onChange={(e) => setShowEndDate(e.target.checked)}
                disabled={isSubmitting}
              />
            }
            label="Add End Date"
          />

          {showEndDate && (
            <TextField
              fullWidth
              type="date"
              label="End Date"
              {...methods.register("end_date")}
              error={!!methods.formState.errors.end_date}
              helperText={methods.formState.errors.end_date?.message}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={isSubmitting}
            />
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={showAddress}
                onChange={(e) => setShowAddress(e.target.checked)}
                disabled={isSubmitting}
              />
            }
            label="Add Address"
          />

          {showAddress && (
            <TextField
              fullWidth
              label="Address"
              {...methods.register("address")}
              error={!!methods.formState.errors.address}
              helperText={methods.formState.errors.address?.message}
              margin="normal"
              disabled={isSubmitting}
            />
          )}
        </Box>
      </FormProvider>

      <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? "Creating..." : "Create Job"}
        </Button>
      </Box>
    </Box>
  );
};

export default JobForm;
