import { IEstimatesRepository } from "@/core/application/interfaces/repositories/IEstimatesRepository";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import {
  estimates,
  EstimatesInsert,
  EstimatesSelect,
  EstimatesWithLineItemsSelect,
  lineItems,
  LineItemsInsert,
} from "@/db/schemas/estimates";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and, SQL } from "drizzle-orm";

export class EstimatesRepository implements IEstimatesRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }

  async getEstimates(
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<EstimatesSelect[]> {
    try {
      let conditions: SQL[] = [];
      if (filters) {
        if (filters.job_id) {
          // conditions.push(eq(estimates.jobId, filters.job_id));
        }
        if (filters.status) {
          conditions.push(eq(estimates.status, filters.status));
        }
        // Add more filters as needed
      }
      return await this.db
        .select()
        .from(estimates)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .limit(Number(size))
        .offset((Number(page) - 1) * Number(size));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEstimateById(id: string): Promise<EstimatesWithLineItemsSelect> {
    try {
      const resultSet = await this.db
        .select()
        .from(estimates)
        .leftJoin(lineItems, eq(estimates.id, lineItems.estimate_id))
        .where(eq(estimates.id, id));

      const estimate = resultSet[0].estimates;
      const items = resultSet
        .map((row) => row.lineItems)
        .filter((item) => item !== null);

      return {
        ...estimate,
        lineItems: items,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEstimatesByJobId(
    job_id: string,
    page: string,
    size: string,
  ): Promise<EstimatesSelect[]> {
    try {
      return await this.db
        .select()
        .from(estimates)
        .limit(Number(size))
        .offset((Number(page) - 1) * Number(size));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createEstimate(
    estimate: EstimatesInsert,
    lineItemsData: LineItemsInsert[],
  ): Promise<EstimatesSelect> {
    try {
      // Insert the estimate and get the inserted id
      const insertedEstimates = await this.db
        .insert(estimates)
        .values(estimate)
        .returning();
      const newEstimate = insertedEstimates[0];
      if (!newEstimate) {
        throw new Error("Failed to retrieve inserted new estimate");
      }
      // Insert line items with the new estimate id
      if (lineItemsData.length > 0) {
        const lineItemsWithEstimateId = lineItemsData.map((item) => ({
          ...item,
          estimate_id: newEstimate.id,
        }));
        await this.db.insert(lineItems).values(lineItemsWithEstimateId);
      }
      return newEstimate;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateEstimate(
    id: string,
    estimate: Partial<EstimatesInsert>,
    items: Partial<LineItemsInsert>[],
  ): Promise<void> {
    try {
      await this.db.update(estimates).set(estimate).where(eq(estimates.id, id));
      // Delete existing line items for this estimate
      await this.db.delete(lineItems).where(eq(lineItems.estimate_id, id));
      // Insert new line items
      if (items.length > 0) {
        const lineItemsWithEstimateId = items.map((item) => ({
          ...item,
          estimate_id: id,
        }));
        await this.db.insert(lineItems).values(lineItemsWithEstimateId);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteEstimate(id: string): Promise<void> {
    try {
      // Delete related line items first
      await this.db.delete(lineItems).where(eq(lineItems.estimate_id, id));
      await this.db.delete(estimates).where(eq(estimates.id, id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
