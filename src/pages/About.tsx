import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Heart, Zap, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    { icon: Target, title: "Our Mission", desc: "To provide premium footwear that combines cutting-edge technology with timeless design, making every step a statement of confidence." },
    { icon: Eye, title: "Our Vision", desc: "To become the world's most trusted destination for quality shoes, inspiring confidence and comfort in every stride you take." },
    { icon: Award, title: "Quality First", desc: "Every pair undergoes rigorous testing to ensure durability, comfort, and style that exceeds expectations and lasts for years." },
    { icon: Users, title: "Community Driven", desc: "We're building a global community of shoe enthusiasts who share a passion for quality craftsmanship and self-expression." },
  ];

  const timeline = [
    { year: "2020", title: "The Beginning", desc: "SOLEMATE was born from a passion for premium footwear and a gap in the market for curated shoe shopping." },
    { year: "2021", title: "Going National", desc: "Expanded delivery across India with partnerships with Nike, Adidas, Puma, and Reebok." },
    { year: "2023", title: "50K Milestone", desc: "Crossed 50,000 happy customers and launched our exclusive members program." },
    { year: "2026", title: "Innovation Era", desc: "Introduced 360° product viewer and AI-powered size recommendations." },
  ];

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              <Heart className="w-4 h-4" /> Est. 2020
            </motion.span>
            <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight mb-6">
              Our <span className="text-gradient">Story</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Founded in 2020, SOLEMATE began with a simple belief: everyone deserves shoes that look amazing and feel even better. We've partnered with the world's top brands to bring you a curated selection of premium footwear.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-secondary/80 border border-border/50 hover-lift relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding py-20">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 p-10 sm:p-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { num: "50K+", label: "Happy Customers", icon: Users },
                { num: "200+", label: "Shoe Models", icon: Zap },
                { num: "15+", label: "Top Brands", icon: Globe },
                { num: "98%", label: "Satisfaction Rate", icon: TrendingUp },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-display text-3xl sm:text-5xl font-bold text-gradient">{stat.num}</p>
                  <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding py-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-center mb-16"
          >
            Our <span className="text-gradient">Journey</span>
          </motion.h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden sm:block" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`flex flex-col sm:flex-row items-center gap-6 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  <div className={`flex-1 p-6 rounded-2xl bg-secondary border border-border/50 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <h3 className="font-display text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-sm shrink-0 shadow-lg">
                    {item.year}
                  </div>
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 text-background p-10 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to Find Your Perfect Pair?</h2>
              <p className="text-background/60 max-w-lg mx-auto mb-8">
                Browse our curated collection of premium shoes from the world's top brands.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider rounded-full btn-primary-glow hover:scale-105 transition-transform"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
