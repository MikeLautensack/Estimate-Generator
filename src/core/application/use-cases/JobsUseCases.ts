import { JobsInsert, JobsSelect } from "@/db/schemas/jobs";
import { IJobsRepository } from "../interfaces/repositories/IJobsRepository";
import { IJobsUseCases } from "../interfaces/use-cases/IJobsUseCases";
import { UserRole } from "@/db/schemas/auth";

export class JobsUseCases implements IJobsUseCases {
  constructor(private readonly jobsRepository: IJobsRepository) {}

  async getJobs(): Promise<JobsSelect[]> {
    return await this.jobsRepository.getAllJobsQuery();
  }

  async getJobById(id: string): Promise<JobsSelect> {
    return await this.jobsRepository.getJobByIdQuery(id);
  }

  async getJobsByContractorId(
    contractorId: string,
    limit: number,
  ): Promise<JobsSelect[]> {
    return await this.jobsRepository.getJobsByContractorUserIdQuery(
      contractorId,
      limit,
    );
  }

  async getJobsByCustomerId(
    customerId: string,
    limit: number,
  ): Promise<JobsSelect[]> {
    return await this.jobsRepository.getJobsByCustomerUserIdQuery(
      customerId,
      limit,
    );
  }

  async getJobsByUserRole(
    userId: string,
    role: UserRole,
    limit: number,
  ): Promise<JobsSelect[]> {
    switch (role) {
      case "contractor":
        return await this.getJobsByContractorId(userId, limit);
      case "customer":
        return await this.getJobsByCustomerId(userId, limit);
      default:
        throw new Error(`Invalid user role: ${role}`);
    }
  }

  async createJob(job: JobsInsert): Promise<void> {
    return await this.jobsRepository.createJobQuery(job);
  }

  async updateJob(id: string, job: JobsInsert): Promise<void> {
    return await this.jobsRepository.updateJobQuery(id, job);
  }

  async deleteJob(id: string): Promise<void> {
    return await this.jobsRepository.deleteJobQuery(id);
  }
}
