"use client";
import { useState, useEffect } from "react";
import { Save, Target, ShieldCheck, Zap, Info, Loader2, ExternalLink, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function MarketingSection({ storeId }: { storeId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    pixelId: "",
    capiToken: "",
    testEventCode: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("koda_token");
    const res = await fetch(`${API_URL}/stores/${storeId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    setForm({
      pixelId: data.pixelId || "",
      capiToken: data.capiToken || "",
      testEventCode: data.testEventCode || ""
    });
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("koda_token");
    await fetch(`${API_URL}/stores/${storeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    setSaving(false);
    alert("Configuración de marketing guardada correctamente.");
  };

  if (loading) return <div className="p-20 text-center animate-pulse text-blue-500 font-black">CONFIGURANDO ALGORITMO...</div>;

  return (
    <div className="max-w-4xl space-y-10 pb-20">
      <header>
        <h2 className="text-4xl md:text-6xl font-black italic text-blue-500 uppercase tracking-tighter">Marketing</h2>
        <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">Sincroniza tu tienda con el algoritmo de Meta</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        
        {/* PIXEL & CAPI CARD */}
        <section className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Target size={120} />
          </div>

          <div className="relative z-10 space-y-8">
            <div className="flex items-start justify-between">
               <div className="space-y-1">
                  <h3 className="text-xl font-black text-white uppercase italic">Meta Ads Tracking</h3>
                  <p className="text-slate-500 text-xs font-medium">Configura el Píxel y la API de Conversiones para medir tus ventas.</p>
               </div>
               <a href="https://business.facebook.com/settings/pixels" target="_blank" className="text-[10px] font-black bg-blue-600/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
                  EVENT MANAGER <ExternalLink size={12}/>
               </a>
            </div>

            <div className="space-y-6">
              {/* Pixel ID */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest flex items-center gap-2">
                  Facebook Pixel ID <HelpCircle size={12} className="text-slate-600" />
                </label>
                <input 
                  placeholder="Ej: 82736451928374"
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white font-mono text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={form.pixelId}
                  onChange={e => setForm({...form, pixelId: e.target.value})}
                />
              </div>

              {/* CAPI Token */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest flex items-center gap-2">
                  Access Token (Server-Side) <Zap size={12} className="text-yellow-500 fill-yellow-500" />
                </label>
                <textarea 
                  placeholder="EAAB..."
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white font-mono text-xs h-32 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={form.capiToken}
                  onChange={e => setForm({...form, capiToken: e.target.value})}
                />
                <p className="text-[9px] text-slate-600 ml-2 uppercase font-bold italic">
                   La API de Conversiones (CAPI) evita la pérdida de datos por bloqueadores de anuncios.
                </p>
              </div>

              {/* Test Event Code */}
              <div className="space-y-2 bg-blue-600/5 p-6 rounded-3xl border border-blue-600/10">
                <label className="text-[10px] font-black text-blue-400 uppercase ml-2 tracking-widest">Código de Prueba de Eventos</label>
                <input 
                  placeholder="Ej: TEST12345"
                  className="w-full bg-slate-950 border border-blue-600/20 p-4 rounded-2xl text-white font-mono text-sm outline-none"
                  value={form.testEventCode}
                  onChange={e => setForm({...form, testEventCode: e.target.value})}
                />
                <p className="text-[9px] text-blue-500/70 ml-2 font-medium">Úsalo solo mientras estás probando en el Administrador de Eventos de Meta.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INFO CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-4xl flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500"><ShieldCheck size={20}/></div>
              <div className="space-y-1">
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">Tracking Seguro</h4>
                 <p className="text-[10px] text-slate-500 leading-relaxed">Tus eventos se envían directamente desde los servidores de KodaShop a Meta.</p>
              </div>
           </div>
           <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-4xl flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Info size={20}/></div>
              <div className="space-y-1">
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">Precisión del 99%</h4>
                 <p className="text-[10px] text-slate-500 leading-relaxed">Optimizamos el envío de datos para mejorar tu ROAS y bajar el CPA.</p>
              </div>
           </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-4xl font-black text-xl shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" /> : <Target size={24} />} GUARDAR CONFIGURACIÓN DE ADS
        </button>

      </div>
    </div>
  );
}