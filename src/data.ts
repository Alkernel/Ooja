import { Product } from '../types';
import { Eye, Plus, Heart } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  isFavorite?: boolean;
  onToggleWishlist?: (productId: string) => void;
  formatPrice: (price: number) => string;
}

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  isFavorite = false,
  onToggleWishlist,
  formatPrice,
}: ProductCardProps) {
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div 
      className="group bg-zinc-50 border-2 border-black relative flex flex-col items-stretch overflow-hidden transition-all duration-300 hover:bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
    >
      {/* Product Image Stage */}
      <div 
        onClick={() => onViewDetails(product)}
        className="w-full aspect-[4/5] bg-zinc-50 overflow-hidden relative cursor-pointer border-b-2 border-black"
      >
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
          referrerPolicy="no-referrer"
        />
        <img
          src={secondaryImage}
          alt={`${product.name} alternate view`}
          className="w-full h-full object-cover absolute inset-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist Heart Overlay (exactly as shown on top-right in Screen 3) */}
        {onToggleWishlist && (
          <button
            id={`wishlist-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 z-20 p-2 bg-white/90 border border-black rounded-full hover:bg-black hover:text-white transition-all shadow-sm cursor-pointer"
            aria-label="Toggle favorite"
          >
            <Heart 
              className={`w-4 h-4 transition-transform duration-200 hover:scale-110 ${
                isFavorite ? 'fill-black stroke-black text-black' : 'text-zinc-700'
              }`} 
            />
          </button>
        )}

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {!product.inStock ? (
            <span className="bg-black text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 font-bold border border-black">
              Sold Out
            </span>
          ) : (
            <span className="bg-white text-black text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 font-bold border border-black">
              New
            </span>
          )}
        </div>

        {/* Interactive Quick view Trigger Box on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
          <button
            id={`quick-view-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="bg-white text-black p-3 hover:bg-black hover:text-white transition-all duration-300 rounded-none border-2 border-black flex items-center justify-center shadow-md cursor-pointer"
            title="Inspect Details"
          >
            <Eye className="w-5 h-5 stroke-[2]" />
          </button>
          
          {product.inStock && (
            <button
              id={`quick-add-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                // Select first available size or default
                const defaultSize = product.sizes ? product.sizes[0] : undefined;
                onAddToCart(product, defaultSize);
              }}
              className="bg-black text-white p-3 hover:bg-white hover:text-black hover:border-black transition-all duration-300 rounded-none border-2 border-black flex items-center justify-center shadow-md cursor-pointer"
              title="Add to Bag"
            >
              <Plus className="w-5 h-5 stroke-[2]" />
            </button>
          )}
        </div>
      </div>

      {/* Product Information - styled exactly like the high contrast sample card */}
      <div className="p-3 flex flex-col flex-1 bg-white">
        <div className="flex flex-col gap-1 mb-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-zinc-400">
            <span>{product.category}</span>
            <span>•</span>
            <div className="flex items-center gap-0.5 text-black font-semibold">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">SCORES: {product.rating.toFixed(1)}</span>
              <span className="text-zinc-400 font-mono">({product.reviewsCount})</span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="text-left font-sans text-xs font-black text-black uppercase tracking-tight hover:underline cursor-pointer line-clamp-2 min-h-[32px]"
          >
            {product.name}
          </button>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/10 gap-1.5">
          <span className="text-sm font-black text-black font-sans">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1">
            {/* Mobile-visible Inspect button */}
            <button
              id={`mobile-inspect-btn-${product.id}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product);
              }}
              className="flex sm:hidden w-7 h-7 border border-black items-center justify-center text-black bg-zinc-50 hover:bg-black hover:text-white transition-colors cursor-pointer"
              title="Inspect Details"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {/* Mobile-visible Like button */}
            {onToggleWishlist && (
              <button
                id={`mobile-wishlist-btn-${product.id}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product.id);
                }}
                className="flex sm:hidden w-7 h-7 border border-black items-center justify-center text-black bg-zinc-50 hover:bg-black hover:text-white transition-colors cursor-pointer"
                title="Toggle Favorite"
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-black text-black' : 'text-zinc-700'}`} />
              </button>
            )}

            {/* Stock Add button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const defaultSize = product.sizes ? product.sizes[0] : undefined;
                onAddToCart(product, defaultSize);
              }}
              disabled={!product.inStock}
              className="px-2.5 py-1 text-[10px] font-sans font-black uppercase text-white bg-black hover:bg-neutral-800 border border-black cursor-pointer disabled:bg-zinc-100 disabled:text-zinc-300 disabled:border-zinc-200 disabled:no-underline"
            >
              {product.inStock ? '+ ADD' : 'OUT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
