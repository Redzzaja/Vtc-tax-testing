// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Import langsung jose di sini

const SECRET_KEY = "ini-rahasia-banget-jangan-disebar";
const key = new TextEncoder().encode(SECRET_KEY);

export async function middleware(request: NextRequest) {
  // 1. Ambil cookie langsung dari Request (bukan lewat fungsi getSession)
  const sessionToken = request.cookies.get("session_token")?.value;

  // 2. Verifikasi Token Manual
  let session = null;
  if (sessionToken) {
    try {
      const { payload } = await jwtVerify(sessionToken, key, {
        algorithms: ["HS256"],
      });
      session = payload;
    } catch (error) {
      // Token invalid/expired
    }
  }

  const publicRoutes = ["/login", "/register"];
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    // Kalau sudah login, lempar ke dashboard
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  // --- Logic Redirect Sama Seperti Sebelumnya ---

  if (request.nextUrl.pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
