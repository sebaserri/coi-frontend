'use client';
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html>
      <body>
        <div className="h-screen grid place-items-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Ocurrió un error</h1>
            <p className="text-gray-600 mt-2">{error.message}</p>
          </div>
        </div>
      </body>
    </html>
  );
}
