import { ISupabaseService } from "@/core/application/interfaces/services/ISupabaseService";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { createServerClient } from "@supabase/ssr";

export class SupabaseService implements ISupabaseService {
  private supabaseUrl: string;
  private supabaseAnonKey: string;

  constructor() {
    this.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    this.supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  }

  async getServerClient(
    cookies: ReadonlyRequestCookies,
  ): Promise<SupabaseClient> {
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookies.getAll();
          },
          setAll(cookiesToSet: any) {
            try {
              cookiesToSet.forEach(({ name, value, options }: any) =>
                cookies.set(name, value, options),
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      },
    );
  }

  async getSession(client: SupabaseClient) {
    const {
      data: { session },
      error,
    } = await client.auth.getSession();
    if (error) throw error;
    return session;
  }

  async getUser(client: SupabaseClient) {
    const {
      data: { user },
      error,
    } = await client.auth.getUser();
    if (error) throw error;
    return user;
  }

  async signOut(client: SupabaseClient) {
    const { error } = await client.auth.signOut();
    if (error) throw error;
  }

  async signInWithPassword(
    client: SupabaseClient,
    email: string,
    password: string,
  ) {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signUp(client: SupabaseClient, email: string, password: string) {
    const { data, error } = await client.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }
}
