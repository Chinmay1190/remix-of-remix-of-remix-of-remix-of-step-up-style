import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";
import heroShoe from "@/assets/hero-shoe.jpg";
import { products, categories, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import BrandLogo from "@/components/BrandLogo";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroShoe} alt="Hero shoe" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
    </div>
    <div className="relative max-w-7xl mx-auto section-padding py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm"
        >
          New Collection 2026
        </motion.span>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-background mb-6">
          STEP INTO{" "}
          <span className="text-gradient">STYLE</span>
        </h1>
        <p className="text-background/60 text-lg sm:text-xl mb-8 max-w-md">
          Premium footwear engineered for performance, designed for life. Discover your perfect pair.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider rounded-full btn-primary-glow hover:scale-105 transition-transform"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 border border-background/20 text-background font-display font-semibold text-sm uppercase tracking-wider rounded-full hover:bg-background/10 transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const CategoriesSection = () => (
  <section className="py-20 section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-12 text-center"
      >
        Shop by Category
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.name} name={cat.name} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const TrendingSection = () => {
  const trending = products.filter((p) => p.isTrending);
  return (
    <section className="py-20 section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Trending Now
          </motion.h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline hidden sm:block">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trending.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandStrip = () => (
  <section className="py-16 border-y border-border overflow-hidden bg-secondary/30">
    <div className="max-w-7xl mx-auto section-padding">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-8"
      >
        Trusted by Top Brands
      </motion.p>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
        {brands.map((brand, i) => (
          <motion.div
            key={brand}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <BrandLogo brand={brand} className="scale-150" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturesStrip = () => (
  <section className="py-16 section-padding">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
      {[
        { icon: Truck, title: "Free Shipping", desc: "On orders over ₹5,000" },
        { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
        { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
      ].map(({ icon: Icon, title, desc }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-4 p-6 rounded-2xl bg-secondary"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const Index = () => {
  return (
    <main>
      <HeroSection />
      <BrandStrip />
      <CategoriesSection />
      <TrendingSection />
      <FeaturesStrip />
    </main>
  );
};

export default Index;
