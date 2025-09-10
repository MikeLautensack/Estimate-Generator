import { IProfilesRepository } from "@/core/application/interfaces/repositories/IProfilesRepository";
import { IDatabaseService } from "@/core/application/interfaces/services/IDatabaseService";
import { profiles, ProfileInsert, ProfileSelect } from "@/db/schemas/profiles";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and, SQL } from "drizzle-orm";

export class ProfilesRepository implements IProfilesRepository {
  private readonly db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  };

  constructor(private readonly databaseService: IDatabaseService) {
    this.db = databaseService.db;
  }

  async getProfiles(
    page: string,
    size: string,
    filters?: Record<string, string>,
  ): Promise<ProfileSelect[]> {
    try {
      let conditions: SQL[] = [];
      if (filters) {
        if (filters.user_id) {
          conditions.push(eq(profiles.user_id, filters.user_id));
        }
        if (filters.businessEmail) {
          conditions.push(eq(profiles.businessEmail, filters.businessEmail));
        }
      }
      return await this.db
        .select()
        .from(profiles)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .limit(Number(size))
        .offset((Number(page) - 1) * Number(size));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProfileById(id: string): Promise<ProfileSelect> {
    try {
      const data = await this.db
        .select()
        .from(profiles)
        .where(eq(profiles.id, id));
      return data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProfileByUserId(user_id: string): Promise<ProfileSelect> {
    try {
      const data = await this.db
        .select()
        .from(profiles)
        .where(eq(profiles.user_id, user_id));
      return data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createProfile(profile: ProfileInsert): Promise<void> {
    try {
      await this.db.insert(profiles).values(profile);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProfile(id: string, profile: ProfileInsert): Promise<void> {
    try {
      await this.db.update(profiles).set(profile).where(eq(profiles.id, id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteProfile(id: string): Promise<void> {
    try {
      await this.db.delete(profiles).where(eq(profiles.id, id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
