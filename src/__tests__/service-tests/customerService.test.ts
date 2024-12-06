import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { NextRequest } from "next/server";
import CustomerService from "@/services/CustomerService";
import { CustomersInsert } from "@/db/schemas/customers";

// Mock dependencies
jest.mock("@/db", () => ({
  db: {
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("@/utils/fetch", () => ({
  fetchData: jest.fn(),
}));

describe("Customer service tests", () => {
  // Performance measurement setup
  const measurePerformance =
    (fn: () => Promise<any>, label: string) => async () => {
      if (process.env.LOG_PERFORMANCE === "true") {
        const start = performance.now();
        await fn();
        const end = performance.now();
        console.log(
          `${label} Performance: ${(end - start).toFixed(2)} milliseconds`,
        );
      } else {
        await fn();
      }
    };

  // Sample valid customer data for testing
  const validMockCustomer: CustomersInsert = {
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
    customer_user_id: "00000000-0000-0000-0000-000000000001",
    contractor_user_id: "00000000-0000-0000-0000-000000000002",
    address: "123 Test St",
    address2: "dfsadf",
    city: "Testville",
    state: "TS",
    zip: "12345",
    phone: "555-1234",
  };

  describe("Validation tests", () => {
    test(
      "validateInsertRequest handles valid input",
      measurePerformance(async () => {
        const mockRequest = {
          json: jest.fn().mockResolvedValue(validMockCustomer),
        } as unknown as NextRequest;

        const result = await CustomerService.validateInsertRequest(mockRequest);
        expect(result).toEqual(validMockCustomer);
      }, "Valid Input Test"),
    );

    test(
      "validateInsertRequest handles invalid input",
      measurePerformance(async () => {
        const mockRequest = {
          json: jest.fn().mockResolvedValue({}),
        } as unknown as NextRequest;

        await expect(
          CustomerService.validateInsertRequest(mockRequest),
        ).rejects.toThrow();
      }, "Invalid Input Test"),
    );
  });
});
