export { default } from 'next-auth/middleware'
export const config = { matcher: ["/dashboard","/customers","/estimates","/settings/:path*","/customerform","/estimateform"] }