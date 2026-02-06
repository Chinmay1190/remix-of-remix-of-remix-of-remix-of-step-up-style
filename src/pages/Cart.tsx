import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/currency";
import { useState } from "react";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SOLE20") {
      setDiscount(20);
      toast.success("Coupon applied! 20% off");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const discountedTotal = totalPrice * (1 - discount / 100);
  const shipping = totalPrice > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-16 section-padding min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="font-display text-3xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider rounded-full"
          >
            Start Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-5xl mx-auto">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-bold tracking-tight mb-8">
          Shopping Cart ({items.length})
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-4 rounded-2xl bg-secondary"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                  <p className="font-display font-bold mt-2">{formatPrice(item.price)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id, item.size)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center bg-background rounded-full">
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="p-2">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="p-2">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-secondary h-fit space-y-4">
            <h3 className="font-display font-semibold">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-primary"><span>Discount ({discount}%)</span><span>-{formatPrice(totalPrice * discount / 100)}</span></div>
              )}
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            </div>
            <div className="border-t border-border pt-4 flex justify-between font-display font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(discountedTotal + shipping)}</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full bg-background text-sm border border-border outline-none focus:border-primary transition-colors"
              />
              <button onClick={applyCoupon} className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium">Apply</button>
            </div>

            <Link
              to="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider rounded-full btn-primary-glow hover:scale-[1.02] transition-transform"
            >
              Proceed to Checkout
            </Link>
            <p className="text-xs text-center text-muted-foreground">Try code: SOLE20</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
