// apps/admin/app/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navbar Simple */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-black text-blue-500">KodaShop</div>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition">Iniciar Sesión</Link>
          <Link href="/register" className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full font-bold transition">Comenzar Gratis</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
          Valida tu producto <br />
          <span className="text-blue-500">en tiempo récord.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Crea tiendas multi-tenant optimizadas para Meta Ads. Escala lo que funciona, descarta lo que no. La infraestructura de ecommerce para growth hackers.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/register" className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition">
            Crear mi primera tienda
          </Link>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <span className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950" />)}
            </span>
            <span className="text-sm">+100 emprendedores validando</span>
          </div>
        </div>
      </main>

      {/* Features Rápidas */}
      <section className="bg-slate-900/50 py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <FeatureCard title="Multi-tenant" desc="Gestiona infinitas tiendas desde un solo lugar sin complicaciones técnicas." />
          <FeatureCard title="Meta Ads Ready" desc="Píxel y CAPI integrados nativamente para medir cada centavo de tu ROAS." />
          <FeatureCard title="Optimización SEO" desc="Carga ultra-rápida con Next.js para que no pierdas ni una visita." />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-3">
      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 font-bold">✓</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}