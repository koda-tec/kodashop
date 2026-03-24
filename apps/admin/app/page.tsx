"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Target, Layers, ArrowRight, BarChart3, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 overflow-hidden font-sans">
      
      {/* 🌌 CAPA DE TEXTURA Y LUCES */}
      <div className="fixed inset-0 z-0">
        {/* Malla técnica (Grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Esferas de luz animadas */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-blue-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-indigo-600/10 rounded-full blur-[100px]" 
        />
      </div>

      {/* 🟢 NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Rocket size={20} className="text-white fill-white/20" />
            </div>
            KODASHOP
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
            <a href="#features" className="hover:text-blue-400 transition-colors">Funciones</a>
            <a href="#metodo" className="hover:text-blue-400 transition-colors">El Método</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-400 hover:text-white transition">Entrar</Link>
            <Link href="/register" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-black hover:bg-blue-500 hover:text-white transition-all shadow-xl">
              Empezar ahora
            </Link>
          </div>
        </div>
      </nav>

      {/* 🚀 HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-40 z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-2 rounded-full border border-blue-500/20 mb-8 uppercase tracking-widest">
              <Zap size={14} className="fill-blue-400" /> Sistema Multi-tenant v1.0
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.95] mb-8">
              Escala tu ecommerce <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-emerald-400">
                sin límites técnicos.
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Lanza múltiples tiendas en minutos, valida productos con Meta Ads y gestiona todo desde un único panel centralizado.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/register" className="group w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2">
              CREAR MI INSTANCIA <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* 🖼️ MOCKUP ANIMADO */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-24 relative max-w-6xl mx-auto"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-[2.5rem] blur-2xl opacity-20 animate-pulse" />
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-4xl p-3 shadow-2xl backdrop-blur-sm">
              <div className="bg-[#020617] rounded-3xl border border-slate-800 aspect-video flex flex-col overflow-hidden">
                {/* Dashboard UI Simulado */}
                <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-800" />
                      <div className="w-3 h-3 rounded-full bg-slate-800" />
                      <div className="w-3 h-3 rounded-full bg-slate-800" />
                   </div>
                   <div className="h-6 w-48 bg-slate-900 rounded-full border border-slate-800 flex items-center px-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">kodashop.com/dashboard</div>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-800" />
                </div>
                <div className="p-8 grid grid-cols-4 gap-6 flex-1">
                   <div className="col-span-1 space-y-4">
                      <div className="h-32 bg-blue-600/10 rounded-2xl border border-blue-500/20 p-4">
                         <div className="text-blue-400 text-xs font-bold mb-2">VENTAS HOY</div>
                         <div className="text-2xl font-black text-white">$14.200</div>
                      </div>
                      <div className="h-32 bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
                         <div className="text-slate-500 text-xs font-bold mb-2">ROAS PROMEDIO</div>
                         <div className="text-2xl font-black text-white">4.2x</div>
                      </div>
                   </div>
                   <div className="col-span-3 bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                      <div className="flex justify-between mb-8">
                         <div className="h-6 w-32 bg-slate-800 rounded-lg" />
                         <div className="h-6 w-20 bg-slate-800 rounded-lg" />
                      </div>
                      <div className="space-y-4">
                         {[1,2,3].map(i => (
                           <div key={i} className="h-12 w-full bg-slate-800/30 rounded-xl border border-slate-800 flex items-center px-4 justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 bg-slate-800 rounded-lg" />
                                 <div className="h-3 w-32 bg-slate-800 rounded" />
                              </div>
                              <div className="h-3 w-12 bg-blue-500/20 rounded" />
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🎯 FEATURES CON HOVER EFFECTS */}
      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Layers className="text-blue-400" />}
              title="Arquitectura Multi-tenant" 
              desc="Una sola base de datos, infinitas tiendas independientes. Escalabilidad sin fricción."
            />
            <FeatureCard 
              icon={<Target className="text-indigo-400" />}
              title="Meta Ads Engine" 
              desc="Píxel y Conversion API configurados de fábrica. Medición exacta para escalar tus ads."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-emerald-400" />}
              title="Analytics de Alta Fidelidad" 
              desc="Entiende qué productos funcionan y cuáles no con métricas en tiempo real."
            />
          </div>
        </div>
      </section>

      {/* 💰 CTA SECCIÓN CON TEXTURA DE PUNTOS */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative bg-slate-900 border border-slate-800 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden">
             {/* Puntos decorativos */}
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <div className="grid grid-cols-4 gap-2">
                   {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
                </div>
             </div>
             
             <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                Empieza a validar <br /> como un profesional.
             </h2>
             <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-500/20 inline-block">
                ABRIR MI CUENTA GRATIS
             </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-slate-900 bg-[#020617] relative z-10">
        <p className="text-slate-600 text-sm font-medium tracking-widest uppercase">
          © 2024 KodaShop • Engineering for Growth
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] hover:border-blue-500/30 transition-all backdrop-blur-sm"
    >
      <div className="mb-6 p-4 bg-slate-950 rounded-2xl w-fit border border-slate-800 shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium">
        {desc}
      </p>
    </motion.div>
  );
}