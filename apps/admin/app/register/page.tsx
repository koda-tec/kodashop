"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (form.password !== form.confirmPassword) return setError("Las contraseñas no coinciden");
    if (form.password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        setError(data.message || "Error al crear la cuenta");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Luces de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-100 h-100 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-indigo-600/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Rocket size={20} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">KODASHOP</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">Crea tu cuenta</h1>
          <p className="text-slate-400 mt-2 font-medium">Empieza a validar tus productos hoy mismo.</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6 text-center font-medium">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="relative">
              <input 
                type="email" placeholder="Correo electrónico" 
                className="w-full bg-slate-950 border-slate-800 pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required onChange={e => setForm({...form, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <input 
                type="password" placeholder="Contraseña (mín. 8 caracteres)" 
                className="w-full bg-slate-950 border-slate-800 pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required onChange={e => setForm({...form, password: e.target.value})}
              />
            </div>

            <div className="relative">
              <input 
                type="password" placeholder="Confirmar contraseña" 
                className="w-full bg-slate-950 border-slate-800 pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required onChange={e => setForm({...form, confirmPassword: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "CREANDO CUENTA..." : "REGISTRARME AHORA"} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm font-medium">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-blue-500 font-bold hover:underline">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}