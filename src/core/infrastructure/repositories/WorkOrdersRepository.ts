import { IWorkOrdersRepository } from "@/core/application/interfaces/repositories/IWorkOrdersRepository";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export class WorkOrdersRepository implements IWorkOrdersRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }

  //   async getWorkOrders(
  //     userId: string,
  //     page: string,
  //     size: string,
  //     filters: Record<string, string>,
  //   ): Promise<WorkOrdersSelect[]> {
  //     return [];
  //   }

  //   async createWorkOrder(workOrder: WorkOrdersInsert): Promise<void> {
  //     return;
  //   }
}
