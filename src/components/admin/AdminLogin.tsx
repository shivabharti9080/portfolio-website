"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("shivaharti9080@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        router.refresh();
      } else {
        setError(json.error || "Invalid administrative credentials");
      }
    } catch (err: any) {
      setError("Network or server authentication error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      {/* Ambient glow */}
      <div className="absolute w-96 h-96 ambient-glow-yellow rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border-white/10 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#F4B400]/10 border border-[#F4B400]/30 flex items-center justify-center text-[#F4B400] mb-4">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Restricted access for Shiva Bharti portfolio administration
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-6 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
              />
            </div>
            <p className="text-[10px] font-mono text-zinc-400 mt-1.5">
              Default development seed: AdminSecurePassword2026!
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#080808] bg-[#F4B400] hover:bg-[#FFF4D6] shadow-[0_0_15px_rgba(244,180,0,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span>Verifying Session...</span> : <><span>Authenticate</span><ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
};
