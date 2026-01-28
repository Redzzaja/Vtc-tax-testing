import { db } from "@/db"; // Sesuaikan path
import { users } from "@/db/schema"; // Sesuaikan path
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/auth"; // Import dari langkah 2
import { redirect } from "next/navigation";

export default function LoginPage() {
  // Server Action (Jalan di server)
  async function handleLogin(formData: FormData) {
    "use server";

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // 1. Cari User di Database
    // Ini pakai tabel 'users' yang SUDAH ADA, tidak perlu ubah schema
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    // 2. Cek Validasi
    if (!user) {
      redirect("/login?error=User tidak ditemukan");
    }

    // 3. Cek Password
    // Karena data seed plain text, kita bandingkan langsung.
    // Nanti kalau mau secure, user bisa ganti pass jadi hash bcrypt.
    if (user.password !== password) {
      redirect("/login?error=Password salah");
    }

    // 4. Buat Session
    await createSession({
      userId: user.id,
      username: user.username,
      role: user.role,
      fullName: user.fullName,
    });

    // 5. Sukses
    redirect("/");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md border">
        <h1 className="text-xl font-bold mb-4 text-center">Login VTC System</h1>

        <form action={handleLogin} className="flex flex-col gap-4">
          <input
            name="username"
            type="text"
            placeholder="Username (ex: admin)"
            className="border p-2 rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
