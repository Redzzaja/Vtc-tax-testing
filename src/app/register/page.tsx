import { db } from "@/db";
import { users } from "@/db/schema"; // Pastikan path schema benar
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  // --- SERVER ACTION (Backend Logic) ---
  async function handleRegister(formData: FormData) {
    "use server";

    const fullName = formData.get("fullName") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // 1. Validasi Password
    if (password !== confirmPassword) {
      redirect("/register?error=Password tidak cocok");
    }

    // 2. Cek apakah Username sudah ada
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (existingUser.length > 0) {
      redirect("/register?error=Username sudah dipakai");
    }

    // 3. Insert User Baru
    // Default role kita set 'user' atau 'Restricted' agar aman
    await db.insert(users).values({
      fullName: fullName,
      username: username,
      password: password, // Masih plain text (sesuai request awal)
      role: "user",
    });

    // 4. Redirect ke Login
    redirect("/login?success=Berhasil daftar, silakan login");
  }

  // --- UI (Frontend) ---
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Daftar Akun Baru
        </h2>

        <form action={handleRegister} className="space-y-4">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              name="fullName"
              type="text"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Contoh: Budi Santoso"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Username unik"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="******"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Konfirmasi Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="******"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md font-bold hover:bg-green-700 transition"
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
}
