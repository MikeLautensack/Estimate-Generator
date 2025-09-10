import {
  EstimatesInsert,
  EstimatesSelect,
  EstimatesWithLineItemsInsert,
  EstimatesWithLineItemsSelect,
  LineItemsInsert,
} from "@/db/schemas/estimates";

export interface IEstimatesUseCases {
  getEstimates(
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<EstimatesSelect[]>;
  getEstimateById(id: string): Promise<EstimatesWithLineItemsSelect>;
  getEstimatesByJobId(
    job_id: string,
    page: string,
    size: string,
  ): Promise<EstimatesSelect[]>;
  createDraft(estimate: EstimatesWithLineItemsInsert): Promise<EstimatesSelect>;
  saveDraft(
    id: string,
    estimate: Partial<EstimatesWithLineItemsInsert>,
  ): Promise<void>;
  // finalizeDraftAndCreateEstimate(
  //   estimate: EstimatesWithLineItemsInsert,
  // ): Promise<ArrayBuffer>;
  createEstimateAndPDF(
    estimate: EstimatesInsert,
    lineItemsData: LineItemsInsert[],
    pdfData: any,
  ): Promise<ArrayBuffer>;
  updateEstimate(
    id: string,
    estimate: EstimatesInsert,
    lineItemsData: LineItemsInsert[],
  ): Promise<void>;
  deleteEstimate(id: string): Promise<void>;
}
