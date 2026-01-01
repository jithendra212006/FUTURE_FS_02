"use client";
import { Bodoni_Moda } from "next/font/google";
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // simulate payment
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsComplete(true);

    // ---------- GET USER ----------
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      toast.error("You must be logged in to place an order");
      return;
    }

    // ---------- CREATE ORDER ----------
    const orderNumber = "ORD-" + Date.now();

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      order_number: orderNumber,
      status: "Processing",
      total: totalPrice,
      items: items,
    });

    if (error) {
      console.log(error);
      toast.error("Order failed");
      return;
    }

    clearCart();
    toast.success("Order placed successfully!");

    router.push("/orders");
  };

  // Empty Cart
  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-muted-foreground transition-fast"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Success Page
  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10" />
          </motion.div>

          <h1 className="font-display text-3xl md:text-4xl mb-4">
            Thank You
          </h1>

          <p className="text-muted-foreground mb-8">
            Redirecting to your orders...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-muted-foreground transition-fast mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className={`${bodoni.className} font-display text-3xl md:text-4xl mb-8`}>
              Checkout
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <div>
                <h2 className="text-xs uppercase tracking-widest mb-4">Contact</h2>
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full border border-border px-4 py-3 bg-background"
                />
              </div>

              {/* Shipping */}
              <div>
                <h2 className="text-xs uppercase tracking-widest mb-4">Shipping Address</h2>

                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="First name" className="border px-4 py-3"/>
                  <input required placeholder="Last name" className="border px-4 py-3"/>
                </div>

                <input required placeholder="Address"
                  className="w-full border px-4 py-3 mt-4"/>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <input required placeholder="City" className="border px-4 py-3"/>
                  <input required placeholder="State" className="border px-4 py-3"/>
                  <input required placeholder="ZIP" className="border px-4 py-3"/>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-xs uppercase tracking-widest mb-4">Payment</h2>

                <input required placeholder="Card number"
                  className="w-full border px-4 py-3"/>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input required placeholder="MM / YY" className="border px-4 py-3"/>
                  <input required placeholder="CVC" className="border px-4 py-3"/>
                </div>
              </div>

              {/* PAY BUTTON */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-black/90 disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <Loader/>
                    Processing...
                  </>
                ) : (
                  `Pay $${totalPrice.toFixed(2)}`
                )}
              </button>
            </form>
          </motion.div>

          {/* RIGHT SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary p-8"
          >
            <h2 className="font-display text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-background relative overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs uppercase text-muted-foreground">{item.category}</p>
                    <h3 className="font-display">{item.name}</h3>
                    <p className="text-sm mt-1">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between text-lg pt-2 border-t">
                <span>Total</span>
                <span className="font-display">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
