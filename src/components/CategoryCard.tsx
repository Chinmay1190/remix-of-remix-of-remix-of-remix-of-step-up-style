import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Users, Baby, Footprints, Smile, Trophy } from "lucide-react";

interface CategoryCardProps {
  name: string;
  index: number;
}

const categoryConfig: Record<string, { icon: React.ElementType; gradient: string; description: string }> = {
  Men: {
    icon: User,
    gradient: "from-blue-500 to-blue-700",
    description: "Athletic & casual styles",
  },
  Women: {
    icon: Users,
    gradient: "from-pink-500 to-rose-600",
    description: "Elegant & sporty designs",
  },
  Kids: {
    icon: Baby,
    gradient: "from-green-400 to-emerald-600",
    description: "Fun & durable shoes",
  },
  Running: {
    icon: Footprints,
    gradient: "from-orange-500 to-red-600",
    description: "Performance footwear",
  },
  Casual: {
    icon: Smile,
    gradient: "from-purple-500 to-indigo-600",
    description: "Everyday comfort",
  },
  Sports: {
    icon: Trophy,
    gradient: "from-yellow-500 to-amber-600",
    description: "Athletic excellence",
  },
};

const CategoryCard = ({ name, index }: CategoryCardProps) => {
  const config = categoryConfig[name] || {
    icon: Footprints,
    gradient: "from-gray-500 to-gray-700",
    description: "Browse collection",
  };

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/products?category=${name}`}
        className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-secondary hover:bg-gradient-to-br hover:shadow-lg transition-all duration-300 hover-lift relative overflow-hidden"
      >
        {/* Background gradient on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
        
        {/* Icon container */}
        <div className="relative z-10 w-14 h-14 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <Icon className="w-7 h-7 text-foreground group-hover:text-white transition-colors" />
        </div>
        
        {/* Text content */}
        <div className="relative z-10 text-center">
          <span className="font-display font-semibold text-sm uppercase tracking-wider group-hover:text-white transition-colors">
            {name}
          </span>
          <p className="text-xs text-muted-foreground mt-1 group-hover:text-white/80 transition-colors">
            {config.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
