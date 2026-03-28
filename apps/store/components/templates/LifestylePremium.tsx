"use client";
import { useState, useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, ChevronRight, Truck, ShieldCheck, Star, ArrowRight, MessageCircle } from "lucide-react";

export default function LifestylePremium({ store }: any) {
  const [scrolled, setScrolled] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-black">
      
      {/* 🌌 TEXTURA DE FONDO SUTIL */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />

      {/* 📢 BARRA DE ANUNCIO */}
      {store.announcement && (
        <div style={{ backgroundColor: store.primaryColor }} className="text-white text-center py-2 text-[10px] font-black uppercase tracking-[0.3em] relative z-110">
          {store.announcement}
        </div>
      )}

      {/* 🏢 NAVBAR FLOTANTE GLASSMORPHISM */}
      <nav className={`fixed left-0 right-0 z-100ransition-all duration-500 px-6 ${scrolled ? 'top-0 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm' : 'top-10 py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo con manejo de contraste */}
          <div className="flex-1">
            {store.logo ? (
              <img src={store.logo} alt={store.name} className={`h-8 md:h-10 w-auto object-contain transition-all ${!scrolled && 'brightness-0 invert'}`} />
            ) : (
              <span className={`text-2xl font-black italic tracking-tighter uppercase ${!scrolled ? 'text-white' : 'text-black'}`}>{store.name}</span>
            )}
          </div>

          {/* Menú Central */}
          <div className={`hidden md:flex flex-2 justify-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] ${!scrolled ? 'text-white/80' : 'text-black/60'}`}>
            <a href="#productos" className="hover:text-(--primary) transition-colors">Catálogo</a>
            <a href="#beneficios" className="hover:text-(--primary) transition-colors">Garantía</a>
            <a href="#nosotros" className="hover:text-(--primary) transition-colors">Nosotros</a>
          </div>

          {/* Carrito e Iconos */}
          <div className={`flex-1 flex justify-end items-center gap-5 ${!scrolled ? 'text-white' : 'text-black'}`}>
            <Search size={20} className="cursor-pointer" />
            <div className="relative cursor-pointer bg-white/10 p-2 rounded-xl border border-white/10">
              <ShoppingBag size={20} />
              <span style={{ backgroundColor: store.primaryColor }} className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] flex items-center justify-center font-black text-white">0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 🚀 HERO SECTION IMPACTANTE */}
      <section className="relative h-screen w-full bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          {store.banners?.[0] ? (
            <img src={store.banners[0]} className="w-full h-full object-cover scale-105" alt="Hero" />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-zinc-800 to-black" />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.span initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="text-white/60 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Nueva Colección 2024</motion.span>
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="text-white text-5xl md:text-[110px] font-black uppercase italic leading-[0.85] tracking-tighter mb-8">
            {store.heroTitle || store.name}
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} className="text-white/80 text-lg max-w-xl mb-12 font-medium">
            {store.heroSubtitle}
          </motion.p>
          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} style={{ backgroundColor: store.primaryColor }} className="px-12 py-5 rounded-full text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl">
            Comprar Ahora
          </motion.button>
        </div>
      </section>

      {/* 🛡️ SECCIÓN DE CONFIANZA (Menos vacía) */}
      <section id="beneficios" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-(--primary) border border-gray-100"><Truck size={24} /></div>
            <h3 className="font-black text-xs uppercase tracking-widest mb-3 text-zinc-900">Logística de Élite</h3>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed uppercase">Envío prioritario a todo el país. Recibe en 48/72hs hábiles.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-(--primary) border border-gray-100"><ShieldCheck size={24} /></div>
            <h3 className="font-black text-xs uppercase tracking-widest mb-3 text-zinc-900">Compra Blindada</h3>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed uppercase">Tus datos están protegidos bajo protocolos de seguridad internacional.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-(--primary) border border-gray-100"><Star size={24} /></div>
            <h3 className="font-black text-xs uppercase tracking-widest mb-3 text-zinc-900">Garantía Real</h3>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed uppercase">Satisfacción garantizada o te devolvemos tu dinero en 30 días.</p>
          </div>
        </div>
      </section>

      {/* 📦 GRILLA DE PRODUCTOS (Foco en el producto) */}
      <main id="productos" className="max-w-7xl mx-auto px-4 md:px-10 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
           <div className="space-y-3">
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Nuestra Selección</h2>
              <div className="h-1.5 w-24" style={{ backgroundColor: store.primaryColor }} />
           </div>
           <div className="flex overflow-x-auto no-scrollbar gap-2 w-full md:w-auto">
              {store.categories?.map((cat:any) => (
                <button key={cat.id} className="whitespace-nowrap px-6 py-3 border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-black transition-colors">{cat.name}</button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-12 md:gap-y-24">
          {store.products?.map((p: any) => (
            <ProductCard key={p.id} product={p} primaryColor={store.primaryColor} theme="light" />
          ))}
        </div>
      </main>

      {/* 💬 WHATSAPP FLOATING (CORREGIDO) */}
      {store.whatsapp && (
        <a 
          href={`https://wa.me/${store.whatsapp}`} target="_blank"
          className="fixed bottom-8 right-8 z-150 bg-[#25D366] p-5 rounded-[2.2rem] shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
        >
          <div className="absolute right-full mr-4 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
             ¡Hablemos por WhatsApp!
          </div>
          <MessageCircle size={30} fill="white" className="text-[#25D366]" />
        </a>
      )}

      {/* 🏁 FOOTER SÓLIDO */}
      <footer className="bg-zinc-950 text-white pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
           <div className="col-span-1 md:col-span-2 space-y-8">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase underline decoration-(--primary) decoration-4 underline-offset-8">{store.name}</h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">Elevamos tu experiencia de compra con una curaduría de clase mundial y soporte dedicado.</p>
           </div>
           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Links Útiles</h4>
              <ul className="space-y-4 text-xs font-bold uppercase italic">
                 <li className="hover:text-(--primary)or-pointer">Seguir mi pedido</li>
                 <li className="hover:text-(--primary) cursor-pointer">Políticas de reembolso</li>
                 <li className="hover:text-(--primary) cursor-pointer">Términos legales</li>
              </ul>
           </div>
           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Paga con Seguridad</h4>
              <div className="flex flex-wrap gap-4 opacity-40 grayscale">
                 <span className="font-black italic text-lg">VISA</span>
                 <span className="font-black italic text-lg">MASTERCARD</span>
                 <span className="font-black italic text-lg">MPAGO</span>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 text-center">
           <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.5em]">© 2024 • Powered by KodaShop Engineering</p>
        </div>
      </footer>
    </div>
  );
}