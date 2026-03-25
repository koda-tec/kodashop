"use client";
import { useState, useEffect } from "react";
import { Save, Upload, Loader2, Image as ImageIcon, Check, Palette, Megaphone, Layout, MessageCircle, X } from "lucide-react";

export default function AppearanceSection({ storeId }: { storeId: string }) {
  const [activeSubTab, setActiveSubTab] = useState("general"); // general | home | contact
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    logo: "",
    primaryColor: "#2563eb",
    secondaryColor: "#020617",
    templateId: "default",
    announcement: "",
    heroTitle: "",
    heroSubtitle: "",
    whatsapp: "",
    banners: [] as string[]
  });

  const CLOUD_NAME = "dvkvx5dzz"; 
  const UPLOAD_PRESET = "kodashop";
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => { fetchStoreData(); }, []);

  const fetchStoreData = async () => {
    const token = localStorage.getItem("koda_token");
    const res = await fetch(`${API_URL}/stores/${storeId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    setForm(data);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'banners') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (field === 'logo') setForm({ ...form, logo: data.secure_url });
      else setForm({ ...form, banners: [...form.banners, data.secure_url] });
    } finally { setUploading(false); }
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
    alert("Configuración de marca guardada con éxito.");
  };

  if (loading) return <div className="p-20 text-center text-blue-500 font-black animate-pulse">CARGANDO ESTUDIO DE DISEÑO...</div>;

  return (
    <div className="max-w-6xl space-y-10 pb-20">
      
      {/* 🧭 SUB-NAVEGACIÓN DE DISEÑO */}
      <div className="flex gap-4 border-b border-slate-800 pb-4 overflow-x-auto">
        <SubTabBtn active={activeSubTab === "general"} onClick={() => setActiveSubTab("general")} icon={<Palette size={16}/>} label="Identidad Base" />
        <SubTabBtn active={activeSubTab === "home"} onClick={() => setActiveSubTab("home")} icon={<Layout size={16}/>} label="Página de Inicio" />
        <SubTabBtn active={activeSubTab === "contact"} onClick={() => setActiveSubTab("contact")} icon={<MessageCircle size={16}/>} label="Conversión & Contacto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 space-y-8">
          {/* SECCIÓN 1: IDENTIDAD BASE */}
          {activeSubTab === "general" && (
            <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xl font-black italic text-white uppercase">Branding Global</h3>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logo de la tienda</label>
                  <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-800 h-48 rounded-[2.5rem] cursor-pointer hover:border-blue-500 transition-all bg-slate-950 overflow-hidden group">
                    {form.logo ? <img src={form.logo} className="w-full h-full object-contain p-8 group-hover:opacity-20" /> : <ImageIcon className="text-slate-800" size={40}/>}
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
                    {uploading && <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>}
                  </label>
                </div>
                <div className="space-y-4">
                  <ColorPicker label="Color Primario" value={form.primaryColor} onChange={(v:string) => setForm({...form, primaryColor: v})} />
                  <ColorPicker label="Color de Fondo" value={form.secondaryColor} onChange={(v:string) => setForm({...form, secondaryColor: v})} />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Nombre Comercial</label>
                    <input className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl font-bold" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECCIÓN 2: PÁGINA DE INICIO (LO QUE VENDE) */}
          {activeSubTab === "home" && (
            <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
                <h3 className="text-xl font-black italic text-white uppercase flex items-center gap-2"><Megaphone size={20} className="text-orange-500" /> Textos de Marketing</h3>
                <div className="space-y-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Barra de Anuncio (Announcement Bar)</label>
                     <input placeholder="Ej: 🔥 ENVÍO GRATIS A TODO EL PAÍS" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm font-bold text-orange-400" value={form.announcement || ""} onChange={e => setForm({...form, announcement: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Título Hero Principal</label>
                     <input placeholder="Ej: La Revolución de tu Cocina" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-lg font-black" value={form.heroTitle || ""} onChange={e => setForm({...form, heroTitle: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Subtítulo Descriptivo</label>
                     <textarea placeholder="Ej: Descubre la nueva línea de productos premium con garantía de por vida." className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl h-24 text-sm" value={form.heroSubtitle || ""} onChange={e => setForm({...form, heroSubtitle: e.target.value})} />
                   </div>
                </div>
              </div>

              {/* Banners Carousel */}
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
                <h3 className="text-xl font-black italic text-white uppercase flex items-center gap-2"><ImageIcon size={20} className="text-blue-500" /> Carrusel de Banners</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   <label className="aspect-video border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 bg-slate-950 group">
                      <Upload size={20} className="text-slate-700 group-hover:text-blue-500"/>
                      <span className="text-[9px] font-black mt-2 text-slate-600">AÑADIR BANNER</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banners')} />
                   </label>
                   {form.banners?.map((url, i) => (
                     <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 group">
                       <img src={url} className="w-full h-full object-cover" />
                       <button onClick={() => setForm({...form, banners: form.banners.filter((_, idx) => idx !== i)})} className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={20}/></button>
                     </div>
                   ))}
                </div>
              </div>
            </section>
          )}

          {/* SECCIÓN 3: CONVERSIÓN & WHATSAPP */}
          {activeSubTab === "contact" && (
            <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] space-y-8 animate-in fade-in slide-in-from-bottom-2">
               <h3 className="text-xl font-black italic text-white uppercase flex items-center gap-2"><MessageCircle size={20} className="text-green-500" /> Canales de Cierre</h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Número de WhatsApp (con código de país)</label>
                    <input placeholder="Ej: 5491122334455" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl font-bold text-green-400" value={form.whatsapp || ""} onChange={e => setForm({...form, whatsapp: e.target.value})} />
                    <p className="text-[9px] text-slate-600 ml-2 uppercase font-bold tracking-widest">Este número activará el botón de chat flotante en la tienda.</p>
                  </div>
               </div>
            </section>
          )}

          <button onClick={handleSave} disabled={saving} className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-3xl font-black text-xl shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-4">
            {saving ? <Loader2 className="animate-spin" /> : <Save size={24} />} GUARDAR TODOS LOS CAMBIOS
          </button>
        </div>

        {/* DERECHA: SELECCIÓN DE TEMPLATE */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] ml-4 italic">Seleccionar Template</h3>
          <div className="grid grid-cols-1 gap-6">
             <TemplateItem id="default" name="Glow Pro" desc="E-commerce moderno y limpio." active={form.templateId === "default"} onClick={() => setForm({...form, templateId: "default"})} />
             <TemplateItem id="dark_minimal" name="Urban Dark" desc="Diseño agresivo para nichos tech." active={form.templateId === "dark_minimal"} onClick={() => setForm({...form, templateId: "dark_minimal"})} />
          </div>
        </div>

      </div>
    </div>
  );
}

// --- HELPERS ---
function SubTabBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${active ? 'bg-white text-black' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>
      {icon} {label}
    </button>
  );
}

function ColorPicker({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
    </div>
  );
}

function TemplateItem({ name, desc, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`p-6 rounded-[3rem] border-2 transition-all cursor-pointer group ${active ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'}`}>
      <div className="aspect-video bg-slate-800 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center">
         {active ? <div className="bg-blue-600 p-2 rounded-full shadow-xl"><Check className="text-white" size={24} /></div> : <Layout className="text-slate-700" size={32} />}
      </div>
      <h4 className={`font-black text-xs uppercase ${active ? 'text-blue-400' : 'text-slate-400'}`}>{name}</h4>
      <p className="text-[10px] text-slate-600 font-medium mt-1 leading-tight">{desc}</p>
    </div>
  );
}