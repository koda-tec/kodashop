import { headers } from "next/headers";
import GlowPro from "@/components/templates/GlowPro";
import UrbanDark from "@/components/templates/UrbanDark";

async function getStoreData() {
  const headerList = await headers(); 
  const host = headerList.get("host") || "";
  const parts = host.split('.');
  const subdomain = parts[0];

  // Ignoramos localhost sin subdominio y www
  if (!subdomain || subdomain === 'localhost' || subdomain === 'www' || (parts.length < 2 && !host.includes('localhost'))) {
    return null;
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  try {
    const res = await fetch(`${API_URL}/stores/public/${subdomain}`, { 
      next: { revalidate: 10 } 
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching store data:", error);
    return null;
  }
}

export default async function StoreFront() {
  const store = await getStoreData();

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="text-center px-6">
          <h1 className="text-4xl font-black mb-4 uppercase italic">404 - Espacio no encontrado</h1>
          <p className="text-slate-500 max-w-md mx-auto">El subdominio no está vinculado a ninguna instancia activa de KodaShop.</p>
        </div>
      </div>
    );
  }

  const themeStyles = {
    '--primary': store.primaryColor || '#2563eb',
    '--background': store.secondaryColor || '#020617',
  } as React.CSSProperties;

  return (
    <div style={themeStyles} className="bg-[var(--background)] min-h-screen text-white font-sans selection:bg-[var(--primary)]/30">
      
      {/* 📢 ANNOUNCEMENT BAR */}
      {store.announcement && (
        <div className="bg-[var(--primary)] text-white text-center py-2.5 text-[10px] font-black uppercase tracking-[0.2em] sticky top-0 z-[100]">
          {store.announcement}
        </div>
      )}

      {/* 🏢 NAVBAR */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto relative z-50">
        {store.logo ? (
          <img src={store.logo} alt={store.name} className="h-10 md:h-12 w-auto object-contain" />
        ) : (
          <span className="text-2xl font-black italic uppercase tracking-tighter text-white">{store.name}</span>
        )}
        
        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl relative cursor-pointer">
           <span className="absolute -top-1 -right-1 bg-[var(--primary)] w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold">0</span>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
      </nav>

      {/* 🎨 RENDER DE TEMPLATES (Sin AnimatePresence para evitar conflictos de Server/Client) */}
      <main>
        {store.templateId === "default" && <GlowPro store={store} />}
        {store.templateId === "dark_minimal" && <UrbanDark store={store} />}
      </main>

      {/* 💬 WHATSAPP */}
      {store.whatsapp && (
        <a 
          href={`https://wa.me/${store.whatsapp}`} 
          target="_blank"
          className="fixed bottom-6 right-6 bg-[#25D366] p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform z-50"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      )}
    </div>
  );
}