import { motion } from "framer-motion";
import { HelpCircle, Search } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "Delivery times vary based on your location. Metro cities typically receive orders within 3-5 business days, other cities within 5-7 business days, and remote areas may take 7-10 business days. You'll receive tracking information once your order ships.",
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all orders above ₹5,000. Orders below this amount have a flat shipping fee of ₹499.",
      },
      {
        question: "Can I track my order?",
        answer: "Absolutely! Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account and visiting the 'Orders' section.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within India. We're working on expanding our shipping to other countries. Stay tuned for updates!",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unworn items in their original condition with all tags attached. Items must be in the original packaging. Please note that customized or personalized items cannot be returned.",
      },
      {
        question: "How do I return an item?",
        answer: "To initiate a return, log into your account, go to 'Orders', select the item you wish to return, and follow the return process. Alternatively, contact our customer service team for assistance.",
      },
      {
        question: "How long do refunds take?",
        answer: "Once we receive and inspect your returned item, refunds are typically processed within 7-10 business days. The refund will be credited to your original payment method.",
      },
      {
        question: "Can I exchange an item for a different size?",
        answer: "Yes! If you need a different size, you can request an exchange within 30 days of delivery. Subject to availability, we'll send you the new size at no extra cost.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        question: "How do I find my correct shoe size?",
        answer: "We recommend measuring your foot length in centimeters and referring to our size guide available on each product page. If you're between sizes, we suggest going up to the next size for comfort.",
      },
      {
        question: "Are your products authentic?",
        answer: "Yes, 100%! We are an authorized retailer for all brands we carry. Every product comes with original brand packaging, tags, and authenticity guarantee.",
      },
      {
        question: "Do colors in photos match the actual product?",
        answer: "We strive to display accurate colors, but slight variations may occur due to monitor settings and photography lighting. Rest assured, we describe any color variations in the product description.",
      },
    ],
  },
  {
    category: "Payment & Security",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), UPI payments, net banking from major banks, and popular digital wallets like Paytm and PhonePe.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely! We use industry-standard SSL encryption and our payment processing partners are PCI-DSS compliant. We never store your complete card details on our servers.",
      },
      {
        question: "Do you offer Cash on Delivery?",
        answer: "Currently, we only accept prepaid orders. This helps us ensure faster processing and delivery of your orders. We're evaluating COD options for the future.",
      },
    ],
  },
  {
    category: "Account & Support",
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click on 'Sign In' in the top navigation, then select 'Create Account'. Fill in your details and verify your email address. Having an account lets you track orders, save favorites, and checkout faster.",
      },
      {
        question: "How can I contact customer support?",
        answer: "Our customer support team is available via email at hello@solemate.com, or you can reach us through the Contact page. We typically respond within 24 hours during business days.",
      },
      {
        question: "How do I update my account information?",
        answer: "Log into your account and visit the 'Profile' section. From there, you can update your personal information, shipping addresses, and communication preferences.",
      },
    ],
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" /> Help Center
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions about orders, shipping, returns, and more.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-secondary border border-border outline-none focus:border-primary transition-colors"
            />
          </div>
        </motion.div>

        {filteredCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No questions found matching your search.</p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="font-display text-xl font-semibold mb-4 px-2">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="bg-secondary rounded-xl px-6 border-none"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center"
        >
          <h3 className="font-display text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:scale-105 transition-transform"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </main>
  );
};

export default FAQ;
