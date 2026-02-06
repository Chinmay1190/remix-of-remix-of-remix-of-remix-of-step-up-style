import { products } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, loading } = useWishlist();
  const { user } = useAuth();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (loading) {
    return (
      <main className="pt-24 pb-16 section-padding min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <main className="pt-24 pb-16 section-padding min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="font-display text-3xl font-bold mb-2">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-6">Save items you love by clicking the heart icon.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider rounded-full">
            Browse Products
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2">
            Wishlist ({wishlistProducts.length})
          </h1>
          {!user && (
            <p className="text-sm text-muted-foreground mb-8">
              <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to sync your wishlist across devices.
            </p>
          )}
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
