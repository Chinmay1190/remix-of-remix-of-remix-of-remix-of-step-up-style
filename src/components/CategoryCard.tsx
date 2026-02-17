import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catRunning from "@/assets/cat-running.jpg";
import catCasual from "@/assets/cat-casual.jpg";
import catSports from "@/assets/cat-sports.jpg";

interface CategoryCardProps {
  name: string;
  index: number;
}

const categoryImages: Record<string, string> = {
  Men: catMen,
  Women: catWomen,
  Kids: catKids,
  Running: catRunning,
  Casual: catCasual,
  Sports: catSports,
};

const CategoryCard = ({ name, index }: CategoryCardProps) => {
  const image = categoryImages[name] || catMen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        to={`/products?category=${name}`}
        className="group block relative rounded-2xl overflow-hidden aspect-[4/5] hover-lift"
      >
        {/* Image */}
        <img
          src={image}
          alt={`${name} shoes`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display font-bold text-lg text-background tracking-tight">
            {name}
          </h3>
          <p className="text-background/60 text-xs mt-0.5">Shop Now →</p>
        </div>

        {/* Hover border glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300" />
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
