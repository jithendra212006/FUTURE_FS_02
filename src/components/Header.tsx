"use client";

import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);

      if (data?.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email: data.user.email,
          name: data.user.email?.split("@")[0] || "User",
        });
      }
    };

    syncUser();

    // Auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      // redirect when signed out (backup)
      if (event === "SIGNED_OUT") {
        window.location.replace("/");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✅ Reliable logout with slight delay
  const handleLogout = async () => {
    await supabase.auth.signOut();

    setTimeout(() => {
      window.location.replace("/");
    }, 300);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setOpenMenu(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/shop"
          className={`${playfair.className} text-2xl font-semibold tracking-tight`}
        >
          NOIR
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-10 tracking-widest uppercase text-sm">
          <Link href="/shop" className="hover:text-gray-500">Shop</Link>
          <Link href="#collections" className="hover:text-gray-500">Collection</Link>
          <Link href="#" className="hover:text-gray-500">About</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          
          {/* Cart - logged in */}
          {user && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-200 rounded transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          )}

          {/* Guest */}
          {!user && (
            <Link
              href="/signin"
              className="px-6 py-2 text-sm uppercase tracking-widest border border-black hover:bg-black hover:text-white transition"
            >
              Sign In
            </Link>
          )}

          {/* Logged In */}
          {user && (
            <div className="relative">
              
              {/* Avatar */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu((prev) => !prev);
                }}
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm uppercase"
              >
                {user.email?.charAt(0)}
              </button>

              {/* Dropdown */}
              {openMenu && (
                <div className="absolute right-0 mt-3 bg-white shadow-xl border border-gray-200 w-52 animate-fadein">
                  
                  <div className="px-4 py-3 text-sm border-b">
                    <p className="font-semibold">Account</p>
                    <p className="text-gray-500 truncate">{user.email}</p>
                  </div>

                  <div className="flex flex-col text-sm">
                    <button 
                      className="px-4 py-3 text-left hover:bg-gray-100"
                      onClick={() => (window.location.href = "/orders")}
                    >
                      My Orders
                    </button>

                    <button
                      className="px-4 py-3 text-left hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
