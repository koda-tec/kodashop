"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Mail, Lock, LogIn } from "lucide-react";

// 1. Creamos un componente interno para el formulario
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccess("¡Cuenta creada! Ya puedes iniciar sesión.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("koda_token", data.access_token);
        localStorage.setItem("user_email", data.user.email);
        router.push("/dashboard");
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
  {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6 text-center font-medium">{error}</div>}
  {success && <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-3 rounded-xl mb-6 text-center font-medium">{success}</div>}

  <form onSubmit={handleLogin} className="space-y-5">
    {/* Input Correo */}
    {/* Input de Correo */}
<div className="relative flex items-center">
  <Mail 
    className="absolute left-4 text-slate-500 z-10 pointer-events-none" 
    size={20} 
  />
  <input 
    type="email" 
    placeholder="Correo electrónico" 
    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-4 pr-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium pl-14!" 
    required 
    onChange={e => setEmail(e.target.value)}
  />
</div>

{/* Input de Contraseña */}
<div className="relative flex items-center mt-5">
  <Lock 
    className="absolute left-4 text-slate-500 z-10 pointer-events-none" 
    size={20} 
  />
  <input 
    type="password" 
    placeholder="Contraseña" 
    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-4 pr-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium pl-14!"
    required 
    onChange={e => setPassword(e.target.value)}
  />
</div>


    <button 
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
    >
      {loading ? "VERIFICANDO..." : "INICIAR SESIÓN"} <LogIn size={20} />
    </button>
  </form>

  <div className="mt-8 pt-6 border-t border-slate-800 text-center">
    <p className="text-slate-500 text-sm font-medium">
      ¿Aún no tienes cuenta?{" "}
      <Link href="/register" className="text-blue-500 font-bold hover:underline">Regístrate gratis</Link>
    </p>
  </div>
</div>

  );
}

// 2. Página principal que envuelve al formulario en Suspense
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-100 h-100 bg-blue-600/10 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/30">
              <Rocket size={20} className="text-white" />
            </div>
            <span className="text-xl font-black text-white italic tracking-tighter">KODASHOP</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-slate-400 mt-2 font-medium">Ingresa tus credenciales para continuar.</p>
        </div>

        {/* 💡 AQUÍ ESTÁ EL FIX: Envolvemos el formulario en Suspense */}
        <Suspense fallback={<div className="text-center p-10 text-slate-500 font-bold animate-pulse">Cargando acceso...</div>}>
          <LoginForm />
        </Suspense>
      </motion.div>
    </div>
  );
}