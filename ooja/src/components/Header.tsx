import { Search, MapPin, X } from 'lucide-react';
import { User as UserType, CurrencyConfig, CURRENCIES, StoreSettings } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: UserType | null;
  selectedCurrency: CurrencyConfig;
  onCurrencyChange: (currency: CurrencyConfig) => void;
  formatPrice: (price: number) => string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  storeSettings: StoreSettings;
}

export default function Header({
  currentTab,
  setCurrentTab,
  currentUser,
  selectedCurrency,
  onCurrencyChange,
  formatPrice,
  searchQuery,
  setSearchQuery,
  storeSettings,
}: HeaderProps) {
  
  const handleInputChange = (val: string) => {
    setSearchQuery(val);
    if (currentTab !== 'search') {
      setCurrentTab('search');
    }
  };

  return (
    <header className="w-full flex flex-col z-40 sticky top-0 bg-white">
      {/* Black Top Heading (Announcement Ribbon & Info) */}
      <div className="w-full bg-black text-white py-2 px-4 text-xs font-mono flex flex-col md:flex-row justify-between items-center gap-2 border-b border-black">
        <div className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] sm:text-xs">
          <span>{storeSettings.shippingThresholdText}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-4 text-[10px] sm:text-xs tracking-wider uppercase text-zinc-300">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-white" /> Global Atelier
          </span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden lg:inline">Ooja Archival Collection No. 7</span>
          <span className="hidden lg:inline text-zinc-600">|</span>

          {/* Designer Currency Display Indicator (Routes to Profile settings to modify) */}
          <div 
            onClick={() => setCurrentTab('profile')}
            className="flex items-center gap-1 bg-[#18181b] hover:bg-zinc-900 border border-white/15 hover:border-white transition-all px-2.5 py-1 text-[9px] sm:text-[10px] font-mono cursor-pointer rounded-full"
            title="Click to modify in settings"
          >
            <span className="text-zinc-500 font-extrabold pb-[1px]">CURRENCY:</span>
            <span className="text-white font-black">{selectedCurrency.flag} {selectedCurrency.code}</span>
          </div>
        </div>
      </div>

      {/* Main Bar: Logo Left, Wide Google-style search bar middle-right */}
      <div className="w-full h-20 md:h-24 px-4 md:px-10 bg-black text-white border-b-2 border-black flex items-center justify-between gap-4 sm:gap-6 relative">
        
        {/* Left: Ooja Brand Logo - perfectly aligned to the left */}
        <div 
          onClick={() => setCurrentTab('shop')} 
          className="cursor-pointer shrink-0 flex items-center select-none"
        >
          <div className="w-24 h-6 xs:w-28 xs:h-8 sm:w-36 sm:h-10 md:w-44 md:h-12 flex items-center justify-center transition-transform hover:scale-[1.02]">
            <img 
              src="/src/assets/images/ooja_clean_logo_1779369136903.png" 
              alt="Ooja Logo" 
              className="w-full h-full object-contain filter brightness-100 contrast-100"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Keep backup display if image fails
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Center/Right: Wide Google/Jumia-style Premium Long Search Bar */}
        <div className="flex-1 max-w-xl md:max-w-2xl lg:max-w-3xl relative">
          <div className="flex items-center w-full bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-700 hover:border-white focus-within:border-white focus-within:bg-zinc-950 transition-all rounded-full px-4 py-2 sm:py-2.5 shadow-md">
            <Search className="w-4 h-4 text-zinc-400 shrink-0 mr-2.5" />
            <input
              id="header-google-search"
              type="text"
              placeholder="Search products, departments, releases..."
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              className="bg-transparent text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-tight w-full placeholder-zinc-550 focus:outline-none"
              aria-label="Google-style Wide Search Bar"
            />
            {searchQuery && (
              <button
                id="header-search-clear"
                onClick={() => handleInputChange('')}
                className="text-zinc-500 hover:text-white p-0.5 ml-1 transition-colors outline-none cursor-pointer"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Minimal Nav menu links visible on Desktop - No active User or Bag icons at all! */}
        <nav className="hidden xl:flex items-center space-x-4 lg:space-x-6 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-350 shrink-0 select-none">
          <button 
            id="nav-shop"
            onClick={() => setCurrentTab('shop')} 
            className={`transition-colors py-1 ${currentTab === 'shop' ? 'text-white border-b border-white' : 'hover:text-white'}`}
          >
            Home
          </button>
          <button 
            id="nav-categories"
            onClick={() => setCurrentTab('categories')} 
            className={`transition-colors py-1 ${currentTab === 'categories' ? 'text-white border-b border-white' : 'hover:text-white'}`}
          >
            Categories
          </button>
          <button 
            id="nav-profile"
            onClick={() => setCurrentTab('profile')} 
            className={`transition-colors py-1 ${currentTab === 'profile' ? 'text-white border-b border-white' : 'hover:text-white'}`}
          >
            {currentUser ? `Guest: ${currentUser.name.split(' ')[0]}` : 'Account'}
          </button>
        </nav>
        
      </div>
    </header>
  );
}
