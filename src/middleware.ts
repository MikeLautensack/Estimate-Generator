export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/contractor-dashboard",
    "/customers-dashboard",
    "/admin-dashboard",
    "/customers",
    "/estimates",
    "/settings/:path*",
    "/customerform",
    "/estimateform",
  ],
};
