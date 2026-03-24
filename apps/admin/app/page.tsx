// apps/admin/app/(marketing)/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      {/* 🟢 NAVBAR RESPONSIVE */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs italic">K</div>
            KODASHOP
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Funciones</a>
            <a href="#metodo" className="hover:text-white transition">El Método</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold px-4 py-2 hover:text-white transition">
              Entrar
            </Link>
            <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition shadow-lg shadow-blue-500/20">
              Empezar ahora
            </Link>
          </div>
        </div>
      </nav>

      {/* 🚀 HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Tu fábrica de <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
              productos ganadores.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Deja de perder tiempo configurando tiendas. Lanza, valida con Meta Ads y escala tus ventas en minutos con infraestructura multi-tenant de alto rendimiento.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all shadow-xl">
              CREAR TIENDA GRATIS
            </Link>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <span className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[10px] font-bold">K</div>
                ))}
              </span>
              +200 validaciones este mes
            </div>
          </div>

          {/* 🖼️ MOCKUP DEL DASHBOARD (Visual que vende) */}
          <div className="mt-16 md:mt-24 relative max-w-5xl mx-auto">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20" />
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl overflow-hidden">
              <div className="bg-slate-950 rounded-xl border border-slate-800 aspect-video flex flex-col">
                {/* Header simulado */}
                <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  <div className="ml-4 h-4 w-32 bg-slate-800 rounded-full" />
                </div>
                {/* Body simulado */}
                <div className="p-6 grid grid-cols-3 gap-4 flex-1">
                  <div className="col-span-1 bg-slate-900/50 rounded-lg border border-slate-800 p-4 space-y-3">
                     <div className="h-4 w-1/2 bg-blue-500/20 rounded" />
                     <div className="h-8 w-full bg-slate-800 rounded" />
                     <div className="h-8 w-full bg-slate-800 rounded" />
                  </div>
                  <div className="col-span-2 bg-slate-900/50 rounded-lg border border-slate-800 p-4">
                     <div className="h-4 w-1/4 bg-slate-800 rounded mb-4" />
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 bg-slate-800/50 rounded-lg" />
                        <div className="h-20 bg-slate-800/50 rounded-lg" />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 FEATURES SECTION */}
      <section id="features" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 italic">DISEÑADO PARA VENDER.</h2>
            <p className="text-slate-500">Todo lo que necesitas para que tu ROAS explote.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              title="Multi-Store Sync" 
              desc="Lanza diferentes nichos en segundos bajo la misma infraestructura sin pagar de más."
              icon="🏢"
            />
            <FeatureCard 
              title="Meta Ads Native" 
              desc="Integración profunda con Píxel y CAPI para una medición de eventos 1:1."
              icon="🎯"
            />
            <FeatureCard 
              title="Landing Optimizada" 
              desc="Checkouts de un solo paso diseñados para convertir el tráfico frío de redes sociales."
              icon="⚡"
            />
          </div>
        </div>
      </section>

      {/* 💰 CTA FINAL */}
      <section className="py-20 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-linear-to-b from-blue-600 to-blue-800 p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-blue-500/20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              ¿Listo para encontrar tu próximo producto ganador?
            </h2>
            <p className="text-blue-100 mb-10 text-lg">
              Únete a la nueva era del ecommerce en Argentina y Latam. Sin complicaciones técnicas.
            </p>
            <Link href="/register" className="bg-white text-blue-800 px-10 py-4 rounded-2xl font-black text-xl hover:bg-slate-100 transition-transform hover:scale-105 inline-block">
              EMPEZAR GRATIS AHORA
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-600 text-sm border-t border-slate-900">
        © 2024 KodaShop. Built for Scalability.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="group bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900/60 hover:border-blue-500/50 transition-all duration-300">
      <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}