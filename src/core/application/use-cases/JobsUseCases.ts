import { JobsInsert, JobsSelect } from "@/db/schemas/jobs";
import { IJobsRepository } from "../interfaces/repositories/IJobsRepository";
import { IJobsUseCases } from "../interfaces/use-cases/IJobsUseCases";

export class JobsUseCases implements IJobsUseCases {
  constructor(private readonly jobsRepository: IJobsRepository) {}

  async getJobById(id: string): Promise<JobsSelect> {
    return await this.jobsRepository.getJobById(id);
  }

  async getContractorsJobs(
    id: string,
    page: string,
    size: string,
  ): Promise<JobsSelect[]> {
    return await this.jobsRepository.getJobs(id, page, size);
  }

  async getContractorsActiveJobs(
    id: string,
    page: string,
    size: string,
  ): Promise<JobsSelect[]> {
    const filters = {
      role: "contractor",
      status: "active",
    };
    return await this.jobsRepository.getJobs(id, page, size, filters);
  }

  async getContractorsPendingJobs(
    id: string,
    page: string,
    size: string,
  ): Promise<JobsSelect[]> {
    const filters = {
      role: "contractor",
      status: "pending",
    };
    return await this.jobsRepository.getJobs(id, page, size, filters);
  }

  async getCustomersJobs(
    id: string,
    page: string,
    size: string,
  ): Promise<JobsSelect[]> {
    throw new Error("method not implemented");
  }

  async createJob(job: JobsInsert): Promise<void> {
    return await this.jobsRepository.createJob(job);
  }

  async updateJob(id: string, job: JobsInsert): Promise<void> {
    return await this.jobsRepository.updateJob(id, job);
  }

  async deleteJob(id: string): Promise<void> {
    return await this.jobsRepository.deleteJob(id);
  }
}
