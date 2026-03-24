"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Plus, Package, Trash2, Upload, Image as ImageIcon, 
  Video, DollarSign, Tag, Info, CheckCircle2 
} from "lucide-react";

export default function StoreDetailPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Estados del producto completo
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    stock: "0",
    images: [] as string[],
    videoUrl: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // ☁️ FUNCIÓN PARA SUBIR A CLOUDINARY
  const uploadFile = async (file: File, type: 'image' | 'video') => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kodashop"); 

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dvkvx5dzz/upload`, { 
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (type === 'image') setForm(prev => ({ ...prev, images: [...prev.images, data.secure_url] }));
      if (type === 'video') setForm(prev => ({ ...prev, videoUrl: data.secure_url }));
    } catch (err) {
      alert("Error al subir archivo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("koda_token");
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ ...form, storeId: id }),
    });

    if (res.ok) {
      setShowForm(false);
      // reset form y fetch products
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-12">
           <h1 className="text-4xl font-black italic text-blue-500">CONTROL DE STOCK</h1>
           <button 
             onClick={() => setShowForm(!showForm)}
             className="bg-blue-600 px-6 py-3 rounded-2xl font-black hover:bg-blue-500 transition-all flex items-center gap-2"
           >
             <Plus size={20} /> {showForm ? "CERRAR PANEL" : "AÑADIR PRODUCTO"}
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FORMULARIO PRO */}
          {showForm && (
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="lg:col-span-5 space-y-6">
              <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-md space-y-6">
                
                {/* Sección General */}
                <div className="space-y-4">
                  <h3 className="text-blue-400 font-black text-xs tracking-widest flex items-center gap-2">
                    <Info size={14} /> INFORMACIÓN GENERAL
                  </h3>
                  <input 
                    placeholder="Nombre del Producto (Ej: Reloj Táctico V8)" 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm"
                    onChange={e => setForm({...form, name: e.target.value})} required
                  />
                  <textarea 
                    placeholder="Descripción persuasiva..." 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm h-32"
                    onChange={e => setForm({...form, description: e.target.value})}
                  />
                </div>

                {/* Sección Multimedia */}
                <div className="space-y-4">
                  <h3 className="text-emerald-400 font-black text-xs tracking-widest flex items-center gap-2">
                    <ImageIcon size={14} /> MULTIMEDIA (FOTOS Y VIDEO)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="border-2 border-dashed border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                      <Upload size={20} className="text-slate-500 mb-2" />
                      <span className="text-[10px] font-bold text-slate-400 text-center">SUBIR FOTO</span>
                      <input type="file" className="hidden" accept="image/*" onChange={e => e.target.files && uploadFile(e.target.files[0], 'image')} />
                    </label>
                    <label className="border-2 border-dashed border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors">
                      <Video size={20} className="text-slate-500 mb-2" />
                      <span className="text-[10px] font-bold text-slate-400 text-center">SUBIR VIDEO</span>
                      <input type="file" className="hidden" accept="video/*" onChange={e => e.target.files && uploadFile(e.target.files[0], 'video')} />
                    </label>
                  </div>
                  
                  {/* Previews */}
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {form.images.map(img => <img key={img} src={img} className="w-16 h-16 rounded-lg object-cover border border-slate-700" />)}
                    {form.videoUrl && <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500 text-[8px] font-black border border-emerald-500/30">VIDEO OK</div>}
                  </div>
                </div>

                {/* Sección Precios e Inventario */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 ml-2 italic">PRECIO VENTA</label>
                    <input type="number" placeholder="0.00" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" onChange={e => setForm({...form, price: e.target.value})} required/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 ml-2 italic">PRECIO OFERTA</label>
                    <input type="number" placeholder="Opcional" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" onChange={e => setForm({...form, comparePrice: e.target.value})}/>
                  </div>
                </div>

                <button 
                  disabled={uploading}
                  className="w-full bg-blue-600 py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50"
                >
                  {uploading ? "SUBIENDO ARCHIVOS..." : "PUBLICAR PRODUCTO"}
                </button>
              </form>
            </motion.div>
          )}

          {/* LISTADO DE PRODUCTOS (LADO DERECHO) */}
          <div className={showForm ? "lg:col-span-7" : "lg:col-span-12"}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Aquí mapeamos los productos como lo veníamos haciendo */}
              {products.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden group hover:border-blue-500/50 transition-all">
      <div className="aspect-square relative overflow-hidden bg-slate-950">
        <img src={product.images[0]} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" />
        {product.comparePrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-[10px] font-black px-3 py-1 rounded-full">OFERTA</div>
        )}
      </div>
      <div className="p-6 space-y-4">
        <h3 className="font-bold text-xl tracking-tight">{product.name}</h3>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-black text-blue-400">${product.price}</span>
          {product.comparePrice && <span className="text-sm text-slate-500 line-through mb-1">${product.comparePrice}</span>}
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-slate-800 py-3 rounded-xl text-xs font-black hover:bg-red-500/20 transition-all">ELIMINAR</button>
          {product.videoUrl && <div className="bg-emerald-500/20 text-emerald-500 p-3 rounded-xl"><Video size={16} /></div>}
        </div>
      </div>
    </div>
  );
}