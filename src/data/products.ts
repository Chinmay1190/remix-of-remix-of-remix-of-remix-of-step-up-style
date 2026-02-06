import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";
import shoe4 from "@/assets/shoe-4.jpg";
import shoe5 from "@/assets/shoe-5.jpg";
import shoe6 from "@/assets/shoe-6.jpg";
import shoe7 from "@/assets/shoe-7.jpg";
import shoe8 from "@/assets/shoe-8.jpg";

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

export const products: Product[] = [
  {
    id: "1",
    name: "Air Velocity Pro",
    brand: "Nike",
    price: 15999,
    originalPrice: 19999,
    image: shoe1,
    images: [shoe1, shoe2, shoe3, shoe4, shoe5, shoe6, shoe7, shoe8],
    category: "Running",
    gender: "Men",
    colors: ["#FF6B35", "#FFFFFF", "#1A1A2E"],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    rating: 4.8,
    reviews: 342,
    description: "Engineered for speed with responsive cushioning and a breathable mesh upper. The Air Velocity Pro delivers unmatched performance on every run.",
    isTrending: true,
    isNew: true,
  },
  {
    id: "2",
    name: "UltraBoost X",
    brand: "Adidas",
    price: 16999,
    image: shoe2,
    images: [shoe2, shoe1, shoe3, shoe5, shoe6, shoe7, shoe8, shoe4],
    category: "Sports",
    gender: "Men",
    colors: ["#1A1A2E", "#E63946"],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7,
    reviews: 218,
    description: "Maximum energy return with Boost technology. Built for athletes who demand the best from their footwear.",
    isTrending: true,
  },
  {
    id: "3",
    name: "CloudWalk Lite",
    brand: "Puma",
    price: 10999,
    originalPrice: 13999,
    image: shoe3,
    images: [shoe3, shoe4, shoe5, shoe6, shoe1, shoe2, shoe7, shoe8],
    category: "Casual",
    gender: "Unisex",
    colors: ["#457B9D", "#FFFFFF"],
    sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.5,
    reviews: 156,
    description: "Lightweight comfort meets everyday style. Perfect for casual outings and all-day wear.",
    isTrending: true,
  },
  {
    id: "4",
    name: "TrailBlazer GTX",
    brand: "Nike",
    price: 18999,
    image: shoe4,
    images: [shoe4, shoe5, shoe6, shoe7, shoe8, shoe1, shoe2, shoe3],
    category: "Running",
    gender: "Men",
    colors: ["#2D6A4F", "#FFFFFF"],
    sizes: [8, 9, 10, 11, 12],
    rating: 4.9,
    reviews: 89,
    description: "Conquer any terrain with aggressive traction and waterproof protection. Trail running redefined.",
    isNew: true,
  },
  {
    id: "5",
    name: "Royal Luxe High",
    brand: "Reebok",
    price: 21999,
    image: shoe5,
    images: [shoe5, shoe6, shoe7, shoe8, shoe1, shoe2, shoe3, shoe4],
    category: "Sports",
    gender: "Men",
    colors: ["#D4A574", "#1A1A2E"],
    sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.6,
    reviews: 67,
    description: "Premium materials and iconic design. The Royal Luxe makes a statement on and off the court.",
  },
  {
    id: "6",
    name: "FreeRun Bliss",
    brand: "Nike",
    price: 13999,
    image: shoe6,
    images: [shoe6, shoe7, shoe8, shoe1, shoe2, shoe3, shoe4, shoe5],
    category: "Running",
    gender: "Women",
    colors: ["#FF69B4", "#FFFFFF"],
    sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.8,
    reviews: 412,
    description: "Designed for the modern woman runner. Lightweight, flexible, and undeniably stylish.",
    isTrending: true,
  },
  {
    id: "7",
    name: "Retro Classic 77",
    brand: "Adidas",
    price: 8999,
    image: shoe7,
    images: [shoe7, shoe8, shoe1, shoe2, shoe3, shoe4, shoe5, shoe6],
    category: "Casual",
    gender: "Unisex",
    colors: ["#FF6B35", "#F5F0E8"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.4,
    reviews: 523,
    description: "Vintage-inspired design with modern comfort. A timeless silhouette for any wardrobe.",
  },
  {
    id: "8",
    name: "Pure White Essential",
    brand: "Puma",
    price: 11999,
    image: shoe8,
    images: [shoe8, shoe1, shoe2, shoe3, shoe4, shoe5, shoe6, shoe7],
    category: "Casual",
    gender: "Unisex",
    colors: ["#FFFFFF"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.3,
    reviews: 289,
    description: "Clean, minimal, and versatile. The perfect everyday sneaker that goes with everything.",
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
