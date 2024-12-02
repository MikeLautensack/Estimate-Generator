import {
  CustomersInsert,
  insertCustomerSchema,
  selectCustomerSchema,
} from "@/db/schemas/customers";
import { NextRequest } from "next/server";
import { z } from "zod";

class CustomerService {
  static validateInsertRequest = async (
    request: NextRequest,
  ): Promise<CustomersInsert> => {
    try {
      const requestBody = await request.json();
      const validatedData = insertCustomerSchema.parse(requestBody);
      return validatedData;
    } catch (error: any) {
      // If validation fails, Zod will throw an error
      if (error instanceof z.ZodError) {
        // Transform Zod errors into a more readable format
        const errorMessages = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        throw new Error(JSON.stringify(errorMessages));
      }

      // Re-throw any other unexpected errors
      throw error;
    }
  };

  static validateSelectRequest = async (
    request: NextRequest,
  ): Promise<CustomersInsert> => {
    try {
      const requestBody = await request.json();
      const validatedData = selectCustomerSchema.parse(requestBody);
      return validatedData;
    } catch (error: any) {
      // If validation fails, Zod will throw an error
      if (error instanceof z.ZodError) {
        // Transform Zod errors into a more readable format
        const errorMessages = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        throw new Error(JSON.stringify(errorMessages));
      }

      // Re-throw any other unexpected errors
      throw error;
    }
  };
}

export default CustomerService;
