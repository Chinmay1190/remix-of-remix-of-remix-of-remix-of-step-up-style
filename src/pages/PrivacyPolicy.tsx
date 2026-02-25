import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, Mail, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Personal information (name, email, phone, shipping address) when you create an account or place an order",
      "Payment information processed securely through our payment partners",
      "Browsing data and preferences to improve your shopping experience",
      "Device and browser information for security and optimization",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "Process and fulfill your orders efficiently",
      "Send order confirmations and shipping updates",
      "Personalize your shopping experience with relevant recommendations",
      "Improve our products, services, and website functionality",
      "Communicate promotional offers (with your consent)",
    ],
  },
  {
    icon: Shield,
    title: "Data Protection",
    content: [
      "Industry-standard SSL encryption for all data transmission",
      "Payment card information is never stored on our servers",
      "Regular security audits and vulnerability assessments",
      "Access to personal data restricted to authorized personnel only",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "Access and download your personal data at any time",
      "Request correction of inaccurate information",
      "Delete your account and associated data",
      "Opt-out of marketing communications",
      "Lodge a complaint with data protection authorities",
    ],
  },
  {
    icon: Lock,
    title: "Cookies & Tracking",
    content: [
      "Essential cookies for website functionality and security",
      "Analytics cookies to understand user behavior (can be disabled)",
      "Marketing cookies for personalized advertising (optional)",
      "Manage cookie preferences in your browser settings",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <main className="pt-24 pb-16">
      <section className="section-padding py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              <Shield className="w-4 h-4" /> Your Privacy Matters
            </motion.span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-4">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              At SOLEMATE, we are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: February 25, 2026
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
          >
            {[
              { icon: Lock, text: "256-bit SSL Encryption" },
              { icon: Shield, text: "GDPR Compliant" },
              { icon: CheckCircle2, text: "PCI-DSS Certified" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-semibold">{text}</span>
              </div>
            ))}
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-8 rounded-2xl bg-secondary/80 border border-border/50 hover-lift"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold">{section.title}</h2>
                </div>
                <ul className="space-y-3 ml-1">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-3 leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 text-background p-10 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
            <div className="relative">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">Questions About Privacy?</h3>
              <p className="text-background/60 text-sm mb-6 max-w-md mx-auto">
                Contact our Data Protection Officer for any privacy-related inquiries.
              </p>
              <a
                href="mailto:privacy@solemate.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-display font-semibold uppercase tracking-wider hover:scale-105 transition-transform btn-primary-glow"
              >
                privacy@solemate.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
