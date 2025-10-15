// app/public/coi/[token]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";

export default function PublicCoiPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  const [meta, setMeta] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      const m = await api(`/coi/requests/${token}`);
      setMeta(m);
      const presign = await api<{ url: string; fields?: any }>(
        `/coi/requests/${token}/presign?mime=application/pdf`
      );
      setUploadUrl(presign?.url || null);
    })();
  }, [token]);

  async function submit() {
    if (!file || !uploadUrl) return;
    setSending(true);
    // Para MVP: subí el archivo al `uploadUrl` si es S3 Presigned POST/PUT (ajustar según tu FilesService)
    await fetch(uploadUrl, { method: "PUT", body: file });
    await api(`/coi/requests/${token}/submit`, {
      method: "POST",
      body: JSON.stringify({
        insuredName: "",
        producer: "",
        generalLiabLimit: null,
        autoLiabLimit: null,
        umbrellaLimit: null,
        workersComp: null,
        additionalInsured: null,
        waiverOfSubrogation: null,
        certificateHolder: "",
        effectiveDate: null,
        expirationDate: null,
        files: [{ url: uploadUrl, kind: "CERTIFICATE" }],
      }),
    });
    setOk(true);
  }

  if (!meta) return <div className="p-6">Cargando…</div>;
  if (ok)
    return (
      <div className="p-6">¡Gracias! Tu COI fue enviado para revisión.</div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold">Enviar COI</h1>
      <p className="text-sm text-gray-600 mt-1">
        Proveedor: <b>{meta.vendor.legalName}</b> — Edificio:{" "}
        <b>{meta.building.name}</b>
      </p>

      <div className="mt-4">
        <label className="block text-sm mb-1">Archivo (PDF, máx 10MB)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <button
        onClick={submit}
        disabled={!file || !uploadUrl || sending}
        className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
      >
        {sending ? "Enviando…" : "Enviar COI"}
      </button>
    </div>
  );
}
