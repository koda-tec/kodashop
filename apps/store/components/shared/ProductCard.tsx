"use client";
export default function ProductCard({ product, primaryColor }: any) {
  const isSaleValid = product.saleEndsAt ? new Date(product.saleEndsAt) > new Date() : true;
  const hasOffer = product.comparePrice && isSaleValid;

  return (
    <div className="group bg-white/5 border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-500">
      <div className="aspect-square relative overflow-hidden bg-neutral-900">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        {hasOffer && (
          <div className="absolute top-4 left-4 bg-red-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
            Oferta
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-sm uppercase truncate text-slate-300 tracking-tight">{product.name}</h3>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-black text-white">${product.price}</span>
          {hasOffer && (
            <span className="text-sm text-slate-500 line-through font-bold">${product.comparePrice}</span>
          )}
        </div>
        <button 
          style={{ backgroundColor: primaryColor }}
          className="w-full mt-6 text-white py-4 rounded-2xl font-black text-xs transition-all uppercase tracking-widest active:scale-95 shadow-lg"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}