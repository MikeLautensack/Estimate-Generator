import { IJobsRepository } from "@/core/application/interfaces/repositories/IJobsRepository";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import { jobs, JobsInsert, JobsSelect } from "@/db/schemas/jobs";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and, SQL } from "drizzle-orm";
import { UserRole } from "@/db/schemas/auth";

export class JobsRepository implements IJobsRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }

  async getJobs(
    id: string,
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<JobsSelect[]> {
    try {
      let conditions: SQL[] = [];
      if (filters) {
        if (filters.role === "contractor") {
          conditions.push(eq(jobs.contractor_user_id, id));
        } else if (filters.role === "customer") {
          conditions.push(eq(jobs.customer_user_id, id));
        }

        if (filters.status) {
          conditions.push(eq(jobs.status, filters.status));
        }
      }

      return await this.db
        .select()
        .from(jobs)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .limit(Number(size))
        .offset((Number(page) - 1) * Number(size));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getJobById(id: string): Promise<JobsSelect> {
    try {
      const data = await this.db.select().from(jobs).where(eq(jobs.id, id));
      return data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createJob(job: JobsInsert): Promise<void> {
    try {
      await this.db.insert(jobs).values(job);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateJob(id: string, job: JobsInsert): Promise<void> {
    try {
      await this.db.update(jobs).set(job).where(eq(jobs.id, id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteJob(id: string): Promise<void> {
    try {
      await this.db.delete(jobs).where(eq(jobs.id, id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
