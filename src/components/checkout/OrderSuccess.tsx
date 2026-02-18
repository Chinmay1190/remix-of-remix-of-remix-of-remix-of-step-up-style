import { motion } from "framer-motion";
import { Check, Package, Truck, MapPin, CreditCard, Calendar, ArrowRight, Download, Share2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useEffect } from "react";

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

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      card: "Credit/Debit Card",
      upi: "UPI",
      netbanking: "Net Banking",
      cod: "Cash on Delivery",
    };
    return labels[method] || method;
  };

  return (
    <main className="pt-24 pb-16 section-padding min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
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
              <Check className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-display text-4xl font-bold mb-3"
          >
            Order Confirmed! 🎉
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg"
          >
            Thank you for your purchase. Your order has been placed successfully.
          </motion.p>
        </motion.div>

        {/* Order ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-2xl bg-primary/10 border border-primary/20 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-xl font-bold">{orderDetails.orderId}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Invoice
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-border -z-10" />
            <div className="absolute left-0 right-2/3 top-1/2 h-1 bg-green-500 -z-10" />
            
            {[
              { icon: Check, label: "Confirmed", active: true, completed: true },
              { icon: Package, label: "Processing", active: true, completed: false },
              { icon: Truck, label: "Shipped", active: false, completed: false },
              { icon: MapPin, label: "Delivered", active: false, completed: false },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-green-500 text-white"
                      : step.active
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-2 text-muted-foreground">{step.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Delivery Address */}
          <div className="p-6 rounded-2xl bg-secondary border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold">Delivery Address</h3>
            </div>
            <p className="text-muted-foreground">
              {orderDetails.shippingAddress.street}<br />
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}<br />
              {orderDetails.shippingAddress.zip}, India
            </p>
          </div>

          {/* Payment Info */}
          <div className="p-6 rounded-2xl bg-secondary border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold">Payment Method</h3>
            </div>
            <p className="text-muted-foreground">
              {getPaymentMethodLabel(orderDetails.paymentMethod)}
            </p>
            <p className="text-lg font-bold mt-2">{formatPrice(orderDetails.total)}</p>
          </div>
        </motion.div>

        {/* Estimated Delivery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="font-display text-xl font-bold">{orderDetails.estimatedDelivery}</p>
            </div>
          </div>
        </motion.div>

        {/* Order Items & Price Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="p-6 rounded-2xl bg-secondary border border-border mb-8"
        >
          <h3 className="font-display font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {orderDetails.items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                  </p>
                  <p className="font-semibold mt-1">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="mt-6 pt-6 border-t border-border space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(orderDetails.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>GST (18%)</span>
              <span>{formatPrice(orderDetails.gst)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>{orderDetails.shipping > 0 ? formatPrice(orderDetails.shipping) : <span className="text-green-500 font-medium">Free</span>}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-border font-display font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(orderDetails.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate("/")}
            className="gap-2 px-8 py-6 rounded-full font-display font-semibold"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          {isLoggedIn && (
            <Button
              variant="outline"
              asChild
              className="px-8 py-6 rounded-full font-display font-semibold"
            >
              <Link to="/orders">View All Orders</Link>
            </Button>
          )}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center mt-12 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground">
            Need help with your order?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default OrderSuccess;
