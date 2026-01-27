"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calculator,
  FileText,
  CreditCard,
  Users,
  BookOpen,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/actions/logout";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Hitung TER", href: "/dashboard/ter", icon: Calculator },
  { name: "E-Bupot 21", href: "/dashboard/ebupot21", icon: FileText },
  { name: "Lapor SPT", href: "/dashboard/spt", icon: BookOpen },
  { name: "E-Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Data User", href: "/dashboard/users", icon: Users }, // Khusus Admin
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 h-screen text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-yellow-400">VTC SYSTEM</h2>
        <p className="text-xs text-slate-400">Tax Administration v2.0</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-900/20 rounded-lg transition-colors text-left"
          >
            <LogOut size={20} />
            <span className="font-medium">Keluar</span>
          </button>
        </form>
      </div>
    </div>
  );
}
