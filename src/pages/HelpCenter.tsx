import { motion } from "framer-motion";
import { HelpCircle, BookOpen, MessageCircle, Truck, RotateCcw, CreditCard, UserCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const helpTopics = [
  {
    icon: Truck,
    title: "Shipping & Delivery",
    desc: "Track your order, delivery times, shipping methods, and coverage areas.",
    link: "/shipping",
    color: "from-blue-500/10 to-blue-500/5",
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges",
    desc: "Return policy, how to initiate returns, exchange process, and refund timeline.",
    link: "/shipping",
    color: "from-green-500/10 to-green-500/5",
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    desc: "Payment methods, failed transactions, invoices, and billing queries.",
    link: "/faq",
    color: "from-purple-500/10 to-purple-500/5",
  },
  {
    icon: UserCircle,
    title: "Account & Profile",
    desc: "Account setup, profile management, password reset, and preferences.",
    link: "/faq",
    color: "from-orange-500/10 to-orange-500/5",
  },
  {
    icon: BookOpen,
    title: "Product Information",
    desc: "Sizing guides, product authenticity, color accuracy, and care instructions.",
    link: "/faq",
    color: "from-pink-500/10 to-pink-500/5",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    desc: "Data protection, cookie policy, account security, and your privacy rights.",
    link: "/privacy",
    color: "from-teal-500/10 to-teal-500/5",
  },
];

const HelpCenter = () => {
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
              <HelpCircle className="w-4 h-4" /> We're Here For You
            </motion.span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-4">
              Help <span className="text-gradient">Center</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Everything you need to know about shopping with SOLEMATE. Browse topics below or search our FAQ.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
          >
            {[
              { icon: MessageCircle, text: "Contact Support", link: "/contact" },
              { icon: HelpCircle, text: "Browse FAQ", link: "/faq" },
              { icon: Truck, text: "Track My Order", link: "/orders" },
            ].map(({ icon: Icon, text, link }, i) => (
              <Link key={i} to={link} className="flex items-center gap-3 p-5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors group">
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-semibold flex-1">{text}</span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </motion.div>

          {/* Help Topics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {helpTopics.map(({ icon: Icon, title, desc, link, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={link}
                  className={`block p-8 rounded-2xl bg-gradient-to-br ${color} border border-border/50 hover-lift group h-full`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                  <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 text-background p-10 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
            <div className="relative">
              <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="font-display text-3xl font-bold mb-4">Can't find what you need?</h2>
              <p className="text-background/60 max-w-md mx-auto mb-8">
                Our support team is available Monday-Saturday, 9AM-8PM IST. We typically respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-display font-semibold uppercase tracking-wider hover:scale-105 transition-transform btn-primary-glow">
                  Contact Us
                </Link>
                <a href="mailto:hello@solemate.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background/10 text-background rounded-full text-sm font-display font-semibold uppercase tracking-wider hover:bg-background/20 transition-colors border border-background/20">
                  Email Support
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default HelpCenter;
