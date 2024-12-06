import { db } from "@/db";
import { users, UsersInsert } from "@/db/schemas/auth";
import {
  customers,
  CustomersInsert,
  insertCustomerSchema,
  selectCustomerSchema,
} from "@/db/schemas/customers";
import { fetchData } from "@/utils/fetch";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
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

  static insertNewCustomer = async (customer: CustomersInsert) => {
    try {
      await db.insert(customers).values(customer);
    } catch (error) {
      throw new Error("Error inserting customer");
    }
  };

  static createNewCustomerUser = async (customer: CustomersInsert) => {
    try {
      const res = await fetchData(
        `${process.env.NEXT_PUBLIC_HOST}api/users/${customer.customer_user_id}`,
        "POST",
        {
          email: customer.email,
          role: "customer",
          newUser: true,
        },
      );
      return res;
    } catch (error: any) {
      throw new Error("Error creating customer user");
    }
  };

  static updateCustomer = async (customer: CustomersInsert, id: string) => {
    let customerUser;

    try {
      await db
        .update(customers)
        .set({
          address: customer.address,
          address2: customer.address2,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          updatedAt: new Date(),
        })
        .where(eq(customers.id, id));
    } catch (error) {
      throw new Error("Error updating customer");
    }

    try {
      customerUser = await db
        .update(users)
        .set({
          email: customer.email,
          name: `${customer.firstName} ${customer.lastName}`,
          updatedAt: new Date(),
        })
        .where(eq(users.id, customer.customer_user_id));
    } catch (error) {
      throw new Error("Error updating customer user");
    }
  };

  static deleteCustomer = async (id: string) => {
    try {
      await db.delete(customers).where(eq(customers.id, id));
    } catch (error) {
      throw new Error("Error deleting customer");
    }
  };
}

export default CustomerService;
