"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "./api-client";

export type Role = "ADMIN" | "VENDOR" | "GUARD";
export type Session = {
  id: string;
  email: string;
  role: Role;
  vendorId?: string;
  name?: string;
};

export function useSessionQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () =>
      fetchApi<{ ok: true; user: Session }>("/auth/me").then((r) => r.user),
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      email: string;
      password: string;
      role: Role;
      name?: string;
      vendorId?: string;
    }) =>
      fetchApi("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => fetchApi("/auth/logout", { method: "POST" }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
      if (typeof window !== "undefined")
        window.location.href = "/(auth)/sign-in";
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: { email: string }) =>
      fetchApi("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: { token: string; password: string }) =>
      fetchApi("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: (payload: { email: string }) =>
      fetchApi("/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (payload: { token: string }) =>
      fetchApi("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}
