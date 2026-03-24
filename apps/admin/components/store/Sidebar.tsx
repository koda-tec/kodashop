"use client";
import { ShoppingBag, Package, FolderTree, Layers, Palette, Target, ArrowLeft, X, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: any) {
  const router = useRouter();

  const menuItems = [
    { id: "products", label: "Productos", icon: <Package size={20}/>, group: "Catálogo" },
    { id: "categories", label: "Categorías", icon: <FolderTree size={20}/>, group: "Catálogo" },
    { id: "attributes", label: "Atributos", icon: <Layers size={20}/>, group: "Catálogo" },
    { id: "appearance", label: "Diseño", icon: <Palette size={20}/>, group: "Conversión" },
    { id: "marketing", label: "Marketing", icon: <Target size={20}/>, group: "Conversión" },
  ];

  return (
    <>
      {/* Botón Flotante para Mobile */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed top-5 right-5 z-70 md:hidden bg-blue-600 p-3 rounded-2xl text-white shadow-2xl"
      >
        {isOpen ? <X size={24}/> : <Menu size={24}/>}
      </button>

      {/* Overlay para cerrar en mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-8 z-60 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <span className="font-black text-xl italic text-white tracking-tighter">KODASHOP</span>
        </div>

        <nav className="flex flex-col gap-8">
          {["Catálogo", "Conversión"].map(group => (
            <div key={group}>
              <p className="text-[10px] font-black text-slate-500 mb-4 tracking-[0.2em] uppercase px-2">{group}</p>
              <div className="flex flex-col gap-1">
                {menuItems.filter(item => item.group === group).map(item => (
                  <button key={item.id} onClick={() => { setActiveTab(item.id); setIsOpen(false); }} className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-800'}`}>
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <button onClick={() => router.push('/dashboard')} className="mt-auto flex items-center gap-3 text-slate-500 hover:text-white transition font-black text-[10px] uppercase tracking-widest border-t border-slate-800 pt-6 w-full">
          <ArrowLeft size={14} /> Volver al panel
        </button>
      </aside>
    </>
  );
}