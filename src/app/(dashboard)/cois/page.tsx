"use client";
import { useState } from "react";
import { useCoisQuery, useReviewCoi } from "@/lib/cois-hooks";

export default function CoisPage() {
  const [status, setStatus] = useState<string>("");
  const [buildingId, setBuildingId] = useState<string>("");
  const { data, isLoading, isError, refetch } = useCoisQuery({
    status,
    buildingId,
  });
  const review = useReviewCoi();

  return (
    <div className="space-y-4">
      <header className="flex flex-col md:flex-row md:items-end gap-3">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">COIs</h1>
          <p className="text-gray-600 text-sm">Listado y revisión</p>
        </div>
        <div className="flex gap-3">
          <select
            className="border rounded-lg p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Estado: Todos</option>
            <option value="PENDING">Pendientes</option>
            <option value="APPROVED">Aprobados</option>
            <option value="REJECTED">Rechazados</option>
          </select>
          <input
            className="border rounded-lg p-2"
            placeholder="Building ID"
            value={buildingId}
            onChange={(e) => setBuildingId(e.target.value)}
          />
          <button
            onClick={() => refetch()}
            className="px-3 py-2 rounded-lg bg-gray-900 text-white"
          >
            Filtrar
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3">Proveedor</th>
              <th className="text-left p-3">Edificio</th>
              <th className="text-left p-3">Asegurado</th>
              <th className="text-left p-3">Vigencia</th>
              <th className="text-left p-3">Estado</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="p-4" colSpan={6}>
                  Cargando…
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td className="p-4 text-red-600" colSpan={6}>
                  Error al cargar
                </td>
              </tr>
            )}
            {data?.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.vendor?.legalName || c.vendorId}</td>
                <td className="p-3">{c.building?.name || c.buildingId}</td>
                <td className="p-3">{c.insuredName || "—"}</td>
                <td className="p-3">
                  {c.effectiveDate || "—"} → {c.expirationDate || "—"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      c.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : c.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      disabled={review.isPending}
                      onClick={() =>
                        review.mutate({ id: c.id, status: "APPROVED" })
                      }
                      className="px-3 py-1 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 disabled:opacity-50"
                    >
                      Aprobar
                    </button>
                    <button
                      disabled={review.isPending}
                      onClick={() =>
                        review.mutate({
                          id: c.id,
                          status: "REJECTED",
                          notes: "Falta holder o límites",
                        })
                      }
                      className="px-3 py-1 rounded-lg border border-red-600 text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && !isError && (!data || data.length === 0) && (
              <tr>
                <td className="p-4" colSpan={6}>
                  Sin resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
