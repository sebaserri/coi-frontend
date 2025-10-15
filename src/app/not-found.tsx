export default function NotFound() {
  return (
    <div className="h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Página no encontrada</h1>
        <a className="mt-3 inline-block text-blue-600 hover:underline" href="/">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
