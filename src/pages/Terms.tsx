import { motion } from "framer-motion";
import { FileText, ShoppingCart, CreditCard, Truck, AlertTriangle, Scale } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: `By accessing and using the SOLEMATE website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

These terms apply to all visitors, users, and customers of our website and services.`,
  },
  {
    icon: ShoppingCart,
    title: "2. Products & Orders",
    content: `All products displayed on our website are subject to availability. We reserve the right to limit quantities and refuse orders at our discretion.

Product images are for illustration purposes. While we strive for accuracy, actual products may vary slightly in color or appearance.

Prices are displayed in Indian Rupees (₹) and are subject to change without notice. The price at the time of order placement will be honored.`,
  },
  {
    icon: CreditCard,
    title: "3. Payment Terms",
    content: `We accept major credit/debit cards, UPI, net banking, and select digital wallets. All payments are processed through secure, encrypted channels.

Full payment is required at the time of order. Orders will only be processed after successful payment confirmation.

In case of payment failure, the order will be automatically cancelled and any deducted amount will be refunded within 5-7 business days.`,
  },
  {
    icon: Truck,
    title: "4. Shipping & Delivery",
    content: `We ship to all major cities and towns across India. Delivery times vary based on location:
• Metro cities: 3-5 business days
• Other cities: 5-7 business days
• Remote areas: 7-10 business days

Free shipping is available on orders above ₹5,000. Standard shipping charges apply to orders below this amount.

Risk of loss and title for items pass to you upon delivery to the carrier.`,
  },
  {
    icon: AlertTriangle,
    title: "5. Returns & Refunds",
    content: `We offer a 30-day return policy for unworn items in original condition with tags attached.

To initiate a return, contact our customer service team with your order details. Return shipping costs may apply unless the return is due to our error.

Refunds will be processed within 7-10 business days after we receive and inspect the returned item.`,
  },
  {
    icon: Scale,
    title: "6. Limitation of Liability",
    content: `SOLEMATE shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services.

Our total liability shall not exceed the amount paid for the product in question.

We are not responsible for delays or failures in performance resulting from circumstances beyond our reasonable control.`,
  },
];

const Terms = () => {
  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Scale className="w-4 h-4" /> Legal Agreement
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By using SOLEMATE, you agree to these terms.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Effective Date: February 6, 2026
          </p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-secondary"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold">{section.title}</h2>
              </div>
              <div className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 rounded-2xl bg-muted text-center"
        >
          <p className="text-sm text-muted-foreground">
            By continuing to use SOLEMATE, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default Terms;
