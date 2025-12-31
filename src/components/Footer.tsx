import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"], // choose what you need
});
export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <h3 className={`${playfair.className} text-2xl mb-6`}>NOIR</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Timeless pieces crafted with intention.  
              Modern design meets enduring quality.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer transition">New Arrivals</li>
              <li className="hover:text-white cursor-pointer transition">Bestsellers</li>
              <li className="hover:text-white cursor-pointer transition">Sale</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6">Help</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer transition">Contact</li>
              <li className="hover:text-white cursor-pointer transition">Shipping</li>
              <li className="hover:text-white cursor-pointer transition">Returns</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-white/40 px-4 py-3 text-sm outline-none focus:border-white placeholder:text-white/50"
              />
              <button className="bg-white text-black px-6 py-3 text-xs uppercase tracking-widest hover:bg-white/90 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/60">
            © 2025 NOIR. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-white/60">
            <span className="hover:text-white cursor-pointer transition">Privacy</span>
            <span className="hover:text-white cursor-pointer transition">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
