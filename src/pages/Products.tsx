import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { products, brands, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (selectedCategory && p.category !== selectedCategory && p.gender !== selectedCategory) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return result;
  }, [selectedBrands, selectedCategory, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategory("");
    setPriceRange([0, 25000]);
  };

  const hasFilters = selectedBrands.length > 0 || selectedCategory || priceRange[0] > 0 || priceRange[1] < 25000;

  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-2">Shop All</h1>
          <p className="text-muted-foreground">{filtered.length} products</p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-full bg-secondary text-sm font-medium border-none outline-none"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {hasFilters && (
            <button onClick={clearFilters} className="inline-flex items-center gap-1 px-3 py-2 text-sm text-primary hover:underline">
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 p-6 rounded-2xl bg-secondary"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <h4 className="font-display font-semibold text-sm mb-3">Brand</h4>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        selectedBrands.includes(brand) ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        selectedCategory === cat.name ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm mb-3">Price Range</h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">₹{priceRange[0].toLocaleString("en-IN")}</span>
                  <input
                    type="range"
                    min={0}
                    max={25000}
                    step={500}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1 accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">₹{priceRange[1].toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products match your filters.</p>
            <button onClick={clearFilters} className="mt-4 text-primary hover:underline">Clear filters</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
