import { JobsInsert, JobsSelect } from "@/db/schemas/jobs";

export interface IJobsRepository {
  getJobs(
    id: string,
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<JobsSelect[]>;
  getJobById(id: string): Promise<JobsSelect>;
  createJob(job: JobsInsert): Promise<void>;
  updateJob(id: string, job: JobsInsert): Promise<void>;
  deleteJob(id: string): Promise<void>;
}
