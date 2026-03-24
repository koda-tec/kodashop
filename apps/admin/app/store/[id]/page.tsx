"use client";
import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Package, Trash2, Settings, Target, ArrowLeft, 
  Palette, FolderTree, Layers, Save, ShoppingBag, Eye,
  Image as ImageIcon, Video, Info, CheckCircle2, X, Loader2, ExternalLink
} from "lucide-react";

export default function StoreDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  
  // Pestañas
  const [activeTab, setActiveTab] = useState("products"); 

  // Estados de Datos
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de Formularios
  const [showProductForm, setShowProductForm] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [uploading, setUploading] = useState(false);

  // Estado del Producto
  const [productForm, setProductForm] = useState({
    name: "", description: "", price: "", comparePrice: "", 
    sku: "", stock: "0", images: [] as string[], videoUrl: "", categoryId: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => { 
    if (id) fetchInitialData(); 
  }, [id]);

  const fetchInitialData = async () => {
    const token = localStorage.getItem("koda_token");
    try {
      const [resP, resC] = await Promise.all([
        fetch(`${API_URL}/products/${id}`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_URL}/categories/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
      ]);
      const dataP = await resP.json();
      const dataC = await resC.json();
      setProducts(Array.isArray(dataP) ? dataP : []);
      setCategories(Array.isArray(dataC) ? dataC : []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleCreateCategory = async () => {
    if (!newCatName) return;
    const token = localStorage.getItem("koda_token");
    await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ name: newCatName, storeId: id })
    });
    setNewCatName("");
    fetchInitialData();
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("koda_token");
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ ...productForm, storeId: id }),
    });

    if (res.ok) {
      setShowProductForm(false);
      setProductForm({ name: "", description: "", price: "", comparePrice: "", sku: "", stock: "0", images: [], videoUrl: "", categoryId: "" });
      fetchInitialData();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row font-sans">
      
      {/* 📱 SIDEBAR */}
      <aside className="w-full md:w-72 bg-slate-900/80 border-r border-slate-800 p-8 flex flex-col gap-10 backdrop-blur-xl sticky top-0 h-screen">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/40">
            <ShoppingBag size={20} />
          </div>
          <span className="font-black text-xl italic tracking-tighter">KODASHOP</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <p className="text-[10px] font-black text-slate-500 mb-2 tracking-[0.2em] uppercase">Catálogo</p>
          <TabBtn active={activeTab === "products"} onClick={() => setActiveTab("products")} icon={<Package size={18}/>} label="Productos" />
          <TabBtn active={activeTab === "categories"} onClick={() => setActiveTab("categories")} icon={<FolderTree size={18}/>} label="Categorías" />
          <TabBtn active={activeTab === "variants"} onClick={() => setActiveTab("variants")} icon={<Layers size={18}/>} label="Atributos" />
          
          <p className="text-[10px] font-black text-slate-500 mt-6 mb-2 tracking-[0.2em] uppercase">Conversión</p>
          <TabBtn active={activeTab === "appearance"} onClick={() => setActiveTab("appearance")} icon={<Palette size={18}/>} label="Diseño" />
          <TabBtn active={activeTab === "marketing"} onClick={() => setActiveTab("marketing")} icon={<Target size={18}/>} label="Marketing" />
        </nav>

        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 text-slate-500 hover:text-white transition font-black text-[10px] uppercase tracking-widest border-t border-slate-800 pt-6">
          <ArrowLeft size={14} /> Salir
        </button>
      </aside>

      {/* 💻 CONTENIDO */}
      <main className="flex-1 p-6 md:p-16 overflow-y-auto bg-[radial-gradient(circle_at_top_right,#1e293b_0%,transparent_40%)]">
        
        <header className="mb-12 flex justify-between items-center">
           <h1 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter">
             {activeTab === "products" && "Inventario"}
             {activeTab === "categories" && "Categorías"}
             {activeTab === "variants" && "Variantes"}
             {activeTab === "appearance" && "Branding"}
             {activeTab === "marketing" && "Marketing"}
           </h1>
           <button className="bg-white text-black px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl">
             <Eye size={18} /> VER WEB
           </button>
        </header>

        <AnimatePresence mode="wait">
          {/* PRODUCTOS */}
          {activeTab === "products" && (
            <motion.div key="products" initial={{opacity:0}} animate={{opacity:1}} className="space-y-8">
               <div className="flex justify-end">
                  <button onClick={() => setShowProductForm(!showProductForm)} className="bg-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                    {showProductForm ? <X size={18}/> : <Plus size={18}/>} {showProductForm ? "Cancelar" : "Nuevo Producto"}
                  </button>
               </div>

               {showProductForm ? (
                 <form onSubmit={handleCreateProduct} className="max-w-4xl bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <input placeholder="Nombre" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} required />
                      <textarea placeholder="Descripción" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl h-32" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} />
                      <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={productForm.categoryId} onChange={e => setProductForm({...productForm, categoryId: e.target.value})}>
                        <option value="">Sin Categoría</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-4">
                      <input type="number" placeholder="Precio" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} required />
                      <input placeholder="URL Imagen" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={productForm.images[0] || ""} onChange={e => setProductForm({...productForm, images: [e.target.value]})} required />
                      <button className="w-full bg-blue-600 py-4 rounded-xl font-black mt-4">PUBLICAR</button>
                    </div>
                 </form>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map(p => (
                      <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group">
                        <div className="aspect-square bg-slate-950"><img src={p.images[0]} className="w-full h-full object-cover opacity-80" /></div>
                        <div className="p-6">
                          <h3 className="font-bold">{p.name}</h3>
                          <p className="text-blue-400 font-black mt-2">${p.price}</p>
                        </div>
                      </div>
                    ))}
                 </div>
               )}
            </motion.div>
          )}

          {/* CATEGORÍAS */}
          {activeTab === "categories" && (
            <motion.div key="categories" initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl space-y-8">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem]">
                <h2 className="text-xl font-black mb-6 text-blue-400 font-mono tracking-tighter">NUEVA CATEGORÍA</h2>
                <div className="flex gap-4">
                  <input 
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Ej: Calzado, Electrónica..." 
                    className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button onClick={handleCreateCategory} className="bg-blue-600 px-8 rounded-xl font-black hover:bg-blue-500 transition-all">AÑADIR</button>
                </div>
              </div>

              <div className="grid gap-3">
                {categories.map((cat) => (
                  <div key={cat.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-center hover:border-slate-700 transition-colors">
                    <span className="font-bold tracking-tight">{cat.name}</span>
                    <button className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* APARIENCIA / BRANDING */}
          {activeTab === "appearance" && (
            <motion.div key="appearance" initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} className="max-w-4xl space-y-12">
               <section className="space-y-6">
                 <h2 className="text-sm font-black text-slate-500 tracking-[0.3em] uppercase italic">1. Estilo Visual</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <TemplateCard name="Glow Pro" desc="E-commerce de belleza." active />
                   <TemplateCard name="Street Dark" desc="Moda y cultura urbana." />
                   <TemplateCard name="Minimal" desc="Para productos de lujo." />
                 </div>
               </section>

               <section className="bg-slate-900/50 border border-slate-800 p-10 rounded-[3rem] space-y-8">
                  <h2 className="text-xl font-black text-blue-400">2. IDENTIDAD</h2>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4 text-center">
                      <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 bg-slate-950 flex flex-col items-center justify-center">
                        <ImageIcon className="text-slate-700 mb-2" size={32} />
                        <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">LOGO MARCA</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <ColorInput label="Color Principal" defaultVal="#2563eb" />
                      <ColorInput label="Color Fondo" defaultVal="#020617" />
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 py-4 rounded-2xl font-black shadow-lg shadow-blue-600/20">GUARDAR DISEÑO</button>
               </section>
            </motion.div>
          )}
          
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- HELPERS ---

function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-800'}`}>
      {icon} {label}
    </button>
  );
}

function TemplateCard({ name, desc, active }: any) {
  return (
    <div className={`p-6 rounded-4xl border-2 transition-all cursor-pointer ${active ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'}`}>
      <div className="w-full aspect-4/3 bg-slate-800 rounded-2xl mb-4 border border-slate-700"></div>
      <h3 className="font-black text-xs uppercase tracking-tight">{name}</h3>
      <p className="text-[10px] text-slate-500 mt-1 font-medium">{desc}</p>
    </div>
  );
}

function ColorInput({ label, defaultVal }: any) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
      <input type="color" defaultValue={defaultVal} className="bg-transparent border-none w-8 h-8 cursor-pointer" />
    </div>
  );
}