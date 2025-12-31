"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const { data: auth } = await supabase.auth.getUser();

      // Not logged in → go to signin
      if (!auth.user) {
        router.push("/signin");
        return;
      }

      setUserEmail(auth.user.email ?? "");

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", auth.user.id)
        .single();

      if (data?.name) {
        setName(data.name);
      }

      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const saveProfile = async () => {
    try {
      setSaving(true);
      setMessage("");

      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;

      await supabase.from("profiles").upsert({
        id: auth.user.id,
        email: auth.user.email,
        name,
      });

      setMessage("Profile updated successfully ✔️");
    } catch {
      setMessage("Something went wrong ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-neutral-900 border border-white/10 p-8 shadow-2xl">

        <h1 className="text-center text-4xl tracking-widest font-serif">
          Profile
        </h1>

        <p className="text-center text-gray-400 tracking-widest text-xs uppercase mt-1">
          Manage Your Account
        </p>

        {/* EMAIL */}
        <div className="mt-8">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Email
          </label>
          <input
            disabled
            value={userEmail}
            className="w-full bg-neutral-800 border border-white/20 px-4 py-3 mt-1 outline-none text-sm opacity-70 cursor-not-allowed"
          />
        </div>

        {/* NAME */}
        <div className="mt-5">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Name
          </label>
          <input
            value={name}
            className="w-full bg-black border border-white/20 px-4 py-3 mt-1 outline-none text-sm"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="text-center mt-4 text-sm text-green-400">{message}</p>
        )}

        {/* SAVE BUTTON */}
        <button
          onClick={saveProfile}
          disabled={saving}
          className="w-full mt-6 bg-white text-black py-3 uppercase tracking-widest text-sm hover:bg-gray-200 transition disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {/* BACK */}
        <a
          href="/shop"
          className="block text-center text-gray-400 text-sm mt-6 underline"
        >
          Back to Shop
        </a>
      </div>
    </div>
  );
}
