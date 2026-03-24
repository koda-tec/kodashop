"use client";
import { useState } from "react";
import { Plus, Trash2, X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductSection({ storeId, products, categories, onRefresh }: any) {
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "", description: "", price: "", comparePrice: "", 
    sku: "", stock: "0", images: [] as string[], categoryId: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kodashop"); // SUSTITUIR

    const res = await fetch(`https://api.cloudinary.com/v1_1/dvkvx5dzz/upload`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setForm({ ...form, images: [...form.images, data.secure_url] });
    setUploading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("koda_token");
    await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ ...form, storeId }),
    });
    setShowForm(false);
    setForm({ name: "", description: "", price: "", comparePrice: "", sku: "", stock: "0", images: [], categoryId: "" });
    onRefresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black italic uppercase">Inventario</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          {showForm ? <X size={18}/> : <Plus size={18}/>} {showForm ? "Cancelar" : "Nuevo Producto"}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input placeholder="Nombre" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <textarea placeholder="Descripción" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl h-32" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Precio" className="bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
              <input type="number" placeholder="Oferta" className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-emerald-400" value={form.comparePrice} onChange={e => setForm({...form, comparePrice: e.target.value})} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="SKU" className="bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
              <input type="number" placeholder="Stock" className="bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
            </div>
            <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}>
              <option value="">Sin Categoría</option>
              {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            
            <div className="flex gap-4 items-center">
              <label className="flex-1 bg-slate-800 border-2 border-dashed border-slate-700 p-4 rounded-xl flex flex-col items-center cursor-pointer hover:border-blue-500 transition-all">
                {uploading ? <Loader2 className="animate-spin" /> : <Upload size={20}/>}
                <span className="text-[10px] font-black mt-2">SUBIR IMAGEN</span>
                <input type="file" className="hidden" onChange={handleUpload} />
              </label>
              <div className="flex gap-2">
                {form.images.map((img, i) => (
                  <img key={i} src={img} className="w-16 h-16 object-cover rounded-lg border border-slate-700" />
                ))}
              </div>
            </div>

            <button disabled={uploading} className="w-full bg-blue-600 py-4 rounded-xl font-black shadow-lg shadow-blue-600/20">
              {uploading ? "SUBIENDO..." : "PUBLICAR PRODUCTO"}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p: any) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group">
              <div className="aspect-square bg-slate-950"><img src={p.images[0]} className="w-full h-full object-cover opacity-80" /></div>
              <div className="p-6">
                <h3 className="font-bold">{p.name}</h3>
                <div className="flex justify-between items-end mt-4">
                   <p className="text-blue-400 font-black text-xl">${p.price}</p>
                   <p className="text-[10px] text-slate-500 font-black uppercase">Stock: {p.stock}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}