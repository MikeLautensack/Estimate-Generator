import { ISupabaseService } from "../interfaces/services/ISupabaseService";
import { IAuthUseCases } from "../interfaces/use-cases/IAuthUseCases";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { SupabaseClient } from "@supabase/supabase-js";

export class AuthUseCases implements IAuthUseCases {
  constructor(private readonly supabaseService: ISupabaseService) {}

  async getServerClient(
    cookies: ReadonlyRequestCookies,
  ): Promise<SupabaseClient> {
    return this.supabaseService.getServerClient(cookies);
  }

  async getSession(cookies: ReadonlyRequestCookies) {
    const client = await this.getServerClient(cookies);
    return this.supabaseService.getSession(client);
  }

  async getUser(cookies: ReadonlyRequestCookies) {
    const client = await this.getServerClient(cookies);
    return this.supabaseService.getUser(client);
  }
}
