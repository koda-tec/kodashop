import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Script from 'next/script';
import React from "react";

// Importamos los componentes de los templates
import GlowPro from "@/components/templates/GlowPro";
import UrbanDark from "@/components/templates/UrbanDark";
import LifestylePremium from "@/components/templates/LifestylePremium";

// 1. Función para obtener los datos de la tienda
async function getStoreData(searchParams: any) {
  try {
    const headerList = await headers();
    const host = headerList.get("host") || "";
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

// 2. Componente Principal
export default async function StoreFront({ searchParams }: { searchParams: Promise<any> }) {
  const store = await getStoreData(searchParams);
  
  // Si la tienda no existe, redirigimos a la landing principal
  if (!store) {
    redirect("https://kodashop.vercel.app");
  }

  // Definimos los estilos dinámicos (esto corrige el error de "themeStyles")
  const themeStyles = {
    '--primary': store.primaryColor || '#2563eb',
    '--secondary': store.secondaryColor || '#020617',
    '--background': store.secondaryColor || '#000000',
  } as React.CSSProperties;

  return (
    <>
      {/* 🎯 TRACKING: FACEBOOK PIXEL */}
      {store.pixelId && (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${store.pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img height="1" width="1" style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${store.pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* 🔍 META VERIFICATION */}
      {store.metaVerification && (
        <head>
          <meta name="facebook-domain-verification" content={store.metaVerification} />
        </head>
      )}

      {/* 📊 GOOGLE ANALYTICS */}
      {store.googleAnalyticsId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${store.googleAnalyticsId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${store.googleAnalyticsId}');
            `}
          </Script>
        </>
      )}

      {/* 📟 CUSTOM SCRIPTS */}
      {store.customHeadScripts && (
        <div dangerouslySetInnerHTML={{ __html: store.customHeadScripts }} />
      )}

      {/* 🎨 RENDER DE LA TIENDA */}
      <div style={themeStyles} className="min-h-screen font-sans overflow-x-hidden bg-black">
        <main>
          {store.templateId === "default" && <GlowPro store={store} />}
          {store.templateId === "dark_minimal" && <UrbanDark store={store} />}
          {store.templateId === "premium_lifestyle" && <LifestylePremium store={store} />}
        </main>
      </div>
    </>
  );
}