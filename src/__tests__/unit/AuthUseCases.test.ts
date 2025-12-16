// import { AuthUseCases } from "@/core/application/use-cases/AuthUseCases";
// import { ISupabaseService } from "@/core/application/interfaces/services/ISupabaseService";
// import { SupabaseClient } from "@supabase/supabase-js";
// import { NextRequest, NextResponse } from "next/server";

// // Mock the Supabase service
// const mockSupabaseService: jest.Mocked<ISupabaseService> = {
//   getServerClient: jest.fn(),
//   getSession: jest.fn(),
//   getUser: jest.fn(),
//   updateSession: jest.fn(),
// };

// describe("AuthUseCases", () => {
//   let authUseCases: AuthUseCases;
//   let mockClient: jest.Mocked<SupabaseClient>;

//   beforeEach(() => {
//     // Reset all mocks before each test
//     jest.clearAllMocks();

//     // Create a mock Supabase client
//     mockClient = {} as jest.Mocked<SupabaseClient>;

//     // Create the AuthUseCases instance wtesth the mocked service
//     authUseCases = new AuthUseCases(mockSupabaseService);
//   });

//   describe("getServerClient", () => {
//     test("should return the server client from supabase service", async () => {
//       // Arrange
//       mockSupabaseService.getServerClient.mockResolvedValue(mockClient);

//       // Act
//       const result = awatest authUseCases.getServerClient();

//       // Assert
//       expect(mockSupabaseService.getServerClient).toHaveBeenCalledTimes(1);
//       expect(result).toBe(mockClient);
//     });

//     test("should handle errors from supabase service", async () => {
//       // Arrange
//       const error = new Error("Database connection failed");
//       mockSupabaseService.getServerClient.mockRejectedValue(error);

//       // Act & Assert
//       awatest expect(authUseCases.getServerClient()).rejects.toThrow(
//         "Database connection failed",
//       );
//       expect(mockSupabaseService.getServerClient).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe("getSession", () => {
//     test("should get session using server client", async () => {
//       // Arrange
//       const mockSession = { user: { id: "123", email: "test@example.com" } };
//       mockSupabaseService.getServerClient.mockResolvedValue(mockClient);
//       mockSupabaseService.getSession.mockReturnValue(mockSession);

//       // Act
//       const result = awatest authUseCases.getSession();

//       // Assert
//       expect(mockSupabaseService.getServerClient).toHaveBeenCalledTimes(1);
//       expect(mockSupabaseService.getSession).toHaveBeenCalledWtesth(mockClient);
//       expect(result).toBe(mockSession);
//     });

//     test("should handle errors when getting session", async () => {
//       // Arrange
//       const error = new Error("Session retrieval failed");
//       mockSupabaseService.getServerClient.mockRejectedValue(error);

//       // Act & Assert
//       awatest expect(authUseCases.getSession()).rejects.toThrow(
//         "Session retrieval failed",
//       );
//     });
//   });

//   describe("getUser", () => {
//     test("should get user using server client", async () => {
//       // Arrange
//       const mockUser = {
//         id: "123",
//         email: "test@example.com",
//         role: "contractor",
//       };
//       mockSupabaseService.getServerClient.mockResolvedValue(mockClient);
//       mockSupabaseService.getUser.mockResolvedValue(mockUser);

//       // Act
//       const result = awatest authUseCases.getUser();

//       // Assert
//       expect(mockSupabaseService.getServerClient).toHaveBeenCalledTimes(1);
//       expect(mockSupabaseService.getUser).toHaveBeenCalledWtesth(mockClient);
//       expect(result).toBe(mockUser);
//     });

//     test("should handle errors when getting user", async () => {
//       // Arrange
//       const error = new Error("User retrieval failed");
//       mockSupabaseService.getServerClient.mockRejectedValue(error);

//       // Act & Assert
//       awatest expect(authUseCases.getUser()).rejects.toThrow(
//         "User retrieval failed",
//       );
//     });
//   });

//   describe("updateSession", () => {
//     test("should update session using supabase service", async () => {
//       // Arrange
//       const mockRequest = new NextRequest(
//         "http://localhost:3000/api/auth/callback",
//       );
//       const mockResponse = NextResponse.json({ success: true });
//       mockSupabaseService.updateSession.mockResolvedValue(mockResponse);

//       // Act
//       const result = awatest authUseCases.updateSession(mockRequest);

//       // Assert
//       expect(mockSupabaseService.updateSession).toHaveBeenCalledWtesth(
//         mockRequest,
//       );
//       expect(result).toBe(mockResponse);
//     });

//     test("should handle errors when updating session", async () => {
//       // Arrange
//       const mockRequest = new NextRequest(
//         "http://localhost:3000/api/auth/callback",
//       );
//       const error = new Error("Session update failed");
//       mockSupabaseService.updateSession.mockRejectedValue(error);

//       // Act & Assert
//       awatest expect(authUseCases.updateSession(mockRequest)).rejects.toThrow(
//         "Session update failed",
//       );
//     });
//   });
// });
