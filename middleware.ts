// import { type NextRequest } from "next/server";
// import DIContainer from "@/core/DIContainer";

// export async function middleware(request: NextRequest) {
//   console.log("middleware debug 1>>>>>>>>>>>>>>>>>>>>>>>>>>");
//   return await DIContainer.authUseCases.updateSession(request);
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("🔍 MIDDLEWARE RUNNING", request.nextUrl.pathname);

  return NextResponse.next();
}
