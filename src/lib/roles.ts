"use client";
import { useAuth } from "./auth-hooks";

export function useRequireRole(allowed: Array<"ADMIN" | "VENDOR" | "GUARD">) {
  const { session } = useAuth();
  if (!session)
    return { allowed: false as const, reason: "NO_SESSION" as const };
  if (!allowed.includes(session.role))
    return { allowed: false as const, reason: "FORBIDDEN" as const };
  return { allowed: true as const };
}
