"use client";
import ProductCard from "../shared/ProductCard";

export default function UrbanDark({ store }: any) {
  return (
    <div className="min-h-screen bg-black">
      {/* 🏙️ HERO SECTION: Estilo Industrial/Agresivo */}
      <header className="relative w-full pt-20 pb-16 md:pt-32 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <div 
              style={{ color: store.primaryColor, borderColor: store.primaryColor }}
              className="text-[10px] font-black uppercase tracking-[0.5em] border-l-4 pl-4"
            >
              Nueva Colección / 2024
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter text-white">
              {store.heroTitle || store.name}
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-md">
              {store.heroSubtitle}
            </p>
            <div className="pt-4">
              <button 
                style={{ backgroundColor: store.primaryColor }}
                className="w-full md:w-auto px-12 py-5 text-white font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-[8px_8px_0px_rgba(255,255,255,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Comprar Ahora
              </button>
            </div>
          </div>
          
          {/* Visual decorativo para el template */}
          <div className="hidden md:block relative aspect-square">
            <div className="absolute inset-0 border-2 border-white/5 rotate-3 rounded-[3rem]"></div>
            <div className="absolute inset-0 border-2 border-white/5 -rotate-3 rounded-[3rem]"></div>
            <div className="absolute inset-4 bg-linear-to-br from-neutral-800 to-black rounded-[2.5rem] flex items-center justify-center overflow-hidden">
               {store.products[0] && (
                 <img 
                   src={store.products[0].images[0]} 
                   className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" 
                 />
               )}
            </div>
          </div>
        </div>
      </header>

      {/* 🛡️ TRUST BAR: Beneficios */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <TrustItem title="ENVÍO RÁPIDO" desc="A todo el país en 48hs." />
          <TrustItem title="COMPRA SEGURA" desc="Tus datos están protegidos." />
          <TrustItem title="CALIDAD PREMIUM" desc="Garantía oficial de marca." />
        </div>
      </section>

      {/* 📦 PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div>
             <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Catálogo de Élite</h2>
             <div className="h-1 w-20 bg-(--primary) mt-2"></div>
           </div>
           <div className="flex gap-2">
              {store.categories?.map((cat: any) => (
                <span key={cat.id} className="text-[10px] font-bold border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer uppercase">
                  {cat.name}
                </span>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {store.products.map((p: any) => (
            <ProductCard key={p.id} product={p} primaryColor={store.primaryColor} />
          ))}
        </div>
      </main>

      {/* 🏁 FOOTER SIMPLE */}
      <footer className="bg-neutral-950 border-t border-white/5 py-12 text-center">
        <p className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.4em]">
          {store.name} • Potenciado por KodaShop
        </p>
      </footer>
    </div>
  );
}

function TrustItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-8 text-center md:text-left">
      <h3 className="text-white font-black text-xs tracking-widest mb-1">{title}</h3>
      <p className="text-neutral-500 text-[10px] font-bold uppercase">{desc}</p>
    </div>
  );
}