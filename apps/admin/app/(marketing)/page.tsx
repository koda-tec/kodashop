// apps/admin/app/(marketing)/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-black text-blue-500 tracking-tighter italic">KODASHOP</div>
        <div className="space-x-6 flex items-center">
          <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-full text-sm font-bold transition shadow-lg shadow-blue-500/20">
            Comenzar Gratis
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 inline-block">
          NUEVA ERA DEL ECOMMERCE
        </span>
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
          Valida productos <br />
          <span className="text-blue-500">en tiempo récord.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Crea tiendas multi-tenant optimizadas para Meta Ads. Escala lo que funciona, descarta lo que no. La infraestructura definitiva para Growth Hackers.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/register" className="bg-white text-black px-10 py-4 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all transform hover:scale-105">
            CREAR MI PRIMERA TIENDA
          </Link>
        </div>
      </main>

      {/* Grid de Features */}
      <section className="max-w-7xl mx-auto px-6 pb-32 grid md:grid-cols-3 gap-8">
        <FeatureCard 
          title="Multi-tenant" 
          desc="Gestiona decenas de tiendas desde un solo panel centralizado." 
          icon="🏢"
        />
        <FeatureCard 
          title="Meta Ads Ready" 
          desc="Estructura optimizada para Píxel y CAPI. Maximiza tu ROAS." 
          icon="📈"
        />
        <FeatureCard 
          title="Velocidad Next.js" 
          desc="Tiempos de carga instantáneos para que no pierdas ventas." 
          icon="⚡"
        />
      </section>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition-colors">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}