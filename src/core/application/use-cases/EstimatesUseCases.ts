import {
  EstimatesInsert,
  EstimatesSelect,
  EstimatesWithLineItemsInsert,
  EstimatesWithLineItemsSelect,
  LineItemsInsert,
} from "@/db/schemas/estimates";
import { IEstimatesRepository } from "../interfaces/repositories/IEstimatesRepository";
import { IEstimatesUseCases } from "../interfaces/use-cases/IEstimatesUseCases";
import { IPDFRepository } from "../interfaces/repositories/IPDFRepository";
import { UTApi } from "uploadthing/server";

export class EstimatesUseCases implements IEstimatesUseCases {
  constructor(
    private readonly estimatesRepository: IEstimatesRepository,
    private readonly pdfRepository: IPDFRepository,
  ) {}

  async getEstimates(
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<EstimatesSelect[]> {
    return await this.estimatesRepository.getEstimates(page, size, filters);
  }

  async getEstimateById(id: string): Promise<EstimatesWithLineItemsSelect> {
    return await this.estimatesRepository.getEstimateById(id);
  }

  async getEstimatesByJobId(
    job_id: string,
    page: string,
    size: string,
  ): Promise<EstimatesSelect[]> {
    return await this.estimatesRepository.getEstimatesByJobId(
      job_id,
      page,
      size,
    );
  }

  async createDraft(
    estimate: EstimatesWithLineItemsInsert,
  ): Promise<EstimatesSelect> {
    const lineItemsData = estimate.lineItems;
    const { lineItems, ...est } = estimate;
    return await this.estimatesRepository.createEstimate(est, lineItemsData);
  }

  async saveDraft(
    id: string,
    estimate: Partial<EstimatesWithLineItemsInsert>,
  ): Promise<void> {
    const items = estimate.lineItems;
    const { lineItems, ...est } = estimate;
    return this.estimatesRepository.updateEstimate(id, est, items);
  }

  async finalizeDraft(estimate: EstimatesWithLineItemsInsert): Promise<void> {}

  async createEstimateAndPDF(
    estimate: EstimatesInsert,
    lineItemsData: LineItemsInsert[],
    pdfData: any,
  ): Promise<ArrayBuffer> {
    const pdf = await fetch("/api/pdf", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pdfData),
    });

    // Call the HTML-to-PDF microservice
    let pdfArrBuff;

    // Get the PDF data as an ArrayBuffer
    pdfArrBuff = await pdf.arrayBuffer();

    // Create a File object from the buffer
    const file = new File([pdfArrBuff], `${estimate.estimateName}.pdf`, {
      type: "application/pdf",
    });

    // Upload the PDF using UTApi
    const utapi = new UTApi() as any;
    const uploadResponse = await utapi.uploadFiles(file);

    if (!uploadResponse) {
      throw new Error(`Upload PDF Error`);
    }

    await this.estimatesRepository.createEstimate(estimate, lineItemsData);

    await this.pdfRepository.createPDF(pdfData);

    return pdfArrBuff;
  }

  async updateEstimate(
    id: string,
    estimate: EstimatesInsert,
    lineItemsData: LineItemsInsert[],
  ): Promise<void> {
    return await this.estimatesRepository.updateEstimate(
      id,
      estimate,
      lineItemsData,
    );
  }

  async deleteEstimate(id: string): Promise<void> {
    return await this.estimatesRepository.deleteEstimate(id);
  }
}
