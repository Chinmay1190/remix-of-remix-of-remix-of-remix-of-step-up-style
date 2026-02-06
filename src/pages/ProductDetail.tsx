import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, ArrowLeft, Minus, Plus, Check } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/ProductCard";
import ProductViewer360 from "@/components/ProductViewer360";
import { formatPrice } from "@/lib/currency";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<"gallery" | "360">("360");
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="pt-24 pb-16 section-padding text-center">
        <p className="text-muted-foreground text-lg">Product not found.</p>
        <Link to="/products" className="text-primary hover:underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-7xl mx-auto">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            {/* View mode toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setViewMode("360")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  viewMode === "360" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-muted"
                }`}
              >
                360° View
              </button>
              <button
                onClick={() => setViewMode("gallery")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  viewMode === "gallery" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-muted"
                }`}
              >
                Gallery
              </button>
            </div>

            {viewMode === "360" ? (
              <ProductViewer360 images={product.images} productName={product.name} />
            ) : (
              <>
                <div className="rounded-3xl overflow-hidden bg-secondary mb-4">
                  <img src={product.images[selectedImage]} alt={product.name} className="w-full aspect-square object-cover" />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div>
              <h3 className="font-display font-semibold text-sm mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === color ? "border-foreground scale-110" : "border-border"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && <Check className="w-4 h-4" style={{ color: color === "#FFFFFF" || color === "#F5F0E8" ? "#000" : "#fff" }} />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-sm mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-10 rounded-lg text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-muted"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-secondary rounded-full">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-primary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-primary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider rounded-full btn-primary-glow hover:scale-[1.02] transition-transform"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>

              <button
                onClick={() => { toggleWishlist(product.id); toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
                className={`p-4 rounded-full border-2 transition-all ${wishlisted ? "border-primary bg-primary/10" : "border-border hover:border-primary"}`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-primary text-primary" : ""}`} />
              </button>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold tracking-tight mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
