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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-[#E2E8F0] shadow-sm relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF4FA] border border-[#CBD5E1]/60 flex items-center justify-center text-[#1E3A5F] mb-4 shadow-xs">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#242424]">Admin Dashboard</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Restricted access for Shiva Bharti portfolio administration
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-6 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-2.5 text-xs text-[#991B1B]">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#242424] mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl premium-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#242424] mb-2">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl premium-input text-sm"
              />
            </div>
            <p className="text-[11px] text-[#94A3B8] mt-1.5">
              Default development seed: AdminSecurePassword2026!
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-[#1E3A5F] hover:bg-[#162C48] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span>Verifying Session...</span> : <><span>Authenticate</span><ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
};
