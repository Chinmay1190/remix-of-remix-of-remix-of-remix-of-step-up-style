import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Package, RotateCcw, AlertCircle } from "lucide-react";

const shippingInfo = [
  {
    icon: Truck,
    title: "Shipping Methods",
    items: [
      { label: "Standard Shipping", value: "₹499 (Free on orders above ₹5,000)" },
      { label: "Express Shipping", value: "₹999 (2-3 business days)" },
      { label: "Same Day Delivery", value: "₹1,499 (Select cities only)" },
    ],
  },
  {
    icon: Clock,
    title: "Delivery Times",
    items: [
      { label: "Metro Cities", value: "3-5 business days" },
      { label: "Tier 2 Cities", value: "5-7 business days" },
      { label: "Remote Areas", value: "7-10 business days" },
    ],
  },
  {
    icon: MapPin,
    title: "Delivery Coverage",
    items: [
      { label: "Pan India", value: "All states and union territories" },
      { label: "Pin Code Check", value: "Available at checkout" },
      { label: "International", value: "Coming soon" },
    ],
  },
];

const returnSteps = [
  {
    step: 1,
    title: "Initiate Return",
    description: "Log into your account, go to Orders, and select 'Return Item' within 30 days of delivery.",
  },
  {
    step: 2,
    title: "Pack the Item",
    description: "Place the unworn item with tags in original packaging. Include the return slip.",
  },
  {
    step: 3,
    title: "Schedule Pickup",
    description: "Our courier partner will pick up the item from your address within 2-3 business days.",
  },
  {
    step: 4,
    title: "Get Refund",
    description: "Once inspected, your refund will be processed within 7-10 business days.",
  },
];

const Shipping = () => {
  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Package className="w-4 h-4" /> Delivery Information
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Shipping & Returns
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fast, reliable shipping across India with hassle-free returns. Your satisfaction is our priority.
          </p>
        </motion.div>

        {/* Shipping Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {shippingInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-secondary"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <info.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-4">{info.title}</h3>
              <div className="space-y-3">
                {info.items.map((item) => (
                  <div key={item.label} className="text-sm">
                    <p className="text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Return Policy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">30-Day Return Policy</h2>
              <p className="text-muted-foreground text-sm">Easy returns, no questions asked</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {returnSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="relative p-6 rounded-2xl bg-secondary"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-3">
                  {step.step}
                </div>
                <h3 className="font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < returnSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-2 w-4 h-0.5 bg-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Return Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-secondary mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold">Return Conditions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2 text-primary">Eligible for Return</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Unworn items in original condition</li>
                <li>• Original tags attached</li>
                <li>• Original packaging included</li>
                <li>• Within 30 days of delivery</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2 text-destructive">Not Eligible for Return</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Worn or used items</li>
                <li>• Items without original tags</li>
                <li>• Customized/personalized orders</li>
                <li>• Items damaged by customer</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center"
        >
          <h3 className="font-display text-xl font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Our customer support team is here to assist you with any shipping or return queries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:scale-105 transition-transform"
            >
              Contact Support
            </a>
            <a
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-full text-sm font-medium hover:bg-muted transition-colors"
            >
              View FAQ
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Shipping;
