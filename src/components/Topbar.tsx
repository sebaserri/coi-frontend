"use client";
import { useAuth } from "@/lib/auth-hooks";

export default function Topbar() {
  const { session, logout } = useAuth();
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      <div className="md:hidden">
        {" "}
        {/* espacio para menú hamburguesa si lo implementas */}
      </div>
      <div />
      <div className="text-sm text-gray-600 flex items-center gap-3">
        <span>{session?.email}</span>
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs">
          {session?.role}
        </span>
        <button onClick={logout} className="text-blue-600 hover:underline">
          Salir
        </button>
      </div>
    </header>
  );
}
