"use client";
import { useState } from "react";
import { 
  Plus, X, Upload, Loader2, Image as ImageIcon, 
  Video, Trash2, Tag, ChevronDown, Box, DollarSign, 
  Layers, EyeOff, CheckCircle2, AlertCircle, Edit3 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductSection({ storeId, products, categories, attributes, onRefresh }: any) {
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // 1. ESTADO DEL FORMULARIO INTEGRAL
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    stock: "0",
    images: [] as string[],
    videos: [] as string[],
    categoryId: "",
    status: "PUBLISHED",
    costPrice: "",
    saleEndsAt: "",
    selectedAttributes: [] as any[]
  });

  const CLOUD_NAME = "dvkvx5dzz"; 
  const UPLOAD_PRESET = "kodashop"; 
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // --- LÓGICA: ELIMINAR PRODUCTO ---
  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.")) return;
    const token = localStorage.getItem("koda_token");
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) onRefresh();
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  // --- LÓGICA: INICIAR EDICIÓN ---
  const startEdit = (p: any) => {
    setEditingId(p.id);
    setForm({
      ...p,
      price: p.price.toString(),
      comparePrice: p.comparePrice?.toString() || "",
      stock: p.stock.toString(),
      costPrice: p.costPrice?.toString() || "",
      // Formatear fecha para el input datetime-local
      saleEndsAt: p.saleEndsAt ? new Date(p.saleEndsAt).toISOString().slice(0, 16) : "",
      selectedAttributes: [] // Reiniciamos selección de atributos para simplificar la UI en edición
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- LÓGICA: MULTIMEDIA ---
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'videos') => {
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
      setForm(prev => ({ 
        ...prev, 
        [type]: [...(prev[type as keyof typeof prev] as string[]), data.secure_url] 
      }));
    } catch (err) {
      alert("Error en la subida");
    } finally {
      setUploading(false);
    }
  };

  const removeItem = (index: number, type: 'images' | 'videos') => {
    setForm(prev => ({ 
      ...prev, 
      [type]: (prev[type as keyof typeof prev] as string[]).filter((_, i) => i !== index) 
    }));
  };

  // --- LÓGICA: ATRIBUTOS ---
  const addAttributeRow = (attr: any) => {
    if (form.selectedAttributes.find(a => a.id === attr.id)) return;
    setForm({ ...form, selectedAttributes: [...form.selectedAttributes, { ...attr, selectedValues: [] }] });
  };

  const toggleAttrValue = (attrId: string, value: string) => {
    const updated = form.selectedAttributes.map(attr => {
      if (attr.id === attrId) {
        const isSel = attr.selectedValues.includes(value);
        return { ...attr, selectedValues: isSel ? attr.selectedValues.filter((v: string) => v !== value) : [...attr.selectedValues, value] };
      }
      return attr;
    });
    setForm({ ...form, selectedAttributes: updated });
  };

  // --- ENVÍO A LA API (POST o PATCH) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("koda_token");
    const method = editingId ? "PATCH" : "POST";
    const url = editingId ? `${API_URL}/products/${editingId}` : `${API_URL}/products`;

    const payload = {
      ...form,
      storeId,
      variants: form.selectedAttributes.map(a => ({ name: a.name, values: a.selectedValues }))
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setForm({ name: "", description: "", price: "", comparePrice: "", sku: "", stock: "0", images: [], videos: [], categoryId: "", selectedAttributes: [], costPrice: "", saleEndsAt: "", status: "PUBLISHED" });
        onRefresh();
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <div className="space-y-10 pt-14 md:pt-0">
      
      {/* 🟢 HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-blue-500 tracking-tighter">Inventario</h2>
          <p className="text-slate-500 text-[10px] font-bold tracking-[0.4em] uppercase">Control Total de Catálogo</p>
        </div>
        <button 
          onClick={() => { setShowForm(!showForm); setEditingId(null); }} 
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
            <h3 className="text-xl font-black text-white mb-8 uppercase italic">
                {editingId ? "📝 Editando Producto" : "🚀 Nuevo Producto"}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 text-white">
                <input placeholder="Nombre" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                <textarea placeholder="Descripción..." className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl h-32 text-sm outline-none focus:ring-2 focus:ring-blue-600" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 italic">Costo</label>
                    <input type="number" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs" value={form.costPrice} onChange={e => setForm({...form, costPrice: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-orange-500 uppercase ml-2 italic">Fin de Oferta</label>
                    <input type="datetime-local" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs text-white" value={form.saleEndsAt} onChange={e => setForm({...form, saleEndsAt: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-2">Visibilidad</label>
                    <select className="w-full bg-blue-600 text-white font-black p-4 rounded-2xl text-xs uppercase cursor-pointer" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                        <option value="PUBLISHED">🟢 Publicado</option>
                        <option value="DRAFT">🟠 Borrador</option>
                    </select>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <input placeholder="SKU" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white text-xs" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
                   <input type="number" placeholder="Stock" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white text-xs" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
                   <div className="col-span-full">
                      <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white text-sm" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}>
                        <option value="">Seleccionar Categoría</option>
                        {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                   </div>
                </div>

                <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase mb-4 flex items-center gap-2 italic"><Layers size={14}/> Atributos</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {attributes?.map((attr: any) => (
                      <button key={attr.id} type="button" onClick={() => addAttributeRow(attr)} className="bg-slate-800 hover:bg-blue-600 text-[10px] font-black px-4 py-2 rounded-xl transition-all uppercase">+ {attr.name}</button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {form.selectedAttributes.map((attr: any) => (
                      <div key={attr.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 relative text-white">
                        <button type="button" onClick={() => setForm({...form, selectedAttributes: form.selectedAttributes.filter(a => a.id !== attr.id)})} className="absolute top-2 right-2 text-slate-600 hover:text-red-500"><X size={14}/></button>
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-3">{attr.name}</p>
                        <div className="flex flex-wrap gap-2">
                          {attr.values.map((val: string) => (
                            <button key={val} type="button" onClick={() => toggleAttrValue(attr.id, val)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${attr.selectedValues.includes(val) ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>{val}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 p-6 rounded-3xl cursor-pointer hover:border-blue-600 bg-slate-950/50">
                        {uploading ? <Loader2 className="animate-spin text-blue-500" /> : <ImageIcon className="text-slate-600" />}
                        <span className="mt-2 text-[9px] font-black uppercase text-slate-500">Fotos</span>
                        <input type="file" className="hidden" onChange={(e) => handleUpload(e, 'images')} accept="image/*" disabled={uploading} />
                    </label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 p-6 rounded-3xl cursor-pointer hover:border-emerald-600 bg-slate-950/50">
                        {uploading ? <Loader2 className="animate-spin text-emerald-500" /> : <Video className="text-slate-600" />}
                        <span className="mt-2 text-[9px] font-black uppercase text-slate-500">Videos</span>
                        <input type="file" className="hidden" onChange={(e) => handleUpload(e, 'videos')} accept="video/*" disabled={uploading} />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-15">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-700 group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeItem(i, 'images')} className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                      </div>
                    ))}
                    {form.videos.map((vid, i) => (
                      <div key={i} className="relative w-14 h-14 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 group">
                        <Video size={14} className="text-emerald-500" />
                        <button type="button" onClick={() => removeItem(i, 'videos')} className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"><X size={14}/></button>
                      </div>
                    ))}
                  </div>
                </div>

                <button disabled={uploading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-3xl font-black text-lg transition-all text-white">
                  {editingId ? "GUARDAR CAMBIOS" : "PUBLICAR PRODUCTO"}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {products.map((p: any) => {
          const isSaleValid = p.saleEndsAt ? new Date(p.saleEndsAt) > new Date() : true;
          const isDraft = p.status === "DRAFT";

          return (
            <div key={p.id} className={`bg-slate-900/40 border ${isDraft ? 'border-orange-500/30' : 'border-slate-800'} rounded-[2.5rem] overflow-hidden group hover:border-blue-500/50 transition-all shadow-xl`}>
              <div className="aspect-square relative bg-slate-950 overflow-hidden">
                <img src={p.images[0] || "/api/placeholder/400/400"} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${isDraft && 'opacity-30 grayscale'}`} />
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase ${isDraft ? 'bg-orange-600 text-white' : 'bg-emerald-600 text-white'}`}>
                    {isDraft ? "Borrador" : "Publicado"}
                </div>
                {p.sku && <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[9px] font-black text-slate-300 italic uppercase">SKU: {p.sku}</div>}
                {p.comparePrice && isSaleValid && <div className="absolute top-6 left-6 bg-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase shadow-lg animate-pulse">Oferta</div>}
              </div>
              <div className="p-8">
                <h3 className="font-black text-xl text-white uppercase italic truncate">{p.name}</h3>
                <div className="flex items-center gap-3 mt-4 mb-2">
                    <span className={`text-2xl font-black ${p.comparePrice && isSaleValid ? 'text-emerald-400' : 'text-blue-500'}`}>${p.price}</span>
                    {p.comparePrice && isSaleValid && <span className="text-sm text-slate-500 line-through font-bold">${p.comparePrice}</span>}
                </div>
                {p.saleEndsAt && isSaleValid && <p className="text-[9px] font-bold text-orange-500 uppercase flex items-center gap-1 mb-6"><AlertCircle size={10} /> Expira: {new Date(p.saleEndsAt).toLocaleDateString()}</p>}
                
                <div className="flex justify-between items-center pt-6 border-t border-slate-800/50">
                    <div className="flex flex-col"><span className="text-[10px] font-black text-slate-500 uppercase">Existencias</span><span className="text-sm font-bold text-white">{p.stock} U.</span></div>
                    <div className="flex gap-2">
                      <button onClick={() => handleDelete(p.id)} className="p-3 bg-slate-800 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      <button onClick={() => startEdit(p)} className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 transition-colors text-white"><Edit3 size={16} /></button>
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}