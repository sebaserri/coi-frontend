"use client";

import { useState } from "react";
import Link from "next/link";
import { useRegister } from "@/lib/auth-hooks";

export default function SignUpPage() {
  const register = useRegister();

  const [name, setName] = useState("");
  const [vendorId, setVendorId] = useState(""); // opcional, si se registra como VENDOR ya asignado
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [ok, setOk] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register.mutateAsync({
        name,
        email,
        password: pwd,
        role: "VENDOR",
        vendorId: vendorId || undefined,
      });
      setOk(true);
    } catch {
      // error mostrado abajo
    }
  };

  if (ok) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="bg-white p-6 rounded-2xl shadow max-w-md">
          <h1 className="text-2xl font-semibold">¡Cuenta creada!</h1>
          <p className="text-sm text-gray-600 mt-2">
            Te enviamos un correo de verificación (si está habilitado). Revisa
            tu bandeja.
          </p>
          <Link
            href="/(auth)/sign-in"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Ir a iniciar sesión
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
        <h1 className="text-2xl font-semibold">Crear cuenta</h1>

        <label className="block text-sm mt-4 mb-1">Nombre</label>
        <input
          className="w-full border rounded-lg p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block text-sm mt-3 mb-1">Vendor ID (opcional)</label>
        <input
          className="w-full border rounded-lg p-2"
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          placeholder="v_123"
        />

        <label className="block text-sm mt-3 mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded-lg p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-sm mt-3 mb-1">Password</label>
        <input
          type="password"
          className="w-full border rounded-lg p-2"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
          minLength={8}
        />

        {register.isError && (
          <p className="text-red-600 text-sm mt-3">
            {(register.error as any)?.message || "No se pudo crear la cuenta"}
          </p>
        )}

        <button
          disabled={register.isPending}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {register.isPending ? "Creando…" : "Crear cuenta"}
        </button>

        <p className="text-sm text-gray-600 mt-3">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/(auth)/sign-in"
            className="text-blue-600 hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
