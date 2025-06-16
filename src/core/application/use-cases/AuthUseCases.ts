import { ISupabaseService } from "../interfaces/services/ISupabaseService";
import { IAuthUseCases } from "../interfaces/use-cases/IAuthUseCases";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export class AuthUseCases implements IAuthUseCases {
  constructor(private readonly supabaseService: ISupabaseService) {}

  async getServerClient(): Promise<SupabaseClient> {
    return await this.supabaseService.getServerClient();
  }

  async getSession() {
    const client = await this.getServerClient();
    return this.supabaseService.getSession(client);
  }

  async getUser() {
    const client = await this.supabaseService.getServerClient();
    return this.supabaseService.getUser(client);
  }

  async updateSession(request: NextRequest): Promise<NextResponse> {
    return await this.supabaseService.updateSession(request);
  }
}
