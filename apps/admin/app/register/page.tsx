"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError("Las contraseñas no coinciden");
    if (form.password.length < 8) return setError("Mínimo 8 caracteres");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });

    if (res.ok) router.push("/login?registered=true");
    else {
      const data = await res.json();
      setError(data.message || "Error al registrarse");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-black mb-2">Únete a KodaShop</h2>
        <p className="text-gray-400 mb-8">Comienza a validar tus productos hoy.</p>

        {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-6 border border-red-500/20 text-sm font-medium">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="email" placeholder="Correo electrónico" 
            className="w-full" required 
            onChange={e => setForm({...form, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Contraseña (mín. 8 caracteres)" 
            className="w-full" required 
            onChange={e => setForm({...form, password: e.target.value})}
          />
          <input 
            type="password" placeholder="Confirmar contraseña" 
            className="w-full" required 
            onChange={e => setForm({...form, confirmPassword: e.target.value})}
          />
          <button className="w-full bg-blue-600 py-3 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            Crear cuenta
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          ¿Ya tienes cuenta? <Link href="/login" className="text-blue-500 font-bold hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}