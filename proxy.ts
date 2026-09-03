import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {jwtVerify } from 'jose';
import { AuthResponse } from "@/lib/types/authTypes";


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


export async function proxy(request: NextRequest) {
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

    

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    const isUserRoute = pathname.startsWith("/user");

    if (!isAuthRoute && !isTokenVerified)
    {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if ((isAuthRoute && isTokenVerified) || (!isUserRoute && isTokenVerified)){
        return NextResponse.redirect(new URL('/user/threads', request.url));
    }

    return NextResponse.next();

}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}