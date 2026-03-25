"use client";
import { useState, useMemo, useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Truck, RotateCcw, Search, X, 
  ChevronRight, Zap, MessageCircle, CreditCard, Lock, ArrowRight, Star, 
  ArrowUpRight, CheckCircle
} from "lucide-react";

export default function UrbanDark({ store }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    return store.products?.filter((p: any) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "all" || p.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, store.products]);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-(--primary)/30 overflow-x-hidden">
      
      {/* 🌌 FONDO DINÁMICO DE ALTA GAMA */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            background: `
              radial-gradient(circle at 0% 0%, ${store.primaryColor}20, transparent 40%),
              radial-gradient(circle at 100% 100%, ${store.secondaryColor}30, transparent 40%)
            ` 
          }}
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-white text-black py-2.5 overflow-hidden whitespace-nowrap border-b border-white/10 sticky top-0 z-120 shadow-2xl">
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 font-black text-[9px] uppercase tracking-[0.4em]"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-4 text-black">
               <Zap size={12} fill="black" /> ENVÍO GRATIS A TODO EL PAÍS <Zap size={12} fill="black" /> 12 CUOTAS SIN INTERÉS <Zap size={12} fill="black" /> CALIDAD GARANTIZADA
            </span>
          ))}
        </motion.div>
      </div>

      {/* 2. SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-300 bg-black/98 backdrop-blur-3xl p-6 flex flex-col items-center pt-32">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform"><X size={40}/></button>
            <div className="w-full max-w-2xl space-y-8">
              <h2 className="text-5xl font-black italic tracking-tighter text-center uppercase">Buscar en {store.name}</h2>
              <input autoFocus placeholder="¿Qué buscas?" className="w-full bg-white/5 border border-white/10 p-8 rounded-4xl text-2xl font-bold outline-none focus:border-(--primary) transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button onClick={() => setIsSearchOpen(false)} className="w-full bg-(--primary) py-5 rounded-2xl font-black uppercase text-xl">Confirmar</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO SECTION (Layout Arreglado con Capas) */}
      <header className="relative pt-24 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-10 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-(--primary)">
               <span className="w-2 h-2 bg-(--primary) rounded-full animate-pulse" /> New Season Available
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-7xl md:text-[115px] font-black uppercase leading-[0.8] tracking-[-0.04em] italic text-white">
               {store.heroTitle?.split(' ')[0]} <br />
               <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)' }}>
                 {store.heroTitle?.split(' ').slice(1).join(' ')}
               </span>
            </motion.h1>

            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-md mx-auto lg:mx-0 leading-relaxed opacity-80">
              {store.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
               <button onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} style={{ backgroundColor: store.primaryColor }} className="px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                 EXPLORAR CATÁLOGO <ChevronRight size={18}/>
               </button>
               <button onClick={() => setIsSearchOpen(true)} className="px-12 py-6 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-mono">
                 <Search size={18}/> BUSCADOR
               </button>
            </div>
          </div>

          {/* 🖼️ HERO IMAGE CON CAPAS (REESTABLECIDO) */}
          <div className="flex-1 relative w-full max-w-lg group">
            <div className="absolute -inset-4 bg-(--primary)/10 blur-[80px] rounded-full animate-pulse" />
            
            {/* Capas decorativas rotadas */}
            <div className="absolute inset-0 border border-white/5 rotate-6 rounded-[3.5rem] bg-white/5 backdrop-blur-sm transition-transform group-hover:rotate-12 duration-700" />
            <div className="absolute inset-0 border-2 border-(--primary)/20 -rotate-3 rounded-[3.5rem] transition-transform group-hover:-rotate-6 duration-700" />
            
            {/* Imagen principal */}
            <div className="relative z-10 aspect-4/5 bg-neutral-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]">
                <img src={store.products?.[0]?.images[0]} alt="Hero" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
            </div>
          </div>
        </div>
      </header>

      {/* 4. NAVBAR CATEGORÍAS (Sticky) */}
      <nav id="shop" className={`sticky top-10.25  transition-all duration-300 border-y border-white/5 px-4 py-5 ${scrolled ? 'bg-black/95 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
           <CategoryPill label="TODOS" active={activeCategory === "all"} onClick={() => setActiveCategory("all")} primaryColor={store.primaryColor} />
           {store.categories?.map((cat: any) => (
             <CategoryPill key={cat.id} label={cat.name} active={activeCategory === cat.id} onClick={() => setActiveCategory(cat.id)} primaryColor={store.primaryColor} />
           ))}
        </div>
      </nav>

      {/* 5. PRODUCT GRID */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-16 min-h-125">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts?.map((p: any) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <ProductCard product={p} primaryColor={store.primaryColor} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* 6. TRUST SECTION "BENTO ELITE" (REDISEÑADA) */}
      <section className="relative z-10 px-6 py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">Confianza <br /> sin límites.</h2>
                <div className="h-2 w-32" style={{ backgroundColor: store.primaryColor }}></div>
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] max-w-xs md:text-right">Infraestructura logística y de seguridad diseñada para tu tranquilidad.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TrustCard 
                icon={<Truck size={32} className="text-blue-500" />}
                title="ENVÍO PRIORITARIO"
                desc="Tus pedidos se despachan en 24hs hábiles con número de seguimiento en vivo."
                badge="48-72HS"
              />
              <TrustCard 
                icon={<ShieldCheck size={32} className="text-emerald-500" />}
                title="PAGO BLINDADO"
                desc="Usamos tecnología de encriptación SSL de grado militar para proteger tus datos."
                badge="100% SAFE"
              />
              <TrustCard 
                icon={<RotateCcw size={32} className="text-orange-500" />}
                title="GARANTÍA TOTAL"
                desc="Si el producto no cumple tus expectativas, tienes 30 días para cambio directo."
                badge="30 DAYS"
              />
           </div>
        </div>
      </section>

      {/* 🛒 FLOATING WHATSAPP (CORREGIDO Z-INDEX Y POSICIÓN) */}
      {store.whatsapp && (
        <div className="fixed bottom-8 right-4 z-200 flex mb-15 flex-col items-end gap-3 pointer-events-none">
           <motion.div 
             initial={{ opacity: 0, y: 10 }} 
             animate={{ opacity: 1, y: 0 }} 
             className="bg-white text-black px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase shadow-2xl flex items-center gap-2 border border-black/10 pointer-events-auto"
           >
             ¿NECESITAS AYUDA? <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
           </motion.div>
           <a 
            href={`https://wa.me/${store.whatsapp}`} target="_blank"
            className="bg-[#25D366] p-5 rounded-[2.2rem] shadow-[0_25px_60px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all pointer-events-auto border-4 border-white/10"
           >
            <MessageCircle size={32} fill="white" className="text-[#25D366]" />
           </a>
        </div>
      )}

      {/* 🏁 FOOTER PRO */}
      <footer className="relative z-10 bg-[#050505] pt-32 pb-16 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
             <div className="col-span-1 md:col-span-2 space-y-8">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase">{store.name}</h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase max-w-sm">Elevamos el estándar del comercio digital con curaduría de productos y logística de excelencia.</p>
                <div className="flex gap-4">
                  <SocialIcon path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01" />
                  <SocialIcon path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </div>
             </div>
             <div className="space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Navegación</h4>
                <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase italic">
                   <li><a href="#" className="hover:text-white transition">Catálogo Completo</a></li>
                   <li><a href="#" className="hover:text-white transition">Seguir mi pedido</a></li>
                   <li><a href="#" className="hover:text-white transition">Contacto Directo</a></li>
                </ul>
             </div>
             <div className="space-y-8">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Newsletter</h4>
                <div className="relative group">
                   <input placeholder="EMAIL@TIENDA.COM" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[10px] font-bold outline-none focus:border-(--primary) transition-all" />
                   <button className="absolute right-4 top-1/2 -translate-y-1/2 text-(--primary) group-hover:translate-x-1 transition-transform"><ArrowRight size={20}/></button>
                </div>
                <div className="flex items-center gap-3 opacity-30">
                   <Lock size={14}/> <span className="text-[9px] font-black uppercase tracking-widest">Safe Checkout</span>
                </div>
             </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="flex items-center gap-8 opacity-20 hover:opacity-50 transition-opacity">
                <span className="font-black italic text-xl uppercase tracking-tighter">Visa</span>
                <span className="font-black italic text-xl uppercase tracking-tighter">Mastercard</span>
                <span className="font-black italic text-xl uppercase tracking-tighter">Mercado Pago</span>
             </div>
             <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em] text-center">© 2024 • Powered by KodaShop Engineering</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- MICRO COMPONENTES ---

function CategoryPill({ label, active, onClick, primaryColor }: any) {
  return (
    <button onClick={onClick} style={active ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}} className={`whitespace-nowrap px-10 py-3.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${active ? 'text-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] scale-105' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}`}>
      {label}
    </button>
  );
}

function TrustCard({ icon, title, desc, badge }: any) {
  return (
    <div className="p-12 bg-white/1er border-white/5 rounded-[3.5rem] relative overflow-hidden group hover:bg-white/3 transition-all">
       <div className="absolute top-8 right-8 text-[8px] font-black text-slate-700 border border-white/5 px-2 py-1 rounded uppercase tracking-widest">{badge}</div>
       <div className="mb-8 p-6 bg-black rounded-3xl w-fit border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500">{icon}</div>
       <h3 className="text-white font-black text-lg tracking-tight mb-4 uppercase italic leading-none">{title}</h3>
       <p className="text-slate-500 text-xs font-bold leading-relaxed uppercase tracking-tighter">{desc}</p>
    </div>
  );
}

function SocialIcon({ path }: { path: string }) {
  return (
    <a href="#" className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-(--primary) transition-all hover:scale-110 group">
       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white text-slate-500"><path d={path}></path></svg>
    </a>
  );
}