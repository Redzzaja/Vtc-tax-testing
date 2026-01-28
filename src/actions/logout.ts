"use server";

import { logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
  // 1. Hapus Cookie
  await logout();

  // 2. Redirect Tegas ke Login
  redirect("/login");
}
