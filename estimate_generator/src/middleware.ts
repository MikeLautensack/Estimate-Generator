import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        
    },
    {
        callbacks: {
            // authorized: ({ token }) => token?.role === 'admin'
        }
    }
)

export const config = { matcher: ["/contractor-dashboard","/customers-dashboard","/admin-dashboard","/customers","/estimates","/settings/:path*","/customerform","/estimateform"] }