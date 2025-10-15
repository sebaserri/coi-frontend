"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "./api-client";

export type Coi = {
  id: string;
  vendorId: string;
  buildingId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  insuredName?: string;
  effectiveDate?: string;
  expirationDate?: string;
  vendor?: { id: string; legalName: string };
  building?: { id: string; name: string };
  files?: Array<{ id: string; url: string; kind: string }>;
};

export function useCoisQuery(filters: {
  buildingId?: string;
  status?: string;
}) {
  const params = new URLSearchParams();
  if (filters.buildingId) params.set("buildingId", filters.buildingId);
  if (filters.status) params.set("status", filters.status);
  const qs = params.toString();
  return useQuery({
    queryKey: ["cois", filters],
    queryFn: () => fetchApi<Coi[]>(`/cois${qs ? `?${qs}` : ""}`),
  });
}

export function useReviewCoi() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      id: string;
      status: "APPROVED" | "REJECTED";
      notes?: string;
      flags?: { additionalInsured?: boolean; waiverOfSubrogation?: boolean };
    }) =>
      fetchApi(`/cois/${payload.id}/review`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    // Optimistic update
    onMutate: async (payload) => {
      await qc.cancelQueries({ queryKey: ["cois"] });
      const prev = qc.getQueriesData<any>({ queryKey: ["cois"] });
      // snapshot por cada query coincidente
      const snapshots = prev.map(([key, data]) => ({ key, data }));
      qc.setQueriesData<any>({ queryKey: ["cois"] }, (old: any) => {
        if (!Array.isArray(old)) return old;
        return old.map((c: Coi) =>
          c.id === payload.id
            ? { ...c, status: payload.status, notes: payload.notes }
            : c
        );
      });
      return { snapshots };
    },
    onError: (_err, _payload, ctx) => {
      // revert
      ctx?.snapshots?.forEach((s: any) => {
        qc.setQueryData(s.key, s.data);
      });
    },
    onSettled: async () => {
      await qc.invalidateQueries({ queryKey: ["cois"] });
    },
  });
}
