"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/store/Sidebar";
import ProductSection from "@/components/store/ProductSection";
import CategorySection from "@/components/store/CategorySection";
import AttributeSection from "@/components/store/AttributeSection";
import AppearanceSection from "@/components/store/AppearanceSection";

export default function StoreDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [activeTab, setActiveTab] = useState("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Datos del sistema
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => { 
    if (id) fetchData(); 
  }, [id]);

  const fetchData = async () => {
    const token = localStorage.getItem("koda_token");
    try {
      const [resP, resC, resA] = await Promise.all([
        fetch(`${API_URL}/products/${id}`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_URL}/categories/${id}`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_URL}/variant-types/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
      ]);
      
      const dataP = await resP.json();
      const dataC = await resC.json();
      const dataA = await resA.json();

      setProducts(Array.isArray(dataP) ? dataP : []);
      setCategories(Array.isArray(dataC) ? dataC : []);
      setAttributes(Array.isArray(dataA) ? dataA : []);
    } catch (e) {
      console.error("Error al cargar datos:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black italic">CARGANDO ECOSISTEMA...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row relative font-sans">
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <main className="flex-1 p-6 md:p-16 overflow-x-hidden pt-20 md:pt-16">
        <AnimatePresence mode="wait">
          {activeTab === "products" && (
            <motion.div key="products" initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} exit={{opacity:0}}>
              <ProductSection 
                storeId={id} 
                products={products} 
                categories={categories} 
                attributes={attributes}
                onRefresh={fetchData} 
              />
            </motion.div>
          )}

          {activeTab === "categories" && (
            <motion.div key="categories" initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}}>
              <CategorySection storeId={id} categories={categories} onRefresh={fetchData} />
            </motion.div>
          )}

          {activeTab === "attributes" && (
            <motion.div key="attributes" initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}}>
              <AttributeSection storeId={id} attributes={attributes} onRefresh={fetchData} />
            </motion.div>
          )}

          {activeTab === "appearance" && (
            <motion.div key="appearance" initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}}>
              <AppearanceSection storeId={id} />
            </motion.div>
          )}
          {activeTab === "marketing" && <div key="mark" className="py-20 text-center text-slate-500 font-bold uppercase italic">Módulo de Meta Ads próximamente</div>}
        </AnimatePresence>
      </main>
    </div>
  );
}