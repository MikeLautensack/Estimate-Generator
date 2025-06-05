import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface IAuthUseCases {
  getServerClient(cookies: ReadonlyRequestCookies): Promise<SupabaseClient>;
  getSession(cookies: ReadonlyRequestCookies): Promise<any>;
  getUser(cookies: ReadonlyRequestCookies): Promise<any>;
}
