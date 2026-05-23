import { useState } from 'react';
import { Product, CurrencyConfig } from '../types';
import { X, ShoppingBag, Plus, Minus, Check, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string) => void;
  onBuyNow?: (product: Product, size?: string) => void;
  selectedCurrency: CurrencyConfig;
  formatPrice: (price: number) => string;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  selectedCurrency,
  formatPrice,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  
  // Custom mock high-contrast colors matching Screen 2 palette & monochrome theme
  const MONOCHROME_COLORS = [
    { name: 'Pitch Black', hex: '#000000', border: 'border-zinc-300' },
    { name: 'Carbon Grey', hex: '#666666', border: 'border-zinc-300' },
    { name: 'Chalk White', hex: '#F4F4F5', border: 'border-black/35' }
  ];
  const [selectedColor, setSelectedColor] = useState('Pitch Black');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize || undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleImmediatePurchase = () => {
    if (onBuyNow) {
      onBuyNow(product, selectedSize || undefined);
    } else {
      onAddToCart(product, selectedSize || undefined);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Container Box */}
      <div 
        id="product-detail-container"
        className="bg-white border-4 border-black w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto thin-scrollbar relative flex flex-col md:flex-row shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-fade-in"
      >
        {/* Sticky close btn: Sharp Square structure */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all cursor-pointer rounded-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Left Side: Images & Pagination Dots */}
        <div className="w-full md:w-1/2 bg-zinc-50 border-b-2 md:border-b-0 md:border-r-2 border-black p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="aspect-[4/5] w-full relative bg-white border-2 border-black overflow-hidden mb-3 rounded-none">
              <img
                src={product.images[activeImgIndex]}
                alt={`${product.name} active display`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Pagination Dots (Exactly as shown in Screen 2) */}
            <div className="flex justify-center gap-1.5 mb-4 mt-2">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  id={`dot-image-${idx}`}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeImgIndex ? 'w-5 bg-black' : 'w-2 bg-zinc-300'
                  }`}
                  aria-label={`Slide to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails Gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  id={`thumb-image-${idx}`}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-14 h-[70px] border-2 relative overflow-hidden transition-all ${
                    idx === activeImgIndex ? 'border-black scale-105' : 'border-zinc-300 hover:border-black'
                  }`}
                >
                  <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Purchase Info (Styled identically to Screen 2 of User Image description) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col bg-white text-black font-sans">
          
          {/* Header metadata label & rating */}
          <div className="flex items-center justify-between text-[11px] uppercase text-zinc-400 font-bold mb-1.5">
            <span>[ ATELIER ARCHIVES ]</span>
            <div className="flex items-center gap-1.5 text-black font-semibold bg-zinc-100 border border-black/10 px-2.5 py-1 font-mono">
              <span className="text-[10px] uppercase font-bold text-zinc-500">SCORE: {product.rating.toFixed(1)}</span>
              <span className="text-zinc-400 text-[10px] font-bold">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          {/* Product Title */}
          <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-black mb-1 font-sans">
            {product.name}
          </h2>

          {/* Pricing Details */}
          <div className="text-lg font-black text-black pb-4 border-b-2 border-black/10 mb-5">
            {formatPrice(product.price)} {selectedCurrency.code}
          </div>

          {/* Short description */}
          <p className="text-xs text-zinc-650 leading-relaxed font-sans mb-6">
            {product.description}
          </p>

          <div className="space-y-6">
            {/* Color Palette Node Section (Exactly as seen on Screen 2) */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-400 font-sans">
                <span>Selected Type / Color</span>
                <span className="text-black font-black lowercase">[ {selectedColor} ]</span>
              </div>
              <div className="flex gap-3 items-center">
                {MONOCHROME_COLORS.map((col) => (
                  <button
                    key={col.name}
                    id={`color-opt-${col.name.toLowerCase().replace(/\s/g, '-')}`}
                    type="button"
                    onClick={() => setSelectedColor(col.name)}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all relative ${
                      selectedColor === col.name ? 'border-black scale-105' : 'border-transparent hover:border-zinc-300'
                    }`}
                    title={col.name}
                  >
                    <div 
                      className={`w-full h-full rounded-full border ${col.border}`} 
                      style={{ backgroundColor: col.hex }}
                    />
                    {selectedColor === col.name && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-black border border-white text-white text-[8px] font-sans font-black flex items-center justify-center rounded-full">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-400 font-sans">
                  <span>Select Size Dimension</span>
                  <span className="text-black font-black">[ standard fit ]</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      id={`size-button-${size}`}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-black border-2 transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black hover:bg-black hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Stack: ADD TO BAG & BUY NOW buttons Side by Side */}
          <div className="mt-8 pt-6 border-t-2 border-black flex flex-col gap-3">
            {product.inStock ? (
              <div className="grid grid-cols-2 gap-3.5">
                {/* Outlined Add to Cart btn (Exactly as Screen 2's Outline style) */}
                <button
                  id="add-to-bag-cta"
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`py-3.5 px-4 text-xs font-black uppercase tracking-wider border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isAdded
                      ? 'bg-zinc-100 text-[#16a34a] border-[#16a34a]'
                      : 'bg-white text-black border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 stroke-[2.5]" /> Add To Bag
                    </>
                  )}
                </button>

                {/* Solid Buy Now btn (Exactly as Screen 2's Dark fill style) */}
                <button
                  id="buy-now-cta"
                  onClick={handleImmediatePurchase}
                  className="py-3.5 px-4 text-xs font-black uppercase tracking-wider bg-black text-white hover:bg-zinc-800 border-2 border-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            ) : (
              <button
                disabled
                className="w-full py-4 text-xs font-bold uppercase tracking-widest bg-zinc-100 text-zinc-400 border-2 border-black cursor-not-allowed flex items-center justify-center gap-2"
              >
                Sold Out Temporarily
              </button>
            )}

            <button
              id="continue-shopping-cta"
              onClick={onClose}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-all cursor-pointer text-center"
            >
              [ Return to Catalogue ]
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
