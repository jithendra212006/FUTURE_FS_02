"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpEmail = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email: data.user.email,
          name: data.user.email?.split("@")[0] || "User",
        });
      }

      router.push("/shop");
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMsg(err.message);
      else setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const signUpGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/shop" },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-white/10 p-8 shadow-2xl">

        <h1 className="text-center text-4xl tracking-widest font-serif">NOIR</h1>
        <p className="text-center text-gray-400 mt-2 tracking-widest text-xs uppercase">
          Create Account
        </p>

        {errorMsg && <p className="text-red-400 text-sm text-center mt-4">{errorMsg}</p>}

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

        <button
          onClick={signUpEmail}
          disabled={loading}
          className="w-full mt-6 bg-white text-black py-3 uppercase tracking-widest text-sm hover:bg-gray-200 transition disabled:opacity-70"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div className="flex items-center gap-3 my-6">
          <span className="h-px bg-white/20 w-full"></span>
          <span className="text-xs text-gray-400 tracking-widest">OR</span>
          <span className="h-px bg-white/20 w-full"></span>
        </div>

        <button
          onClick={signUpGoogle}
          className="w-full border border-white py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/signin" className="underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
