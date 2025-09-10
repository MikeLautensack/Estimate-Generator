import { NextRequest } from "next/server";
import { POST } from "@/app/api/v1/estimates/route";
import { createMockRequest } from "./test-setup";

// Mock the IoCContainer and its dependencies
jest.mock("@/core/IoCContainer", () => ({
  authUseCases: {
    getUser: jest.fn(),
  },
  profilesUseCases: {
    getProfileByUserId: jest.fn(),
  },
  estimatesUseCases: {
    createDraft: jest.fn(),
  },
}));

// Mock the createDraftFactory
jest.mock("@/utils/factories/createDraftFactory", () => ({
  createDraftFactory: jest.fn(),
}));

import IoCContainer from "@/core/IoCContainer";
import { createDraftFactory } from "@/utils/factories/createDraftFactory";

const mockIoCContainer = IoCContainer as jest.Mocked<typeof IoCContainer>;
const mockCreateDraftFactory = createDraftFactory as jest.MockedFunction<
  typeof createDraftFactory
>;

// Ensure the mocks are properly typed
const mockGetUser = mockIoCContainer.authUseCases
  .getUser as jest.MockedFunction<typeof mockIoCContainer.authUseCases.getUser>;
const mockGetProfileByUserId = mockIoCContainer.profilesUseCases
  .getProfileByUserId as jest.MockedFunction<
  typeof mockIoCContainer.profilesUseCases.getProfileByUserId
>;
const mockCreateDraft = mockIoCContainer.estimatesUseCases
  .createDraft as jest.MockedFunction<
  typeof mockIoCContainer.estimatesUseCases.createDraft
>;

