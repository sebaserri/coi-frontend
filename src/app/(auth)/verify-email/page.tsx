"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useVerifyEmail } from "@/lib/auth-hooks";

export default function VerifyEmailPage() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  const verify = useVerifyEmail();

  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token faltante");
        return;
      }
      try {
        await verify.mutateAsync({ token });
        setStatus("ok");
      } catch (e: any) {
        setStatus("error");
        setMessage(e?.message || "Token inválido o expirado");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow max-w-md text-center">
        {status === "idle" && <p>Verificando…</p>}
        {status === "ok" && (
          <>
            <h1 className="text-2xl font-semibold">¡Email verificado!</h1>
            <Link
              href="/(auth)/sign-in"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Ir a iniciar sesión
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold">No se pudo verificar</h1>
            <p className="text-sm text-gray-600 mt-2">{message}</p>
            <Link
              href="/(auth)/sign-in"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Volver al inicio de sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
