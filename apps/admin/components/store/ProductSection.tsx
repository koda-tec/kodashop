// apps/admin/components/store/ProductSection.tsx
"use client";
import { useState } from "react";
import { Plus, Trash2, X, Upload, Loader2, Image as ImageIcon, Video } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductSection({ storeId, products, categories, onRefresh }: any) {
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "", description: "", price: "", comparePrice: "", 
    sku: "", stock: "0", images: [] as string[], videoUrl: "", categoryId: ""
  });

  const CLOUD_NAME = "tu_cloud_name"; // ⚠️ PON TU DATO
  const UPLOAD_PRESET = "tu_preset"; // ⚠️ PON TU DATO

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, { method: "POST", body: formData });
    const data = await res.json();
    setForm(prev => ({ ...prev, images: [...prev.images, data.secure_url] }));
    setUploading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("koda_token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ ...form, storeId }),
    });
    setShowForm(false);
    onRefresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black italic uppercase text-blue-500">Inventario</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
          {showForm ? <X size={20}/> : <Plus size={20}/>} {showForm ? "CANCELAR" : "AÑADIR PRODUCTO"}
        </button>
      </div>

      {showForm && (
        <motion.form initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input placeholder="Nombre" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <textarea placeholder="Descripción del producto..." className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl h-40 text-sm" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Precio Venta" className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-bold" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
              <input type="number" placeholder="Precio Oferta" className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-bold text-emerald-400" value={form.comparePrice} onChange={e => setForm({...form, comparePrice: e.target.value})} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="SKU" className="bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
              <input type="number" placeholder="Stock Disponible" className="bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
            </div>
            <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}>
              <option value="">Sin Categoría</option>
              {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            
            <div className="space-y-4">
              <label className="flex items-center justify-center border-2 border-dashed border-slate-800 p-8 rounded-2xl cursor-pointer hover:border-blue-600 transition-all">
                {uploading ? <Loader2 className="animate-spin" /> : <Upload className="text-slate-500" />}
                <span className="ml-3 text-xs font-black">SUBIR DESDE DISPOSITIVO</span>
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </label>
              <div className="flex gap-2">
                {form.images.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-700">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <button disabled={uploading} className="w-full bg-blue-600 py-4 rounded-xl font-black shadow-lg">PUBLICAR PRODUCTO</button>
          </div>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(products) && products.map((p: any) => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-4xl overflow-hidden group">
            <div className="aspect-square bg-slate-950 relative">
               <img src={p.images[0]} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-4 right-4 bg-blue-600 px-3 py-1 rounded-full text-xs font-black">${p.price}</div>
            </div>
            <div className="p-6">
               <h3 className="font-bold text-lg">{p.name}</h3>
               <p className="text-xs text-slate-500 mt-2 font-black uppercase">Stock: {p.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}