"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Zap, Target, Layers, ArrowRight, BarChart3, Rocket, 
  CheckCircle2, Globe, MousePointer2, TrendingUp, ShieldCheck 
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 overflow-x-hidden font-sans">
      
      {/* 🌌 FONDO TÉCNICO ANIMADO */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* 🟢 NAVBAR (Optimizado Mobile) */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="text-lg md:text-xl font-black tracking-tighter text-white">KODASHOP</span>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-400">
            <a href="#proceso" className="hover:text-blue-400 transition-colors">¿Cómo funciona?</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Tecnología</a>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/login" className="text-xs md:text-sm font-bold text-slate-400 hover:text-white transition">Entrar</Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-black hover:bg-blue-500 transition-all">
              Empezar
            </Link>
          </div>
        </div>
      </nav>

      {/* 🚀 HERO SECTION (Mobile Friendly) */}
      <section className="relative pt-32 pb-16 md:pt-56 md:pb-32 z-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full border border-blue-500/20 mb-6 tracking-widest uppercase">
              🚀 LA INFRAESTRUCTURA DE LOS GROWTH HACKERS
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] mb-6 text-balance">
              Lanza. Valida. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Escala Ventas.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium px-2">
              KodaShop es la plataforma multi-tenant diseñada para validar productos físicos con Meta Ads sin perder tiempo en configuraciones técnicas.
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Link href="/register" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2">
              EMPEZAR AHORA <ArrowRight size={20} />
            </Link>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Sin tarjetas • 100% Cloud
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ SECCIÓN: ¿CÓMO FUNCIONA EL SISTEMA? (Explicación paso a paso) */}
      <section id="proceso" className="py-20 md:py-32 relative z-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">EL MÉTODO KODASHOP</h2>
            <p className="text-slate-500 font-medium italic">De la idea al checkout en 60 segundos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard 
              num="01" 
              icon={<Layers className="text-blue-500" />}
              title="Crea tu Instancia" 
              desc="Genera una nueva tienda bajo tu propio subdominio o dominio en un clic. Una arquitectura multi-tenant real."
            />
            <StepCard 
              num="02" 
              icon={<Target className="text-indigo-500" />}
              title="Conecta Meta" 
              desc="Píxel y Conversion API (CAPI) integrados. Medición exacta del servidor para vencer los bloqueos de iOS."
            />
            <StepCard 
              num="03" 
              icon={<BarChart3 className="text-emerald-500" />}
              title="Lanza y Valida" 
              desc="Envía tráfico de Meta Ads a tu landing optimizada. Mide conversiones y ROAS en tiempo real."
            />
            <StepCard 
              num="04" 
              icon={<TrendingUp className="text-orange-500" />}
              title="Escala o Pivot" 
              desc="¿Producto ganador? Escálalo. ¿No funcionó? Apaga, borra y lanza una nueva tienda en minutos."
            />
          </div>
        </div>
      </section>

      {/* 📊 SECCIÓN: POR QUÉ KODASHOP (Diferenciales) */}
      <section className="py-20 bg-slate-900/30 border-y border-slate-800/50 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Diseñado para los que <span className="text-blue-500 underline decoration-blue-500/30">venden de verdad.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              A diferencia de Shopify o WooCommerce, KodaShop está optimizado para la <b>velocidad de ejecución</b>. No instalas plugins, no configuras servidores. Todo lo que necesitas para Meta Ads ya está aquí.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-200 font-semibold">
                <CheckCircle2 className="text-blue-500" size={20} /> Multi-tenant: 1 cuenta, infinitas tiendas.
              </li>
              <li className="flex items-center gap-3 text-slate-200 font-semibold">
                <CheckCircle2 className="text-blue-500" size={20} /> SSR con Next.js: Carga instantánea (SEO + Conversión).
              </li>
              <li className="flex items-center gap-3 text-slate-200 font-semibold">
                <CheckCircle2 className="text-blue-500" size={20} /> CAPI Integrada: Envío de eventos desde el servidor.
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 bg-blue-600/10 rounded-bl-2xl text-[10px] font-bold text-blue-400 uppercase tracking-tighter">
                Server-Side Architecture
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                  <span className="text-slate-500 font-bold text-xs uppercase">Latencia de Carga</span>
                  <span className="text-emerald-400 font-black text-2xl">0.4s</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                  <span className="text-slate-500 font-bold text-xs uppercase">Precisión Tracking</span>
                  <span className="text-blue-400 font-black text-2xl">99.9%</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 font-bold text-xs uppercase">Infraestructura</span>
                  <span className="text-white font-black text-lg">Postgres + NestJS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 FINAL CTA SECTION */}
      <section className="py-20 md:py-40 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-700 to-indigo-900 p-8 md:p-20 rounded-[2rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)] bg-[size:20px_20px]" />
          <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
            Deja de configurar. <br /> Empieza a vender.
          </h2>
          <p className="text-blue-100 mb-10 text-base md:text-xl font-medium max-w-xl mx-auto">
            Únete a la plataforma que está cambiando las reglas del ecommerce de validación rápida.
          </p>
          <Link href="/register" className="bg-white text-blue-900 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform inline-flex items-center gap-3">
            CREAR MI CUENTA <Rocket size={24} />
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-900 text-center px-4">
        <p className="text-slate-600 text-xs font-bold tracking-[0.3em] uppercase">
          KodaShop © 2024 • Build fast, sell faster.
        </p>
      </footer>
    </div>
  );
}

function StepCard({ num, icon, title, desc }: { num: string, icon: any, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl relative group hover:bg-slate-900/60 transition-all"
    >
      <div className="text-4xl font-black text-slate-800 absolute top-4 right-6 group-hover:text-blue-500/20 transition-colors">
        {num}
      </div>
      <div className="mb-6 p-3 bg-slate-950 rounded-xl w-fit border border-slate-800">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed font-medium">
        {desc}
      </p>
    </motion.div>
  );
}