"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/store/Sidebar"; // Ajusta el alias si es necesario
import ProductSection from "@/components/store/ProductSection";
import { AnimatePresence, motion } from "framer-motion";

export default function StoreDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => { if (id) fetchData(); }, [id]);

  const fetchData = async () => {
    const token = localStorage.getItem("koda_token");
    const [resP, resC] = await Promise.all([
      fetch(`${API_URL}/products/${id}`, { headers: { "Authorization": `Bearer ${token}` } }),
      fetch(`${API_URL}/categories/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
    ]);
    setProducts(await resP.json());
    setCategories(await resC.json());
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row relative">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <main className="flex-1 p-6 md:p-16 overflow-x-hidden bg-[radial-gradient(circle_at_top_right,#1e293b_0%,transparent_40%)]">
        <AnimatePresence mode="wait">
          {activeTab === "products" && (
            <motion.div key="products" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <ProductSection 
                storeId={id} 
                products={products} 
                categories={categories} 
                onRefresh={fetchData} 
              />
            </motion.div>
          )}

          {/* Aquí irían CategorySection, AttributeSection, etc. */}
          {activeTab === "categories" && <div key="cat" className="text-center py-20">Próximamente: Componente Categorías</div>}
          {activeTab === "attributes" && <div key="att" className="text-center py-20">Próximamente: Componente Atributos</div>}
        </AnimatePresence>
      </main>
    </div>
  );
}