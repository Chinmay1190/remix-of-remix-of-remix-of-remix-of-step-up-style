import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/currency";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import CheckoutFormInfo from "@/components/checkout/CheckoutFormInfo";
import CheckoutFormShipping from "@/components/checkout/CheckoutFormShipping";
import CheckoutFormPayment from "@/components/checkout/CheckoutFormPayment";
import OrderSuccess from "@/components/checkout/OrderSuccess";

type PaymentMethod = "card" | "upi" | "netbanking" | "cod";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    items: typeof items;
    total: number;
    paymentMethod: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    estimatedDelivery: string;
  } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
    upiId: "",
    bank: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.error("Please fill in all required fields");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return false;
      }
      if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
        toast.error("Please enter a valid phone number");
        return false;
      }
    }
    if (currentStep === 2) {
      if (!formData.street || !formData.city || !formData.state || !formData.zip) {
        toast.error("Please fill in all address fields");
        return false;
      }
      if (!/^\d{6}$/.test(formData.zip)) {
        toast.error("Please enter a valid 6-digit PIN code");
        return false;
      }
    }
    return true;
  };

  const validatePayment = (): boolean => {
    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.expiry || !formData.cvv || !formData.cardName) {
        toast.error("Please fill in all card details");
        return false;
      }
      if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Please enter a valid 16-digit card number");
        return false;
      }
    }
    if (paymentMethod === "upi") {
      if (!formData.upiId || !formData.upiId.includes("@")) {
        toast.error("Please enter a valid UPI ID");
        return false;
      }
    }
    if (paymentMethod === "netbanking") {
      if (!formData.bank) {
        toast.error("Please select a bank");
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const generateOrderId = () => {
    const prefix = "SH";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryStart = new Date(today);
    deliveryStart.setDate(today.getDate() + 3);
    const deliveryEnd = new Date(today);
    deliveryEnd.setDate(today.getDate() + 5);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };
    
    return `${formatDate(deliveryStart)} - ${formatDate(deliveryEnd)}`;
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) return;
    
    setLoading(true);
    const orderId = generateOrderId();
    const finalTotal = totalPrice + (totalPrice > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST);

    try {
      if (user) {
        // Create order in database
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            user_id: user.id,
            status: "pending",
            total: finalTotal,
            shipping_address: {
              street: formData.street,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country,
            },
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // Create order items
        const orderItems = items.map((item) => ({
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          product_image: item.image,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) throw itemsError;
      }

      // Set order details for success page
      setOrderDetails({
        orderId,
        items: [...items],
        total: finalTotal,
        paymentMethod,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        estimatedDelivery: getEstimatedDelivery(),
      });

      setOrderPlaced(true);
      clearCart();
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced && orderDetails) {
    return <OrderSuccess orderDetails={orderDetails} isLoggedIn={!!user} />;
  }

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-16 section-padding min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/products" className="text-primary hover:underline">
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-8">Checkout</h1>

        {!user && (
          <div className="mb-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm">
              <Link to="/auth" className="text-primary font-medium hover:underline">
                Sign in
              </Link>{" "}
              to save your order history and track your orders.
            </p>
          </div>
        )}

        <CheckoutSteps currentStep={step} />

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {step === 1 && (
            <CheckoutFormInfo
              formData={formData}
              updateField={updateField}
            />
          )}

          {step === 2 && (
            <CheckoutFormShipping
              formData={formData}
              updateField={updateField}
            />
          )}

          {step === 3 && (
            <CheckoutFormPayment
              formData={formData}
              updateField={updateField}
              items={items}
              totalPrice={totalPrice}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          )}

          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-8 py-4 rounded-full bg-secondary font-display font-semibold text-sm uppercase tracking-wider hover:bg-muted transition-colors"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={handleContinue}
                className="flex-1 px-8 py-4 bg-primary text-primary-foreground rounded-full font-display font-semibold text-sm uppercase tracking-wider btn-primary-glow hover:scale-[1.02] transition-transform"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="flex-1 px-8 py-4 bg-primary text-primary-foreground rounded-full font-display font-semibold text-sm uppercase tracking-wider btn-primary-glow hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Place Order
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Checkout;
