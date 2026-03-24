"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Importamos Link para navegar

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const fetchStores = async () => {
    try {
      const res = await fetch("http://localhost:3000/stores");
      const data = await res.json();
      setStores(data);
    } catch (error) {
      console.error("Error cargando tiendas:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/stores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subdomain, ownerEmail }),
    });

    if (res.ok) {
      setName("");
      setSubdomain("");
      setOwnerEmail("");
      fetchStores();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">KodaShop Dashboard</h1>

      {/* Formulario */}
      <section className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-10 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">Crear Nueva Tienda</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre de la tienda"
            className="p-3 bg-slate-900 border border-slate-700 rounded text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Subdominio (ej: mi-tienda)"
            className="p-3 bg-slate-900 border border-slate-700 rounded text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email del dueño"
            className="p-3 bg-slate-900 border border-slate-700 rounded text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-3 rounded transition-all md:col-span-3">
            + Crear Tienda
          </button>
        </form>
      </section>

      {/* Lista de tiendas */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-400">Tus Tiendas Activas</h2>
        <div className="grid gap-4">
          {stores.map((store: any) => (
            <div key={store.id} className="bg-slate-800 border border-slate-700 p-5 rounded-xl flex justify-between items-center hover:border-blue-500 transition-colors shadow-lg">
              <div>
                <p className="font-bold text-xl text-white">{store.name}</p>
                <p className="text-sm text-blue-400">{store.subdomain}.kodashop.com</p>
              </div>
              <Link 
                href={`/store/${store.id}`} 
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              >
                Gestionar →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}