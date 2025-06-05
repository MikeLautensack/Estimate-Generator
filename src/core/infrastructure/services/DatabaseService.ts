import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export class DatabaseService implements IDatabaseService {
  db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor() {
    const client = postgres(process.env.SUPABASE_CONNECTION_STRING!);
    this.db = drizzle({ client });
  }
}
