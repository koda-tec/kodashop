"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, Plus, Globe, ExternalLink, Settings, 
  LogOut, LayoutDashboard, Store as StoreIcon, AlertCircle 
} from "lucide-react";

export default function DashboardPage() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // 🛡️ EFECTO: Verificar sesión y cargar tiendas
  useEffect(() => {
    const token = localStorage.getItem("koda_token");
    if (!token) {
      router.push("/login");
    } else {
      fetchStores();
    }
  }, []);

  // 🔍 FUNCIÓN: Obtener solo MIS tiendas
  const fetchStores = async () => {
    const token = localStorage.getItem("koda_token");
    try {
      const res = await fetch(`${API_URL}/stores`, {
        headers: { 
          "Authorization": `Bearer ${token}` // <--- LLAVE DE SEGURIDAD
        },
      });

      if (res.status === 401) {
        handleLogout(); // Si el token expiró, cerrar sesión
        return;
      }

      const data = await res.json();
      setStores(data);
    } catch (error) {
      console.error("Error cargando tiendas:", error);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 FUNCIÓN: Crear una nueva tienda vinculada a mi cuenta
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCreating(true);
    const token = localStorage.getItem("koda_token");

    try {
      const res = await fetch(`${API_URL}/stores`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // <--- LLAVE DE SEGURIDAD
        },
        body: JSON.stringify({ name, subdomain, ownerEmail }),
      });

      if (res.ok) {
        setName(""); setSubdomain(""); setOwnerEmail("");
        fetchStores(); // Recargar lista
      } else {
        const data = await res.json();
        setError(data.message || "Error al crear la instancia.");
      }
    } catch (error) {
      setError("Error de conexión al crear tienda.");
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("koda_token");
    localStorage.removeItem("user_email");
    router.push("/login");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-blue-500 animate-spin"><Rocket size={40} /></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
      
      {/* 🟢 NAVBAR */}
      <header className="border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="text-xl font-black text-white italic tracking-tighter">KODA PANEL</span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              {localStorage.getItem("user_email")}
            </span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-xs font-black tracking-widest"
            >
              <LogOut size={18} /> SALIR
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
              className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2.5rem] sticky top-32 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2 tracking-tight">
                <Plus className="text-blue-500" /> LANZAR TIENDA
              </h2>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 flex items-center gap-2 text-xs font-bold">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Nombre del Proyecto</label>
                  <input 
                    placeholder="Ej. Glow Skin Argentina" 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium placeholder:text-slate-700"
                    value={name} onChange={e => setName(e.target.value)} required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Subdominio Único</label>
                  <div className="relative">
                    <input 
                      placeholder="glow-skin" 
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono text-sm placeholder:text-slate-700"
                      value={subdomain} onChange={e => setSubdomain(e.target.value)} required 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-[10px] uppercase">.koda.com</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Email de Operaciones</label>
                  <input 
                    type="email" placeholder="hola@marca.com" 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium placeholder:text-slate-700"
                    value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} required 
                  />
                </div>
                <button 
                  disabled={creating}
                  className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black text-white shadow-xl shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {creating ? "DESPLEGANDO INSTANCIA..." : "CREAR AHORA"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* 📋 COLUMNA DERECHA: MIS TIENDAS */}
          <div className="lg:col-span-8">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">
              Tus Ecosistemas Activos ({stores.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {stores.map((store: any, index) => (
                  <motion.div 
                    key={store.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-slate-900/30 border border-slate-800 p-6 rounded-[2.5rem] hover:border-blue-500/50 transition-all shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-inner">
                          <StoreIcon size={24} className="text-slate-500 group-hover:text-white" />
                        </div>
                        <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 tracking-widest">
                          ACTIVO
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white mb-1 tracking-tight">{store.name}</h3>
                      <p className="text-xs text-slate-500 font-mono mb-8">{store.subdomain}.kodashop.com</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link 
                        href={`/store/${store.id}`}
                        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 p-3.5 rounded-xl text-[10px] font-black transition-all border border-slate-700"
                      >
                        <Settings size={14} /> GESTIONAR
                      </Link>
                      <a 
                        href={`https://${store.subdomain}.kodashop.com`}
                        target="_blank"
                        className="flex items-center justify-center gap-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white p-3.5 rounded-xl text-[10px] font-black transition-all border border-blue-500/10"
                      >
                        <ExternalLink size={14} /> WEB
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {stores.length === 0 && !loading && (
                <div className="col-span-full py-24 bg-slate-900/10 border-2 border-dashed border-slate-800/50 rounded-[3rem] flex flex-col items-center justify-center text-center px-6">
                  <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 text-slate-700 shadow-inner">
                    <Globe size={40} />
                  </div>
                  <p className="text-slate-400 font-black tracking-tight text-lg">No hay tiendas bajo este usuario.</p>
                  <p className="text-slate-600 text-sm mt-2 max-w-xs">Utiliza el panel lateral para desplegar tu primer ecosistema de validación.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}