import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Play, Pause } from "lucide-react";

interface ProductViewer360Props {
  images: string[];
  productName: string;
}

const ProductViewer360 = ({ images, productName }: ProductViewer360Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalImages = images.length;

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
      }, 100);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalImages]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const sensitivity = 5;

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrentIndex((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return totalImages - 1;
        if (newIndex >= totalImages) return 0;
        return newIndex;
      });
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 5;

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrentIndex((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return totalImages - 1;
        if (newIndex >= totalImages) return 0;
        return newIndex;
      });
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setCurrentIndex(0);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="rounded-3xl overflow-hidden bg-secondary cursor-grab active:cursor-grabbing select-none relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${productName} - View ${currentIndex + 1}`}
          className="w-full aspect-square object-cover"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          draggable={false}
        />
        
        {/* 360° Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/80 text-background text-xs font-medium backdrop-blur-sm">
          <RotateCcw className="w-3 h-3" />
          360°
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentIndex ? "bg-primary" : "bg-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Instructions overlay */}
        {!isDragging && !isAutoPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-foreground/60"
            >
              <RotateCcw className="w-8 h-8 mx-auto mb-2 animate-pulse" />
              <p className="text-sm font-medium">Drag to rotate</p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-4 h-4" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Auto Rotate
            </>
          )}
        </button>
        <button
          onClick={resetView}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-muted transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  );
};

export default ProductViewer360;
