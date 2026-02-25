import { motion } from "framer-motion";
import { HelpCircle, Search, MessageCircle, ShieldCheck, Package, CreditCard, UserCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "Orders & Shipping",
    icon: Package,
    questions: [
      { question: "How long does shipping take?", answer: "Delivery times vary based on your location. Metro cities typically receive orders within 3-5 business days, other cities within 5-7 business days, and remote areas may take 7-10 business days. You'll receive tracking information once your order ships." },
      { question: "Do you offer free shipping?", answer: "Yes! We offer free standard shipping on all orders above ₹5,000. Orders below this amount have a flat shipping fee of ₹499." },
      { question: "Can I track my order?", answer: "Absolutely! Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account and visiting the 'Orders' section." },
      { question: "Do you ship internationally?", answer: "Currently, we only ship within India. We're working on expanding our shipping to other countries. Stay tuned for updates!" },
    ],
  },
  {
    category: "Returns & Exchanges",
    icon: ShieldCheck,
    questions: [
      { question: "What is your return policy?", answer: "We offer a 30-day return policy for unworn items in their original condition with all tags attached. Items must be in the original packaging. Customized items cannot be returned." },
      { question: "How do I return an item?", answer: "Log into your account, go to 'Orders', select the item you wish to return, and follow the return process. Alternatively, contact our customer service team." },
      { question: "How long do refunds take?", answer: "Once we receive and inspect your returned item, refunds are typically processed within 7-10 business days to your original payment method." },
      { question: "Can I exchange for a different size?", answer: "Yes! Request an exchange within 30 days of delivery. Subject to availability, we'll send the new size at no extra cost." },
    ],
  },
  {
    category: "Products & Sizing",
    icon: HelpCircle,
    questions: [
      { question: "How do I find my correct shoe size?", answer: "Measure your foot length in centimeters and refer to our size guide on each product page. If between sizes, go up for comfort." },
      { question: "Are your products authentic?", answer: "100%! We are an authorized retailer for all brands. Every product comes with original packaging, tags, and authenticity guarantee." },
      { question: "Do colors match the actual product?", answer: "We strive for accuracy, but slight variations may occur due to monitor settings and photography lighting." },
    ],
  },
  {
    category: "Payment & Security",
    icon: CreditCard,
    questions: [
      { question: "What payment methods do you accept?", answer: "We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI, net banking, and digital wallets like Paytm and PhonePe." },
      { question: "Is my payment information secure?", answer: "We use SSL encryption and PCI-DSS compliant payment partners. We never store your complete card details." },
      { question: "Do you offer Cash on Delivery?", answer: "Currently, we only accept prepaid orders. We're evaluating COD options for the future." },
    ],
  },
  {
    category: "Account & Support",
    icon: UserCircle,
    questions: [
      { question: "How do I create an account?", answer: "Click 'Sign In' in the navigation, then 'Create Account'. Fill in your details and verify your email. An account lets you track orders, save favorites, and checkout faster." },
      { question: "How can I contact customer support?", answer: "Email us at hello@solemate.com or visit the Contact page. We typically respond within 24 hours on business days." },
      { question: "How do I update my account info?", answer: "Log in and visit the 'Profile' section to update personal information, shipping addresses, and communication preferences." },
    ],
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0)
    .filter((category) => !activeCategory || category.category === activeCategory);

  return (
    <main className="pt-24 pb-16">
      <section className="section-padding py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              <HelpCircle className="w-4 h-4" /> Help Center
            </motion.span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
              Find answers to common questions about orders, shipping, returns, and more.
            </p>

            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-secondary border border-border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
              />
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !activeCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {faqCategories.map(({ category, icon: Icon }) => (
              <button
                key={category}
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {category}
              </button>
            ))}
          </motion.div>

          {/* FAQ Content */}
          {filteredCategories.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <HelpCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No questions found matching your search.</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory(null); }} className="text-primary text-sm mt-2 hover:underline">
                Clear filters
              </button>
            </motion.div>
          ) : (
            <div className="space-y-10">
              {filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-display text-xl font-bold">{category.category}</h2>
                  </div>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.category}-${index}`}
                        className="bg-secondary/80 rounded-xl px-6 border border-border/50"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 text-background p-10 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
            <div className="relative">
              <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="text-background/60 text-sm mb-6 max-w-md mx-auto">
                Can't find what you're looking for? Our support team is here to help you.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-display font-semibold uppercase tracking-wider hover:scale-105 transition-transform btn-primary-glow"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
