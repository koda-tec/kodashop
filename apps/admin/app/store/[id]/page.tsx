"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Plus, Package, DollarSign, Image as ImageIcon, 
  Trash2, ExternalLink, LayoutGrid 
} from "lucide-react";

export default function StoreDetailPage() {
  const params = useParams();
  const id = params?.id as string; 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Estados para el nuevo producto
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    useEffect(() => {
    if (id) {
        fetchProducts();
    }
    }, [id]);
  const fetchProducts = async () => {
    const token = localStorage.getItem("koda_token");
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setProducts(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("koda_token");
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ name, price, images: [image], storeId: id }),
    });

    if (res.ok) {
      setName(""); setPrice(""); setImage(""); setShowForm(false);
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-3 bg-slate-900 rounded-2xl border border-slate-800 hover:bg-slate-800 transition">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter text-blue-500">GESTIÓN DE CATÁLOGO</h1>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">ID Tienda: {id.slice(0,8)}...</p>
            </div>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="w-full md:w-auto bg-white text-black px-6 py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5"
          >
            <Plus size={20} /> {showForm ? "CANCELAR" : "NUEVO PRODUCTO"}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Formulario (Condicional) */}
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-4 bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] h-fit sticky top-24"
            >
              <h2 className="text-xl font-black mb-6">DETALLES DEL PRODUCTO</h2>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <input 
                  placeholder="Nombre del producto" 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm"
                  value={name} onChange={e => setName(e.target.value)} required 
                />
                <input 
                  type="number" placeholder="Precio (ARS)" 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm"
                  value={price} onChange={e => setPrice(e.target.value)} required 
                />
                <input 
                  placeholder="URL de la imagen (JPG/PNG)" 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm"
                  value={image} onChange={e => setImage(e.target.value)} required 
                />
                <button className="w-full bg-blue-600 py-4 rounded-xl font-black hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                  GUARDAR PRODUCTO
                </button>
              </form>
            </motion.div>
          )}

          {/* Lista de Productos */}
          <div className={showForm ? "lg:col-span-8" : "lg:col-span-12"}>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(products) && products.map((p: any) => (
                  <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-4xl overflow-hidden group">
                    <div className="aspect-square bg-slate-950 relative overflow-hidden">
                       <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                       <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black border border-white/10">
                          ${p.price}
                       </div>
                    </div>
                    <div className="p-6">
                       <h3 className="font-bold text-lg mb-4">{p.name}</h3>
                       <div className="flex gap-2">
                          <button className="flex-1 bg-slate-800 hover:bg-red-500/20 hover:text-red-500 p-3 rounded-xl transition-all text-xs font-bold flex justify-center items-center gap-2">
                             <Trash2 size={14} /> BORRAR
                          </button>
                          <button className="bg-slate-800 hover:bg-blue-500 p-3 rounded-xl transition-all">
                             <ExternalLink size={16} />
                          </button>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
             {products.length === 0 && !loading && (
               <div className="text-center py-24 bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800/50">
                  <Package size={48} className="mx-auto text-slate-700 mb-4" />
                  <p className="text-slate-500 font-bold">No hay productos en esta tienda.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}