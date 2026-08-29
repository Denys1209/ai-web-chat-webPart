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

    const stored = localStorage.getItem("auth");

    let isTokenVerified = false;

    if (stored){
            const parsed:AuthResponse = JSON.parse(stored);
            isTokenVerified = await verifyToken(parsed.token);
    }

    const isProtectedRoute = protectedRoutes.some((route) => {
        pathname.startsWith(route);
        });

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !isTokenVerified)
    {
        return NextResponse.redirect('/login');
    }

    if (isAuthRoute && isTokenVerified){
        return NextResponse.redirect('/user/threads');
    }

    return NextResponse.next();

}
