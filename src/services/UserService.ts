import {
  insertUserSchema,
  selectUserSchema,
  UsersInsert,
} from "@/db/schemas/auth";
import { NextRequest } from "next/server";
import { z } from "zod";

class UserService {
  static validateInsertRequest = async (
    request: NextRequest,
  ): Promise<UsersInsert> => {
    try {
      const requestBody = await request.json();
      const validatedData = insertUserSchema.parse(requestBody);
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
  ): Promise<UsersInsert> => {
    try {
      const requestBody = await request.json();
      const validatedData = selectUserSchema.parse(requestBody);
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

export default UserService;
