"use client";
import { useState } from "react";
import { Layers, Plus, X, Trash2 } from "lucide-react";

export default function AttributeSection({ storeId, attributes, onRefresh }: any) {
  const [attrName, setAttrName] = useState("");
  const [attrValue, setAttrValue] = useState("");
  const [tempValues, setTempValues] = useState<string[]>([]);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const addValue = () => {
    if (attrValue && !tempValues.includes(attrValue)) {
      setTempValues([...tempValues, attrValue]);
      setAttrValue("");
    }
  };

  const handleSave = async () => {
    if (!attrName || tempValues.length === 0) return;
    const token = localStorage.getItem("koda_token");
    await fetch(`${API_URL}/variant-types`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ name: attrName, values: tempValues, storeId })
    });
    setAttrName(""); setTempValues([]); onRefresh();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10 md:pt-0">
      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] h-fit">
        <h2 className="text-xl font-black mb-6 text-blue-400 italic uppercase">Crear Atributo</h2>
        <div className="space-y-6">
          <input placeholder="Nombre (Ej: Talle, Color...)" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl" value={attrName} onChange={e => setAttrName(e.target.value)} />
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input placeholder="Valor (Ej: XL)" className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-xl" value={attrValue} onChange={e => setAttrValue(e.target.value)} />
              <button onClick={addValue} className="bg-slate-800 px-4 rounded-xl font-bold">+</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tempValues.map(v => (
                <span key={v} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-600/30 flex items-center gap-2">
                  {v} <X size={12} className="cursor-pointer" onClick={() => setTempValues(tempValues.filter(x => x !== v))}/>
                </span>
              ))}
            </div>
          </div>

          <button onClick={handleSave} className="w-full bg-blue-600 py-4 rounded-xl font-black shadow-lg">GUARDAR ATRIBUTO</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-500 tracking-widest uppercase mb-4">Atributos de la Tienda</h3>
        {attributes?.map((attr: any) => (
          <div key={attr.id} className="bg-slate-900 border border-slate-800 p-6 rounded-4xl flex justify-between items-center">
            <div>
              <p className="font-black text-white italic uppercase">{attr.name}</p>
              <div className="flex gap-2 mt-2">
                {attr.values.map((v: string) => <span key={v} className="text-[10px] text-slate-500 font-bold">{v}</span>)}
              </div>
            </div>
            <button className="text-red-500 p-2"><Trash2 size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}