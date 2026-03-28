import { headers } from "next/headers";
import GlowPro from "@/components/templates/GlowPro";
import UrbanDark from "@/components/templates/UrbanDark";
import LifestylePremium from "@/components/templates/LifestylePremium";

async function getStoreData(searchParams: any) {
  const headerList = await headers(); 
  const host = headerList.get("host") || "";
  
  // 1. Intentamos sacar el subdominio de la URL (tienda1.midominio.com)
  const parts = host.split('.');
  let subdomain = null;

  if (parts.length > 2) {
    subdomain = parts[0]; // tienda1
  }

  // 2. Si no hay subdominio (estamos en vercel.app), buscamos el parámetro ?s=
  if (!subdomain || subdomain === 'www') {
    subdomain = searchParams?.s || null;
  }

  if (!subdomain) return null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  try {
    const res = await fetch(`${API_URL}/stores/public/${subdomain}`, { 
      next: { revalidate: 10 } 
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// Actualizamos el componente principal para recibir searchParams
export default async function StoreFront({ searchParams }: { searchParams: any }) {
  const store = await getStoreData(searchParams);
  if (!store) return <div className="min-h-screen bg-black flex items-center justify-center text-white">404 - TIENDA NO ENCONTRADA</div>;

  const themeStyles = {
    '--primary': store.primaryColor || '#2563eb',
    '--background': store.secondaryColor || '#ffffff',
  } as React.CSSProperties;

  return (
    <div style={themeStyles} className="min-h-screen font-sans overflow-x-hidden">
      {/* El fondo se define dentro de cada template para evitar franjas */}
      <main>
        {store.templateId === "default" && <GlowPro store={store} />}
        {store.templateId === "dark_minimal" && <UrbanDark store={store} />}
        {store.templateId === "premium_lifestyle" && <LifestylePremium store={store} />}
      </main>
    </div>
  );
}