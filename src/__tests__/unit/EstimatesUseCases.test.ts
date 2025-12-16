// import { EstimatesUseCases } from "@/core/application/use-cases/EstimatesUseCases";
// import { IEstimatesRepository } from "@/core/application/interfaces/repositories/IEstimatesRepository";
// import { IPDFRepository } from "@/core/application/interfaces/repositories/IPDFRepository";
// import {
//   EstimatesInsert,
//   EstimatesSelect,
//   EstimatesWithLineItemsInsert,
//   EstimatesWithLineItemsSelect,
//   LineItemsInsert,
// } from "@/db/schemas/estimates";

// // Mock the repositories
// const mockEstimatesRepository: jest.Mocked<IEstimatesRepository> = {
//   getEstimates: jest.fn(),
//   getEstimateById: jest.fn(),
//   getEstimatesByJobId: jest.fn(),
//   createEstimate: jest.fn(),
//   updateEstimate: jest.fn(),
//   deleteEstimate: jest.fn(),
// };

// const mockPDFRepository: jest.Mocked<IPDFRepository> = {
//   createPDF: jest.fn(),
//   getPDF: jest.fn(),
//   updatePDF: jest.fn(),
//   deletePDF: jest.fn(),
// };

// // Mock fetch globally
// global.fetch = jest.fn();

// describe("EstimatesUseCases", () => {
//   let estimatesUseCases: EstimatesUseCases;

//   beforeEach(() => {
//     jest.clearAllMocks();
//     estimatesUseCases = new EstimatesUseCases(
//       mockEstimatesRepository,
//       mockPDFRepository,
//     );
//   });

//   describe("getEstimates", () => {
//     it("should return estimates from repository", async () => {
//       // Arrange
//       const mockEstimates: EstimatesSelect[] = [
//         {
//           id: "1",
//           estimateName: "Test Estimate",
//           status: "draft",
//           totalAmount: 1000,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         } as EstimatesSelect,
//       ];
//       mockEstimatesRepository.getEstimates.mockResolvedValue(mockEstimates);

//       // Act
//       const result = await estimatesUseCases.getEstimates("1", "10");

//       // Assert
//       expect(mockEstimatesRepository.getEstimates).toHaveBeenCalledWith(
//         "1",
//         "10",
//         undefined,
//       );
//       expect(result).toBe(mockEstimates);
//     });

//     it("should pass filters to repository", async () => {
//       // Arrange
//       const filters = { status: "draft", customerId: "123" };
//       const mockEstimates: EstimatesSelect[] = [];
//       mockEstimatesRepository.getEstimates.mockResolvedValue(mockEstimates);

//       // Act
//       await estimatesUseCases.getEstimates("1", "10", filters);

//       // Assert
//       expect(mockEstimatesRepository.getEstimates).toHaveBeenCalledWith(
//         "1",
//         "10",
//         filters,
//       );
//     });
//   });

//   describe("getEstimateById", () => {
//     it("should return estimate with line items by id", async () => {
//       // Arrange
//       const mockEstimate: EstimatesWithLineItemsSelect = {
//         id: "1",
//         estimateName: "Test Estimate",
//         status: "draft",
//         totalAmount: 1000,
//         lineItems: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       } as EstimatesWithLineItemsSelect;
//       mockEstimatesRepository.getEstimateById.mockResolvedValue(mockEstimate);

//       // Act
//       const result = await estimatesUseCases.getEstimateById("1");

//       // Assert
//       expect(mockEstimatesRepository.getEstimateById).toHaveBeenCalledWith("1");
//       expect(result).toBe(mockEstimate);
//     });
//   });

//   describe("getEstimatesByJobId", () => {
//     it("should return estimates for a specific job", async () => {
//       // Arrange
//       const mockEstimates: EstimatesSelect[] = [
//         {
//           id: "1",
//           estimateName: "Job Estimate 1",
//           jobId: "job-123",
//           status: "draft",
//           totalAmount: 1000,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         } as EstimatesSelect,
//       ];
//       mockEstimatesRepository.getEstimatesByJobId.mockResolvedValue(
//         mockEstimates,
//       );

//       // Act
//       const result = await estimatesUseCases.getEstimatesByJobId(
//         "job-123",
//         "1",
//         "10",
//       );

//       // Assert
//       expect(mockEstimatesRepository.getEstimatesByJobId).toHaveBeenCalledWith(
//         "job-123",
//         "1",
//         "10",
//       );
//       expect(result).toBe(mockEstimates);
//     });
//   });

//   describe("createDraft", () => {
//     it("should create a draft estimate with line items", async () => {
//       // Arrange
//       const mockEstimate: EstimatesWithLineItemsInsert = {
//         estimateName: "Draft Estimate",
//         status: "draft",
//         totalAmount: 1000,
//         lineItems: [
//           {
//             description: "Test item",
//             quantity: 1,
//             unitPrice: 1000,
//             totalPrice: 1000,
//           } as LineItemsInsert,
//         ],
//       };
//       const mockCreatedEstimate: EstimatesSelect = {
//         id: "1",
//         estimateName: "Draft Estimate",
//         status: "draft",
//         totalAmount: 1000,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       } as EstimatesSelect;
//       mockEstimatesRepository.createEstimate.mockResolvedValue(
//         mockCreatedEstimate,
//       );

//       // Act
//       const result = await estimatesUseCases.createDraft(mockEstimate);

