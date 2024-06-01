import type { NextRequest } from "next/server"
import {jwtVerify} from "jose";
import {verifyToken} from "@/src/lib/verifyToken";

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
  matcher: ["/"]
}