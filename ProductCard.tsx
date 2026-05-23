import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Smartphone, 
  Shirt, 
  Sparkles, 
  Home, 
  Gamepad2, 
  Watch, 
  ShoppingBag, 
  Tv, 
  Footprints, 
  Glasses,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  X,
  Check,
  ArrowUpDown,
  ShoppingBag as CartIcon,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';

interface CategoriesSectionProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  formatPrice: (price: number) => string;
  initialSelectedCategory?: string;
  selectedCurrency?: any;
}

// Map database categories to their beautiful visual subcategories
interface RichSubCategory {
  id: string;      // search query keyword
  name: string;    // Human friendly label
  image: string;   // High-quality unsplash visual
}

const CATEGORY_SUBCATEGORIES_MAP: Record<string, RichSubCategory[]> = {
  electronics: [
    { id: 'televisions', name: 'Televisions', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=250&auto=format&fit=crop' },
    { id: 'smarttv', name: 'SmartTV', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=250&auto=format&fit=crop' },
    { id: 'home-theatre', name: 'Home Theatre', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=250&auto=format&fit=crop' },
    { id: 'sound-bar', name: 'Sound Bars', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=250&auto=format&fit=crop' },
    { id: 'audio', name: 'Premium Audio', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=250&auto=format&fit=crop' }
  ],
  phones: [
    { id: 'smartphone', name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=250&auto=format&fit=crop' },
    { id: 'basic-phone', name: 'Basic Phones', image: 'https://images.unsplash.com/photo-1565849531158-bda9647aa523?q=80&w=250&auto=format&fit=crop' },
    { id: 'tablet', name: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=250&auto=format&fit=crop' }
  ],
  fashion: [
    { id: 'womens-bags', name: "Women's Bags", image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=250&auto=format&fit=crop' },
    { id: 'mens-bags', name: "Men's Bags", image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=250&auto=format&fit=crop' },
    { id: 'womens-clothing', name: "Women's Clothing", image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=250&auto=format&fit=crop' },
    { id: 'mens-clothing', name: "Men's Clothing", image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=250&auto=format&fit=crop' },
    { id: 'womens-shoes', name: "Women's Shoes", image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=250&auto=format&fit=crop' },
    { id: 'mens-shoes', name: "Men's Shoes", image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=250&auto=format&fit=crop' },
    { id: 'womens-watches', name: "Women's Watches", image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=250&auto=format&fit=crop' },
    { id: 'mens-watches', name: "Men's Watches", image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=250&auto=format&fit=crop' },
    { id: 'jewelries', name: 'Jewelries', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=250&auto=format&fit=crop' }
  ],
  beauty: [
    { id: 'serum', name: 'Serums & Essences', image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=250&auto=format&fit=crop' },
    { id: 'parfum', name: 'Parfums & Scents', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=250&auto=format&fit=crop' }
  ],
  'home-office': [
    { id: 'furniture', name: 'Office Furniture', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=250&auto=format&fit=crop' },
    { id: 'mug', name: 'Ceramics & Mugs', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=250&auto=format&fit=crop' },
    { id: 'lamp', name: 'Studio Lights', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=250&auto=format&fit=crop' }
  ],
  gaming: [
    { id: 'keyboard', name: 'Keyboards', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=250&auto=format&fit=crop' },
    { id: 'trackpad', name: 'Trackpads & Mice', image: 'https://images.unsplash.com/photo-1541140111813-8222e9d90981?q=80&w=250&auto=format&fit=crop' }
  ],
  watches: [
    { id: 'womens-watches', name: "Women's Watches", image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=250&auto=format&fit=crop' },
    { id: 'mens-watches', name: "Men's Watches", image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=250&auto=format&fit=crop' },
    { id: 'mechanical', name: 'Mechanical Gears', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=250&auto=format&fit=crop' },
    { id: 'ticker', name: 'Quartz Tickers', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=250&auto=format&fit=crop' }
  ],
  groceries: [
    { id: 'coffee', name: 'Ethiopia Wholebean', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=250&auto=format&fit=crop' },
    { id: 'matcha', name: 'Ceremonial Matcha', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=250&auto=format&fit=crop' }
  ],
  appliances: [
    { id: 'espresso', name: 'Espresso Siphons', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=250&auto=format&fit=crop' },
    { id: 'kettle', name: 'Gooseneck Kettles', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=250&auto=format&fit=crop' }
  ],
  sneakers: [
    { id: 'womens-sneakers', name: "Women's Sneakers", image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=250&auto=format&fit=crop' },
    { id: 'mens-sneakers', name: "Men's Sneakers", image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=250&auto=format&fit=crop' },
    { id: 'boot', name: 'Leather Boots', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=250&auto=format&fit=crop' },
    { id: 'running', name: 'Eclipse Soles', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=250&auto=format&fit=crop' }
  ],
  accessories: [
    { id: 'womens-accessories', name: "Women's Accessories", image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=250&auto=format&fit=crop' },
    { id: 'mens-accessories', name: "Men's Accessories", image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=250&auto=format&fit=crop' },
    { id: 'sunglasses', name: 'Acetate Eyewear', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=250&auto=format&fit=crop' },
    { id: 'tote', name: 'Leather Carries', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=250&auto=format&fit=crop' },
    { id: 'cap', name: 'Tonal Caps', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=250&auto=format&fit=crop' }
  ]
};

// Help helper function to assign specific Lucide icons to categories dynamically
const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'electronics': return Cpu;
    case 'phones': return Smartphone;
    case 'fashion': return Shirt;
    case 'beauty': return Sparkles;
    case 'home-office': return Home;
    case 'gaming': return Gamepad2;
    case 'watches': return Watch;
    case 'groceries': return ShoppingBag;
    case 'appliances': return Tv;
    case 'sneakers': return Footprints;
    case 'accessories': return Glasses;
    default: return Tag;
  }
};

// Map each high-quality circular subcategory to its matching product filter conditions
const matchProductToSubcategory = (product: Product, subId: string): boolean => {
  const name = product.name.toLowerCase();
  const desc = product.description.toLowerCase();
  
  switch (subId) {
    // Fashion Subfolders
    case 'mens-clothing':
    case 'womens-clothing':
    case 'clothing':
      return product.category === 'fashion' && (name.includes('jacket') || name.includes('tee') || name.includes('sweater') || name.includes('hooded') || name.includes('shirt') || desc.includes('clothing') || desc.includes('fleece') || desc.includes('knit'));
    case 'mens-bags':
      return (name.includes('duffle') || name.includes('pack') || name.includes('bag') || name.includes('carrier') || name.includes('daypack') || desc.includes('duffel') || desc.includes('backpack')) && !name.includes('tote');
    case 'womens-bags':
      return name.includes('tote') || name.includes('bag') || name.includes('pack') || name.includes('duffle') || desc.includes('bag') || desc.includes('handbag') || desc.includes('pocketbook');
    case 'bags':
      return name.includes('tote') || name.includes('duffle') || name.includes('pack') || name.includes('bag') || name.includes('carrier') || desc.includes('bag') || desc.includes('handbag') || desc.includes('duffel');
    case 'jewelries':
      return name.includes('gold') || name.includes('band') || name.includes('jewel') || name.includes('ring') || name.includes('necklace') || name.includes('pendant') || desc.includes('jewelry') || desc.includes('jewel');
    case 'mens-shoes':
    case 'womens-shoes':
    case 'shoes':
      return product.category === 'sneakers' || name.includes('sneaker') || name.includes('boot') || name.includes('shoe') || name.includes('sole') || desc.includes('footwear') || desc.includes('sole');
    case 'mens-watches':
      return product.category === 'watches' || name.includes('watch') || name.includes('ticker') || name.includes('mechanical') || desc.includes('time') || desc.includes('wrist');
    case 'womens-watches':
      return name.includes('ticker') || name.includes('watch') || name.includes('quartz') || product.category === 'watches';
    case 'watches':
      return product.category === 'watches' || name.includes('watch') || name.includes('ticker') || name.includes('mechanical') || desc.includes('time') || desc.includes('wrist');

    // Electronics Subfolders
    case 'televisions':
    case 'smarttv':
      return name.includes('tv') || name.includes('television') || name.includes('oled') || desc.includes('television') || desc.includes('smarttv') || desc.includes('oled');
    case 'home-theatre':
    case 'sound-bar':
      return name.includes('speaker') || name.includes('soundbar') || name.includes('theatre') || name.includes('subwoofer') || name.includes('stereo') || desc.includes('subwoofer') || desc.includes('theatre');
    case 'audio':
      return name.includes('headphone') || name.includes('audio') || name.includes('speaker') || desc.includes('acoustic') || desc.includes('ambient') || desc.includes('sound');

    // Phones & Tablets Subfolders
    case 'smartphone':
      return (product.category === 'phones' || name.includes('phone') || name.includes('cellular')) && !name.includes('classic') && !name.includes('basic') && !name.includes('feature');
    case 'basic-phone':
      return name.includes('basic') || name.includes('keypad') || name.includes('nostalgia') || name.includes('feature') || desc.includes('keypad') || desc.includes('batterys');
    case 'tablet':
      return name.includes('tablet') || name.includes('canvas') || name.includes('pad') || name.includes('draw') || desc.includes('tablet') || desc.includes('drafting');

    // Health & Beauty Subfolders
    case 'serum':
      return name.includes('serum') || name.includes('extract') || name.includes('hydration') || desc.includes('clinical') || desc.includes('skin');
    case 'parfum':
      return name.includes('parfum') || name.includes('scent') || name.includes('fragrance') || name.includes('aroma') || desc.includes('perfume') || desc.includes('smell');

    // Home & Office Subfolders
    case 'furniture':
      return name.includes('chair') || name.includes('desk') || name.includes('furniture') || name.includes('shelf') || name.includes('table') || desc.includes('ergonomic') || desc.includes('furniture');
    case 'mug':
      return name.includes('mug') || name.includes('cup') || name.includes('ceramic') || name.includes('stoneware') || name.includes('dripper') || desc.includes('cup') || desc.includes('mug');
    case 'lamp':
      return name.includes('lamp') || name.includes('light') || name.includes('lighting') || name.includes('flicker') || desc.includes('led') || desc.includes('lamp');

    // Gaming Subfolders
    case 'keyboard':
      return name.includes('keyboard') || name.includes('switch') || name.includes('key') || desc.includes('switches');
    case 'trackpad':
      return name.includes('trackpad') || name.includes('mouse') || name.includes('surface') || name.includes('gestures');

    // Watches Subfolders
    case 'mechanical':
      return name.includes('mechanical') || name.includes('automatic') || name.includes('jewel') || desc.includes('gears') || desc.includes('friction');
    case 'ticker':
      return name.includes('titanium') || name.includes('quartz') || name.includes('ticker') || name.includes('watch') || name.includes('time') || desc.includes('seconds');

    // Groceries Subfolders
    case 'coffee':
      return name.includes('coffee') || name.includes('bean') || name.includes('roast') || name.includes('geisha') || desc.includes('espresso');
    case 'matcha':
      return name.includes('matcha') || name.includes('tea') || name.includes('jade') || name.includes('tin') || desc.includes('matcha');

    // Appliances Subfolders
    case 'espresso':
      return name.includes('espresso') || name.includes('siphon') || name.includes('brew') || desc.includes('pressure') || desc.includes('extraction');
    case 'kettle':
      return name.includes('kettle') || name.includes('pour') || name.includes('water') || desc.includes('gooseneck') || desc.includes('spout');

    // Footwear / Sneakers Subfolders
    case 'womens-sneakers':
    case 'mens-sneakers':
    case 'sneaker':
      return name.includes('sneaker') || name.includes('shoes') || name.includes('lace') || desc.includes('high-tops');
    case 'boot':
      return name.includes('boot') || name.includes('chelsea') || desc.includes('welted') || desc.includes('sole');
    case 'running':
      return name.includes('running') || name.includes('jogging') || name.includes('soles') || name.includes('mesh') || desc.includes('track');

    // Accessories Subfolders
    case 'womens-accessories':
      return product.category === 'accessories' && (name.includes('tote') || name.includes('glasses') || name.includes('sunglasses') || name.includes('cap') || desc.includes('handbag') || desc.includes('bag'));
    case 'mens-accessories':
      return product.category === 'accessories' && (name.includes('cap') || name.includes('glasses') || name.includes('sunglasses') || name.includes('duffle') || name.includes('pack') || name.includes('strap') || desc.includes('cap') || desc.includes('backpack'));
    case 'sunglasses':
      return name.includes('sunglasses') || name.includes('acetate') || name.includes('eyewear') || name.includes('glasses') || desc.includes('lenses');
    case 'tote':
      return name.includes('tote') || name.includes('carrying') || name.includes('pack') || name.includes('bag') || name.includes('duffle') || desc.includes('compartment') || desc.includes('duffel');
    case 'cap':
      return name.includes('cap') || name.includes('hat') || name.includes('strap') || name.includes('curved') || desc.includes('buckle') || desc.includes('hat');

    default:
      return name.includes(subId) || desc.includes(subId);
  }
};

export default function CategoriesSection({
  onViewProduct,
  onAddToCart,
  formatPrice,
  initialSelectedCategory = 'all',
  selectedCurrency
}: CategoriesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialSelectedCategory);
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  
  // Custom price filter states
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');
  const [selectedRangeId, setSelectedRangeId] = useState<string>('');
  
  // Track selected sizes for quick addition inline 
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  // Track visual feedback of inline item addition
  const [addedFeedback, setAddedFeedback] = useState<Record<string, boolean>>({});

  // Reset filter constraints if category switches
  useEffect(() => {
    setActiveCategory(initialSelectedCategory);
    setActiveSubcategory('');
    setSearchQuery('');
    setMinPriceInput('');
    setMaxPriceInput('');
    setSelectedRangeId('');
  }, [initialSelectedCategory]);

  const handleCategorySwitch = (catId: string) => {
    setActiveCategory(catId);
    setActiveSubcategory('');
    setSearchQuery('');
    setMinPriceInput('');
    setMaxPriceInput('');
    setSelectedRangeId('');
  };

  const rate = selectedCurrency?.rate || 1;
  const symbol = selectedCurrency?.symbol || '$';

  const PRICE_PRESETS = [
    { id: 'under-50', name: `Under ${symbol}${(50 * rate).toLocaleString()}`, min: '', max: String(50 * rate) },
    { id: '50-150', name: `${symbol}${(50 * rate).toLocaleString()} - ${symbol}${(150 * rate).toLocaleString()}`, min: String(50 * rate), max: String(150 * rate) },
    { id: '150-300', name: `${symbol}${(150 * rate).toLocaleString()} - ${symbol}${(300 * rate).toLocaleString()}`, min: String(150 * rate), max: String(300 * rate) },
    { id: '300-600', name: `${symbol}${(300 * rate).toLocaleString()} - ${symbol}${(600 * rate).toLocaleString()}`, min: String(300 * rate), max: String(600 * rate) },
    { id: 'over-600', name: `Over ${symbol}${(600 * rate).toLocaleString()}`, min: String(600 * rate), max: '' },
  ];

  const handleSelectPreset = (preset: typeof PRICE_PRESETS[0]) => {
    if (selectedRangeId === preset.id) {
      setSelectedRangeId('');
      setMinPriceInput('');
      setMaxPriceInput('');
    } else {
      setSelectedRangeId(preset.id);
      setMinPriceInput(preset.min);
      setMaxPriceInput(preset.max);
    }
  };

  const handleMinInputChange = (val: string) => {
    setMinPriceInput(val);
    setSelectedRangeId('');
  };

  const handleMaxInputChange = (val: string) => {
    setMaxPriceInput(val);
    setSelectedRangeId('');
  };

  const handleSubcategoryToggle = (subId: string) => {
    if (activeSubcategory === subId) {
      setActiveSubcategory('');
    } else {
      setActiveSubcategory(subId);
    }
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes ? product.sizes[0] : undefined;
    const sizeToUse = selectedSizes[product.id] || defaultSize;
    
    onAddToCart(product, sizeToUse);
    
    // Provide instant snappy visual click feedback
    setAddedFeedback(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedFeedback(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleSizeClick = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  // 1. Gather count stats of products directly for sidebar navigation numbers
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return PRODUCTS.length;
    return PRODUCTS.filter(p => p.category === catId).length;
  };

  // 2. Fetch the correct list of subcategory files representing current category
  const currentSubcategories = activeCategory === 'all'
    ? [] // Empty in "all" or we can gather a custom selection
    : CATEGORY_SUBCATEGORIES_MAP[activeCategory] || [];

  // 3. Perform filtering chain
  const filteredProducts = PRODUCTS.filter((product) => {
    // A: Match Category & Subcategory combination
    if (activeCategory !== 'all') {
      if (activeSubcategory) {
        // Must match the specific subcategory predicate
        const isSubcatMatch = matchProductToSubcategory(product, activeSubcategory);
        if (!isSubcatMatch) return false;

        // Ensure subfolder bounds within departments to avoid unexpected mixups
        if (activeCategory === 'fashion') {
          const isFashionSubcat = ['bags', 'clothing', 'jewelries', 'shoes', 'watches'].includes(activeSubcategory);
          if (!isFashionSubcat) return false;
        }
        if (activeCategory === 'electronics') {
          const isElecSubcat = ['televisions', 'smarttv', 'home-theatre', 'sound-bar', 'audio'].includes(activeSubcategory);
          if (!isElecSubcat) return false;
        }
        if (activeCategory === 'phones') {
          const isPhoneSubcat = ['smartphone', 'basic-phone', 'tablet'].includes(activeSubcategory);
          if (!isPhoneSubcat) return false;
        }
      } else {
        // If no activeSubcategory is set, match direct category
        const matchesCategory = product.category === activeCategory;
        if (!matchesCategory) return false;
      }
    } else {
      // If activeCategory is 'all', and there is actively a subcategory selected
      if (activeSubcategory) {
        const isSubcatMatch = matchProductToSubcategory(product, activeSubcategory);
        if (!isSubcatMatch) return false;
      }
    }

    // B: Match Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = product.name.toLowerCase().includes(q) || 
                            product.description.toLowerCase().includes(q) ||
                            product.category.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // C: Match In Stock toggle
    if (inStockOnly && !product.inStock) {
      return false;
    }

    // D: Match Price Range Filters (converted to current currency)
    const rate = selectedCurrency?.rate || 1;
    const itemConvertedPrice = product.price * rate;
    if (minPriceInput !== '') {
      const minVal = parseFloat(minPriceInput);
      if (!isNaN(minVal) && itemConvertedPrice < minVal) {
        return false;
      }
    }
    if (maxPriceInput !== '') {
      const maxVal = parseFloat(maxPriceInput);
      if (!isNaN(maxVal) && itemConvertedPrice > maxVal) {
        return false;
      }
    }

    return true;
  });

  // 4. Sort calculations
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'featured':
      default:
        return b.reviewsCount - a.reviewsCount; // Popular items
    }
  });

  // Find info meta of the active category
  const selectedCategoryMeta = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] text-zinc-900 pb-28">
      {/* Visual Title Header Strip */}
      <div className="bg-white border-b border-zinc-200/80 py-6 sm:py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-sans text-neutral-900 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-black rounded-sm inline-block"></span>
              Department Catalog Files
            </h1>
            <p className="text-xs text-zinc-500 font-medium font-sans mt-0.5 leading-relaxed">
              Explore meticulously organized collections, filtered instantly by smart focus sections and sizes.
            </p>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-zinc-100 border border-zinc-200 px-3.5 py-1.5 rounded-full font-black">
            Total Inventory: {PRODUCTS.length} curated lines
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Core Sidebar + Grid Showcase Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================ LEFT PANE: Sticky Premium Category Directory (4/12 columns on large screens) ================ */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Desktop Left List Card */}
            <div className="hidden lg:flex flex-col bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden p-2.5">
              <div className="px-3 py-2.5 border-b border-zinc-100 mb-2">
                <span className="text-[10.5px] font-mono font-black uppercase tracking-widest text-zinc-400">
                  [ Category Map Files ]
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                {/* Unified All Products listing */}
                <button
                  id="cat-sidebar-all"
                  onClick={() => handleCategorySwitch('all')}
                  className={`w-full group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-zinc-950 text-white font-extrabold shadow-sm'
                      : 'bg-transparent text-zinc-650 hover:bg-zinc-50 hover:text-black font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] opacity-40">--</span>
                    <span className="text-[11.5px] uppercase tracking-tight">All Collections</span>
                  </div>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-white/15 text-white'
                      : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    {PRODUCTS.length}
                  </span>
                </button>

                {/* Specific DB category entries */}
                {CATEGORIES.map((cat, idx) => {
                  const CatIcon = getCategoryIcon(cat.id);
                  const isSelected = activeCategory === cat.id;
                  const itemIndex = String(idx + 1).padStart(2, '0');
                  const countVal = getCategoryCount(cat.id);

                  if (countVal === 0) return null; // do not list empty folders

                  return (
                    <button
                      key={cat.id}
                      id={`cat-sidebar-btn-${cat.id}`}
                      onClick={() => handleCategorySwitch(cat.id)}
                      className={`w-full group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-950 text-white font-extrabold shadow-sm'
                          : 'bg-transparent text-zinc-650 hover:bg-zinc-50 hover:text-black font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[9.5px] opacity-40 group-hover:opacity-80 transition-opacity">
                          {itemIndex}
                        </span>
                        <CatIcon className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-black'}`} />
                        <span className="text-[11.5px] uppercase tracking-tight text-left truncate max-w-[130px]">
                          {cat.name}
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200'
                      }`}>
                        {countVal}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Left Price Filter Card */}
            <div className="hidden lg:flex flex-col bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden p-4">
              <div className="border-b border-zinc-100 pb-2 mb-3 flex items-center justify-between">
                <span className="text-[10.5px] font-mono font-black uppercase tracking-widest text-zinc-400">
                  [ Price Filter ]
                </span>
                {(minPriceInput || maxPriceInput) && (
                  <button
                    onClick={() => { setMinPriceInput(''); setMaxPriceInput(''); setSelectedRangeId(''); }}
                    className="text-[9px] font-mono font-black uppercase text-red-650 hover:underline cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {/* Presets List */}
              <div className="flex flex-col gap-1.5 mb-4">
                {PRICE_PRESETS.map((p) => {
                  const isSelected = selectedRangeId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPreset(p)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-950 text-white font-extrabold shadow-sm'
                          : 'bg-zinc-50 text-zinc-650 hover:bg-zinc-100 hover:text-black font-medium'
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>}
                    </button>
                  );
                })}
              </div>

              {/* Custom Range Input fields with currency decorator */}
              <div className="space-y-2">
                <span className="text-[9px] font-sans font-black uppercase tracking-widest text-zinc-400 block">
                  Custom Range ({symbol})
                </span>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-zinc-450">
                      {symbol}
                    </span>
                    <input
                      type="number"
                      value={minPriceInput}
                      onChange={(e) => handleMinInputChange(e.target.value)}
                      placeholder="Min"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-1.5 pl-6 pr-2 text-xs font-bold text-black focus:outline-none focus:border-zinc-400 focus:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <span className="text-zinc-300 font-bold text-xs">-</span>
                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-zinc-450">
                      {symbol}
                    </span>
                    <input
                      type="number"
                      value={maxPriceInput}
                      onChange={(e) => handleMaxInputChange(e.target.value)}
                      placeholder="Max"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-1.5 pl-6 pr-2 text-xs font-bold text-black focus:outline-none focus:border-zinc-400 focus:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Top Horizontal Scroll Ribbon & Compact Collapsible Price Filter */}
            <div className="lg:hidden flex flex-col gap-3">
              <div className="w-full overflow-x-auto pb-1 flex gap-2 select-none scrollbar-none">
                <button
                  onClick={() => handleCategorySwitch('all')}
                  className={`px-4 py-2 text-xs font-black uppercase shrink-0 rounded-full border tracking-wider transition-all cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                      : 'bg-white text-zinc-650 border-zinc-200'
                  }`}
                >
                  All ({PRODUCTS.length})
                </button>
                
                {CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  const countVal = getCategoryCount(cat.id);
                  if (countVal === 0) return null;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySwitch(cat.id)}
                      className={`px-4 py-2 text-xs font-black uppercase shrink-0 rounded-full border tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                          : 'bg-white text-zinc-650 border-zinc-200'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-400'
                      }`}>
                        {countVal}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile compact inline price preset list */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-4.5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[10px] font-mono uppercase font-black text-zinc-400 tracking-wider">
                    [ Price Filter ({symbol}) ]
                  </span>
                  {(minPriceInput || maxPriceInput) && (
                    <button
                      onClick={() => { setMinPriceInput(''); setMaxPriceInput(''); setSelectedRangeId(''); }}
                      className="text-[9px] font-mono font-black uppercase text-red-650 hover:underline cursor-pointer"
                    >
                      Clear Price
                    </button>
                  )}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1.5 select-none scrollbar-none">
                  {PRICE_PRESETS.map((p) => {
                    const isSelected = selectedRangeId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPreset(p)}
                        className={`px-3.5 py-1.5 text-[10px] font-black uppercase shrink-0 rounded-full border tracking-wider transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                            : 'bg-zinc-50 text-zinc-655 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[9px] font-mono uppercase text-zinc-400 font-bold shrink-0">
                    Custom Range:
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-zinc-450">
                        {symbol}
                      </span>
                      <input
                        type="number"
                        value={minPriceInput}
                        onChange={(e) => handleMinInputChange(e.target.value)}
                        placeholder="Min"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-1 px-5 text-[11px] font-bold text-black focus:outline-none focus:border-zinc-400 focus:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <span className="text-zinc-300 font-bold">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-zinc-455">
                        {symbol}
                      </span>
                      <input
                        type="number"
                        value={maxPriceInput}
                        onChange={(e) => handleMaxInputChange(e.target.value)}
                        placeholder="Max"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-1 px-5 text-[11px] font-bold text-black focus:outline-none focus:border-zinc-400 focus:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ================ RIGHT PANE: Showcase Details & Interactive Cards (9/12 columns on large screens) ================ */}
          <main className="lg:col-span-9 flex flex-col gap-6">
            
            {!activeSubcategory && !searchQuery.trim() ? (
              /* ========== DIRECTORY MODE (Circles Only, No Products List) ========== */
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 animate-fade-in">
                <div className="text-left border-b border-zinc-100 pb-5">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-black text-zinc-400 block mb-1">
                    [ {activeCategory === 'all' ? 'Primary Directory' : `${selectedCategoryMeta?.name} Collections`} ]
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 transition-all">
                    {activeCategory === 'all' ? 'Explore Store Departments' : `Select a ${selectedCategoryMeta?.name} Group`}
                  </h3>
                  <p className="text-xs text-zinc-500 font-sans mt-2 max-w-2xl leading-relaxed">
                    {activeCategory === 'all' 
                      ? 'Select any high-level department to dive into its meticulously grouped micro-directories and curated products.' 
                      : selectedCategoryMeta?.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-center py-4">
                  {activeCategory === 'all' ? (
                    CATEGORIES.map((cat) => {
                      const totalMatches = getCategoryCount(cat.id);
                      return (
                        <button
                          key={cat.id}
                          id={`cat-circle-btn-${cat.id}`}
                          onClick={() => handleCategorySwitch(cat.id)}
                          className="group flex flex-col items-center focus:outline-none cursor-pointer"
                        >
                          {/* Circle Image Frame */}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-3 border-zinc-200 group-hover:border-black overflow-hidden aspect-square shadow-sm transform group-hover:scale-[1.04] transition-all duration-300 relative bg-zinc-50 flex items-center justify-center">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                          </div>

                          {/* Text labels */}
                          <span className="text-xs font-black uppercase tracking-wider text-zinc-700 group-hover:text-black mt-3.5 font-sans leading-tight text-center max-w-[130px] truncate">
                            {cat.name}
                          </span>
                          
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 mt-1">
                            [{totalMatches} items]
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    currentSubcategories.map((sub) => {
                      const totalMatches = PRODUCTS.filter(p => matchProductToSubcategory(p, sub.id)).length;
                      return (
                        <button
                          key={sub.id}
                          id={`sub-circle-btn-${sub.id}`}
                          onClick={() => handleSubcategoryToggle(sub.id)}
                          className="group flex flex-col items-center focus:outline-none cursor-pointer"
                        >
                          {/* Circle Image Frame */}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-3 border-zinc-200 group-hover:border-black overflow-hidden aspect-square shadow-sm transform group-hover:scale-[1.04] transition-all duration-300 relative bg-zinc-50 flex items-center justify-center">
                            <img
                              src={sub.image}
                              alt={sub.name}
                              className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                          </div>

                          {/* Text labels */}
                          <span className="text-xs font-black uppercase tracking-wider text-zinc-700 group-hover:text-black mt-3.5 font-sans leading-tight text-center max-w-[130px] truncate">
                            {sub.name}
                          </span>
                          
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 mt-1">
                            [{totalMatches} items]
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>

                {activeCategory !== 'all' && (
                  <div className="pt-4 border-t border-zinc-100 flex justify-start">
                    <button
                      onClick={() => handleCategorySwitch('all')}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      <span>← Back to Main Directory</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ========== LISTING MODE (Products Showcase View) ========== */
              <div className="flex flex-col gap-6 animate-fade-in">
                
                {/* Visual breadcrumbs and Back navigation bar */}
                <div className="bg-white border border-zinc-200 rounded-2xl p-4 px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-zinc-500">
                    <span 
                      onClick={() => {
                        setActiveCategory('all');
                        setActiveSubcategory('');
                      }}
                      className="uppercase tracking-wide text-zinc-400 hover:text-black hover:underline cursor-pointer font-extrabold"
                    >
                      DEPARTMENTS
                    </span>
                    <span className="text-zinc-300">/</span>
                    <span 
                      onClick={() => {
                        setActiveSubcategory('');
                      }}
                      className="uppercase tracking-wide text-zinc-400 hover:text-black hover:underline cursor-pointer font-extrabold"
                    >
                      {activeCategory === 'all' ? 'ALL' : selectedCategoryMeta?.name}
                    </span>
                    <span className="text-zinc-300">/</span>
                    <span className="bg-zinc-950 text-white px-2.5 py-1 rounded-md uppercase font-black tracking-wide text-[10px]">
                      {activeCategory === 'all' 
                        ? (activeSubcategory ? activeSubcategory.toUpperCase() : 'SEARCH RESULT')
                        : (currentSubcategories.find(s => s.id === activeSubcategory)?.name || activeSubcategory).toUpperCase()
                      }
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveSubcategory('');
                      setMinPriceInput('');
                      setMaxPriceInput('');
                      setSelectedRangeId('');
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-[10.5px] font-mono font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm shadow-black/10"
                  >
                    <span>← Back to Categories</span>
                  </button>
                </div>

                {/* Catalog Control and Search Toolbar */}
                <div className="bg-white border border-zinc-200/85 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                  {/* Search Inside Category Bar */}
                  <div className="flex-1 relative">
                    <div className="flex items-center w-full bg-zinc-50 border border-zinc-200 focus-within:border-zinc-400 focus-within:bg-white transition-all rounded-xl px-3.5 py-1.5">
                      <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0 mr-2" />
                      <input
                        id="catalog-department-search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search within selected collection...`}
                        className="bg-transparent text-xs text-zinc-90 w-full focus:outline-none font-bold uppercase tracking-tight placeholder-zinc-450"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="text-zinc-400 hover:text-black shrink-0 transition-colors"
                          title="Clear Search"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Filtering adjustments */}
                  <div className="flex items-center gap-3 flex-wrap justify-end">
                    <label className="flex items-center gap-2 select-none border border-zinc-200/80 rounded-xl px-3 py-1.5 text-[10.5px] font-bold font-mono text-zinc-600 cursor-pointer hover:bg-zinc-50 hover:text-black transition-all">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="accent-black w-3.5 h-3.5 cursor-pointer rounded"
                      />
                      <span>IN STOCK</span>
                    </label>

                    <div className="flex items-center gap-1.5 border border-zinc-200/80 rounded-xl px-2.5 py-1 text-xs bg-white text-zinc-700">
                      <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="focus:outline-none bg-transparent cursor-pointer font-bold font-sans text-[11px] text-zinc-800 uppercase tracking-tight"
                      >
                        <option value="featured">Best Seller</option>
                        <option value="rating">Top Rated</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Active Constraint Badges */}
                {(activeSubcategory || searchQuery || inStockOnly || minPriceInput || maxPriceInput) && (
                  <div className="flex flex-wrap items-center bg-zinc-50 border border-zinc-200 rounded-xl p-3 gap-2">
                    <span className="text-[9px] font-mono uppercase font-black text-zinc-400 tracking-wider">
                      Active Filters:
                    </span>
                    
                    {activeSubcategory && (
                      <span className="bg-zinc-950 text-white text-[9.5px] font-mono font-bold uppercase rounded-md px-2.5 py-1 flex items-center gap-1">
                        <span>SUBCAT: {activeSubcategory}</span>
                        <button onClick={() => setActiveSubcategory('')} className="hover:text-zinc-300 cursor-pointer">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    )}

                    {searchQuery && (
                      <span className="bg-white text-black text-[9.5px] font-mono font-bold uppercase rounded-md px-2.5 py-1 flex items-center gap-1 border border-zinc-200">
                        <span>QUERY: "{searchQuery}"</span>
                        <button onClick={() => setSearchQuery('')} className="hover:text-zinc-500 cursor-pointer">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    )}

                    {inStockOnly && (
                      <span className="bg-white text-black text-[9.5px] font-mono font-bold uppercase rounded-md px-2.5 py-1 flex items-center gap-1 border border-zinc-200">
                        <span>IN STOCK ONLY</span>
                        <button onClick={() => setInStockOnly(false)} className="hover:text-zinc-500 cursor-pointer">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    )}

                    {(minPriceInput || maxPriceInput) && (
                      <span className="bg-white text-black text-[9.5px] font-mono font-bold uppercase rounded-md px-2.5 py-1 flex items-center gap-1 border border-zinc-200">
                        <span>
                          Price: {minPriceInput ? `${symbol}${parseFloat(minPriceInput).toLocaleString()}` : 'Any'} - {maxPriceInput ? `${symbol}${parseFloat(maxPriceInput).toLocaleString()}` : 'Any'}
                        </span>
                        <button onClick={() => { setMinPriceInput(''); setMaxPriceInput(''); setSelectedRangeId(''); }} className="hover:text-zinc-500 cursor-pointer">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    )}

                    <button
                      onClick={() => {
                        setActiveSubcategory('');
                        setSearchQuery('');
                        setInStockOnly(false);
                        setMinPriceInput('');
                        setMaxPriceInput('');
                        setSelectedRangeId('');
                      }}
                      className="font-mono text-[9px] text-zinc-550 underline font-black uppercase ml-auto hover:text-black tracking-widest cursor-pointer"
                    >
                      Reset All
                    </button>
                  </div>
                )}

                {/* Grid Products Showroom */}
                {sortedProducts.length === 0 ? (
                  <div className="max-w-md mx-auto w-full text-center py-16 px-4 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <AlertCircle className="w-10 h-10 text-zinc-300 mx-auto stroke-[1.5] mb-3" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-800">
                      No Matching Store Items
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans mt-1.5 leading-relaxed max-w-[270px] mx-auto">
                      Adjust active category selectors or reset custom price ranges.
                    </p>
                    <button
                      onClick={() => {
                        setActiveCategory('all');
                        setActiveSubcategory('');
                        setSearchQuery('');
                        setInStockOnly(false);
                        setMinPriceInput('');
                        setMaxPriceInput('');
                        setSelectedRangeId('');
                      }}
                      className="mt-5 px-4 py-2 bg-black hover:bg-zinc-800 text-white font-mono text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      Show All Collections
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {sortedProducts.map((product) => {
                      const hasMultipleImages = product.images.length > 1;
                      const itemSizeToOffer = product.sizes;
                      const chosenSize = selectedSizes[product.id];
                      const hasAdded = addedFeedback[product.id];

                      return (
                        <div
                          key={product.id}
                          className="group bg-white border border-zinc-200/80 hover:border-black rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-stretch relative"
                        >
                          {/* Polaroid Image Box */}
                          <div 
                            onClick={() => onViewProduct(product)}
                            className="w-full aspect-square sm:aspect-[4/5] bg-zinc-100 overflow-hidden relative cursor-pointer"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                              referrerPolicy="no-referrer"
                            />
                            {hasMultipleImages && (
                              <img
                                src={product.images[1]}
                                alt={`${product.name} lookbook style`}
                                className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                                referrerPolicy="no-referrer"
                              />
                            )}

                            {/* Floating rating rating widget */}
                            <div className="absolute top-2.5 left-2.5 bg-white/95 border border-zinc-200 px-2 py-0.5 text-[8px] font-mono font-extrabold uppercase tracking-tight text-neutral-900 flex items-center gap-1 shadow-sm rounded-md select-none">
                              <span>SCORE: {product.rating.toFixed(1)}</span>
                              <span className="text-zinc-400">({product.reviewsCount})</span>
                            </div>

                            {!product.inStock && (
                              <span className="absolute bottom-2.5 left-2.5 bg-black text-white text-[8px] font-mono tracking-widest uppercase px-2.5 py-1 font-black border border-white/10 rounded-sm">
                                OUT OF STOCK
                              </span>
                            )}
                          </div>

                          <div className="p-3.5 flex flex-col flex-1 bg-white border-t border-zinc-100 gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[8.5px] uppercase tracking-widest font-black text-zinc-400 font-mono">
                                {product.category}
                              </span>
                              {product.stock && product.stock <= 10 && product.inStock && (
                                <span className="text-[8px] bg-red-50 text-red-650 px-1.5 py-0.2 font-mono font-bold tracking-tight rounded-sm">
                                  ONLY {product.stock} LEFT
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => onViewProduct(product)}
                              className="text-left font-sans text-xs font-extrabold text-neutral-850 uppercase tracking-tight hover:underline cursor-pointer line-clamp-2 min-h-[32px]"
                            >
                              {product.name}
                            </button>

                            {itemSizeToOffer && itemSizeToOffer.length > 0 && product.inStock && (
                              <div className="space-y-1">
                                <span className="text-[8px] text-zinc-400 font-mono uppercase tracking-widest block font-black">
                                  [ Size ]
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {itemSizeToOffer.map((size) => {
                                    const isCurrent = chosenSize ? chosenSize === size : itemSizeToOffer[0] === size;
                                    return (
                                      <button
                                        key={size}
                                        type="button"
                                        onClick={() => handleSizeClick(product.id, size)}
                                        className={`px-1.5 py-0.5 text-[8.5px] font-mono font-bold tracking-tight rounded-sm transition-all border ${
                                          isCurrent
                                            ? 'bg-zinc-950 text-white border-zinc-905 scale-[1.02]'
                                            : 'bg-[#fafafa] text-zinc-500 border-zinc-200 hover:border-zinc-405 hover:text-black'
                                        }`}
                                      >
                                        {size}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-zinc-100 gap-2">
                              <span className="text-xs sm:text-sm font-black text-neutral-900 font-mono">
                                {formatPrice(product.price)}
                              </span>

                              <div className="flex items-center gap-1 select-none">
                                <button
                                  type="button"
                                  onClick={() => onViewProduct(product)}
                                  className="w-7 h-7 bg-zinc-50 hover:bg-black hover:text-white border border-zinc-200 hover:border-black flex items-center justify-center text-zinc-500 transition-colors cursor-pointer rounded-lg tooltip"
                                  title="Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleQuickAdd(product)}
                                  disabled={!product.inStock}
                                  className={`h-7 px-2.5 text-[9px] font-mono font-black uppercase text-white rounded-lg flex items-center justify-center gap-1 transition-all ${
                                    !product.inStock 
                                      ? 'bg-zinc-100 text-zinc-300 border border-zinc-100 cursor-not-allowed'
                                      : hasAdded
                                        ? 'bg-emerald-500 text-white border border-emerald-500'
                                        : 'bg-black hover:bg-zinc-800'
                                  }`}
                                >
                                  {hasAdded ? (
                                    <>
                                      <Check className="w-3 h-3 animate-ping" />
                                      <span>Added</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>+ Quick Add</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
