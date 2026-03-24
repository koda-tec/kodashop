"use client";
import { useState } from "react";
import { 
  Plus, X, Upload, Loader2, Image as ImageIcon, 
  Trash2, Tag, ChevronDown, Box, DollarSign, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductSection({ storeId, products, categories, attributes, onRefresh }: any) {
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // 1. ESTADO DEL FORMULARIO COMPLETO
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    stock: "0",
    images: [] as string[],
    categoryId: "",
    selectedAttributes: [] as any[] // Para variantes: [{ name: "Color", selectedValues: ["Rojo"] }]
  });

  // CONFIGURACIÓN CLOUDINARY (Sustituir con tus datos)
  const CLOUD_NAME = "dvkvx5dzz"; 
  const UPLOAD_PRESET = "kodashop"; 
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // --- LÓGICA DE MULTIMEDIA ---
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setForm(prev => ({ ...prev, images: [...prev.images, data.secure_url] }));
    } catch (err) {
      alert("Error al subir archivo");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  // --- LÓGICA DE ATRIBUTOS ---
  const addAttributeRow = (attr: any) => {
    if (form.selectedAttributes.find(a => a.id === attr.id)) return;
    setForm({
      ...form,
      selectedAttributes: [...form.selectedAttributes, { ...attr, selectedValues: [] }]
    });
  };

  const toggleAttrValue = (attrId: string, value: string) => {
    const updated = form.selectedAttributes.map(attr => {
      if (attr.id === attrId) {
        const isSel = attr.selectedValues.includes(value);
        return {
          ...attr,
          selectedValues: isSel 
            ? attr.selectedValues.filter((v: string) => v !== value)
            : [...attr.selectedValues, value]
        };
      }
      return attr;
    });
    setForm({ ...form, selectedAttributes: updated });
  };

  // --- ENVÍO A LA API ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("koda_token");
    
    // Preparar payload enviando variantes generadas o estructura de atributos
    const payload = {
      ...form,
      storeId,
      // Mapeamos los atributos para que el backend los reciba limpio
      variants: form.selectedAttributes.map(a => ({
        name: a.name,
        values: a.selectedValues
      }))
    };

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowForm(false);
        setForm({ name: "", description: "", price: "", comparePrice: "", sku: "", stock: "0", images: [], categoryId: "", selectedAttributes: [] });
        onRefresh();
      }
    } catch (error) {
      alert("Error en el servidor");
    }
  };

  return (
    <div className="space-y-10 pt-12 md:pt-0">
      
      {/* 🟢 HEADER RESPONSIVE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-blue-500 tracking-tighter">
            Inventario
          </h2>
          <p className="text-slate-500 text-[10px] font-bold tracking-[0.4em] uppercase">Gestión de Catálogo Pro</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl"
        >
          {showForm ? <X size={20}/> : <Plus size={20}/>} {showForm ? "CANCELAR" : "NUEVO PRODUCTO"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onSubmit={handleSubmit} 
            className="bg-slate-900/50 border border-slate-800 p-6 md:p-10 rounded-[3rem] backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* IZQUIERDA: TEXTOS Y PRECIOS */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-2">Nombre</label>
                  <input placeholder="Nombre del producto" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Descripción persuasiva</label>
                  <textarea placeholder="Háblale a tu cliente de los beneficios..." className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white h-40 text-sm outline-none focus:ring-2 focus:ring-blue-600" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Precio Venta</label>
                      <input type="number" placeholder="0.00" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl font-bold" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-emerald-500 uppercase ml-2 italic">Precio Oferta</label>
                      <input type="number" placeholder="Opcional" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl font-bold text-emerald-400" value={form.comparePrice} onChange={e => setForm({...form, comparePrice: e.target.value})} />
                   </div>
                </div>
              </div>

              {/* DERECHA: LOGÍSTICA, ATRIBUTOS Y MULTIMEDIA */}
              <div className="space-y-8">
                
                {/* SKU, Stock y Categoría */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">SKU</label>
                      <input placeholder="REF-001" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Stock Inicial</label>
                      <input type="number" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
                   </div>
                   <div className="col-span-full space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Categoría del Producto</label>
                      <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}>
                        <option value="">Sin Categoría</option>
                        {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                   </div>
                </div>

                {/* SELECTOR DE ATRIBUTOS (Variantes) */}
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800">
                  <h3 className="text-[10px] font-black text-blue-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                    <Layers size={14}/> Atributos Disponibles
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {attributes?.map((attr: any) => (
                      <button key={attr.id} type="button" onClick={() => addAttributeRow(attr)} className="bg-slate-800 hover:bg-blue-600 text-[10px] font-black px-4 py-2 rounded-xl transition-all">
                        + {attr.name}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {form.selectedAttributes.map((attr: any) => (
                      <div key={attr.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 relative">
                        <button type="button" onClick={() => setForm({...form, selectedAttributes: form.selectedAttributes.filter(a => a.id !== attr.id)})} className="absolute top-2 right-2 text-slate-600 hover:text-red-500"><X size={14}/></button>
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-3 italic">{attr.name}</p>
                        <div className="flex flex-wrap gap-2">
                          {attr.values.map((val: string) => {
                            const isSel = attr.selectedValues.includes(val);
                            return (
                              <button key={val} type="button" onClick={() => toggleAttrValue(attr.id, val)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${isSel ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MULTIMEDIA */}
                <div className="space-y-4">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 p-8 rounded-3xl cursor-pointer hover:border-blue-600 transition-all bg-slate-950/50 group">
                    {uploading ? <Loader2 className="animate-spin text-blue-500" /> : <Upload className="text-slate-600 group-hover:text-blue-500 transition-colors" />}
                    <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Subir fotos desde dispositivo</span>
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-700 group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button disabled={uploading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-3xl font-black text-lg transition-all shadow-2xl shadow-blue-600/20 disabled:opacity-50">
                  {uploading ? "SUBIENDO ARCHIVOS..." : "PUBLICAR PRODUCTO"}
                </button>
              </div>

            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* 📋 LISTADO DE PRODUCTOS CARGADOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {Array.isArray(products) && products.map((p: any) => (
          <div key={p.id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden group hover:border-blue-500/50 transition-all shadow-xl">
            <div className="aspect-square relative bg-slate-950 overflow-hidden">
               <img src={p.images[0] || "/api/placeholder/400/400"} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-6 right-6 bg-blue-600 px-4 py-2 rounded-full text-xs font-black shadow-2xl">${p.price}</div>
               {p.comparePrice && <div className="absolute top-6 left-6 bg-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg">Oferta</div>}
            </div>
            <div className="p-8">
               <h3 className="font-black text-xl tracking-tight mb-2 uppercase italic text-white">{p.name}</h3>
               <p className="text-slate-500 text-xs line-clamp-2 mb-6 font-medium">{p.description}</p>
               <div className="flex justify-between items-center pt-6 border-t border-slate-800/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Existencias</span>
                    <span className="text-sm font-bold text-white">{p.stock} U.</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-slate-800 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    <button className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 transition-colors"><Box size={16} /></button>
                  </div>
               </div>
            </div>
          </div>
        ))}

        {(!products || products.length === 0) && (
          <div className="col-span-full py-32 bg-slate-900/10 border-2 border-dashed border-slate-800/50 rounded-[4rem] text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
               <ImageIcon size={32} className="text-slate-700" />
            </div>
            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs italic">El catálogo está vacío</p>
          </div>
        )}
      </div>
    </div>
  );
}