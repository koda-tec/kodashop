"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function StoreDetailPage() {
  const params = useParams();
  const storeId = params.id;

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <Link href="/" className="text-blue-400 hover:underline mb-4 inline-block">
        ← Volver al Dashboard
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">Gestión de Tienda</h1>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <p className="text-gray-400">ID de la tienda: <span className="text-white font-mono">{storeId}</span></p>
        <p className="mt-4">Aquí pronto podrás cargar productos y configurar el Píxel de Meta.</p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg opacity-50">
          <h3 className="font-bold">📦 Productos</h3>
          <p className="text-sm">Próximamente...</p>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg opacity-50">
          <h3 className="font-bold">📊 Marketing (Meta Ads)</h3>
          <p className="text-sm">Próximamente...</p>
        </div>
      </div>
    </div>
  );
}