import { ProfileInsert, ProfileSelect } from "@/db/schemas/profiles";

export interface IProfilesRepository {
  getProfiles(
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<ProfileSelect[]>;
  getProfileById(id: string): Promise<ProfileSelect>;
  getProfileByUserId(user_id: string): Promise<ProfileSelect>;
  createProfile(profile: ProfileInsert): Promise<void>;
  updateProfile(id: string, profile: ProfileInsert): Promise<void>;
  deleteProfile(id: string): Promise<void>;
}
