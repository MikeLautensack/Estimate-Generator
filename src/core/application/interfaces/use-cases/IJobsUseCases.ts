import { JobsInsert, JobsSelect } from "@/db/schemas/jobs";
import { UserRole } from "@/db/schemas/auth";

export interface IJobsUseCases {
  getJobById(id: string): Promise<JobsSelect>;
  getContractorsJobs(
    id: string,
    page: string,
    size: string,
  ): Promise<JobsSelect[]>;
  getContractorsActiveJobs(
    id: string,
    page: string,
    size: string,
  ): Promise<JobsSelect[]>;
  getContractorsPendingJobs(
    id: string,
    page: string,
    size: string,
  ): Promise<JobsSelect[]>;
  getCustomersJobs(
    id: string,
    page: string,
    size: string,
  ): Promise<JobsSelect[]>;
  createJob(job: JobsInsert): Promise<void>;
  updateJob(id: string, job: JobsInsert): Promise<void>;
  deleteJob(id: string): Promise<void>;
}
