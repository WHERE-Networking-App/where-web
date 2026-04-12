import { NextResponse } from "next/server";
import type {NextRequest  } from "next/server";

export async function proxy(request: NextRequest) {
    const token = request.cookies.get("auth_token")?.value;
    const pathname = request.nextUrl.pathname;

    const isProtectedRouts = pathname.startsWith('/dashboard') || pathname.startsWith('/create-meetup') || pathname.startsWith('/account-setup');

    if (isProtectedRouts) {
        if(!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/auth/verify`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const response = NextResponse.redirect(new URL('/login', request.url));
                response.cookies.delete('auth_token');
                return response;
            }

            return NextResponse.next();
        } catch(error) {
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('auth_token');
            return response;
        }
    }

    if (pathname === "/login" || pathname === "/signup") {
        if (token) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}