import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cek apakah user sudah login (cek cookie)
  const cookieStore = await cookies();
  const session = cookieStore.get("user_session");

  if (!session) {
    redirect("/"); // Tendang balik ke login jika tidak ada sesi
  }

  const user = JSON.parse(session.value);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Statis */}
      <Sidebar />

      {/* Konten Dinamis */}
      <div className="flex-1 ml-64">
        {/* Header Sederhana */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-gray-700">
            Selamat Datang, <span className="text-blue-600">{user.name}</span>
          </h1>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
            {user.role}
          </div>
        </header>

        {/* Isi Halaman */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
