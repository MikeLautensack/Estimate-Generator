import { JobsInsert, JobsSelect } from "@/db/schemas/jobs";
import { UserRole } from "@/db/schemas/auth";

export interface IJobsUseCases {
  getJobs(): Promise<JobsSelect[]>;
  getJobById(id: string): Promise<JobsSelect>;
  getJobsByContractorId(
    contractorId: string,
    limit: number,
  ): Promise<JobsSelect[]>;
  getJobsByCustomerId(customerId: string, limit: number): Promise<JobsSelect[]>;
  getJobsByUserRole(
    userId: string,
    role: UserRole,
    limit: number,
  ): Promise<JobsSelect[]>;
  createJob(job: JobsInsert): Promise<void>;
  updateJob(id: string, job: JobsInsert): Promise<void>;
  deleteJob(id: string): Promise<void>;
}
