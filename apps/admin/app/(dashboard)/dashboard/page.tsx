"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, Plus, Globe, ExternalLink, Settings, 
  LogOut, LayoutDashboard, Store as StoreIcon 
} from "lucide-react";

export default function DashboardPage() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  
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
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("koda_token");
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch(`${API_URL}/stores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, subdomain, ownerEmail }),
      });

      if (res.ok) {
        setName(""); setSubdomain(""); setOwnerEmail("");
        fetchStores();
      }
    } catch (error) {
      alert("Error al crear la tienda");
    } finally {
      setCreating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-blue-500 animate-spin"><Rocket size={40} /></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
      
      {/* 🟢 HEADER PRO */}
      <header className="border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="text-xl font-black text-white italic tracking-tighter">KODA PANEL</span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-xs font-bold text-slate-500 uppercase tracking-widest">
              {localStorage.getItem("user_email")}
            </span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-bold"
            >
              <LogOut size={18} /> <span className="hidden md:inline">SALIR</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 🛠️ COLUMNA IZQUIERDA: CREACIÓN */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] sticky top-32 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <Plus className="text-blue-500" /> NUEVA TIENDA
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Nombre de Marca</label>
                  <input 
                    placeholder="Ej. Alpha Sport" 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                    value={name} onChange={e => setName(e.target.value)} required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Subdominio</label>
                  <div className="relative">
                    <input 
                      placeholder="alpha-sport" 
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono text-sm"
                      value={subdomain} onChange={e => setSubdomain(e.target.value)} required 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-xs">.koda.com</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Email Operativo</label>
                  <input 
                    type="email" placeholder="ventas@marca.com" 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                    value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} required 
                  />
                </div>
                <button 
                  disabled={creating}
                  className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black text-white shadow-xl shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {creating ? "DESPLEGANDO..." : "CREAR INSTANCIA"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* 📋 COLUMNA DERECHA: LISTADO */}
          <div className="lg:col-span-8">
            <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] mb-8">
              Instancias Activas ({stores.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {stores.map((store: any, index) => (
                  <motion.div 
                    key={store.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-slate-900/30 border border-slate-800 p-6 rounded-4xl hover:border-blue-500/50 transition-all shadow-xl hover:shadow-blue-500/5"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <StoreIcon size={24} className="text-slate-400 group-hover:text-white" />
                      </div>
                      <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20">
                        ONLINE
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{store.name}</h3>
                    <p className="text-sm text-slate-500 font-mono mb-6">{store.subdomain}.kodashop.com</p>

                    <div className="grid grid-cols-2 gap-3">
                      <Link 
                        href={`/store/${store.id}`}
                        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 p-3 rounded-xl text-xs font-black transition-all"
                      >
                        <Settings size={14} /> GESTIONAR
                      </Link>
                      <a 
                        href={`https://${store.subdomain}.kodashop.com`}
                        target="_blank"
                        className="flex items-center justify-center gap-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white p-3 rounded-xl text-xs font-black transition-all"
                      >
                        <ExternalLink size={14} /> VER WEB
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {stores.length === 0 && (
                <div className="col-span-full py-20 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600">
                    <Globe size={32} />
                  </div>
                  <p className="text-slate-400 font-bold">No hay tiendas en este ecosistema.</p>
                  <p className="text-slate-600 text-sm mt-1">Utiliza el panel lateral para lanzar la primera.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}