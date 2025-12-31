"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-7xl font-serif tracking-widest"
        >
          NOIR
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-gray-300 tracking-wide max-w-xl mx-auto leading-relaxed"
        >
          Timeless elegance crafted for those who appreciate sophistication,
          minimalism and unapologetic luxury.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex gap-6 justify-center"
        >
          <Link
            href="/signin"
            className="px-10 py-4 bg-white text-black uppercase tracking-widest text-sm hover:bg-gray-200 transition"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="px-10 py-4 border border-white uppercase tracking-widest text-sm hover:bg-white hover:text-black transition"
          >
            Sign Up
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-xs tracking-[0.3em] text-gray-400 uppercase"
        >
          Est. 2025 — Designed For Refined Tastes
        </motion.p>

      </div>
    </div>
  );
}
