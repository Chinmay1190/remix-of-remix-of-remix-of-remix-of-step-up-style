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
import shoeKids1 from "@/assets/shoe-kids-1.jpg";
import shoeKids2 from "@/assets/shoe-kids-2.jpg";
import shoeKids3 from "@/assets/shoe-kids-3.jpg";
import shoeKids4 from "@/assets/shoe-kids-4.jpg";

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

// Visually-consistent image sets
const sets = {
  A: [shoe1, shoe9, shoe16, shoe4],
  B: [shoe2, shoe11, shoe9, shoe16],
  C: [shoe3, shoe10, shoe15, shoe7],
  D: [shoe4, shoe13, shoe9, shoe1],
  E: [shoe5, shoe14, shoe15, shoe7],
  F: [shoe6, shoe12, shoe10, shoe3],
  G: [shoe7, shoe15, shoe10, shoe3],
  H: [shoe8, shoe10, shoe16, shoe7],
  I: [shoe9, shoe16, shoe11, shoe4],
  J: [shoe11, shoe9, shoe4, shoe16],
  K: [shoe12, shoe6, shoe10, shoe3],
  L: [shoe13, shoe4, shoe9, shoe1],
  M: [shoe14, shoe5, shoe15, shoe7],
  N: [shoe15, shoe7, shoe10, shoe3],
  O: [shoe16, shoe9, shoe11, shoe1],
  P: [shoe10, shoe8, shoe7, shoe15],
  // Kids sets
  KA: [shoeKids1, shoeKids3, shoeKids4, shoeKids2],
  KB: [shoeKids2, shoeKids1, shoeKids4, shoeKids3],
  KC: [shoeKids3, shoeKids1, shoeKids2, shoeKids4],
  KD: [shoeKids4, shoeKids2, shoeKids1, shoeKids3],
};

