import {
  EstimatesInsert,
  EstimatesSelect,
  EstimatesWithLineItemsSelect,
  LineItemsInsert,
} from "@/db/schemas/estimates";

export interface IEstimatesRepository {
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
  createEstimate(
    estimate: EstimatesInsert,
    lineItemsData: LineItemsInsert[],
  ): Promise<EstimatesSelect>;
  updateEstimate(
    id: string,
    estimate: Partial<EstimatesInsert>,
    items: Partial<LineItemsInsert>[],
  ): Promise<void>;
  deleteEstimate(id: string): Promise<void>;
}
