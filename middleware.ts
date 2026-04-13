import { NextResponse } from "next/server";
import {NextRequest  } from "next/server";
import { apiServer } from "./lib/api-server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("auth_token")?.value;
    const pathname = request.nextUrl.pathname;

    const isProtectedRoute = ["/dashboard", "/create-meetup", "/account-setup"].some(route => 
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        if(!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        
        const error = await apiServer('/api/auth/verify', {token});

        if(error) {
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("auth_token");
            return response;
        }

        return NextResponse.next();
    }

    if (pathname === "/login" || pathname === "/signup") {
        if (token) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}
