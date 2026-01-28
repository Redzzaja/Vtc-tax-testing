import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = "ini-rahasia-banget-jangan-disebar";
const key = new TextEncoder().encode(SECRET_KEY);

// 1. Definisikan tipe data Session agar TypeScript paham
export interface UserSession {
  userId: number;
  username: string;
  role: string;
  fullName: string;
  // Properti standar JWT (opsional)
  iat?: number;
  exp?: number;
}

export async function createSession(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);

  (await cookies()).set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

// 2. Ubah return type menjadi Promise<UserSession | null>
export async function getSession(): Promise<UserSession | null> {
  const session = (await cookies()).get("session_token")?.value;
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    // 3. Paksa TypeScript menganggap payload ini sebagai UserSession
    return payload as unknown as UserSession;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  (await cookies()).delete("session_token");
}
