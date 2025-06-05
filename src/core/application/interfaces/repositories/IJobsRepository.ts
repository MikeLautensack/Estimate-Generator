import { JobsInsert, JobsSelect } from "@/db/schemas/jobs";

export interface IJobsRepository {
  getAllJobsQuery(): Promise<JobsSelect[]>;
  getJobByIdQuery(id: string): Promise<JobsSelect>;
  getJobsByContractorUserIdQuery(
    userId: string,
    limit: number,
  ): Promise<JobsSelect[]>;
  getJobsByCustomerUserIdQuery(
    userId: string,
    limit: number,
  ): Promise<JobsSelect[]>;
  createJobQuery(job: JobsInsert): Promise<void>;
  updateJobQuery(id: string, job: JobsInsert): Promise<void>;
  deleteJobQuery(id: string): Promise<void>;
}
