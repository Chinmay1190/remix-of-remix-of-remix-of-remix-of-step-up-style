// Currency formatting utility for Indian Rupees

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceCompact = (price: number): string => {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`;
  }
  if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1)}K`;
  }
  return formatPrice(price);
};

// Free shipping threshold in INR
export const FREE_SHIPPING_THRESHOLD = 5000;
export const SHIPPING_COST = 499;
