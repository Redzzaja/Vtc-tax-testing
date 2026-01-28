"use server";

import { db } from "@/db"; // Koneksi Neon
import { users } from "@/db/schema"; // Schema Neon
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/auth"; // Import lib auth yang baru kita perbaiki
import { redirect } from "next/navigation";

// Tipe state untuk useActionState
export type AuthState = {
  success: boolean;
  message: string;
};

export async function loginAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Cari User di Database Neon
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    // 2. Validasi User
    if (!user) {
      return { success: false, message: "Username tidak ditemukan!" };
    }

    // 3. Cek Password (Manual compare karena data seed masih plain text)
    if (user.password !== password) {
      return { success: false, message: "Password salah!" };
    }

    // 4. Buat Session
    // Sekarang 'fullName' akan diterima karena tipe di src/lib/auth.ts sudah diperbaiki
    await createSession({
      userId: user.id,
      username: user.username,
      fullName: user.fullName || "User", // Menggunakan fullName
      role: user.role || "user",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Terjadi kesalahan server." };
  }

  // 5. Redirect ke Dashboard
  redirect("/dashboard");
}

// Tambahkan Register Action agar form register juga jalan
export async function registerAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const fullName = formData.get("fullName") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    // Cek Duplikat
    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    if (existing) return { success: false, message: "Username sudah dipakai!" };

    // Insert Data
    await db.insert(users).values({
      fullName,
      username,
      password,
      role: "user",
    });
  } catch (error) {
    return { success: false, message: "Gagal daftar." };
  }

  redirect("/login");
}
