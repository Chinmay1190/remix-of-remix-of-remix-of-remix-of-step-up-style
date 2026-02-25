import { motion } from "framer-motion";
import { Check, Package, Truck, MapPin, CreditCard, Calendar, ArrowRight, Download, Share2, ShoppingBag, Receipt } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

interface OrderDetails {
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    image: string;
    size: number;
    color: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  estimatedDelivery: string;
}

interface OrderSuccessProps {
  orderDetails: OrderDetails;
  isLoggedIn: boolean;
}

const OrderSuccess = ({ orderDetails, isLoggedIn }: OrderSuccessProps) => {
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min: number, max: number) { return Math.random() * (max - min) + min; }
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = { card: "Credit/Debit Card", upi: "UPI", netbanking: "Net Banking", cod: "Cash on Delivery" };
    return labels[method] || method;
  };

  const cgst = Math.round(orderDetails.gst / 2);
  const sgst = orderDetails.gst - cgst;

  return (
    <main className="pt-24 pb-16 section-padding min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-primary-foreground" />
            </motion.div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-display text-4xl font-bold mb-3">
            Order Confirmed! 🎉
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-muted-foreground text-lg">
            Thank you for your purchase.
          </motion.p>
        </motion.div>

        {/* Order Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-border -z-10" />
            <div className="absolute left-0 right-[66%] top-1/2 h-1 bg-green-500 -z-10" />
            {[
              { icon: Check, label: "Confirmed", active: true, completed: true },
              { icon: Package, label: "Processing", active: true, completed: false },
              { icon: Truck, label: "Shipped", active: false, completed: false },
              { icon: MapPin, label: "Delivered", active: false, completed: false },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  step.completed ? "bg-green-500 text-primary-foreground shadow-lg" : step.active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-2 text-muted-foreground font-medium">{step.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ========== INVOICE ========== */}
        <motion.div
          ref={invoiceRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-3xl overflow-hidden border border-border/50 mb-8"
        >
          {/* Invoice Header */}
          <div className="bg-gradient-to-r from-foreground to-foreground/90 text-background p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--primary)/0.2),transparent_50%)]" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">SOLEMATE</h2>
                  <p className="text-background/50 text-xs">TAX INVOICE</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-background/50 text-xs uppercase tracking-wider">Order ID</p>
                <p className="font-mono text-lg font-bold">{orderDetails.orderId}</p>
                <p className="text-background/50 text-xs mt-1">{new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="bg-card p-8">
            {/* Address & Payment Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Ship To</p>
                </div>
                <p className="text-sm font-medium">{orderDetails.shippingAddress.street}</p>
                <p className="text-sm text-muted-foreground">{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}</p>
                <p className="text-sm text-muted-foreground">{orderDetails.shippingAddress.zip}, India</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Payment</p>
                </div>
                <p className="text-sm font-medium">{getPaymentMethodLabel(orderDetails.paymentMethod)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Est. Delivery</p>
                </div>
                <p className="text-sm font-medium mt-1">{orderDetails.estimatedDelivery}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="w-4 h-4 text-primary" />
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Items Ordered</p>
              </div>
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 rounded-xl bg-secondary/50 border border-border/30">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-display font-bold text-sm whitespace-nowrap self-center">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(orderDetails.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CGST (9%)</span>
                  <span className="font-medium">{formatPrice(cgst)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">SGST (9%)</span>
                  <span className="font-medium">{formatPrice(sgst)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{orderDetails.shipping > 0 ? formatPrice(orderDetails.shipping) : <span className="text-green-500 font-semibold">FREE</span>}</span>
                </div>
                <div className="border-t border-primary/20 pt-3 mt-1">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-lg font-bold">Grand Total</span>
                    <span className="font-display text-2xl font-bold text-gradient">{formatPrice(orderDetails.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Footer */}
            <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground text-center sm:text-left">
                This is a computer-generated invoice. For queries, contact{" "}
                <a href="mailto:support@solemate.com" className="text-primary hover:underline">support@solemate.com</a>
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 rounded-full">
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
                <Button variant="outline" size="sm" className="gap-2 rounded-full">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button onClick={() => navigate("/")} className="gap-2 px-8 py-6 rounded-full font-display font-semibold btn-primary-glow">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Button>
          {isLoggedIn && (
            <Button variant="outline" asChild className="px-8 py-6 rounded-full font-display font-semibold">
              <Link to="/orders">View All Orders</Link>
            </Button>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-center mt-10 pt-6 border-t border-border">
          <p className="text-muted-foreground text-sm">
            Need help? <Link to="/contact" className="text-primary hover:underline font-medium">Contact Support</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default OrderSuccess;
