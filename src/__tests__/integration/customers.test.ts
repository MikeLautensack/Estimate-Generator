import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/v1/customers/route";
// import { createMockRequest } from "./test-setup";

// Mock the IoCContainer and its dependencies
jest.mock("@/core/IoCContainer", () => ({
  authUseCases: {
    getUser: jest.fn(),
  },
  customersUseCases: {
    getCustomers: jest.fn(),
    createCustomer: jest.fn(),
  },
}));

import IoCContainer from "@/core/IoCContainer";

const mockIoCContainer = IoCContainer as jest.Mocked<typeof IoCContainer>;

// Ensure the mocks are properly typed
const mockGetUser = mockIoCContainer.authUseCases
  .getUser as jest.MockedFunction<typeof mockIoCContainer.authUseCases.getUser>;
const mockGetCustomers = mockIoCContainer.customersUseCases
  .getCustomers as jest.MockedFunction<
  typeof mockIoCContainer.customersUseCases.getCustomers
>;
const mockCreateCustomer = mockIoCContainer.customersUseCases
  .createCustomer as jest.MockedFunction<
  typeof mockIoCContainer.customersUseCases.createCustomer
>;

describe("GET /api/v1/customers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return customers successfully", async () => {
    // Arrange
    const mockUser = {
      id: "user-123",
      email: "contractor@example.com",
      role: "contractor",
    };

    const mockCustomers = [
      {
        id: "customer-1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "555-1234",
        contractor_user_id: "user-123",
        customer_user_id: "customer-user-1",
        address: "123 Main St",
        address2: "",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        createdAt: "2025-09-02T20:40:42.995Z",
        updatedAt: "2025-09-02T20:40:42.995Z",
        deletedAt: null,
      },
      {
        id: "customer-2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "555-5678",
        contractor_user_id: "user-123",
        customer_user_id: "customer-user-2",
        address: "456 Oak St",
        address2: "",
        city: "Somewhere",
        state: "NY",
        zip: "67890",
        createdAt: "2025-09-02T20:40:42.995Z",
        updatedAt: "2025-09-02T20:40:42.995Z",
        deletedAt: null,
      },
    ];

    mockGetUser.mockResolvedValue(mockUser);
    // mockGetCustomers.mockResolvedValue(mockCustomers);

    // const request = createMockRequest({
    //   method: "GET",
    //   url: "http://localhost:3000/api/v1/customers?offset=0&limit=10",
    // });

    // Act
    // const response = await GET(request);

    // Assert
    expect(mockGetUser).toHaveBeenCalledTimes(1);
    expect(mockGetCustomers).toHaveBeenCalledWith("user-123", "0", "10", {
      role: "contractor",
    });
    // expect(response.status).toBe(200);
    // const responseData = await response.json();
    // expect(responseData).toEqual(mockCustomers);
  });

  // test("should use default pagination parameters when not provided", async () => {
  //   // Arrange
  //   const mockUser = {
  //     id: "user-123",
  //     email: "contractor@example.com",
  //     role: "contractor",
  //   };

  //   const mockCustomers: any[] = [];

  //   mockGetUser.mockResolvedValue(mockUser);
  //   mockGetCustomers.mockResolvedValue(mockCustomers);

  //   const request = createMockRequest({
  //     method: "GET",
  //     url: "http://localhost:3000/api/v1/customers",
  //   });

  //   // Act
  //   const response = await GET(request);

  //   // Assert
  //   expect(mockGetCustomers).toHaveBeenCalledWith("user-123", "0", "10", {
  //     role: "contractor",
  //   });
  //   expect(response.status).toBe(200);
  // });

  // test("should return 401 when user is not authenticated", async () => {
  //   // Arrange
  //   mockGetUser.mockResolvedValue(null);

  //   const request = createMockRequest({
  //     method: "GET",
  //     url: "http://localhost:3000/api/v1/customers",
  //   });

  //   // Act
  //   const response = await GET(request);

  //   // Assert
  //   expect(response.status).toBe(401);
  //   const responseData = await response.json();
  //   expect(responseData).toEqual({ error: "Unauthorized" });
  //   expect(mockGetCustomers).not.toHaveBeenCalled();
  // });

  // test("should handle errors during customer retrieval", async () => {
  //   // Arrange
  //   const mockUser = {
  //     id: "user-123",
  //     email: "contractor@example.com",
  //     role: "contractor",
  //   };

  //   mockGetUser.mockResolvedValue(mockUser);
  //   mockGetCustomers.mockRejectedValue(new Error("Database connection failed"));

  //   const request = createMockRequest({
  //     method: "GET",
  //     url: "http://localhost:3000/api/v1/customers",
  //   });

  //   // Act
  //   const response = await GET(request);

  //   // Assert
  //   expect(response.status).toBe(500);
  //   const responseData = await response.json();
  //   expect(responseData.error).toBe("Database connection failed");
  // });
});

