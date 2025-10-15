"use client";

import { useState } from "react";
import Link from "next/link";
import { useForgotPassword } from "@/lib/auth-hooks";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const forgot = useForgotPassword();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgot.mutateAsync({ email });
      setSent(true);
    } catch {
      // el mensaje se toma de forgot.error
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="bg-white p-6 rounded-2xl shadow max-w-md text-center">
          <h1 className="text-2xl font-semibold">Revisa tu email</h1>
          <p className="text-sm text-gray-600 mt-2">
            Si existe una cuenta, te enviamos un enlace para restablecer tu
            contraseña.
          </p>
          <Link
            href="/(auth)/sign-in"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow"
      >
        <h1 className="text-2xl font-semibold">¿Olvidaste tu contraseña?</h1>
        <p className="text-sm text-gray-600 mt-1">
          Te enviaremos un enlace para restablecerla.
        </p>

        <label className="block text-sm mt-4 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full border rounded-lg p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {forgot.isError && (
          <p className="text-red-600 text-sm mt-3">
            {(forgot.error as any)?.message ||
              "Error enviando email de recuperación"}
          </p>
        )}

        <button
          disabled={forgot.isPending}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {forgot.isPending ? "Enviando…" : "Enviar enlace"}
        </button>

        <p className="text-sm text-gray-600 mt-3">
          ¿Recordaste tu contraseña?{" "}
          <Link
            href="/(auth)/sign-in"
            className="text-blue-600 hover:underline"
          >
            Volver a iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
