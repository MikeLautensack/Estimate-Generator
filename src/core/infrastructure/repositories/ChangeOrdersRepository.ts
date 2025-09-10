import { IChangeOrdersRepository } from "@/core/application/interfaces/repositories/IChangeOrdersRepository";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export class ChangeOrdersRepository implements IChangeOrdersRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }
}
