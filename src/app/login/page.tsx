"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth"; // Import action baru
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          LOGIN VTC
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Masuk ke sistem perpajakan
        </p>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          {state?.message && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-200">
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 disabled:opacity-50 font-medium"
          >
            {isPending ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Daftar disini
          </Link>
        </p>
      </div>
    </div>
  );
}
