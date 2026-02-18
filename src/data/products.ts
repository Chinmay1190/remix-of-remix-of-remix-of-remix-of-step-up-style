import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";
import shoe4 from "@/assets/shoe-4.jpg";
import shoe5 from "@/assets/shoe-5.jpg";
import shoe6 from "@/assets/shoe-6.jpg";
import shoe7 from "@/assets/shoe-7.jpg";
import shoe8 from "@/assets/shoe-8.jpg";
import shoe9 from "@/assets/shoe-9.jpg";
import shoe10 from "@/assets/shoe-10.jpg";
import shoe11 from "@/assets/shoe-11.jpg";
import shoe12 from "@/assets/shoe-12.jpg";
import shoe13 from "@/assets/shoe-13.jpg";
import shoe14 from "@/assets/shoe-14.jpg";
import shoe15 from "@/assets/shoe-15.jpg";
import shoe16 from "@/assets/shoe-16.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  gender: string;
  colors: string[];
  sizes: number[];
  rating: number;
  reviews: number;
  description: string;
  isTrending?: boolean;
  isNew?: boolean;
}

// 10 visually-consistent image sets – each product gets one set
// Sets group images by style/color similarity
const sets = {
  A: [shoe1, shoe9, shoe16, shoe4],    // dark athletic runners
  B: [shoe2, shoe11, shoe9, shoe16],   // blue/dark sport
  C: [shoe3, shoe10, shoe15, shoe7],   // light casual
  D: [shoe4, shoe13, shoe9, shoe1],    // trail/rugged
  E: [shoe5, shoe14, shoe15, shoe7],   // premium/gold
  F: [shoe6, shoe12, shoe10, shoe3],   // pink/women
  G: [shoe7, shoe15, shoe10, shoe3],   // retro/casual
  H: [shoe8, shoe10, shoe16, shoe7],   // minimal white/black
  I: [shoe9, shoe16, shoe11, shoe4],   // black/red performance
  J: [shoe11, shoe9, shoe4, shoe16],   // blue performance
  K: [shoe12, shoe6, shoe10, shoe3],   // pink runners
  L: [shoe13, shoe4, shoe9, shoe1],    // trail/outdoor
  M: [shoe14, shoe5, shoe15, shoe7],   // high-top/premium
  N: [shoe15, shoe7, shoe10, shoe3],   // retro grey/orange
  O: [shoe16, shoe9, shoe11, shoe1],   // stealth black
  P: [shoe10, shoe8, shoe7, shoe15],   // white clean
};

