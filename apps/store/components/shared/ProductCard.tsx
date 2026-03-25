"use client";
import { Star } from "lucide-react";

export default function ProductCard({ product, primaryColor }: any) {
  const isSaleValid = product.saleEndsAt ? new Date(product.saleEndsAt) > new Date() : true;
  const hasOffer = product.comparePrice && isSaleValid;

  return (
    <div className="group bg-[#0f0f0f] border border-white/5 rounded-3xl md:rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col h-full">
      <div className="aspect-square relative overflow-hidden bg-neutral-900">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" 
        />
        {hasOffer && (
          <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-600 text-[8px] md:text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest z-10">
            Oferta
          </div>
        )}
      </div>

      <div className="p-4 md:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-orange-500 mb-2">
           {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="currentColor" />)}
           <span className="text-slate-500 text-[8px] font-bold ml-1">(48)</span>
        </div>

        <h3 className="font-black text-[11px] md:text-sm uppercase text-white tracking-tight italic line-clamp-1 mb-2">
          {product.name}
        </h3>
        
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-lg md:text-2xl font-black text-white">${product.price}</span>
          {hasOffer && (
            <span className="text-[10px] md:text-sm text-slate-500 line-through font-bold">${product.comparePrice}</span>
          )}
        </div>

        <button 
          style={{ backgroundColor: primaryColor }}
          className="w-full mt-auto text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] transition-all uppercase tracking-widest active:scale-95 shadow-xl"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}