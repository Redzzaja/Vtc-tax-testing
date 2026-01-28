import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth"; // Pastikan path ini benar

export async function middleware(request: NextRequest) {
  // Ambil session (otomatis cek cookie 'session_token')
  const session = await getSession();
  const { pathname } = request.nextUrl;

  // Halaman Auth (Login/Register)
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // Halaman Dashboard (Protected)
  const isDashboardPage = pathname.startsWith("/dashboard");

  // SKENARIO 1: Sudah Login, tapi buka halaman Login -> Lempar ke Dashboard
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // SKENARIO 2: Belum Login, tapi buka Dashboard -> Lempar ke Login
  if (!session && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Lanjut normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
