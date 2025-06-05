import { SupabaseClient } from "@supabase/supabase-js";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface ISupabaseService {
  getServerClient(cookies: ReadonlyRequestCookies): Promise<SupabaseClient>;
  getSession(client: SupabaseClient): Promise<any>;
  getUser(client: SupabaseClient): Promise<any>;
  signOut(client: SupabaseClient): Promise<void>;
  signInWithPassword(
    client: SupabaseClient,
    email: string,
    password: string,
  ): Promise<any>;
  signUp(client: SupabaseClient, email: string, password: string): Promise<any>;
}
