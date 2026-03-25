import ProductCard from "../shared/ProductCard";

export default function GlowPro({ store }: any) {
  return (
    <div className="min-h-screen">
      {/* Hero Section Específica de GlowPro */}
      <header className="max-w-7xl mx-auto px-6 py-24 md:py-40 text-center">
        <h1 className="text-6xl md:text-9xl font-black mb-8 uppercase italic leading-[0.85] tracking-tighter">
          {store.heroTitle || store.name}
        </h1>
        <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          {store.heroSubtitle}
        </p>
        <div className="flex justify-center gap-4">
           <button className="bg-white text-black px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
             Explorar Tienda
           </button>
        </div>
      </header>

      {/* Grid de Productos */}
      <main className="max-w-7xl mx-auto px-6 pb-40">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 whitespace-nowrap">Nuestra Selección</h2>
            <div className="h-px w-full bg-white/10"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          {store.products.map((p: any) => (
            <ProductCard key={p.id} product={p} primaryColor={store.primaryColor} />
          ))}
        </div>
      </main>
    </div>
  );
}