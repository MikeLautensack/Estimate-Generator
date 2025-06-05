import { IJobsRepository } from "@/core/application/interfaces/repositories/IJobsRepository";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import { jobs, JobsInsert, JobsSelect } from "@/db/schemas/jobs";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";

export class JobsRepository implements IJobsRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }

  async getAllJobsQuery(): Promise<JobsSelect[]> {
    try {
      const data = await this.db.select().from(jobs);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getJobByIdQuery(id: string): Promise<JobsSelect> {
    try {
      const data = await this.db.select().from(jobs).where(eq(jobs.id, id));
      return data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getJobsByContractorUserIdQuery(
    userId: string,
    limit: number,
  ): Promise<JobsSelect[]> {
    try {
      return await this.db
        .select()
        .from(jobs)
        .where(eq(jobs.contractor_user_id, userId))
        .limit(limit);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getJobsByCustomerUserIdQuery(
    userId: string,
    limit: number,
  ): Promise<JobsSelect[]> {
    try {
      return await this.db
        .select()
        .from(jobs)
        .where(eq(jobs.customer_user_id, userId))
        .limit(limit);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createJobQuery(job: JobsInsert): Promise<void> {
    try {
      await this.db.insert(jobs).values(job);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateJobQuery(id: string, job: JobsInsert): Promise<void> {
    try {
      await this.db.update(jobs).set(job).where(eq(jobs.id, id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteJobQuery(id: string): Promise<void> {
    try {
      await this.db.delete(jobs).where(eq(jobs.id, id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
