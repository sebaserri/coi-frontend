"use client";
import Link from "next/link";
import { useLogin, useSessionQuery } from "@/lib/auth-hooks";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const { data: session } = useSessionQuery();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (session) {
      window.location.href = "/cois";
    }
  }, [session]);

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login.mutate({ email, password: pwd });
        }}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow"
      >
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
        <label className="block text-sm mt-4 mb-1">Email</label>
        <input
          className="w-full border rounded-lg p-2"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-3">
          <label className="block text-sm mb-1">Password</label>
          <div className="relative">
            <input
              className="w-full border rounded-lg p-2 pr-10"
              type={show ? "text" : "password"}
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              onClick={() => setShow((v) => !v)}
            >
              {show ? "Ocultar" : "Ver"}
            </button>
          </div>
        </div>
        {login.isError && (
          <p className="text-red-600 text-sm mt-2">
            {(login.error as any)?.message || "Error"}
          </p>
        )}
        <button
          disabled={login.isPending}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {login.isPending ? "Ingresando…" : "Ingresar"}
        </button>
        <div className="flex items-center justify-between text-sm mt-4">
          <Link
            href="/(auth)/forgot-password"
            className="text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <Link
            href="/(auth)/sign-up"
            className="text-blue-600 hover:underline"
          >
            Crear cuenta
          </Link>
        </div>
      </form>
    </div>
  );
}
