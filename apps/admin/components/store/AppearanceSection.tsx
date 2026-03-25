"use client";
import { useState, useEffect } from "react";
import { Save, Upload, Loader2, Image as ImageIcon, Check, Palette } from "lucide-react";
import { motion } from "framer-motion";

export default function AppearanceSection({ storeId }: { storeId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    logo: "",
    primaryColor: "#2563eb",
    secondaryColor: "#020617",
    templateId: "default"
  });

  const CLOUD_NAME = "dvkvx5dzz"; 
  const UPLOAD_PRESET = "kodashop";
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    const token = localStorage.getItem("koda_token");
    const res = await fetch(`${API_URL}/stores/${storeId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    setForm(data);
    setLoading(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setForm({ ...form, logo: data.secure_url });
    } finally {
      setUploading(false);
    }
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
    alert("Diseño actualizado correctamente");
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Cargando identidad...</div>;

  return (
    <div className="max-w-5xl space-y-12 pb-20">
      <header>
        <h2 className="text-4xl md:text-6xl font-black italic text-blue-500 uppercase tracking-tighter">Branding</h2>
        <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">Personaliza la experiencia de tu cliente</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* IZQUIERDA: LOGO Y COLORES */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] backdrop-blur-xl">
            <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <ImageIcon size={16}/> Identidad Visual
            </h3>
            
            <div className="grid md:grid-cols-2 gap-10">
              {/* Upload Logo */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Logo Principal</label>
                <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-800 h-48 rounded-[2.5rem] cursor-pointer hover:border-blue-500 transition-all bg-slate-950 overflow-hidden group">
                  {form.logo ? (
                    <img src={form.logo} alt="Logo" className="w-full h-full object-contain p-8 group-hover:opacity-20 transition-opacity" />
                  ) : (
                    <Upload className="text-slate-700" size={32} />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-black uppercase text-blue-400">Cambiar Logo</span>
                  </div>
                  <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                  {uploading && <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>}
                </label>
              </div>

              {/* Colores */}

            <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Paleta de Colores</label>
            <div className="space-y-3">
                {/* Agregamos : string aquí */}
                <ColorPicker 
                label="Color Primario" 
                value={form.primaryColor} 
                onChange={(val: string) => setForm({...form, primaryColor: val})} 
                />
                {/* Y aquí también */}
                <ColorPicker 
                label="Color de Fondo" 
                value={form.secondaryColor} 
                onChange={(val: string) => setForm({...form, secondaryColor: val})} 
                />
            </div>
            </div>
            </div>
          </section>

          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-4xl font-black text-xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={24} />} GUARDAR IDENTIDAD
          </button>
        </div>

        {/* DERECHA: TEMPLATES */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest ml-4 italic">Seleccionar Template</h3>
          <div className="grid grid-cols-1 gap-4">
            <TemplateItem 
              id="default" 
              name="Glow Pro" 
              desc="Optimizado para conversiones rápidas." 
              active={form.templateId === "default"}
              onClick={() => setForm({...form, templateId: "default"})}
            />
            <TemplateItem 
              id="dark_minimal" 
              name="Urban Dark" 
              desc="Estilo moderno para nichos tech/moda." 
              active={form.templateId === "dark_minimal"}
              onClick={() => setForm({...form, templateId: "dark_minimal"})}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function ColorPicker({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-slate-500">{value}</span>
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} // e.target.value ya es string
          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none"
        />
      </div>
    </div>
  );
}


function TemplateItem({ name, desc, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer group ${active ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/5' : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'}`}
    >
      <div className="aspect-video bg-slate-800 rounded-2xl mb-4 relative overflow-hidden">
         {active && <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center"><Check className="text-blue-500" size={32} /></div>}
      </div>
      <h4 className={`font-black text-xs uppercase ${active ? 'text-blue-400' : 'text-slate-400'}`}>{name}</h4>
      <p className="text-[10px] text-slate-600 font-medium mt-1 leading-tight">{desc}</p>
    </div>
  );
}