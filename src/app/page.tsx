import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  // 1. Cek apakah ada session valid
  const session = await getSession();

  // 2. Arahkan sesuai status login
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
