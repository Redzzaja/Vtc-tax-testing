"use client";

import { useActionState } from "react";
import { registerAction } from "@/actions/auth"; // Import action register
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          DAFTAR AKUN
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Buat akun relawan baru
        </p>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              name="fullName"
              type="text"
              required
              placeholder="Budi Santoso"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              placeholder="budi123"
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
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 disabled:opacity-50 font-medium"
          >
            {isPending ? "Mendaftarkan..." : "Daftar Sekarang"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
}
