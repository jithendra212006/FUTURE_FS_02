"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b">
              <h2 className="text-xl font-medium tracking-wide">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Empty */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                <ShoppingBag className="w-16 h-16 stroke-[1]" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-5">
                      
                      {/* Image */}
                      <div className="w-24 h-28 overflow-hidden border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="uppercase text-xs tracking-widest text-gray-500">
                            {item.category}
                          </p>
                          <p className="text-[17px] font-medium">
                            {item.name}
                          </p>
                          <p className="text-sm mt-1">${item.price}</p>
                        </div>

                        {/* Controls Row */}
                        <div className="flex items-center justify-between">
                          {/* Quantity Box */}
                          <div className="flex items-center border px-3 py-2 gap-3">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="w-3 h-3" />
                            </button>

                            <span className="text-sm">{item.quantity}</span>

                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="uppercase text-xs tracking-widest text-gray-500 hover:text-black"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t px-8 py-6 space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-gray-500">
                    Shipping and taxes calculated at checkout
                  </p>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-4 tracking-widest uppercase hover:bg-black/90"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
