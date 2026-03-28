"use client";
import { useState, useEffect } from "react";
import { 
  Save, Target, ShieldCheck, Zap, Info, Loader2, 
  ExternalLink, HelpCircle, Globe, BarChart3, Code2, Lock 
} from "lucide-react";
import { motion } from "framer-motion";

export default function MarketingSection({ storeId }: { storeId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // 1. ESTADO INTEGRAL DE MARKETING
  const [form, setForm] = useState({
    pixelId: "",
    capiToken: "",
    testEventCode: "",
    metaVerification: "",
    googleAnalyticsId: "",
    customHeadScripts: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchData();
  }, [storeId]);

  const fetchData = async () => {
    const token = localStorage.getItem("koda_token");
    try {
      const res = await fetch(`${API_URL}/stores/${storeId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      
      // Mapeamos los datos asegurando que no sean null
      setForm({
        pixelId: data.pixelId || "",
        capiToken: data.capiToken || "",
        testEventCode: data.testEventCode || "",
        metaVerification: data.metaVerification || "",
        googleAnalyticsId: data.googleAnalyticsId || "",
        customHeadScripts: data.customHeadScripts || ""
      });
    } catch (e) {
      console.error("Error al cargar configuración de marketing:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("koda_token");
    try {
      const res = await fetch(`${API_URL}/stores/${storeId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("🚀 Configuración de marketing sincronizada con éxito.");
      } else {
        alert("Error al guardar los cambios.");
      }
    } catch (err) {
      alert("Error de conexión con el servidor.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="p-20 text-center flex flex-col items-center gap-4">
      <Loader2 className="animate-spin text-blue-500" size={40} />
      <p className="text-blue-500 font-black italic uppercase tracking-widest">Configurando Algoritmos...</p>
    </div>
  );

  return (
    <div className="max-w-5xl space-y-12 pb-20 animate-in fade-in duration-700">
      
      <header>
        <h2 className="text-4xl md:text-6xl font-black italic text-blue-500 uppercase tracking-tighter">Marketing</h2>
        <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">Sincronización con ecosistemas de pauta publicitaria</p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        
        {/* BLOQUE 1: META ADS SUITE (PIXEL + CAPI) */}
        <section className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-[3.5rem] backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
             <Target size={150} />
          </div>

          <div className="relative z-10 space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white uppercase italic flex items-center gap-3">
                    <Zap size={24} className="text-yellow-500 fill-yellow-500" /> Meta Ads Intelligence
                  </h3>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-tight">Rastreo de eventos del lado del servidor y navegador.</p>
               </div>
               <a 
                 href="https://business.facebook.com/settings/pixels" 
                 target="_blank" 
                 className="w-fit text-[10px] font-black bg-white text-black px-5 py-2.5 rounded-full hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2"
               >
                  EVENT MANAGER <ExternalLink size={12}/>
               </a>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {/* Pixel ID */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest flex items-center gap-2">
                  Facebook Pixel ID <HelpCircle size={14} className="text-slate-700" />
                </label>
                <input 
                  placeholder="Ej: 82736451928374"
                  className="w-full bg-slate-950 border border-slate-800 p-5 rounded-3xl text-white font-mono text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-800"
                  value={form.pixelId}
                  onChange={e => setForm({...form, pixelId: e.target.value})}
                />
              </div>

              {/* CAPI Token */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Access Token (Conversion API)</label>
                <textarea 
                  placeholder="EAAB..."
                  className="w-full bg-slate-950 border border-slate-800 p-5 rounded-3xl text-white font-mono text-xs h-32 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-800"
                  value={form.capiToken}
                  onChange={e => setForm({...form, capiToken: e.target.value})}
                />
                <p className="text-[9px] text-slate-600 ml-2 font-bold uppercase italic tracking-widest">
                   Evita el bloqueo de iOS 14+ enviando eventos directamente desde nuestro servidor NestJS.
                </p>
              </div>

              {/* Test Event Code */}
              <div className="bg-blue-600/5 p-6 rounded-3xl border border-blue-600/10">
                <label className="text-[10px] font-black text-blue-400 uppercase ml-2 tracking-widest">Test Event Code (Opcional)</label>
                <input 
                  placeholder="Ej: TEST12345"
                  className="w-full bg-slate-950 border border-blue-600/20 p-4 rounded-2xl text-white font-mono text-sm outline-none mt-2"
                  value={form.testEventCode}
                  onChange={e => setForm({...form, testEventCode: e.target.value})}
                />
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE 2: VERIFICACIÓN Y GOOGLE */}
        <section className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-[3.5rem] backdrop-blur-xl space-y-10">
          <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3">
            <ShieldCheck size={24} className="text-emerald-500" /> Verificación y Analytics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                <Globe size={12}/> Meta Domain Verification
              </label>
              <input 
                placeholder="Código de la etiqueta meta"
                className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-mono text-[10px]"
                value={form.metaVerification}
                onChange={e => setForm({...form, metaVerification: e.target.value})}
              />
              <p className="text-[8px] text-slate-600 uppercase font-black px-2">Solo el contenido entre las comillas del meta-tag.</p>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                <BarChart3 size={12}/> Google Analytics 4 (GA4 ID)
              </label>
              <input 
                placeholder="Ej: G-XXXXXXXXXX"
                className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-mono text-sm"
                value={form.googleAnalyticsId}
                onChange={e => setForm({...form, googleAnalyticsId: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* BLOQUE 3: SCRIPTS PERSONALIZADOS */}
        <section className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-[3.5rem] backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
             <Code2 className="text-purple-500" size={24} />
             <h3 className="text-xl font-black text-white uppercase italic">Scripts Personalizados</h3>
          </div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-tighter">Añade píxeles secundarios, chats externos (Tidio, Jivo) o mapas de calor (Hotjar).</p>
          
          <textarea 
            placeholder="<!-- Inserta aquí tus scripts de seguimiento adicionales -->"
            className="w-full bg-slate-950 border border-slate-800 p-6 rounded-4xl text-white font-mono text-[10px] h-40 focus:ring-2 focus:ring-purple-600 outline-none transition-all placeholder:text-slate-800"
            value={form.customHeadScripts}
            onChange={e => setForm({...form, customHeadScripts: e.target.value})}
          />
        </section>

        {/* BOTÓN DE GUARDADO GLOBAL */}
        <div className="pt-6">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-[2.5rem] font-black text-xl shadow-[0_20px_50px_-15px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={24} />} 
            SINCRONIZAR CONFIGURACIÓN
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
             <div className="flex items-center gap-2">
                <Lock size={12}/> <span className="text-[9px] font-black uppercase tracking-widest">Encriptación de Datos</span>
             </div>
             <div className="flex items-center gap-2">
                <ShieldCheck size={12}/> <span className="text-[9px] font-black uppercase tracking-widest">SaaS Cloud Verified</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}