import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {jwtVerify } from 'jose';
import { AuthResponse } from "@/lib/authTypes";

const protectedRoutes = ['/user']

const authRoutes = ['/login', '/register'];

async function verifyToken(token:string) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        return true;
    } catch {
        return false;
    }
}


export async function middleware(request: NextRequest) {
    const {pathname } = request.nextUrl;

    const stored = request.cookies.get("auth")?.value;

    let isTokenVerified = false;

    if (stored){
            try {
                const parsed: AuthResponse = JSON.parse(stored);
                isTokenVerified = await verifyToken(parsed.token);
            } 
            catch{
                isTokenVerified = false;
            }
    }

    const isProtectedRoute = protectedRoutes.some((route) => 
        pathname.startsWith(route)
        );

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !isTokenVerified)
    {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthRoute && isTokenVerified){
        return NextResponse.redirect(new URL('/user/threads', request.url));
    }

    return NextResponse.next();

}

export const config = { matcher: ["/user/:path*", "/login", "/register"] }; 