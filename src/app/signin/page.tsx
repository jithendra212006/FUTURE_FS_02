"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const signInEmail = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/shop");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/shop",
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-white/10 p-8 shadow-2xl">

        {/* Logo */}
        <h1 className="text-center text-4xl tracking-widest font-serif">NOIR</h1>
        <p className="text-center text-gray-400 mt-2 tracking-widest text-xs uppercase">
          Sign In
        </p>

        {/* Error */}
        {errorMsg && (
          <p className="text-red-400 text-sm text-center mt-4">{errorMsg}</p>
        )}

        {/* Email */}
        <div className="mt-6">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Email
          </label>
          <input
            type="email"
            className="w-full bg-black border border-white/20 px-4 py-3 mt-1 outline-none text-sm"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Password
          </label>
          <input
            type="password"
            className="w-full bg-black border border-white/20 px-4 py-3 mt-1 outline-none text-sm"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={signInEmail}
          disabled={loading}
          className="w-full mt-6 bg-white text-black py-3 uppercase tracking-widest text-sm hover:bg-gray-200 transition disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <span className="h-px bg-white/20 w-full"></span>
          <span className="text-xs text-gray-400 tracking-widest">OR</span>
          <span className="h-px bg-white/20 w-full"></span>
        </div>

        {/* Google */}
        <button
          onClick={signInWithGoogle}
          className="w-full border border-white py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition"
        >
          Continue With Google
        </button>

        {/* Bottom */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
