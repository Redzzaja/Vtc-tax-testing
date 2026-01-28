import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect root "/" langsung ke dashboard (atau login jika belum auth)
  redirect("/dashboard");
}
