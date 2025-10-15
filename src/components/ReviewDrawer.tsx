"use client";
import { useState } from "react";

export default function ReviewDrawer({
  open,
  onClose,
  onApprove,
  onReject,
  coi,
}: {
  open: boolean;
  onClose: () => void;
  onApprove: (notes?: string) => Promise<void>;
  onReject: (notes: string) => Promise<void>;
  coi: any;
}) {
  const [notes, setNotes] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold">Revisión COI</h2>
        <div className="mt-3 text-sm text-gray-600 space-y-2">
          <div>
            <span className="font-medium">Vendor:</span>{" "}
            {coi?.vendor?.legalName}
          </div>
          <div>
            <span className="font-medium">Building:</span> {coi?.building?.name}
          </div>
          <div>
            <span className="font-medium">Fechas:</span>{" "}
            {coi?.effectiveDate?.substring?.(0, 10)} →{" "}
            {coi?.expirationDate?.substring?.(0, 10)}
          </div>
          <div className="mt-2">
            <label className="block text-sm">Notas</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-green-600 text-white"
            onClick={() => onApprove(notes)}
          >
            Aprobar
          </button>
          <button
            className="px-3 py-2 rounded-lg bg-red-600 text-white"
            onClick={() => onReject(notes)}
          >
            Rechazar
          </button>
          <button
            className="ml-auto px-3 py-2 rounded-lg border"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
