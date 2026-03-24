"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Mail, Lock, LogIn } from "lucide-react";

// 1. Componente del Formulario (Separado para manejar el Suspense)
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Detectar si venimos de un registro exitoso
  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccess("¡Cuenta creada con éxito! Ya puedes ingresar.");
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
        // Guardar sesión
        localStorage.setItem("koda_token", data.access_token);
        localStorage.setItem("user_email", data.user.email);
        router.push("/dashboard");
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative z-10">
      {/* Alertas de error o éxito */}
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6 text-center font-bold">
          {error}
        </motion.div>
      )}
      {success && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-3 rounded-xl mb-6 text-center font-bold">
          {success}
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email Input */}
        <div className="relative flex items-center">
          <Mail className="absolute left-5 text-slate-500 z-20 pointer-events-none" size={18} />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="w-full bg-slate-950 border border-slate-800 pl-14 pr-4 py-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium placeholder:text-slate-600"
            required 
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="relative flex items-center">
          <Lock className="absolute left-5 text-slate-500 z-20 pointer-events-none" size={18} />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full bg-slate-950 border border-slate-800 pl-14 pr-4 py-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium placeholder:text-slate-600"
            required 
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] cursor-pointer"
        >
          {loading ? "VERIFICANDO..." : "INICIAR SESIÓN"} <LogIn size={20} />
        </button>
      </form>

      {/* Footer del Formulario */}
      <div className="mt-8 pt-6 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm font-medium">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/register" className="text-blue-500 font-bold hover:underline transition-all">Regístrate gratis</Link>
        </p>
      </div>
    </div>
  );
}

// 2. Componente Principal (Página de Login)
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Decoración de fondo (Glows) */}
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo y Encabezado */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/30">
              <Rocket size={24} className="text-white fill-white/10" />
            </div>
            <span className="text-2xl font-black text-white italic tracking-tighter uppercase">KODASHOP</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight leading-none">Bienvenido</h1>
          <p className="text-slate-400 mt-3 font-medium">Ingresa al centro de mando.</p>
        </div>

        {/* 🛠️ FIX DE VERCEL: Envoltura en Suspense */}
        <Suspense fallback={
          <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-[2.5rem] text-center text-slate-500 font-bold animate-pulse">
            Preparando acceso...
          </div>
        }>
          <LoginForm />
        </Suspense>
      </motion.div>
    </div>
  );
}