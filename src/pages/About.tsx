import { motion } from "framer-motion";
import { Target, Eye, Award, Users } from "lucide-react";

const About = () => {
  const values = [
    { icon: Target, title: "Our Mission", desc: "To provide premium footwear that combines cutting-edge technology with timeless design, making every step a statement." },
    { icon: Eye, title: "Our Vision", desc: "To become the world's most trusted destination for quality shoes, inspiring confidence and comfort in every stride." },
    { icon: Award, title: "Quality First", desc: "Every pair undergoes rigorous testing to ensure durability, comfort, and style that exceeds expectations." },
    { icon: Users, title: "Community", desc: "We're building a global community of shoe enthusiasts who share a passion for quality craftsmanship." },
  ];

  return (
    <main className="pt-24 pb-16">
      <section className="section-padding py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-6">
              Our <span className="text-gradient">Story</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2020, SOLEMATE began with a simple belief: everyone deserves shoes that look amazing and feel even better. We've partnered with the world's top brands to bring you a curated selection of premium footwear.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-secondary hover-lift"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding py-16 bg-secondary/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { num: "50K+", label: "Happy Customers" },
            { num: "200+", label: "Shoe Models" },
            { num: "15+", label: "Top Brands" },
            { num: "98%", label: "Satisfaction Rate" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="font-display text-3xl sm:text-4xl font-bold text-gradient">{stat.num}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
