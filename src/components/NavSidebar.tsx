"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth-hooks";

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="block px-3 py-2 rounded-lg hover:bg-gray-100">
    {label}
  </Link>
);

export default function NavSidebar() {
  const { session } = useAuth();
  return (
    <aside className="w-64 hidden md:block border-r bg-white p-3">
      <div className="px-2 py-3 font-semibold">COI Dashboard</div>
      <nav className="space-y-1">
        <NavItem href="/cois" label="COIs" />
        <NavItem href="/requests" label="Solicitudes" />
        <NavItem href="/vendors" label="Vendors" />
        <NavItem href="/buildings" label="Buildings" />
        <NavItem href="/exports" label="Exportar" />
        <NavItem href="/audit" label="Auditoría" />
        <NavItem href="/notifications/test" label="Notificaciones" />
        <NavItem href="/health" label="Health" />
        <NavItem href="/extract" label="OCR / Extract" />
        {session?.role === "GUARD" && (
          <NavItem href="/access" label="Portería" />
        )}
      </nav>
    </aside>
  );
}
