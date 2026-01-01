"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
  category?: string;
};

type Order = {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  items: OrderItem[];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-500/10 text-green-600";
    case "Shipped":
      return "bg-blue-500/10 text-blue-600";
    default:
      return "bg-amber-500/10 text-amber-600";
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setOrders((ordersData as Order[]) || []);
      setLoading(false);
    };

    loadOrders();
  }, []);

  return (
    <>
      <Header />
      <CartDrawer />

      <main className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* ---- Page Heading ---- */}
          <h1 className={`${playfair.className} text-3xl sm:text-4xl font-bold mb-2`}>
            My Orders
          </h1>
          <p className="text-gray-500 mb-10">
            Track and manage your purchases
          </p>

          {/* ---- Loading ---- */}
          {loading && (
            <div className="text-center py-20 text-gray-500">
              Loading your orders...
            </div>
          )}

          {/* ---- No Orders ---- */}
          {!loading && orders.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              You have no orders yet.
            </div>
          )}

          {/* ---- Orders List ---- */}
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-300 bg-white p-5 sm:p-8 md:p-10"
              >
                {/* Top Row */}
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">
                        {order.order_number}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm mt-1">
                      Ordered on{" "}
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="text-left md:text-right mt-4 md:mt-0">
                    <p className="text-xl font-semibold">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {order.items.length} item(s)
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t my-4" />

                {/* Items */}
                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500 text-sm">
                          {item.category || "Item"} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom Divider */}
                <div className="border-t mt-4 pt-4 flex justify-end">
                  <button className="text-black text-sm hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
