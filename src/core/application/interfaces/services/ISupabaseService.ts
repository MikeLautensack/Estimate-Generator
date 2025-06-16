import { SupabaseClient } from "@supabase/supabase-js";
import { RedirectType } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";

export interface ISupabaseService {
  getServerClient(): Promise<SupabaseClient>;
  getSession(client: SupabaseClient): Promise<any>;
  getUser(client: SupabaseClient): Promise<any>;
  signInWithGoogle(): Promise<RedirectType>;
  inviteUser(email: string): Promise<any>;
  updateSession(request: NextRequest): Promise<NextResponse>;
}
