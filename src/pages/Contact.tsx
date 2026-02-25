import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Clock, MessageSquare, Headphones } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <main className="pt-24 pb-16">
      {/* Hero */}
      <section className="section-padding py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              <MessageSquare className="w-4 h-4" /> We're Here to Help
            </motion.span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </motion.div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Phone, title: "Call Us", info: "+1 (555) 123-4567", sub: "Mon-Fri, 9AM-6PM IST" },
              { icon: Mail, title: "Email Us", info: "hello@solemate.com", sub: "We reply within 24 hours" },
              { icon: Clock, title: "Working Hours", info: "Mon - Sat", sub: "9:00 AM - 8:00 PM IST" },
            ].map(({ icon: Icon, title, info, sub }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-secondary/80 border border-border/50 text-center hover-lift"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold mb-1">{title}</h3>
                <p className="text-sm font-medium">{info}</p>
                <p className="text-xs text-muted-foreground mt-1">{sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Form + Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 p-8 rounded-2xl bg-secondary/80 border border-border/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold">Send us a message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Your Name</label>
                    <input
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      placeholder="you@example.com"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Subject</label>
                  <input
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Message</label>
                  <textarea
                    placeholder="Tell us more..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider rounded-full btn-primary-glow hover:scale-[1.02] transition-transform disabled:opacity-50"
                >
                  {sending ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </motion.div>

            {/* Right side - Location & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="p-6 rounded-2xl bg-secondary/80 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold">Our Store</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  123 Shoe Street, Fashion District<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-border/50 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076904379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Store location"
                />
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <Headphones className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-bold mb-1">Live Support</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Need immediate help? Chat with our support team.
                </p>
                <Link
                  to="/faq"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  Visit FAQ →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
