import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(25, "Password must be less than 25 characters."),
});

export default signInSchema;