export const products: Product[] = [
  // ==================== NIKE ====================
  // Nike – Men – Running
  {
    id: "1", name: "Air Velocity Pro", brand: "Nike", price: 15999, originalPrice: 19999,
    image: shoe1, images: sets.A, category: "Running", gender: "Men",
    colors: ["#FF6B35", "#FFFFFF", "#1A1A2E"], sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    rating: 4.8, reviews: 342, description: "Engineered for speed with responsive cushioning and a breathable mesh upper.",
    isTrending: true, isNew: true,
  },
  // Nike – Men – Running
  {
    id: "4", name: "TrailBlazer GTX", brand: "Nike", price: 18999,
    image: shoe13, images: sets.L, category: "Running", gender: "Men",
    colors: ["#2D6A4F", "#FFFFFF"], sizes: [8, 9, 10, 11, 12],
    rating: 4.9, reviews: 89, description: "Conquer any terrain with aggressive traction and waterproof protection.",
    isNew: true,
  },
  // Nike – Women – Running
  {
    id: "6", name: "FreeRun Bliss", brand: "Nike", price: 13999,
    image: shoe12, images: sets.K, category: "Running", gender: "Women",
    colors: ["#FF69B4", "#FFFFFF"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.8, reviews: 412, description: "Designed for the modern woman runner. Lightweight and stylish.",
    isTrending: true,
  },
  // Nike – Men – Sports
  {
    id: "16", name: "Phantom Elite", brand: "Nike", price: 24999,
    image: shoe16, images: sets.O, category: "Sports", gender: "Men",
    colors: ["#1A1A2E"], sizes: [8, 9, 10, 11, 12],
    rating: 4.9, reviews: 156, description: "Elite-level performance shoe for professional athletes.",
    isNew: true,
  },
  // Nike – Women – Sports
  {
    id: "22", name: "Prism Trainer", brand: "Nike", price: 11999,
    image: shoe12, images: sets.K, category: "Sports", gender: "Women",
    colors: ["#D4A574", "#FF69B4"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.4, reviews: 345, description: "Versatile gym trainer with multi-surface grip.",
  },
  // Nike – Unisex – Casual
  {
    id: "29", name: "Canvas Street OG", brand: "Nike", price: 7499,
    image: shoe7, images: sets.G, category: "Casual", gender: "Unisex",
    colors: ["#F5F0E8", "#1A1A2E"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.2, reviews: 712, description: "Canvas classic that never goes out of style.",
  },
  // Nike – Men – Running
  {
    id: "9", name: "Blaze Runner X1", brand: "Nike", price: 14999, originalPrice: 17999,
    image: shoe9, images: sets.I, category: "Running", gender: "Men",
    colors: ["#E63946", "#1A1A2E"], sizes: [7, 8, 9, 10, 11],
    rating: 4.6, reviews: 198, description: "Explosive speed meets all-day comfort with Blaze cushioning.",
    isNew: true,
  },
  // Nike – Men – Running
  {
    id: "12", name: "Storm Surge Pro", brand: "Nike", price: 22999, originalPrice: 26999,
    image: shoe16, images: sets.O, category: "Running", gender: "Men",
    colors: ["#1A1A2E", "#FF6B35"], sizes: [8, 9, 10, 11, 12],
    rating: 4.9, reviews: 42, description: "Dominate wet conditions with waterproof Storm technology.",
    isNew: true,
  },
  // Nike – Women – Running
  {
    id: "19", name: "Luna Glow", brand: "Nike", price: 15499,
    image: shoe6, images: sets.F, category: "Running", gender: "Women",
    colors: ["#FF69B4", "#457B9D"], sizes: [5, 6, 7, 8, 9],
    rating: 4.6, reviews: 278, description: "Night-ready runner with luminous accents and plush ride.",
    isTrending: true,
  },
  // Nike – Men – Running
  {
    id: "25", name: "Apex Trail Ultra", brand: "Nike", price: 20999,
    image: shoe13, images: sets.L, category: "Running", gender: "Men",
    colors: ["#2D6A4F", "#FF6B35"], sizes: [8, 9, 10, 11, 12],
    rating: 4.8, reviews: 54, description: "Ultra-distance trail shoe with rock plate protection.",
    isNew: true,
  },
  // Nike – Men – Sports
  {
    id: "32", name: "Thunder Dunk", brand: "Nike", price: 17499, originalPrice: 20999,
    image: shoe14, images: sets.M, category: "Sports", gender: "Men",
    colors: ["#E63946", "#1A1A2E", "#FFFFFF"], sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.7, reviews: 134, description: "High-flying basketball shoe with max cushion landing.",
    isTrending: true,
  },
  // Nike – Men – Sports
  {
    id: "35", name: "Stealth Ops", brand: "Nike", price: 23999,
    image: shoe16, images: sets.O, category: "Sports", gender: "Men",
    colors: ["#1A1A2E"], sizes: [8, 9, 10, 11, 12],
    rating: 4.9, reviews: 34, description: "Tactical training shoe with reinforced toe box.",
    isNew: true,
  },
  // Nike – Unisex – Sports
  {
    id: "39", name: "Bolt Lightning", brand: "Nike", price: 19499,
    image: shoe15, images: sets.N, category: "Sports", gender: "Unisex",
    colors: ["#FF6B35", "#1A1A2E", "#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.6, reviews: 167, description: "Electric performance shoe for multi-sport athletes.",
    isTrending: true,
  },
  // Nike – Kids – Running
  {
    id: "41", name: "Little Zoom Dash", brand: "Nike", price: 5999, originalPrice: 7499,
    image: shoeKids1, images: sets.KA, category: "Running", gender: "Kids",
    colors: ["#457B9D", "#2D6A4F"], sizes: [1, 2, 3, 4, 5],
    rating: 4.7, reviews: 223, description: "Lightweight kids' runner with velcro straps and cushioned sole for active play.",
    isNew: true, isTrending: true,
  },
  // Nike – Kids – Sports
  {
    id: "42", name: "Jr Court Force", brand: "Nike", price: 6499,
    image: shoeKids3, images: sets.KC, category: "Sports", gender: "Kids",
    colors: ["#E63946", "#1A1A2E"], sizes: [1, 2, 3, 4, 5, 6],
    rating: 4.6, reviews: 189, description: "Built for little athletes who love the court. Durable and supportive.",
  },
  // Nike – Kids – Casual
  {
    id: "43", name: "Tiny Air Classic", brand: "Nike", price: 4999,
    image: shoeKids4, images: sets.KD, category: "Casual", gender: "Kids",
    colors: ["#FFD700", "#FFFFFF"], sizes: [1, 2, 3, 4, 5],
    rating: 4.5, reviews: 312, description: "Iconic style scaled down for little feet. Easy on, easy off.",
  },

  // ==================== ADIDAS ====================
  // Adidas – Men – Sports
  {
    id: "2", name: "UltraBoost X", brand: "Adidas", price: 16999,
    image: shoe2, images: sets.B, category: "Sports", gender: "Men",
    colors: ["#1A1A2E", "#E63946"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7, reviews: 218, description: "Maximum energy return with Boost technology. Built for athletes.",
    isTrending: true,
  },
  // Adidas – Unisex – Casual
  {
    id: "7", name: "Retro Classic 77", brand: "Adidas", price: 8999,
    image: shoe15, images: sets.N, category: "Casual", gender: "Unisex",
    colors: ["#FF6B35", "#F5F0E8"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.4, reviews: 523, description: "Vintage-inspired design with modern comfort.",
  },
  // Adidas – Men – Sports
  {
    id: "10", name: "Galaxy Foam 360", brand: "Adidas", price: 19999,
    image: shoe11, images: sets.J, category: "Sports", gender: "Men",
    colors: ["#457B9D", "#FFFFFF", "#1A1A2E"], sizes: [8, 9, 10, 11, 12],
    rating: 4.8, reviews: 76, description: "360-degree foam technology for unparalleled court performance.",
    isTrending: true,
  },
  // Adidas – Women – Running
  {
    id: "14", name: "Dusk Runner SE", brand: "Adidas", price: 13499,
    image: shoe12, images: sets.K, category: "Running", gender: "Women",
    colors: ["#E63946", "#FFFFFF"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.7, reviews: 231, description: "Engineered for twilight runs with reflective accents.",
    isTrending: true,
  },
  // Adidas – Men – Running
  {
    id: "18", name: "Turbo Sprint", brand: "Adidas", price: 17999,
    image: shoe9, images: sets.I, category: "Running", gender: "Men",
    colors: ["#FF6B35", "#1A1A2E"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7, reviews: 123, description: "Carbon-plated sprint shoe for competitive racers.",
  },
  // Adidas – Men – Running
  {
    id: "23", name: "Shadow Edge", brand: "Adidas", price: 16499,
    image: shoe11, images: sets.J, category: "Running", gender: "Men",
    colors: ["#1A1A2E", "#2D6A4F"], sizes: [7, 8, 9, 10, 11],
    rating: 4.6, reviews: 167, description: "Stealth design meets responsive road performance.",
  },
  // Adidas – Women – Casual
  {
    id: "27", name: "Silk Step", brand: "Adidas", price: 9999, originalPrice: 12999,
    image: shoe10, images: sets.P, category: "Casual", gender: "Women",
    colors: ["#FFFFFF", "#FF69B4"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.3, reviews: 389, description: "Silky-smooth leather upper for effortless elegance.",
  },
  // Adidas – Men – Sports
  {
    id: "30", name: "Vortex Speed", brand: "Adidas", price: 21499,
    image: shoe11, images: sets.J, category: "Sports", gender: "Men",
    colors: ["#457B9D", "#E63946"], sizes: [8, 9, 10, 11, 12],
    rating: 4.8, reviews: 67, description: "Aerodynamic sprint shoe with carbon fiber shank.",
    isNew: true,
  },
  // Adidas – Women – Running
  {
    id: "34", name: "Dawn Racer", brand: "Adidas", price: 12499,
    image: shoe12, images: sets.K, category: "Running", gender: "Women",
    colors: ["#FF6B35", "#FF69B4"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.6, reviews: 256, description: "Sunrise-inspired colorway with tempo-day cushion.",
  },
  // Adidas – Women – Casual
  {
    id: "38", name: "Velvet Touch", brand: "Adidas", price: 11499, originalPrice: 14999,
    image: shoe10, images: sets.P, category: "Casual", gender: "Women",
    colors: ["#D4A574", "#FFFFFF"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.4, reviews: 312, description: "Suede-touch finish with memory foam insole.",
  },
  // Adidas – Women – Sports (NEW)
  {
    id: "44", name: "Predator Flex W", brand: "Adidas", price: 14499,
    image: shoe6, images: sets.F, category: "Sports", gender: "Women",
    colors: ["#FF69B4", "#1A1A2E"], sizes: [5, 6, 7, 8, 9],
    rating: 4.5, reviews: 178, description: "Dynamic court shoe for women who dominate every game.",
  },
  // Adidas – Kids – Running
  {
    id: "45", name: "FortaRun Junior", brand: "Adidas", price: 4999, originalPrice: 6499,
    image: shoeKids2, images: sets.KB, category: "Running", gender: "Kids",
    colors: ["#FF69B4", "#9B59B6"], sizes: [1, 2, 3, 4, 5],
    rating: 4.6, reviews: 267, description: "Fun and flexible running shoe for energetic kids. Easy velcro closure.",
    isNew: true,
  },
  // Adidas – Kids – Sports
  {
    id: "46", name: "Tensaur Play K", brand: "Adidas", price: 5499,
    image: shoeKids3, images: sets.KC, category: "Sports", gender: "Kids",
    colors: ["#E63946", "#1A1A2E"], sizes: [1, 2, 3, 4, 5, 6],
    rating: 4.4, reviews: 198, description: "Multi-sport kids shoe with reinforced toe cap for rough play.",
    isTrending: true,
  },
  // Adidas – Kids – Casual
  {
    id: "47", name: "Grand Court Mini", brand: "Adidas", price: 3999,
    image: shoeKids4, images: sets.KD, category: "Casual", gender: "Kids",
    colors: ["#FFD700", "#FFFFFF"], sizes: [1, 2, 3, 4, 5],
    rating: 4.3, reviews: 345, description: "Classic 3-stripe design made for little adventurers.",
  },

  // ==================== PUMA ====================
  // Puma – Unisex – Casual
  {
    id: "3", name: "CloudWalk Lite", brand: "Puma", price: 10999, originalPrice: 13999,
    image: shoe3, images: sets.C, category: "Casual", gender: "Unisex",
    colors: ["#457B9D", "#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.5, reviews: 156, description: "Lightweight comfort meets everyday style.",
    isTrending: true,
  },
  // Puma – Unisex – Casual
  {
    id: "8", name: "Pure White Essential", brand: "Puma", price: 11999,
    image: shoe10, images: sets.P, category: "Casual", gender: "Unisex",
    colors: ["#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.3, reviews: 289, description: "Clean, minimal, and versatile everyday sneaker.",
  },
  // Puma – Unisex – Casual
  {
    id: "11", name: "Zen Walker", brand: "Puma", price: 7999,
    image: shoe7, images: sets.G, category: "Casual", gender: "Unisex",
    colors: ["#2D6A4F", "#F5F0E8"], sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.2, reviews: 344, description: "Minimalist design for those who value simplicity.",
  },
  // Puma – Men – Casual
  {
    id: "15", name: "Heritage Court", brand: "Puma", price: 9499,
    image: shoe10, images: sets.P, category: "Casual", gender: "Men",
    colors: ["#FFFFFF", "#2D6A4F"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.3, reviews: 412, description: "Classic court style reimagined for the streets.",
  },
  // Puma – Unisex – Casual
  {
    id: "20", name: "Metro Slide Pro", brand: "Puma", price: 5999,
    image: shoe8, images: sets.H, category: "Casual", gender: "Unisex",
    colors: ["#1A1A2E", "#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.0, reviews: 634, description: "Urban slip-on perfection for the commuter lifestyle.",
  },
  // Puma – Women – Casual
  {
    id: "24", name: "Bloom Garden", brand: "Puma", price: 10499,
    image: shoe6, images: sets.F, category: "Casual", gender: "Women",
    colors: ["#FF69B4", "#F5F0E8", "#2D6A4F"], sizes: [5, 6, 7, 8, 9],
    rating: 4.5, reviews: 203, description: "Floral-inspired casual shoe for spring vibes.",
  },
  // Puma – Men – Running
  {
    id: "28", name: "Nitro Rush", brand: "Puma", price: 18499,
    image: shoe1, images: sets.A, category: "Running", gender: "Men",
    colors: ["#FF6B35", "#FFFFFF"], sizes: [7, 8, 9, 10, 11],
    rating: 4.7, reviews: 112, description: "Nitrogen-infused foam for explosive energy return.",
    isTrending: true,
  },
  // Puma – Unisex – Running
  {
    id: "33", name: "Arctic Chill", brand: "Puma", price: 16999,
    image: shoe11, images: sets.B, category: "Running", gender: "Unisex",
    colors: ["#457B9D", "#FFFFFF"], sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.5, reviews: 89, description: "Cold-weather runner with insulated lining.",
    isNew: true,
  },
  // Puma – Men – Running
  {
    id: "37", name: "Fusion React", brand: "Puma", price: 15999,
    image: shoe4, images: sets.D, category: "Running", gender: "Men",
    colors: ["#2D6A4F", "#FF6B35"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7, reviews: 145, description: "React foam core fused with lightweight mesh upper.",
  },
  // Puma – Women – Sports (NEW)
  {
    id: "48", name: "Carina Ace W", brand: "Puma", price: 8999,
    image: shoe6, images: sets.F, category: "Sports", gender: "Women",
    colors: ["#FF69B4", "#FFFFFF"], sizes: [5, 6, 7, 8, 9],
    rating: 4.4, reviews: 201, description: "Sporty silhouette with soft cushioning for gym and beyond.",
  },
  // Puma – Men – Sports (NEW)
  {
    id: "49", name: "Cell Vigor", brand: "Puma", price: 13999,
    image: shoe9, images: sets.I, category: "Sports", gender: "Men",
    colors: ["#E63946", "#1A1A2E"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.6, reviews: 134, description: "CELL technology heel unit for max stability during training.",
  },
  // Puma – Kids – Running
  {
    id: "50", name: "Fun Racer Junior", brand: "Puma", price: 4499,
    image: shoeKids1, images: sets.KA, category: "Running", gender: "Kids",
    colors: ["#457B9D", "#2D6A4F"], sizes: [1, 2, 3, 4, 5],
    rating: 4.5, reviews: 234, description: "Colorful and comfy running shoe designed for playground speed.",
    isNew: true,
  },
  // Puma – Kids – Sports
  {
    id: "51", name: "Rebound Joy Kids", brand: "Puma", price: 5999, originalPrice: 7499,
    image: shoeKids3, images: sets.KC, category: "Sports", gender: "Kids",
    colors: ["#E63946", "#1A1A2E", "#FFFFFF"], sizes: [1, 2, 3, 4, 5, 6],
    rating: 4.6, reviews: 178, description: "High-top kids' sneaker with ankle support for active sports.",
    isTrending: true,
  },
  // Puma – Kids – Casual
  {
    id: "52", name: "Smash Fun V", brand: "Puma", price: 3499,
    image: shoeKids2, images: sets.KB, category: "Casual", gender: "Kids",
    colors: ["#FF69B4", "#9B59B6"], sizes: [1, 2, 3, 4, 5],
    rating: 4.3, reviews: 289, description: "Easy-on velcro casual shoe in fun pastel colors for everyday wear.",
  },

  // ==================== REEBOK ====================
  // Reebok – Men – Sports
  {
    id: "5", name: "Royal Luxe High", brand: "Reebok", price: 21999,
    image: shoe14, images: sets.M, category: "Sports", gender: "Men",
    colors: ["#D4A574", "#1A1A2E"], sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.6, reviews: 67, description: "Premium materials and iconic design for on and off the court.",
  },
  // Reebok – Women – Sports
  {
    id: "13", name: "Aura Flex Knit", brand: "Reebok", price: 12999,
    image: shoe6, images: sets.F, category: "Sports", gender: "Women",
    colors: ["#FF69B4", "#D4A574"], sizes: [5, 6, 7, 8, 9],
    rating: 4.5, reviews: 187, description: "Flexible knit upper that moves with your every step.",
  },
  // Reebok – Unisex – Casual
  {
    id: "17", name: "Breeze Low Top", brand: "Reebok", price: 6999, originalPrice: 8999,
    image: shoe15, images: sets.N, category: "Casual", gender: "Unisex",
    colors: ["#457B9D", "#F5F0E8"], sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.1, reviews: 567, description: "Breezy comfort for warm-weather adventures.",
  },
  // Reebok – Men – Sports
  {
    id: "21", name: "Titan Force Mid", brand: "Reebok", price: 19999, originalPrice: 23999,
    image: shoe14, images: sets.M, category: "Sports", gender: "Men",
    colors: ["#E63946", "#FFFFFF", "#1A1A2E"], sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.8, reviews: 91, description: "Mid-top basketball shoe with ankle lockdown system.",
    isNew: true,
  },
  // Reebok – Men – Sports
  {
    id: "26", name: "Crossfit Blitz", brand: "Reebok", price: 14499,
    image: shoe9, images: sets.I, category: "Sports", gender: "Men",
    colors: ["#E63946", "#1A1A2E"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7, reviews: 198, description: "Built for high-intensity workouts with stable heel clip.",
  },
  // Reebok – Women – Casual
  {
    id: "31", name: "Serenity Walk", brand: "Reebok", price: 8499,
    image: shoe10, images: sets.P, category: "Casual", gender: "Women",
    colors: ["#D4A574", "#FFFFFF"], sizes: [5, 6, 7, 8, 9],
    rating: 4.4, reviews: 456, description: "Cloud-like walking shoe for all-day serenity.",
  },
  // Reebok – Women – Casual
  {
    id: "36", name: "Daydream Slip", brand: "Reebok", price: 6499,
    image: shoe3, images: sets.C, category: "Casual", gender: "Women",
    colors: ["#FF69B4", "#F5F0E8"], sizes: [5, 6, 7, 8, 9],
    rating: 4.1, reviews: 478, description: "Easy slip-on design for effortless daily wear.",
  },
  // Reebok – Men – Running
  {
    id: "40", name: "Horizon Trek", brand: "Reebok", price: 17999,
    image: shoe13, images: sets.L, category: "Running", gender: "Men",
    colors: ["#2D6A4F", "#457B9D"], sizes: [8, 9, 10, 11, 12],
    rating: 4.8, reviews: 78, description: "Explore beyond limits with durable outsole and support.",
    isNew: true,
  },
  // Reebok – Women – Running (NEW)
  {
    id: "53", name: "FloatRide Femme", brand: "Reebok", price: 12999,
    image: shoe12, images: sets.K, category: "Running", gender: "Women",
    colors: ["#FF69B4", "#FFFFFF"], sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.6, reviews: 156, description: "Ultra-light women's runner with FloatRide Energy foam.",
    isNew: true,
  },
  // Reebok – Men – Casual (NEW)
  {
    id: "54", name: "Club C Legacy", brand: "Reebok", price: 7999,
    image: shoe7, images: sets.G, category: "Casual", gender: "Men",
    colors: ["#FFFFFF", "#2D6A4F"], sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.3, reviews: 534, description: "Timeless court-inspired casual shoe. A true Reebok icon.",
  },
  // Reebok – Kids – Running
  {
    id: "55", name: "Rush Runner Jr", brand: "Reebok", price: 4499, originalPrice: 5999,
    image: shoeKids3, images: sets.KC, category: "Running", gender: "Kids",
    colors: ["#E63946", "#1A1A2E"], sizes: [1, 2, 3, 4, 5],
    rating: 4.5, reviews: 198, description: "Lightweight and durable kids' runner with easy lace-up design.",
    isTrending: true,
  },
  // Reebok – Kids – Sports
  {
    id: "56", name: "XT Sprinter Jr", brand: "Reebok", price: 5499,
    image: shoeKids1, images: sets.KA, category: "Sports", gender: "Kids",
    colors: ["#457B9D", "#2D6A4F", "#FFFFFF"], sizes: [1, 2, 3, 4, 5, 6],
    rating: 4.4, reviews: 167, description: "Multi-sport kids shoe built to keep up with active lifestyles.",
    isNew: true,
  },
  // Reebok – Kids – Casual
  {
    id: "57", name: "Royal Complete Jr", brand: "Reebok", price: 3999,
    image: shoeKids4, images: sets.KD, category: "Casual", gender: "Kids",
    colors: ["#FFD700", "#FFFFFF"], sizes: [1, 2, 3, 4, 5],
    rating: 4.2, reviews: 245, description: "Clean and simple everyday shoe for kids who love classic style.",
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
