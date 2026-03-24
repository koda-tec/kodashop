// apps/admin/components/store/Sidebar.tsx
"use client";
import { ShoppingBag, Package, FolderTree, Layers, Palette, Target, ArrowLeft, X, Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 left-4 z-60 md:hidden bg-blue-600 p-2 rounded-lg text-white shadow-lg">
        {isOpen ? <X size={24}/> : <Menu size={24}/>}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" />
        )}
      </AnimatePresence>

      <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-8 z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/40">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <span className="font-black text-xl italic text-white tracking-tighter">KODASHOP</span>
        </div>

        <nav className="flex flex-col gap-8">
          {["Catálogo", "Conversión"].map(group => (
            <div key={group}>
              <p className="text-[10px] font-black text-slate-500 mb-4 tracking-[0.2em] uppercase px-4">{group}</p>
              <div className="flex flex-col gap-1">
                {menuItems.filter(item => item.group === group).map(item => (
                  <button key={item.id} onClick={() => { setActiveTab(item.id); setIsOpen(false); }} className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-800'}`}>
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