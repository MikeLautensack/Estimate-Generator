import { IInvoicesRepository } from "@/core/application/interfaces/repositories/IInvoicesRepository";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";

export class InvoicesRepository implements IInvoicesRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }

  //   async getInvoices(
  //     userId: string,
  //     page: string,
  //     size: string,
  //     filters: Record<string, string>,
  //   ): Promise<InvoicesSelect[]> {
  //     return await this.db
  //       .select()
  //       .from(invoices)
  //       .where(eq(invoices.user_id, userId));
  //   }

  //   async createInvoice(invoice: InvoicesInsert): Promise<void> {
  //     return;
  //   }

  //   async updateInvoice(id: string, invoice: InvoicesInsert): Promise<void> {
  //     return;
  //   }

  //   async deleteInvoice(id: string): Promise<void> {
  //     return;
  //   }
}
