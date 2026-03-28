"use client";
import { Star, Flame, ShoppingCart, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: any;
  primaryColor: string;
  theme?: "dark" | "light"; // Soporte para múltiples estilos de tienda
}

export default function ProductCard({ product, primaryColor, theme = "dark" }: ProductCardProps) {
  // --- LÓGICA DE NEGOCIO ---
  const isSaleValid = product.saleEndsAt ? new Date(product.saleEndsAt) > new Date() : true;
  const hasOffer = product.comparePrice && isSaleValid && product.comparePrice > product.price;
  
  // Cálculo de porcentaje de descuento
  const discount = hasOffer 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) 
    : 0;

  // Estilos según el tema seleccionado
  const isDark = theme === "dark";

  return (
    <div className={`
      group flex flex-col h-full transition-all duration-500 
      ${isDark 
        ? 'bg-[#0f0f0f] border border-white/5 rounded-4xl hover:border-white/20 shadow-2xl' 
        : 'bg-transparent rounded-none'
      }
    `}>
      
      {/* 🖼️ ÁREA DE IMAGEN */}
      <div className={`
        relative aspect-square overflow-hidden 
        ${isDark ? 'rounded-3xl m-2' : 'rounded-3xl bg-[#f5f5f7]'}
      `}>
        <img 
          src={product.images[0] || "/api/placeholder/400/400"} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />

        {/* Badges de Conversión */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-2 z-10">
          {hasOffer && (
            <div className="bg-red-600 text-white text-[8px] md:text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-lg animate-pulse">
              {discount}% OFF
            </div>
          )}
          {product.isHot && (
            <div className="bg-orange-500 text-white text-[8px] md:text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-lg flex items-center gap-1">
              <Flame size={10} fill="currentColor" /> HOT
            </div>
          )}
        </div>

        {/* Overlay en hover (Solo Desktop) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
           <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
              <ShoppingCart className="text-white" size={20} />
           </div>
        </div>
      </div>

      {/* 📝 ÁREA DE TEXTO */}
      <div className={`flex flex-col flex-1 p-5 md:p-8 ${!isDark && 'pt-6'}`}>
        
        {/* Social Proof (Reviews) */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
          </div>
          <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest ml-1">(4.9)</span>
        </div>

        {/* Título */}
        <h3 className={`
          font-black text-sm md:text-base uppercase tracking-tight mb-2 line-clamp-2 italic
          ${isDark ? 'text-white' : 'text-black'}
        `}>
          {product.name}
        </h3>

        {/* Precios */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xl md:text-2xl font-black ${isDark ? 'text-white' : 'text-black'}`}>
            ${product.price.toLocaleString()}
          </span>
          {hasOffer && (
            <span className="text-xs md:text-sm text-slate-500 line-through font-bold">
              ${product.comparePrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Sales Counter */}
        <div className="flex items-center gap-2 mb-6">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
             +100 vendidos este mes
           </p>
        </div>

        {/* Botón de Acción (Optimizado para Conversión) */}
        <button 
          style={{ backgroundColor: isDark ? primaryColor : 'black' }}
          className={`
            w-full mt-auto py-4 rounded-2xl font-black text-[10px] md:text-xs transition-all uppercase tracking-[0.2em] shadow-xl 
            flex items-center justify-center gap-2 text-white
            active:scale-95 hover:brightness-110 group/btn
          `}
        >
          VER DETALLE <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}