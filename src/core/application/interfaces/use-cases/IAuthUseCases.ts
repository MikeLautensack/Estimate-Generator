import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export interface IAuthUseCases {
  getServerClient(): Promise<SupabaseClient>;
  getSession(): Promise<any>;
  getUser(): Promise<any>;
  updateSession(request: NextRequest): Promise<NextResponse>;
}
