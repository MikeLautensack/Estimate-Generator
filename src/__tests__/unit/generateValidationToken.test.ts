import { generateValidationToken } from "@/utils/generateValidationToken";
import { db } from "@/db";
import crypto from "crypto";

// Mock the database
jest.mock("@/db", () => ({
  db: {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
  },
}));

// Mock crypto
jest.mock("crypto", () => ({
  randomBytes: jest.fn(),
}));

describe("generateValidationToken", () => {
  const mockDb = db as jest.Mocked<typeof db>;
  const mockCrypto = crypto as jest.Mocked<typeof crypto>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate a validation token and store it in database", async () => {
    // Arrange
    const identifier = "test@example.com";
    const mockToken = "abc123def456";
    const mockRandomBytes = Buffer.from(mockToken, "hex");

    mockCrypto.randomBytes.mockReturnValue(mockRandomBytes);
    mockDb.insert.mockReturnValue({
      values: jest.fn().mockResolvedValue(undefined),
    } as any);

    // Act
    const result = await generateValidationToken(identifier);

    // Assert
    expect(mockCrypto.randomBytes).toHaveBeenCalledWith(32);
    expect(mockDb.insert).toHaveBeenCalled();
    expect(result).toBe(mockToken);
  });

  it("should set token expiration to 1 hour from now", async () => {
    // Arrange
    const identifier = "test@example.com";
    const mockToken = "abc123def456";
    const mockRandomBytes = Buffer.from(mockToken, "hex");
    const now = Date.now();

    mockCrypto.randomBytes.mockReturnValue(mockRandomBytes);

    let capturedValues: any;
    mockDb.insert.mockReturnValue({
      values: jest.fn().mockImplementation((values) => {
        capturedValues = values;
        return Promise.resolve(undefined);
      }),
    } as any);

    // Act
    await generateValidationToken(identifier);

    // Assert
    expect(capturedValues).toBeDefined();
    expect(capturedValues.identifier).toBe(identifier);
    expect(capturedValues.token).toBe(mockToken);
    expect(capturedValues.expires).toBeInstanceOf(Date);

    // Check that expiration is approximately 1 hour from now (with 5 second tolerance)
    const expectedExpiration = new Date(now + 3600000);
    const actualExpiration = capturedValues.expires;
    const timeDifference = Math.abs(
      actualExpiration.getTime() - expectedExpiration.getTime(),
    );
    expect(timeDifference).toBeLessThan(5000);
  });

  it("should handle database errors", async () => {
    // Arrange
    const identifier = "test@example.com";
    const mockToken = "abc123def456";
    const mockRandomBytes = Buffer.from(mockToken, "hex");
    const dbError = new Error("Database connection failed");

    mockCrypto.randomBytes.mockReturnValue(mockRandomBytes);
    mockDb.insert.mockReturnValue({
      values: jest.fn().mockRejectedValue(dbError),
    } as any);

    // Act & Assert
    await expect(generateValidationToken(identifier)).rejects.toThrow(
      "Database connection failed",
    );
  });

  it("should generate different tokens for different calls", async () => {
    // Arrange
    const identifier = "test@example.com";
    const mockToken1 = "abc123def456";
    const mockToken2 = "def456ghi789";
    const mockRandomBytes1 = Buffer.from(mockToken1, "hex");
    const mockRandomBytes2 = Buffer.from(mockToken2, "hex");

    mockCrypto.randomBytes
      .mockReturnValueOnce(mockRandomBytes1)
      .mockReturnValueOnce(mockRandomBytes2);

    mockDb.insert.mockReturnValue({
      values: jest.fn().mockResolvedValue(undefined),
    } as any);

    // Act
    const result1 = await generateValidationToken(identifier);
    const result2 = await generateValidationToken(identifier);

    // Assert
    expect(result1).toBe(mockToken1);
    expect(result2).toBe(mockToken2);
    expect(result1).not.toBe(result2);
  });

  it("should handle empty identifier", async () => {
    // Arrange
    const identifier = "";
    const mockToken = "abc123def456";
    const mockRandomBytes = Buffer.from(mockToken, "hex");

    mockCrypto.randomBytes.mockReturnValue(mockRandomBytes);
    mockDb.insert.mockReturnValue({
      values: jest.fn().mockResolvedValue(undefined),
    } as any);

    // Act
    const result = await generateValidationToken(identifier);

    // Assert
    expect(result).toBe(mockToken);
    expect(mockDb.insert).toHaveBeenCalled();
  });
});
