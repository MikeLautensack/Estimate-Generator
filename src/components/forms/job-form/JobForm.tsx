import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import { insertCustomerSchema, JobsInsert } from "@/db/schemas/jobs";
import MVLAutocomplete from "../inputs/MVLAutocomplete";

const jobFormSchema = insertCustomerSchema.omit({
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      status: "draft",
      currency: "USD",
    },
  });

  const onSubmit = async (formData: JobFormData) => {
    let method = "POST";
    if (mode === "create") method = "POST";
    if (mode === "update") method = "PUT";
    if (mode === "delete") method = "DELETE";

    const body: JobsInsert = {
      contractor_user_id: "",
      customer_user_id: "",
      customer_id: "",
      name: formData.name,
      description: formData.description,
      estimate_amount: formData.estimate_amount,
      actual_amount: "",
      currency: "",
      start_date: "",
      end_date: "",
      address: "",
    };

    const response = await fetch("/api/jobs", {
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify(body),
    });

    if (response.ok) {
    } else {
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", maxWidth: 600 }}
    >
      <Typography variant="h6" gutterBottom>
        Create New Job
      </Typography>

      <TextField
        fullWidth
        label="Job Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
        margin="normal"
      />

      <MVLAutocomplete
        name="customer_id"
        label="Customer"
        options={[
          { label: "Unit Rate" },
          { label: "SQFT" },
          { label: "LNFT" },
          { label: "Hourly" },
          { label: "Daily" },
          { label: "Flat Rate" },
        ]}
        size="small"
        // disabled={
        //   saveStatus === "saving" ||
        //   saveAndSaveStatus === "saving" ||
        //   saveAndSaveStatus === "sending"
        // }
      />

      <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained">
          Create Job
        </Button>
      </Box>
    </Box>
  );
};

export default JobForm;
