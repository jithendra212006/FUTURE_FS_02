"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Email Password Sign In
  const signInEmail = async () => {
    try {
      setLoading(true);
      setError("");

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push("/shop");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/shop",
      },
    });
  };

  return (
    <div className="w-full max-w-md">

      {/* Error */}
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {/* Email */}
      <input
        type="email"
        className="w-full bg-black border border-white/40 px-4 py-3 text-sm outline-none"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        className="w-full bg-black border border-white/40 px-4 py-3 text-sm outline-none mt-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Email Login Button */}
      <button
        onClick={signInEmail}
        disabled={loading}
        className="w-full mt-5 bg-white text-black py-3 uppercase tracking-widest text-sm hover:bg-gray-200 transition disabled:opacity-60"
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
        Continue with Google
      </button>

      {/* Signup Link */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Don’t have an account?{" "}
        <a href="/signup" className="underline">
          Create one
        </a>
      </p>
    </div>
  );
}
