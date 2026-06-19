import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { apiServer } from "./lib/api-server";

/** Shape returned by GET /api/auth/verify-token */
interface VerifyTokenResponse {
  valid: boolean;
  userId: number;
  email: string;
  setupCompleted: boolean;
  emailVerified: boolean;
}

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
        
        const { data, error } = await apiServer<VerifyTokenResponse>('/api/auth/verify-token', { token });

        if(error || !data?.valid) {
            const response = NextResponse.redirect(new URL("/login", request.url));
            // response.cookies.delete("auth_token");
            response.cookies.set("auth_token", "", { maxAge: 0 }); 
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

export const config = {
    matcher: ["/dashboard/:path*", 
        "/create-meetup/:path*", 
        "/account-setup/:path*", 
        "/login", 
        "/signup",
        `/((?!api|_next/static|favicon.ico).*)`
    ],
}