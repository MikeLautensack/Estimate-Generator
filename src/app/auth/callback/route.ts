import DIContainer from "@/core/IoCContainer";
import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  console.log("auth/callback debug >>>>>>>>>>>>>>>>>");
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/contractor-dashboard";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/contractor-dashboard";
  }
  if (code) {
    const supabase = await DIContainer.authUseCases.getServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("access_token", data.session?.access_token);
    console.log("refresh_token", data.session?.refresh_token);
    console.log("expires_at", data.session?.expires_at);
    console.log("expires_in", data.session?.expires_in);
    console.log("token_type", data.session?.token_type);
    console.log("user", data.session?.user);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
