"use client";
import { Bodoni_Moda } from "next/font/google";
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-secondary">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-fashion.jpg"
          alt="Fashion editorial"
          fill
          priority
          className="object-cover opacity-90"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm uppercase tracking-[0.3em] mb-6 text-black/80"
        >
          New Collection 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${bodoni.className} text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8`}
>
          Timeless
          <br />
          Elegance
        </motion.h1>

        <motion.button
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  onClick={() => {
    const section = document.getElementById("featured");
    section?.scrollIntoView({ behavior: "smooth" });
  }}
  className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-black/90 transition"
>
  Shop Now
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</motion.button>

      </div>
    </section>
  );
}
