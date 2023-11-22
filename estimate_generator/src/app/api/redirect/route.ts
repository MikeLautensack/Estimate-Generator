import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../utils/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if(session.user.role === 'admin') {
        return NextResponse.redirect(new URL ('http://localhost:3000/admin-dashboard'))
    } else if (session.user.role === 'contractor') {
        return NextResponse.redirect(new URL ('http://localhost:3000/contractor-dashboard'))
    } else if (session.user.role === 'customer') {
        return NextResponse.redirect(new URL ('http://localhost:3000/customer-dashboard'))
    }
    return new NextResponse('redirecting...')
}