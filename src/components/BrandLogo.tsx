interface BrandLogoProps {
  brand: string;
  className?: string;
  showName?: boolean;
}

const brandLogos: Record<string, { svg: React.ReactNode; color: string }> = {
  Nike: {
    color: "#111",
    svg: (
      <svg viewBox="0 0 100 35" fill="currentColor" className="w-full h-full">
        <path d="M21.1 35c-1.5 0-2.9-.5-4.1-1.5L0 18.5l2.5-2.8 13.8 12.2c.6.5 1.3.8 2.1.8.6 0 1.2-.2 1.8-.5L97.5 0l1.5 3L22.8 34.2c-.5.5-1.1.7-1.7.8z" />
      </svg>
    ),
  },
  Adidas: {
    color: "#000",
    svg: (
      <svg viewBox="0 0 100 60" fill="currentColor" className="w-full h-full">
        <path d="M0 60V35l35-35h15L0 60zm25 0V40l25-25h15L25 60zm25 0V45l20-20h15L50 60z" />
      </svg>
    ),
  },
  Puma: {
    color: "#E4002B",
    svg: (
      <svg viewBox="0 0 100 40" fill="currentColor" className="w-full h-full">
        <path d="M86 0c-8 0-14 6-14 14v12H60c-2 0-4-2-4-4V10c0-6-4-10-10-10H26C12 0 0 12 0 26v14h14V26c0-6 6-12 12-12h14c6 0 10 4 10 10v12c0 2-2 4-4 4H32c-6 0-10-4-10-10v-4H8v4c0 14 10 24 24 24h18c14 0 24-10 24-24V14c0-2 2-4 4-4h8V0h-0z" />
      </svg>
    ),
  },
  Reebok: {
    color: "#CC0000",
    svg: (
      <svg viewBox="0 0 100 40" fill="currentColor" className="w-full h-full">
        <path d="M0 0h20l25 20L20 40H0l25-20L0 0zm35 0h20l25 20-25 20H35l25-20L35 0zm35 0h30v8H82l8 12-8 12h18v8H70L50 20 70 0z" />
      </svg>
    ),
  },
};

const BrandLogo = ({ brand, className = "", showName = true }: BrandLogoProps) => {
  const logo = brandLogos[brand];

  if (!logo) {
    return (
      <span className={`font-display font-bold ${className}`}>{brand}</span>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 flex items-center justify-center" style={{ color: logo.color }}>
        {logo.svg}
      </div>
      {showName && (
        <span className="font-display font-bold text-sm uppercase tracking-wider">
          {brand}
        </span>
      )}
    </div>
  );
};

export default BrandLogo;
