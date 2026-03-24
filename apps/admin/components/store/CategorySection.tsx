"use client";
import { useState } from "react";
import { FolderTree, Plus, Trash2 } from "lucide-react";

export default function CategorySection({ storeId, categories, onRefresh }: any) {
  const [name, setName] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleAdd = async () => {
    if (!name) return;
    const token = localStorage.getItem("koda_token");
    await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ name, storeId })
    });
    setName("");
    onRefresh();
  };

  return (
    <div className="max-w-2xl space-y-8 pt-10 md:pt-0">
      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem]">
        <h2 className="text-xl font-black mb-6 text-blue-400 italic">NUEVA CATEGORÍA</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Ej: Calzado, Accesorios..." 
            className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button onClick={handleAdd} className="bg-blue-600 px-8 py-4 rounded-xl font-black hover:bg-blue-500 transition-all">
            AÑADIR
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {categories.map((cat: any) => (
          <div key={cat.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-center hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <FolderTree size={18} className="text-blue-500" />
              <span className="font-bold tracking-tight">{cat.name}</span>
            </div>
            <button className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}