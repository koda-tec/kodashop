import { headers } from "next/headers";
import GlowPro from "@/components/templates/GlowPro";
import UrbanDark from "@/components/templates/UrbanDark";
import LifestylePremium from "@/components/templates/LifestylePremium";

async function getStoreData(searchParams: any) {
  // 1. Obtener el host actual (ej: kodashop-store.vercel.app o tienda1.localhost:3002)
  const headerList = await headers();
  const host = headerList.get("host") || "";
  
  // 2. Esperar los parámetros de búsqueda (Obligatorio en Next.js 15)
  const params = await searchParams;
  const sParam = params?.s; 

  let subdomain = null;

  // Lógica prioritaria:
  // A. Si viene por parámetro ?s= (Uso desde el Dashboard de Vercel)
  if (sParam) {
    subdomain = sParam;
  } 
  // B. Si viene por subdominio real (tienda1.localhost o tienda1.midominio.com)
  else {
    const parts = host.split('.');
    // Si hay más de un punto (tienda1.localhost o tienda1.koda.com)
    if (parts.length > 1) {
      const firstPart = parts[0];
      if (firstPart !== 'localhost' && firstPart !== 'www') {
        subdomain = firstPart;
      }
    }
  }

  // Si no encontramos subdominio de ninguna forma, abortamos
  if (!subdomain) return null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  try {
    const res = await fetch(`${API_URL}/stores/public/${subdomain}`, { 
      next: { revalidate: 10 } 
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error connecting to API:", error);
    return null;
  }
}

export default async function StoreFront({ searchParams }: { searchParams: Promise<any> }) {
  
  // Pasamos los searchParams a la función de búsqueda
  const store = await getStoreData(searchParams);
  
  if (!store) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
        <h1 className="text-4xl font-black mb-4 uppercase italic">404 - Tienda No Encontrada</h1>
        <p className="text-slate-500 max-w-md">
          Asegúrate de estar accediendo desde el link correcto en tu panel de administración.
        </p>
      </div>
    );
  }

  const themeStyles = {
    '--primary': store.primaryColor || '#2563eb',
    '--background': store.secondaryColor || '#ffffff',
  } as React.CSSProperties;

  return (
    <div style={themeStyles} className="min-h-screen font-sans overflow-x-hidden">
      <main>
        {store.templateId === "default" && <GlowPro store={store} />}
        {store.templateId === "dark_minimal" && <UrbanDark store={store} />}
        {store.templateId === "premium_lifestyle" && <LifestylePremium store={store} />}
      </main>
    </div>
  );
}