// describe("POST /api/v1/customers", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("should create a customer successfully", async () => {
//     // Arrange
//     const mockUser = {
//       id: "user-123",
//       email: "contractor@example.com",
//       role: "contractor",
//     };

//     const customerData = {
//       firstName: "John",
//       lastName: "Doe",
//       email: "john@example.com",
//       phone: "555-1234",
//       address: "123 Main St",
//       address2: "",
//       city: "Anytown",
//       state: "CA",
//       zip: "12345",
//     };

//     mockGetUser.mockResolvedValue(mockUser);
//     mockCreateCustomer.mockResolvedValue();

//     const request = createMockRequest({
//       method: "POST",
//       url: "http://localhost:3000/api/v1/customers",
//       body: customerData,
//     });

//     // Act
//     const response = await POST(request);

//     // Assert
//     expect(mockGetUser).toHaveBeenCalledTimes(1);
//     expect(mockCreateCustomer).toHaveBeenCalledWith({
//       ...customerData,
//       contractor_user_id: "user-123",
//     });
//     expect(response.status).toBe(201);
//     const responseData = await response.json();
//     expect(responseData).toEqual({
//       message: "Customer successfully created",
//       customer: customerData,
//     });
//   });

//   test("should return 401 when user is not authenticated", async () => {
//     // Arrange
//     mockGetUser.mockResolvedValue(null);

//     const customerData = {
//       firstName: "John",
//       lastName: "Doe",
//       email: "john@example.com",
//       phone: "555-1234",
//     };

//     const request = createMockRequest({
//       method: "POST",
//       url: "http://localhost:3000/api/v1/customers",
//       body: customerData,
//     });

//     // Act
//     const response = await POST(request);

//     // Assert
//     expect(response.status).toBe(401);
//     const responseData = await response.json();
//     expect(responseData).toEqual({ error: "Unauthorized" });
//     expect(mockCreateCustomer).not.toHaveBeenCalled();
//   });

//   test("should handle errors during customer creation", async () => {
//     // Arrange
//     const mockUser = {
//       id: "user-123",
//       email: "contractor@example.com",
//       role: "contractor",
//     };

//     const customerData = {
//       firstName: "John",
//       lastName: "Doe",
//       email: "john@example.com",
//       phone: "555-1234",
//     };

//     mockGetUser.mockResolvedValue(mockUser);
//     mockCreateCustomer.mockRejectedValue(new Error("Email already exists"));

//     const request = createMockRequest({
//       method: "POST",
//       url: "http://localhost:3000/api/v1/customers",
//       body: customerData,
//     });

//     // Act
//     const response = await POST(request);

//     // Assert
//     expect(response.status).toBe(500);
//     const responseData = await response.json();
//     expect(responseData.error).toBe("Email already exists");
//   });

//   test("should handle malformed request body", async () => {
//     // Arrange
//     const mockUser = {
//       id: "user-123",
//       email: "contractor@example.com",
//       role: "contractor",
//     };

//     mockGetUser.mockResolvedValue(mockUser);

//     const request = createMockRequest({
//       method: "POST",
//       url: "http://localhost:3000/api/v1/customers",
//       body: "invalid json",
//     });

//     // Act
//     const response = await POST(request);

//     // Assert
//     expect(response.status).toBe(500);
//     const responseData = await response.json();
//     expect(responseData.error).toBeDefined();
//   });
// });
