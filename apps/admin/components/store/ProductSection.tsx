"use client";
import { useState } from "react";
import { 
  Plus, X, Upload, Loader2, Image as ImageIcon, 
  Video, Trash2, Tag, Info, Box, DollarSign 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductSection({ storeId, products, categories, attributes, onRefresh }: any) {
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    stock: "0",
    images: [] as string[],
    videoUrl: "",
    categoryId: ""
  });

  // ⚠️ CONFIGURACIÓN CLOUDINARY (Reemplaza con tus datos)
  const CLOUD_NAME = "dvkvx5dzz"; 
  const UPLOAD_PRESET = "kodashop"; 

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
      alert("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("koda_token");
    
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ ...form, storeId }),
      });

      if (res.ok) {
        setShowForm(false);
        setForm({ name: "", description: "", price: "", comparePrice: "", sku: "", stock: "0", images: [], videoUrl: "", categoryId: "" });
        onRefresh();
      }
    } catch (error) {
      alert("Error al guardar producto");
    }
  };

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8 pt-12 md:pt-0">
      
      {/* 🟢 HEADER DINÁMICO (Sin choques en Mobile) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-blue-500 tracking-tighter">
            Inventario
          </h2>
          <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">Total: {products?.length || 0} Productos</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
        >
          {showForm ? <X size={20}/> : <Plus size={20}/>} 
          {showForm ? "CANCELAR" : "NUEVO PRODUCTO"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 20, opacity: 0 }}
            className="bg-slate-900/50 border border-slate-800 p-6 md:p-10 rounded-[2.5rem] backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* COLUMNA IZQUIERDA: TEXTOS */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 tracking-widest uppercase ml-2">Información Principal</label>
                  <input 
                    placeholder="Nombre del Producto" 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} required 
                  />
                </div>
                
                <textarea 
                  placeholder="Descripción persuasiva para el cliente..." 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white h-40 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                />

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Precio Venta</label>
                      <input type="number" placeholder="0.00" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl font-bold" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-emerald-500 uppercase ml-2 italic">Precio Oferta</label>
                      <input type="number" placeholder="Tachado" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl font-bold text-emerald-400" value={form.comparePrice} onChange={e => setForm({...form, comparePrice: e.target.value})} />
                   </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: LOGÍSTICA Y MULTIMEDIA */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2">SKU / Referencia</label>
                      <input placeholder="Cod-001" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Stock Inicial</label>
                      <input type="number" placeholder="Cant." className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Categoría</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none"
                    value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}
                  >
                    <option value="">Sin Categoría</option>
                    {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                {/* ATRIBUTOS (Variantes disponibles) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-purple-400 uppercase ml-2 tracking-widest">Atributos que aplican</label>
                  <div className="flex flex-wrap gap-2 p-2">
                    {attributes?.length > 0 ? attributes.map((attr: any) => (
                      <span key={attr.id} className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase text-slate-300">
                        {attr.name}
                      </span>
                    )) : <p className="text-[10px] text-slate-600 italic">No has creado atributos aún.</p>}
                  </div>
                </div>

                {/* MULTIMEDIA */}
                <div className="space-y-4">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 p-8 rounded-4xl cursor-pointer hover:border-blue-600 transition-all bg-slate-950/50">
                    {uploading ? <Loader2 className="animate-spin text-blue-500" /> : <Upload className="text-slate-500" />}
                    <span className="mt-2 text-[10px] font-black uppercase tracking-tighter">Subir Imagen desde dispositivo</span>
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

                <button 
                  disabled={uploading}
                  className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-3xl font-black text-lg transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50"
                >
                  {uploading ? "SUBIENDO RECURSOS..." : "PUBLICAR EN TIENDA"}
                </button>
              </div>

            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📋 LISTADO DE PRODUCTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(products) && products.map((p: any) => (
          <div key={p.id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden group hover:border-blue-500/50 transition-all">
            <div className="aspect-square relative bg-slate-950 overflow-hidden">
               <img src={p.images[0] || "/api/placeholder/400/400"} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-6 right-6 bg-blue-600 px-4 py-2 rounded-full text-xs font-black shadow-2xl">${p.price}</div>
               {p.comparePrice && <div className="absolute top-6 left-6 bg-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter">Oferta</div>}
            </div>
            <div className="p-8">
               <h3 className="font-black text-xl tracking-tight mb-2 uppercase italic">{p.name}</h3>
               <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-800/50">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-950 px-3 py-1 rounded-md border border-slate-800">STOCK: {p.stock}</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-800 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    <button className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors"><Box size={16} /></button>
                  </div>
               </div>
            </div>
          </div>
        ))}

        {(!products || products.length === 0) && (
          <div className="col-span-full py-32 bg-slate-900/10 border-2 border-dashed border-slate-800/50 rounded-[3rem] text-center">
            <ImageIcon size={48} className="mx-auto text-slate-800 mb-4" />
            <p className="text-slate-600 font-black uppercase tracking-widest">El catálogo está vacío</p>
          </div>
        )}
      </div>
    </div>
  );
}