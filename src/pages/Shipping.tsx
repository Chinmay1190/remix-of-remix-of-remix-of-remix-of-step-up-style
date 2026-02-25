import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Package, RotateCcw, AlertCircle, CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const shippingInfo = [
  {
    icon: Truck,
    title: "Shipping Methods",
    color: "from-blue-500/10 to-blue-500/5",
    items: [
      { label: "Standard Shipping", value: "₹499 (Free on orders above ₹5,000)" },
      { label: "Express Shipping", value: "₹999 (2-3 business days)" },
      { label: "Same Day Delivery", value: "₹1,499 (Select cities only)" },
    ],
  },
  {
    icon: Clock,
    title: "Delivery Times",
    color: "from-green-500/10 to-green-500/5",
    items: [
      { label: "Metro Cities", value: "3-5 business days" },
      { label: "Tier 2 Cities", value: "5-7 business days" },
      { label: "Remote Areas", value: "7-10 business days" },
    ],
  },
  {
    icon: MapPin,
    title: "Delivery Coverage",
    color: "from-purple-500/10 to-purple-500/5",
    items: [
      { label: "Pan India", value: "All states and union territories" },
      { label: "Pin Code Check", value: "Available at checkout" },
      { label: "International", value: "Coming soon" },
    ],
  },
];

const returnSteps = [
  { step: 1, title: "Initiate Return", description: "Log into your account, go to Orders, and select 'Return Item' within 30 days of delivery.", icon: Package },
  { step: 2, title: "Pack the Item", description: "Place the unworn item with tags in original packaging. Include the return slip.", icon: CheckCircle2 },
  { step: 3, title: "Schedule Pickup", description: "Our courier partner will pick up the item from your address within 2-3 business days.", icon: Truck },
  { step: 4, title: "Get Refund", description: "Once inspected, your refund will be processed within 7-10 business days.", icon: ArrowRight },
];

const Shipping = () => {
  return (
    <main className="pt-24 pb-16">
      <section className="section-padding py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              <Package className="w-4 h-4" /> Delivery Information
            </motion.span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-4">
              Shipping & <span className="text-gradient">Returns</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Fast, reliable shipping across India with hassle-free returns. Your satisfaction is our priority.
            </p>
          </motion.div>

          {/* Highlight Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
          >
            {[
              { icon: Truck, text: "Free shipping on ₹5,000+" },
              { icon: RotateCcw, text: "30-day easy returns" },
              { icon: Shield, text: "100% secure checkout" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-semibold">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Shipping Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {shippingInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${info.color} border border-border/50 hover-lift`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-4">{info.title}</h3>
                <div className="space-y-4">
                  {info.items.map((item) => (
                    <div key={item.label} className="text-sm">
                      <p className="text-muted-foreground">{item.label}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Return Policy Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <RotateCcw className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold">30-Day Return Policy</h2>
                <p className="text-muted-foreground">Easy returns, no questions asked</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {returnSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 rounded-2xl bg-secondary/80 border border-border/50 group hover-lift"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
                      {step.step}
                    </div>
                    <step.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-display font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  {index < returnSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-primary/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Return Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-secondary/80 border border-border/50 mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h3 className="font-display text-xl font-bold">Return Conditions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Eligible for Return
                </p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Unworn items in original condition</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Original tags attached</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Original packaging included</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Within 30 days of delivery</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  Not Eligible for Return
                </p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive" />Worn or used items</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive" />Items without original tags</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive" />Customized/personalized orders</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive" />Items damaged by customer</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 text-background p-10 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold mb-3">Need Help?</h3>
              <p className="text-background/60 text-sm mb-6 max-w-md mx-auto">
                Our customer support team is here to assist you with any shipping or return queries.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-display font-semibold uppercase tracking-wider hover:scale-105 transition-transform btn-primary-glow">
                  Contact Support
                </Link>
                <Link to="/faq" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background/10 text-background rounded-full text-sm font-display font-semibold uppercase tracking-wider hover:bg-background/20 transition-colors border border-background/20">
                  View FAQ
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Shipping;
