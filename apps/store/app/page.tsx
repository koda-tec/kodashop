import { headers } from "next/headers";
import { redirect } from "next/navigation"; // Importamos redirección
import GlowPro from "@/components/templates/GlowPro";
import UrbanDark from "@/components/templates/UrbanDark";
import LifestylePremium from "@/components/templates/LifestylePremium";

async function getStoreData(searchParams: any) {
  try {
    const headerList = await headers();
    const host = headerList.get("host") || "";
    
    // IMPORTANTE: En Next.js 15 searchParams debe ser esperado si es una promesa
    const params = await searchParams;
    const sParam = params?.s; 

    let subdomain = null;

    if (sParam) {
      subdomain = sParam;
    } else {
      const parts = host.split('.');
      if (parts.length > 2 && !host.includes('localhost')) {
        subdomain = parts[0];
      } else if (host.includes('localhost') && parts.length > 1) {
        subdomain = parts[0];
      }
    }

    if (!subdomain || subdomain === 'www') return null;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    const res = await fetch(`${API_URL}/stores/public/${subdomain}`, { 
      next: { revalidate: 10 } 
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function StoreFront({ searchParams }: { searchParams: Promise<any> }) {
  const store = await getStoreData(searchParams);
  
  // 💡 MEJORA: Si no hay tienda, redirigir a la web principal de KodaShop
  if (!store) {
    // Aquí podrías poner la URL de tu app de ADMIN (que es tu Landing)
    // O simplemente mostrar una página de "Crea tu tienda"
    redirect("https://kodashop.vercel.app"); // Cambia por tu URL de admin real
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