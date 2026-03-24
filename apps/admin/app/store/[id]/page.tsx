"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Package, Trash2, Upload, Image as ImageIcon, 
  Video, Settings, Target, ArrowLeft, Save, ShoppingBag 
} from "lucide-react";

export default function StoreDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("products"); // products | marketing | settings
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados del formulario de producto
  const [form, setForm] = useState({
    name: "", description: "", price: "", comparePrice: "", 
    sku: "", stock: "0", images: [] as string[], videoUrl: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => { fetchProducts(); }, []);

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
      body: JSON.stringify({ ...form, storeId: id }),
    });

    if (res.ok) {
      alert("¡Producto publicado con éxito!");
      setForm({ name: "", description: "", price: "", comparePrice: "", sku: "", stock: "0", images: [], videoUrl: "" });
      setShowForm(false);
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row">
      
      {/* 📱 SIDEBAR DE GESTIÓN */}
      <aside className="w-full md:w-64 bg-slate-900/50 border-r border-slate-800 p-6 flex flex-col gap-8">
        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-white transition font-bold text-sm">
          <ArrowLeft size={16} /> VOLVER AL PANEL
        </button>

        <nav className="flex flex-col gap-2">
          <TabButton active={activeTab === "products"} onClick={() => setActiveTab("products")} icon={<Package size={18}/>} label="Productos" />
          <TabButton active={activeTab === "marketing"} onClick={() => setActiveTab("marketing")} icon={<Target size={18}/>} label="Marketing" />
          <TabButton active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon={<Settings size={18}/>} label="Ajustes" />
        </nav>
      </aside>

      {/* 💻 CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="mb-10 flex justify-between items-end">
           <div>
             <h1 className="text-4xl font-black italic text-blue-500 uppercase">
               {activeTab === "products" ? "Inventario" : activeTab === "marketing" ? "Ads & Tracking" : "Ajustes"}
             </h1>
             <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mt-1">Gestión de Instancia: {String(id).slice(0,8)}</p>
           </div>
           
           {activeTab === "products" && (
             <button 
               onClick={() => setShowForm(!showForm)}
               className="bg-blue-600 px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-500 transition-all"
             >
               <Plus size={20} /> {showForm ? "CANCELAR" : "AÑADIR"}
             </button>
           )}
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "products" && (
            <motion.div key="products" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
               {showForm ? (
                 <ProductForm form={form} setForm={setForm} onSubmit={handleCreateProduct} />
               ) : (
                 <ProductList products={products} />
               )}
            </motion.div>
          )}

          {activeTab === "marketing" && (
            <motion.div key="marketing" initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem]">
              <h2 className="text-2xl font-black mb-6">META ADS CONFIG</h2>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 italic">FACEBOOK PIXEL ID</label>
                    <input placeholder="1234567890" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 italic">CONVERSION API (CAPI) TOKEN</label>
                    <textarea placeholder="EAAB..." className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl h-32" />
                 </div>
                 <button className="bg-blue-600 w-full py-4 rounded-xl font-black flex justify-center items-center gap-2">
                    <Save size={18} /> GUARDAR CONFIGURACIÓN
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTES PARA ORDENAR EL CÓDIGO ---

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-800'}`}
    >
      {icon} {label}
    </button>
  );
}

function ProductForm({ form, setForm, onSubmit }: any) {
  return (
    <form onSubmit={onSubmit} className="max-w-3xl bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
           <label className="text-xs font-black text-blue-400 tracking-widest uppercase">Info Básica</label>
           <input placeholder="Nombre" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
           <textarea placeholder="Descripción" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl h-32" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>
        <div className="space-y-4">
           <label className="text-xs font-black text-emerald-400 tracking-widest uppercase">Precios y Stock</label>
           <input type="number" placeholder="Precio Venta" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
           <input type="number" placeholder="Precio Oferta (Opcional)" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.comparePrice} onChange={e => setForm({...form, comparePrice: e.target.value})} />
           <input type="number" placeholder="Stock Inicial" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-xs font-black text-purple-400 tracking-widest uppercase">Multimedia (URLs Temporales)</label>
        <input placeholder="URL de Imagen" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs" value={form.images[0] || ""} onChange={e => setForm({...form, images: [e.target.value]})} required />
      </div>
      <button className="w-full bg-blue-600 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20">PUBLICAR PRODUCTO</button>
    </form>
  );
}

function ProductList({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden group">
          <div className="aspect-square bg-slate-950 relative">
             <img src={p.images[0]} className="w-full h-full object-cover opacity-80" />
             <div className="absolute top-4 right-4 bg-blue-600 px-3 py-1 rounded-full text-xs font-black">${p.price}</div>
          </div>
          <div className="p-6">
             <h3 className="font-bold text-lg">{p.name}</h3>
             <p className="text-xs text-slate-500 mt-1">Stock: {p.stock} unidades</p>
             <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-slate-800 py-2 rounded-lg text-[10px] font-black">EDITAR</button>
                <button className="bg-red-500/10 text-red-500 p-2 rounded-lg"><Trash2 size={16}/></button>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}