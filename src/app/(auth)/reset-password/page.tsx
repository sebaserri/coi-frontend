"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useResetPassword } from "@/lib/auth-hooks";

export default function ResetPasswordPage() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  const reset = useResetPassword();

  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [ok, setOk] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);

  useEffect(() => {
    if (!token) setLocalErr("Token faltante");
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (pwd !== pwd2) {
      setLocalErr("Las contraseñas no coinciden");
      return;
    }
    setLocalErr(null);
    try {
      await reset.mutateAsync({ token, password: pwd });
      setOk(true);
    } catch {
      // error mostrado abajo
    }
  };

  if (ok) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="bg-white p-6 rounded-2xl shadow max-w-md text-center">
          <h1 className="text-2xl font-semibold">Contraseña actualizada</h1>
          <Link
            href="/(auth)/sign-in"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Iniciar sesión
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
        <h1 className="text-2xl font-semibold">Restablecer contraseña</h1>

        <label className="block text-sm mt-4 mb-1">Nueva contraseña</label>
        <input
          type="password"
          required
          minLength={8}
          className="w-full border rounded-lg p-2"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <label className="block text-sm mt-3 mb-1">Confirmar contraseña</label>
        <input
          type="password"
          required
          minLength={8}
          className="w-full border rounded-lg p-2"
          value={pwd2}
          onChange={(e) => setPwd2(e.target.value)}
        />

        {(localErr || reset.isError) && (
          <p className="text-red-600 text-sm mt-3">
            {localErr ||
              (reset.error as any)?.message ||
              "No se pudo restablecer la contraseña"}
          </p>
        )}

        <button
          disabled={reset.isPending || !token}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {reset.isPending ? "Actualizando…" : "Actualizar contraseña"}
        </button>
      </form>
    </div>
  );
}
