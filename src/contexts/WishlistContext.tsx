import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Sync wishlist from database when user logs in
  useEffect(() => {
    if (user) {
      fetchWishlist();
      
      // Subscribe to realtime updates
      const channel = supabase
        .channel('wishlists')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'wishlists',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            fetchWishlist();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      // Load from localStorage when not logged in
      const saved = localStorage.getItem("wishlist");
      setWishlist(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // Save to localStorage when wishlist changes (for non-logged in users)
  useEffect(() => {
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const fetchWishlist = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("wishlists")
      .select("product_id")
      .eq("user_id", user.id);

    if (!error && data) {
      setWishlist(data.map((item) => item.product_id));
    }
    setLoading(false);
  };

  const toggleWishlist = async (productId: string) => {
    const isWishlisted = wishlist.includes(productId);

    // Optimistic update for all users
    setWishlist((prev) =>
      isWishlisted
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    if (user) {
      // Sync with database for logged in users
      const { error } = isWishlisted
        ? await supabase
            .from("wishlists")
            .delete()
            .eq("user_id", user.id)
            .eq("product_id", productId)
        : await supabase
            .from("wishlists")
            .insert({ user_id: user.id, product_id: productId });

      // Revert on error
      if (error) {
        setWishlist((prev) =>
          isWishlisted
            ? [...prev, productId]
            : prev.filter((id) => id !== productId)
        );
      }
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
