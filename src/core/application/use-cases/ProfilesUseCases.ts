import { ProfileInsert, ProfileSelect } from "@/db/schemas/profiles";
import { IProfilesRepository } from "../interfaces/repositories/IProfilesRepository";
import { IProfilesUseCases } from "../interfaces/use-cases/IProfilesUseCases";

export class ProfilesUseCases implements IProfilesUseCases {
  constructor(private readonly profilesRepository: IProfilesRepository) {}

  async getProfiles(
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<ProfileSelect[]> {
    return await this.profilesRepository.getProfiles(page, size, filters);
  }

  async getProfileById(id: string): Promise<ProfileSelect> {
    return await this.profilesRepository.getProfileById(id);
  }

  async getProfileByUserId(user_id: string): Promise<ProfileSelect> {
    return await this.profilesRepository.getProfileByUserId(user_id);
  }

  async createProfile(profile: ProfileInsert): Promise<void> {
    return await this.profilesRepository.createProfile(profile);
  }

  async updateProfile(id: string, profile: ProfileInsert): Promise<void> {
    return await this.profilesRepository.updateProfile(id, profile);
  }

  async deleteProfile(id: string): Promise<void> {
    return await this.profilesRepository.deleteProfile(id);
  }
}