export const products: Product[] = [
  {
    id: "1", name: "Air Velocity Pro", brand: "Nike", price: 15999, originalPrice: 19999,
    image: shoe1, images: sets.A, category: "Running", gender: "Men",
    colors: ["#FF6B35", "#FFFFFF", "#1A1A2E"], sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    rating: 4.8, reviews: 342, description: "Engineered for speed with responsive cushioning and a breathable mesh upper.",
    isTrending: true, isNew: true,
  },
  {
    id: "2", name: "UltraBoost X", brand: "Adidas", price: 16999,
    image: shoe2, images: sets.B, category: "Sports", gender: "Men",
    colors: ["#1A1A2E", "#E63946"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7, reviews: 218, description: "Maximum energy return with Boost technology. Built for athletes.",
    isTrending: true,
  },
  {
    id: "3", name: "CloudWalk Lite", brand: "Puma", price: 10999, originalPrice: 13999,
    image: shoe3, images: sets.C, category: "Casual", gender: "Unisex",
    colors: ["#457B9D", "#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.5, reviews: 156, description: "Lightweight comfort meets everyday style.",
    isTrending: true,
  },
  {
    id: "4", name: "TrailBlazer GTX", brand: "Nike", price: 18999,
    image: shoe13, images: sets.L, category: "Running", gender: "Men",
    colors: ["#2D6A4F", "#FFFFFF"], sizes: [8, 9, 10, 11, 12],
    rating: 4.9, reviews: 89, description: "Conquer any terrain with aggressive traction and waterproof protection.",
    isNew: true,
  },
  {
    id: "5", name: "Royal Luxe High", brand: "Reebok", price: 21999,
    image: shoe14, images: sets.M, category: "Sports", gender: "Men",
    colors: ["#D4A574", "#1A1A2E"], sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.6, reviews: 67, description: "Premium materials and iconic design for on and off the court.",
  },
  {
    id: "6", name: "FreeRun Bliss", brand: "Nike", price: 13999,
    image: shoe12, images: sets.K, category: "Running", gender: "Women",
    colors: ["#FF69B4", "#FFFFFF"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.8, reviews: 412, description: "Designed for the modern woman runner. Lightweight and stylish.",
    isTrending: true,
  },
  {
    id: "7", name: "Retro Classic 77", brand: "Adidas", price: 8999,
    image: shoe15, images: sets.N, category: "Casual", gender: "Unisex",
    colors: ["#FF6B35", "#F5F0E8"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.4, reviews: 523, description: "Vintage-inspired design with modern comfort.",
  },
  {
    id: "8", name: "Pure White Essential", brand: "Puma", price: 11999,
    image: shoe10, images: sets.P, category: "Casual", gender: "Unisex",
    colors: ["#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.3, reviews: 289, description: "Clean, minimal, and versatile everyday sneaker.",
  },
  // ---- 32 NEW PRODUCTS ----
  {
    id: "9", name: "Blaze Runner X1", brand: "Nike", price: 14999, originalPrice: 17999,
    image: shoe9, images: sets.I, category: "Running", gender: "Men",
    colors: ["#E63946", "#1A1A2E"], sizes: [7, 8, 9, 10, 11],
    rating: 4.6, reviews: 198, description: "Explosive speed meets all-day comfort with Blaze cushioning.",
    isNew: true,
  },
  {
    id: "10", name: "Galaxy Foam 360", brand: "Adidas", price: 19999,
    image: shoe11, images: sets.J, category: "Sports", gender: "Men",
    colors: ["#457B9D", "#FFFFFF", "#1A1A2E"], sizes: [8, 9, 10, 11, 12],
    rating: 4.8, reviews: 76, description: "360-degree foam technology for unparalleled court performance.",
    isTrending: true,
  },
  {
    id: "11", name: "Zen Walker", brand: "Puma", price: 7999,
    image: shoe7, images: sets.G, category: "Casual", gender: "Unisex",
    colors: ["#2D6A4F", "#F5F0E8"], sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.2, reviews: 344, description: "Minimalist design for those who value simplicity.",
  },
  {
    id: "12", name: "Storm Surge Pro", brand: "Nike", price: 22999, originalPrice: 26999,
    image: shoe16, images: sets.O, category: "Running", gender: "Men",
    colors: ["#1A1A2E", "#FF6B35"], sizes: [8, 9, 10, 11, 12],
    rating: 4.9, reviews: 42, description: "Dominate wet conditions with waterproof Storm technology.",
    isNew: true,
  },
  {
    id: "13", name: "Aura Flex Knit", brand: "Reebok", price: 12999,
    image: shoe6, images: sets.F, category: "Sports", gender: "Women",
    colors: ["#FF69B4", "#D4A574"], sizes: [5, 6, 7, 8, 9],
    rating: 4.5, reviews: 187, description: "Flexible knit upper that moves with your every step.",
  },
  {
    id: "14", name: "Dusk Runner SE", brand: "Adidas", price: 13499,
    image: shoe12, images: sets.K, category: "Running", gender: "Women",
    colors: ["#E63946", "#FFFFFF"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.7, reviews: 231, description: "Engineered for twilight runs with reflective accents.",
    isTrending: true,
  },
  {
    id: "15", name: "Heritage Court", brand: "Puma", price: 9499,
    image: shoe10, images: sets.P, category: "Casual", gender: "Men",
    colors: ["#FFFFFF", "#2D6A4F"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.3, reviews: 412, description: "Classic court style reimagined for the streets.",
  },
  {
    id: "16", name: "Phantom Elite", brand: "Nike", price: 24999,
    image: shoe16, images: sets.O, category: "Sports", gender: "Men",
    colors: ["#1A1A2E"], sizes: [8, 9, 10, 11, 12],
    rating: 4.9, reviews: 156, description: "Elite-level performance shoe for professional athletes.",
    isNew: true,
  },
  {
    id: "17", name: "Breeze Low Top", brand: "Reebok", price: 6999, originalPrice: 8999,
    image: shoe15, images: sets.N, category: "Casual", gender: "Unisex",
    colors: ["#457B9D", "#F5F0E8"], sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.1, reviews: 567, description: "Breezy comfort for warm-weather adventures.",
  },
  {
    id: "18", name: "Turbo Sprint", brand: "Adidas", price: 17999,
    image: shoe9, images: sets.I, category: "Running", gender: "Men",
    colors: ["#FF6B35", "#1A1A2E"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7, reviews: 123, description: "Carbon-plated sprint shoe for competitive racers.",
  },
  {
    id: "19", name: "Luna Glow", brand: "Nike", price: 15499,
    image: shoe6, images: sets.F, category: "Running", gender: "Women",
    colors: ["#FF69B4", "#457B9D"], sizes: [5, 6, 7, 8, 9],
    rating: 4.6, reviews: 278, description: "Night-ready runner with luminous accents and plush ride.",
    isTrending: true,
  },
  {
    id: "20", name: "Metro Slide Pro", brand: "Puma", price: 5999,
    image: shoe8, images: sets.H, category: "Casual", gender: "Unisex",
    colors: ["#1A1A2E", "#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.0, reviews: 634, description: "Urban slip-on perfection for the commuter lifestyle.",
  },
  {
    id: "21", name: "Titan Force Mid", brand: "Reebok", price: 19999, originalPrice: 23999,
    image: shoe14, images: sets.M, category: "Sports", gender: "Men",
    colors: ["#E63946", "#FFFFFF", "#1A1A2E"], sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.8, reviews: 91, description: "Mid-top basketball shoe with ankle lockdown system.",
    isNew: true,
  },
  {
    id: "22", name: "Prism Trainer", brand: "Nike", price: 11999,
    image: shoe12, images: sets.K, category: "Sports", gender: "Women",
    colors: ["#D4A574", "#FF69B4"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.4, reviews: 345, description: "Versatile gym trainer with multi-surface grip.",
  },
  {
    id: "23", name: "Shadow Edge", brand: "Adidas", price: 16499,
    image: shoe11, images: sets.J, category: "Running", gender: "Men",
    colors: ["#1A1A2E", "#2D6A4F"], sizes: [7, 8, 9, 10, 11],
    rating: 4.6, reviews: 167, description: "Stealth design meets responsive road performance.",
  },
  {
    id: "24", name: "Bloom Garden", brand: "Puma", price: 10499,
    image: shoe6, images: sets.F, category: "Casual", gender: "Women",
    colors: ["#FF69B4", "#F5F0E8", "#2D6A4F"], sizes: [5, 6, 7, 8, 9],
    rating: 4.5, reviews: 203, description: "Floral-inspired casual shoe for spring vibes.",
  },
  {
    id: "25", name: "Apex Trail Ultra", brand: "Nike", price: 20999,
    image: shoe13, images: sets.L, category: "Running", gender: "Men",
    colors: ["#2D6A4F", "#FF6B35"], sizes: [8, 9, 10, 11, 12],
    rating: 4.8, reviews: 54, description: "Ultra-distance trail shoe with rock plate protection.",
    isNew: true,
  },
  {
    id: "26", name: "Crossfit Blitz", brand: "Reebok", price: 14499,
    image: shoe9, images: sets.I, category: "Sports", gender: "Men",
    colors: ["#E63946", "#1A1A2E"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7, reviews: 198, description: "Built for high-intensity workouts with stable heel clip.",
  },
  {
    id: "27", name: "Silk Step", brand: "Adidas", price: 9999, originalPrice: 12999,
    image: shoe10, images: sets.P, category: "Casual", gender: "Women",
    colors: ["#FFFFFF", "#FF69B4"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.3, reviews: 389, description: "Silky-smooth leather upper for effortless elegance.",
  },
  {
    id: "28", name: "Nitro Rush", brand: "Puma", price: 18499,
    image: shoe1, images: sets.A, category: "Running", gender: "Men",
    colors: ["#FF6B35", "#FFFFFF"], sizes: [7, 8, 9, 10, 11],
    rating: 4.7, reviews: 112, description: "Nitrogen-infused foam for explosive energy return.",
    isTrending: true,
  },
  {
    id: "29", name: "Canvas Street OG", brand: "Nike", price: 7499,
    image: shoe7, images: sets.G, category: "Casual", gender: "Unisex",
    colors: ["#F5F0E8", "#1A1A2E"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.2, reviews: 712, description: "Canvas classic that never goes out of style.",
  },
  {
    id: "30", name: "Vortex Speed", brand: "Adidas", price: 21499,
    image: shoe11, images: sets.J, category: "Sports", gender: "Men",
    colors: ["#457B9D", "#E63946"], sizes: [8, 9, 10, 11, 12],
    rating: 4.8, reviews: 67, description: "Aerodynamic sprint shoe with carbon fiber shank.",
    isNew: true,
  },
  {
    id: "31", name: "Serenity Walk", brand: "Reebok", price: 8499,
    image: shoe10, images: sets.P, category: "Casual", gender: "Women",
    colors: ["#D4A574", "#FFFFFF"], sizes: [5, 6, 7, 8, 9],
    rating: 4.4, reviews: 456, description: "Cloud-like walking shoe for all-day serenity.",
  },
  {
    id: "32", name: "Thunder Dunk", brand: "Nike", price: 17499, originalPrice: 20999,
    image: shoe14, images: sets.M, category: "Sports", gender: "Men",
    colors: ["#E63946", "#1A1A2E", "#FFFFFF"], sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.7, reviews: 134, description: "High-flying basketball shoe with max cushion landing.",
    isTrending: true,
  },
  {
    id: "33", name: "Arctic Chill", brand: "Puma", price: 16999,
    image: shoe11, images: sets.B, category: "Running", gender: "Unisex",
    colors: ["#457B9D", "#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.5, reviews: 89, description: "Cold-weather runner with insulated lining.",
    isNew: true,
  },
  {
    id: "34", name: "Dawn Racer", brand: "Adidas", price: 12499,
    image: shoe12, images: sets.K, category: "Running", gender: "Women",
    colors: ["#FF6B35", "#FF69B4"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.6, reviews: 256, description: "Sunrise-inspired colorway with tempo-day cushion.",
  },
  {
    id: "35", name: "Stealth Ops", brand: "Nike", price: 23999,
    image: shoe16, images: sets.O, category: "Sports", gender: "Men",
    colors: ["#1A1A2E"], sizes: [8, 9, 10, 11, 12],
    rating: 4.9, reviews: 34, description: "Tactical training shoe with reinforced toe box.",
    isNew: true,
  },
  {
    id: "36", name: "Daydream Slip", brand: "Reebok", price: 6499,
    image: shoe3, images: sets.C, category: "Casual", gender: "Women",
    colors: ["#FF69B4", "#F5F0E8"], sizes: [5, 6, 7, 8, 9],
    rating: 4.1, reviews: 478, description: "Easy slip-on design for effortless daily wear.",
  },
  {
    id: "37", name: "Fusion React", brand: "Puma", price: 15999,
    image: shoe4, images: sets.D, category: "Running", gender: "Men",
    colors: ["#2D6A4F", "#FF6B35"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7, reviews: 145, description: "React foam core fused with lightweight mesh upper.",
  },
  {
    id: "38", name: "Velvet Touch", brand: "Adidas", price: 11499, originalPrice: 14999,
    image: shoe10, images: sets.P, category: "Casual", gender: "Women",
    colors: ["#D4A574", "#FFFFFF"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.4, reviews: 312, description: "Suede-touch finish with memory foam insole.",
  },
  {
    id: "39", name: "Bolt Lightning", brand: "Nike", price: 19499,
    image: shoe15, images: sets.N, category: "Sports", gender: "Unisex",
    colors: ["#FF6B35", "#1A1A2E", "#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.6, reviews: 167, description: "Electric performance shoe for multi-sport athletes.",
    isTrending: true,
  },
  {
    id: "40", name: "Horizon Trek", brand: "Reebok", price: 17999,
    image: shoe13, images: sets.L, category: "Running", gender: "Men",
    colors: ["#2D6A4F", "#457B9D"], sizes: [8, 9, 10, 11, 12],
    rating: 4.8, reviews: 78, description: "Explore beyond limits with durable outsole and support.",
    isNew: true,
  },
];

export const categories = [
  { name: "Men", icon: "👟" },
  { name: "Women", icon: "👠" },
  { name: "Kids", icon: "🧒" },
  { name: "Running", icon: "🏃" },
  { name: "Casual", icon: "😎" },
  { name: "Sports", icon: "⚽" },
];

export const brands = ["Nike", "Adidas", "Puma", "Reebok"];
