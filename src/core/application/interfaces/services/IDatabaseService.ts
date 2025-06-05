import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export interface IDatabaseService {
  db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };
}
