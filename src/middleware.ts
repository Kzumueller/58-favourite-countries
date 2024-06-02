import type {NextRequest} from "next/server"
import {verifyToken} from "@/src/lib/verifyToken";

/**
 * Middleware ensuring user authorization via valid JWT
 * Logged-in users attempting to /login or /register will be redirected to /
 * Not-logged-in users attempting to access / will be sent to /login
 * @param request
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  let authorized = false;

  if(token) {
    try {
      await verifyToken<{id: string}>(token);
      authorized = true;
    } catch(error) {
      console.error(error);
      authorized = false;
    }
  }

  const unprotectedRoute = ["/login", "/register"].includes(request.nextUrl.pathname);

  if (authorized && unprotectedRoute) {
    return Response.redirect(new URL("/", request.url))
  }

  if (!authorized && !unprotectedRoute) {
    return Response.redirect(new URL("/login", request.url))
  }
}

export const runtime = 'nodejs';

export const config = {
  matcher: ["/", "/login", "/register"]
}