describe("POST /api/v1/estimates", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a draft estimate successfully", async () => {
    // Arrange
    const mockUser = {
      id: "user-123",
      email: "contractor@example.com",
      role: "contractor",
    };

    const mockProfile = {
      id: "profile-123",
      user_id: "user-123",
      profileImgKey: null,
      profileImgUrl: null,
      businessName: "Test Company",
      businessAddress: "123 Test St",
      businessAddress2: "",
      businessCity: "Test City",
      businessState: "TS",
      businessZip: "12345",
      businessPhone: "555-1234",
      businessEmail: "contractor@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const mockDraft = {
      userId: "user-123",
      customerId: "customer-123",
      estimateNumber: "",
      totalAmount: "0.00",
      contractorAddress: "123 Test St",
      contractorAddress2: "",
      contractorCity: "Test City",
      contractorState: "TS",
      contractorZip: "12345",
      contractorName: "Test Company",
      contractorPhone: "555-1234",
      customerEmail: "customer@example.com",
      customerFirstName: "John",
      customerLastName: "Doe",
      estimateName: "",
      expirationDate: null,
      message: "",
      projectAddress: "",
      projectAddress2: "",
      projectCity: "",
      projectState: "",
      projectZip: "",
      status: "Draft",
      subtotal: 0,
      tax: 0,
      taxMode: "",
      taxRate: 0,
      total: 0,
      discountMode: "",
      discountPercentage: 0,
      discount: 0,
      lineItems: [],
    };

    const mockCreatedEstimate = {
      id: "estimate-123",
      userId: "user-123",
      customerId: "customer-123",
      estimateNumber: "EST-001",
      totalAmount: "0.00",
      contractorAddress: "123 Test St",
      contractorAddress2: "",
      contractorCity: "Test City",
      contractorState: "TS",
      contractorZip: "12345",
      contractorName: "Test Company",
      contractorPhone: "555-1234",
      customerEmail: "customer@example.com",
      customerFirstName: "John",
      customerLastName: "Doe",
      estimateName: "",
      expirationDate: null,
      message: "",
      projectAddress: "",
      projectAddress2: "",
      projectCity: "",
      projectState: "",
      projectZip: "",
      status: "Draft",
      subtotal: 0,
      tax: 0,
      taxMode: "",
      taxRate: 0,
      total: 0,
      discountMode: "",
      discountPercentage: 0,
      discount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    mockGetUser.mockResolvedValue(mockUser);
    mockGetProfileByUserId.mockResolvedValue(mockProfile);
    mockCreateDraftFactory.mockResolvedValue(mockDraft);
    mockCreateDraft.mockResolvedValue(mockCreatedEstimate);

    const requestBody = {
      customerId: "550e8400-e29b-41d4-a716-446655440000", // Valid UUID
    };

    const request = createMockRequest({
      method: "POST",
      url: "http://localhost:3000/api/v1/estimates",
      body: requestBody,
    });

    // Act
    const response = await POST(request);

    // Assert
    expect(mockGetUser).toHaveBeenCalledTimes(1);
    expect(mockGetProfileByUserId).toHaveBeenCalledWith("user-123");
    expect(mockCreateDraftFactory).toHaveBeenCalledWith(
      mockProfile,
      expect.objectContaining({ success: true, data: requestBody }),
      mockUser,
    );
    expect(mockCreateDraft).toHaveBeenCalledWith(mockDraft);
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toEqual(mockCreatedEstimate);
  });

  it("should return 401 when user is not authenticated", async () => {
    // Arrange
    mockGetUser.mockResolvedValue(null);

    const requestBody = {
      customerId: "550e8400-e29b-41d4-a716-446655440000",
    };

    const request = createMockRequest({
      method: "POST",
      url: "http://localhost:3000/api/v1/estimates",
      body: requestBody,
    });

    // Act
    const response = await POST(request);

    // Assert
    expect(response.status).toBe(401);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: "Unauthorized" });
    expect(mockGetProfileByUserId).not.toHaveBeenCalled();
    expect(mockCreateDraft).not.toHaveBeenCalled();
  });

  it("should return 400 when request body is invalid", async () => {
    // Arrange
    const mockUser = {
      id: "user-123",
      email: "contractor@example.com",
      role: "contractor",
    };

    mockGetUser.mockResolvedValue(mockUser);

    const invalidRequestBody = {
      customerId: "invalid-uuid", // Invalid UUID format
    };

    const request = createMockRequest({
      method: "POST",
      url: "http://localhost:3000/api/v1/estimates",
      body: invalidRequestBody,
    });

    // Act
    const response = await POST(request);

    // Assert
    expect(response.status).toBe(400);
    const responseData = await response.json();
    expect(responseData.error).toBeDefined();
    expect(mockGetProfileByUserId).not.toHaveBeenCalled();
    expect(mockCreateDraft).not.toHaveBeenCalled();
  });

  it("should handle errors during estimate creation", async () => {
    // Arrange
    const mockUser = {
      id: "user-123",
      email: "contractor@example.com",
      role: "contractor",
    };

    const mockProfile = {
      id: "profile-123",
      user_id: "user-123",
      profileImgKey: null,
      profileImgUrl: null,
      businessName: "Test Company",
      businessAddress: "123 Test St",
      businessAddress2: "",
      businessCity: "Test City",
      businessState: "TS",
      businessZip: "12345",
      businessPhone: "555-1234",
      businessEmail: "contractor@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const mockDraft = {
      userId: "user-123",
      customerId: "customer-123",
      estimateNumber: "",
      totalAmount: "0.00",
      contractorAddress: "123 Test St",
      contractorAddress2: "",
      contractorCity: "Test City",
      contractorState: "TS",
      contractorZip: "12345",
      contractorName: "Test Company",
      contractorPhone: "555-1234",
      customerEmail: "",
      customerFirstName: "",
      customerLastName: "",
      estimateName: "",
      expirationDate: null,
      message: "",
      projectAddress: "",
      projectAddress2: "",
      projectCity: "",
      projectState: "",
      projectZip: "",
      status: "Draft",
      subtotal: 0,
      tax: 0,
      taxMode: "",
      taxRate: 0,
      total: 0,
      discountMode: "",
      discountPercentage: 0,
      discount: 0,
      lineItems: [],
    };

    mockGetUser.mockResolvedValue(mockUser);
    mockGetProfileByUserId.mockResolvedValue(mockProfile);
    mockCreateDraftFactory.mockResolvedValue(mockDraft);
    mockCreateDraft.mockRejectedValue(new Error("Database connection failed"));

    const requestBody = {
      customerId: "550e8400-e29b-41d4-a716-446655440000",
    };

    const request = createMockRequest({
      method: "POST",
      url: "http://localhost:3000/api/v1/estimates",
      body: requestBody,
    });

    // Act
    const response = await POST(request);

    // Assert
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData.error).toBe("Database connection failed");
  });

  it("should handle missing customerId in request body", async () => {
    // Arrange
    const mockUser = {
      id: "user-123",
      email: "contractor@example.com",
      role: "contractor",
    };

    const mockProfile = {
      id: "profile-123",
      user_id: "user-123",
      profileImgKey: null,
      profileImgUrl: null,
      businessName: "Test Company",
      businessAddress: "123 Test St",
      businessAddress2: "",
      businessCity: "Test City",
      businessState: "TS",
      businessZip: "12345",
      businessPhone: "555-1234",
      businessEmail: "contractor@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const mockDraft = {
      userId: "user-123",
      customerId: "",
      estimateNumber: "",
      totalAmount: "0.00",
      contractorAddress: "123 Test St",
      contractorAddress2: "",
      contractorCity: "Test City",
      contractorState: "TS",
      contractorZip: "12345",
      contractorName: "Test Company",
      contractorPhone: "555-1234",
      customerEmail: "",
      customerFirstName: "",
      customerLastName: "",
      estimateName: "",
      expirationDate: null,
      message: "",
      projectAddress: "",
      projectAddress2: "",
      projectCity: "",
      projectState: "",
      projectZip: "",
      status: "Draft",
      subtotal: 0,
      tax: 0,
      taxMode: "",
      taxRate: 0,
      total: 0,
      discountMode: "",
      discountPercentage: 0,
      discount: 0,
      lineItems: [],
    };

    const mockCreatedEstimate = {
      id: "estimate-123",
      userId: "user-123",
      customerId: "",
      estimateNumber: "EST-001",
      totalAmount: "0.00",
      contractorAddress: "123 Test St",
      contractorAddress2: "",
      contractorCity: "Test City",
      contractorState: "TS",
      contractorZip: "12345",
      contractorName: "Test Company",
      contractorPhone: "555-1234",
      customerEmail: "",
      customerFirstName: "",
      customerLastName: "",
      estimateName: "",
      expirationDate: null,
      message: "",
      projectAddress: "",
      projectAddress2: "",
      projectCity: "",
      projectState: "",
      projectZip: "",
      status: "Draft",
      subtotal: 0,
      tax: 0,
      taxMode: "",
      taxRate: 0,
      total: 0,
      discountMode: "",
      discountPercentage: 0,
      discount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    mockGetUser.mockResolvedValue(mockUser);
    mockGetProfileByUserId.mockResolvedValue(mockProfile);
    mockCreateDraftFactory.mockResolvedValue(mockDraft);
    mockCreateDraft.mockResolvedValue(mockCreatedEstimate);

    const requestBody = {}; // No customerId provided

    const request = createMockRequest({
      method: "POST",
      url: "http://localhost:3000/api/v1/estimates",
      body: requestBody,
    });

    // Act
    const response = await POST(request);

    // Assert
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toEqual(mockCreatedEstimate);
    expect(mockCreateDraftFactory).toHaveBeenCalledWith(
      mockProfile,
      expect.objectContaining({ success: true, data: requestBody }),
      mockUser,
    );
  });
});
