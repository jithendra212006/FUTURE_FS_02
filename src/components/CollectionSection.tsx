"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const collections = [
  {
    id: 1,
    title: "Tailored Elegance",
    subtitle: "The Blazer Edit",
    image: "/collection-1.jpg",
    category: "Outerwear",
  },
  {
    id: 2,
    title: "Flowing Forms",
    subtitle: "Wide Leg Collection",
    image: "/collection-2.jpg",
    category: "Bottoms",
  },
  {
    id: 3,
    title: "Curated Accessories",
    subtitle: "Leather Essentials",
    image: "/collection-3.jpg",
    category: "Accessories",
  },
];

export default function CollectionSection() {
  return (
    <section id="collections" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`${playfair.className} text-4xl md:text-5xl mb-4`}>
            The Collections
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Explore our carefully curated seasonal collections
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/shop?category=${collection.category}`}
                className="group relative block overflow-hidden aspect-[3/4]"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
                  <p className="text-xs uppercase tracking-[0.2em] text-white mb-2 opacity-80">
                    {collection.subtitle}
                  </p>
                  <h3 className={`${playfair.className} text-2xl md:text-3xl font-semibold text-white leading-tight`}>
                    {collection.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
