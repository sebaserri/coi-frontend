"use client";

import { useEffect } from "react";
import { useSessionQuery } from "@/lib/auth-hooks";
import NavSidebar from "@/components/NavSidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isLoading } = useSessionQuery();

  useEffect(() => {
    if (!isLoading && !session) {
      window.location.href = "/(auth)/sign-in";
    }
  }, [isLoading, session]);

  if (isLoading)
    return <div className="h-screen grid place-items-center">Cargando…</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen flex">
      <NavSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
