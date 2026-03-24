// apps/admin/app/(dashboard)/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    const token = localStorage.getItem("koda_token");
    if (!token) {
      router.push("/login");
    } else {
      fetchStores();
    }
  }, []);

  const fetchStores = async () => {
    try {
      const res = await fetch(`${API_URL}/stores`);
      const data = await res.json();
      setStores(data);
    } catch (error) {
      console.error("Error cargando tiendas:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("koda_token");
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/stores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subdomain, ownerEmail }),
    });

    if (res.ok) {
      setName(""); setSubdomain(""); setOwnerEmail("");
      fetchStores();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-blue-500 italic">KODA DASHBOARD</h1>
            <p className="text-gray-500">Gestiona tus ecosistemas de venta</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-400 hover:text-white text-sm font-medium bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 transition"
          >
            Cerrar Sesión
          </button>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulario */}
          <aside className="md:col-span-1">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Nueva Tienda</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  placeholder="Nombre Comercial" 
                  className="w-full bg-slate-950 border-slate-800 p-3 rounded-xl text-sm"
                  value={name} onChange={e => setName(e.target.value)} required 
                />
                <input 
                  placeholder="Subdominio (ej: nike-clones)" 
                  className="w-full bg-slate-950 border-slate-800 p-3 rounded-xl text-sm font-mono"
                  value={subdomain} onChange={e => setSubdomain(e.target.value)} required 
                />
                <input 
                  type="email" placeholder="Email de contacto" 
                  className="w-full bg-slate-950 border-slate-800 p-3 rounded-xl text-sm"
                  value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} required 
                />
                <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/20">
                  + Crear Instancia
                </button>
              </form>
            </div>
          </aside>

          {/* Lista */}
          <main className="md:col-span-2">
            <h2 className="text-xl font-bold mb-6">Instancias Activas</h2>
            <div className="grid gap-4">
              {stores.map((store: any) => (
                <div key={store.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex justify-between items-center hover:border-blue-500/50 transition">
                  <div>
                    <h3 className="text-xl font-bold">{store.name}</h3>
                    <p className="text-sm text-blue-400 font-mono">{store.subdomain}.kodashop.com</p>
                  </div>
                  <Link 
                    href={`/store/${store.id}`} 
                    className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-xl text-sm font-bold border border-slate-700 transition"
                  >
                    Entrar →
                  </Link>
                </div>
              ))}
              {stores.length === 0 && (
                <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
                  <p className="text-gray-500 font-medium">No tienes tiendas creadas aún.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}