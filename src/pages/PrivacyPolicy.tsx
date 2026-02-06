import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Personal information (name, email, phone number, shipping address) when you create an account or place an order",
      "Payment information processed securely through our payment partners",
      "Browsing data and preferences to improve your shopping experience",
      "Device and browser information for security and optimization purposes",
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
      "We use industry-standard SSL encryption for all data transmission",
      "Payment card information is never stored on our servers",
      "Regular security audits and vulnerability assessments",
      "Access to personal data is restricted to authorized personnel only",
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
      "You can manage cookie preferences in your browser settings",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Shield className="w-4 h-4" /> Your Privacy Matters
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At SOLEMATE, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: February 6, 2026
          </p>
        </motion.div>

        <div className="space-y-8">
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
              <ul className="space-y-2 ml-13">
                {section.content.map((item, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center"
        >
          <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-display font-semibold mb-2">Questions About Privacy?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Contact our Data Protection Officer for any privacy-related inquiries.
          </p>
          <a
            href="mailto:privacy@solemate.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:scale-105 transition-transform"
          >
            privacy@solemate.com
          </a>
        </motion.div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
