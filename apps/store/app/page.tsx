import { headers } from "next/headers";
import GlowPro from "@/components/templates/GlowPro";
import UrbanDark from "@/components/templates/UrbanDark";
import LifestylePremium from "@/components/templates/LifestylePremium";

async function getStoreData() {
  const headerList = await headers(); 
  const host = headerList.get("host") || "";
  const parts = host.split('.');
  const subdomain = parts[0];
  if (!subdomain || subdomain === 'localhost' || subdomain === 'www') return null;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${API_URL}/stores/public/${subdomain}`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) { return null; }
}

export default async function StoreFront() {
  const store = await getStoreData();
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