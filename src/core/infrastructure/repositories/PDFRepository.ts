import { IPDFRepository } from "@/core/application/interfaces/repositories/IPDFRepository";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and } from "drizzle-orm";

export class PDFRepository implements IPDFRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }

  async getPDFs(
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<any[]> {
    return [];
  }

  async getPDFById(id: string): Promise<any> {
    return [];
  }

  async createPDF(pdfData: any): Promise<void> {}

  async updatePDF(id: string, pdfData: any): Promise<void> {}

  async deletePDF(id: string): Promise<void> {}
}