//       // Assert
//       expect(mockEstimatesRepository.createEstimate).toHaveBeenCalledWith(
//         { estimateName: "Draft Estimate", status: "draft", totalAmount: 1000 },
//         mockEstimate.lineItems,
//       );
//       expect(result).toBe(mockCreatedEstimate);
//     });
//   });

//   describe("saveDraft", () => {
//     it("should save draft changes to existing estimate", async () => {
//       // Arrange
//       const estimateId = "1";
//       const draftData: Partial<EstimatesWithLineItemsInsert> = {
//         estimateName: "Updated Draft",
//         lineItems: [
//           {
//             description: "Updated item",
//             quantity: 2,
//             unitPrice: 500,
//             totalPrice: 1000,
//           } as LineItemsInsert,
//         ],
//       };
//       mockEstimatesRepository.updateEstimate.mockResolvedValue();

//       // Act
//       await estimatesUseCases.saveDraft(estimateId, draftData);

//       // Assert
//       expect(mockEstimatesRepository.updateEstimate).toHaveBeenCalledWith(
//         estimateId,
//         { estimateName: "Updated Draft" },
//         draftData.lineItems,
//       );
//     });
//   });

//   describe("updateEstimate", () => {
//     it("should update an existing estimate", async () => {
//       // Arrange
//       const estimateId = "1";
//       const estimateData: EstimatesInsert = {
//         estimateName: "Updated Estimate",
//         status: "finalized",
//         totalAmount: 1500,
//       } as EstimatesInsert;
//       const lineItemsData: LineItemsInsert[] = [
//         {
//           description: "Updated line item",
//           quantity: 1,
//           unitPrice: 1500,
//           totalPrice: 1500,
//         } as LineItemsInsert,
//       ];
//       mockEstimatesRepository.updateEstimate.mockResolvedValue();

//       // Act
//       await estimatesUseCases.updateEstimate(
//         estimateId,
//         estimateData,
//         lineItemsData,
//       );

//       // Assert
//       expect(mockEstimatesRepository.updateEstimate).toHaveBeenCalledWith(
//         estimateId,
//         estimateData,
//         lineItemsData,
//       );
//     });
//   });

//   describe("deleteEstimate", () => {
//     it("should delete an estimate", async () => {
//       // Arrange
//       const estimateId = "1";
//       mockEstimatesRepository.deleteEstimate.mockResolvedValue();

//       // Act
//       await estimatesUseCases.deleteEstimate(estimateId);

//       // Assert
//       expect(mockEstimatesRepository.deleteEstimate).toHaveBeenCalledWith(
//         estimateId,
//       );
//     });
//   });

//   describe("createEstimateAndPDF", () => {
//     it("should create estimate and generate PDF", async () => {
//       // Arrange
//       const estimateData: EstimatesInsert = {
//         estimateName: "Test Estimate",
//         status: "finalized",
//         totalAmount: 1000,
//       } as EstimatesInsert;
//       const lineItemsData: LineItemsInsert[] = [
//         {
//           description: "Test item",
//           quantity: 1,
//           unitPrice: 1000,
//           totalPrice: 1000,
//         } as LineItemsInsert,
//       ];
//       const pdfData = { estimateId: "1", content: "PDF content" };

//       const mockPDFBuffer = new ArrayBuffer(1024);
//       const mockFetchResponse = {
//         arrayBuffer: jest.fn().mockResolvedValue(mockPDFBuffer),
//       };
//       (global.fetch as jest.Mock).mockResolvedValue(mockFetchResponse);

//       const mockCreatedEstimate: EstimatesSelect = {
//         id: "1",
//         estimateName: "Test Estimate",
//         status: "finalized",
//         totalAmount: 1000,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       } as EstimatesSelect;
//       mockEstimatesRepository.createEstimate.mockResolvedValue(
//         mockCreatedEstimate,
//       );
//       mockPDFRepository.createPDF.mockResolvedValue();

//       // Mock UTApi
//       const mockUTApi = {
//         uploadFiles: jest.fn().mockResolvedValue({ success: true }),
//       };
//       jest.doMock("uploadthing/server", () => ({
//         UTApi: jest.fn().mockImplementation(() => mockUTApi),
//       }));

//       // Act
//       const result = await estimatesUseCases.createEstimateAndPDF(
//         estimateData,
//         lineItemsData,
//         pdfData,
//       );

//       // Assert
//       expect(global.fetch).toHaveBeenCalledWith("/api/pdf", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(pdfData),
//       });
//       expect(mockEstimatesRepository.createEstimate).toHaveBeenCalledWith(
//         estimateData,
//         lineItemsData,
//       );
//       expect(mockPDFRepository.createPDF).toHaveBeenCalledWith(pdfData);
//       expect(result).toBe(mockPDFBuffer);
//     });

//     it("should handle PDF generation errors", async () => {
//       // Arrange
//       const estimateData: EstimatesInsert = {
//         estimateName: "Test Estimate",
//         status: "finalized",
//         totalAmount: 1000,
//       } as EstimatesInsert;
//       const lineItemsData: LineItemsInsert[] = [];
//       const pdfData = { estimateId: "1" };

//       (global.fetch as jest.Mock).mockRejectedValue(
//         new Error("PDF generation failed"),
//       );

//       // Act & Assert
//       await expect(
//         estimatesUseCases.createEstimateAndPDF(
//           estimateData,
//           lineItemsData,
//           pdfData,
//         ),
//       ).rejects.toThrow("PDF generation failed");
//     });
//   });
// });
