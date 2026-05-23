import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  wishlistCount: number;
}

export default function BottomNav({
  currentTab,
  setCurrentTab,
  cartCount,
  openCart,
  wishlistCount,
}: BottomNavProps) {
  const tabs = [
    { 
      id: 'shop', 
      label: 'Home',
      renderIcon: (isActive: boolean) => (
        <Home 
          className={`w-5 h-5 transition-all duration-300 ${
            isActive ? 'text-black stroke-[2.5]' : 'text-zinc-400 group-hover:text-white'
          }`} 
        />
      )
    },
    { 
      id: 'categories', 
      label: 'Category',
      renderIcon: (isActive: boolean) => (
        <Grid 
          className={`w-5 h-5 transition-all duration-300 ${
            isActive ? 'text-black stroke-[2.5]' : 'text-zinc-400 group-hover:text-white'
          }`} 
        />
      )
    },
    { 
      id: 'cart_trigger', 
      label: 'Cart', 
      specialAction: true,
      renderIcon: () => (
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-white transition-all duration-300" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] bg-white text-black text-[9px] font-mono font-black flex items-center justify-center rounded-full px-0.5 border border-black animate-pulse">
              {cartCount}
            </span>
          )}
        </div>
      )
    },
    { 
      id: 'wishlist', 
      label: 'Likes',
      renderIcon: (isActive: boolean) => (
        <div className="relative">
          <Heart 
            className={`w-5 h-5 transition-all duration-300 ${
              isActive ? 'text-black fill-black stroke-[2.5]' : 'text-zinc-400 group-hover:text-white'
            }`} 
          />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] bg-white text-black text-[9px] font-mono font-black flex items-center justify-center rounded-full px-0.5 border border-black">
              {wishlistCount}
            </span>
          )}
        </div>
      )
    },
    { 
      id: 'profile', 
      label: 'Account',
      renderIcon: (isActive: boolean) => (
        <User 
          className={`w-5 h-5 transition-all duration-300 ${
            isActive ? 'text-black stroke-[2.5]' : 'text-zinc-400 group-hover:text-white'
          }`} 
        />
      )
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm h-16 bg-[#121212]/95 backdrop-blur-md rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.5)] border border-white/10 z-45 flex items-center justify-between px-3 select-none">
      {tabs.map((tab) => {
        const isActive = tab.specialAction ? false : (currentTab === tab.id);

        return (
          <button
            key={tab.id}
            id={`bottom-nav-${tab.id}`}
            onClick={() => {
              if (tab.specialAction) {
                openCart();
              } else {
                setCurrentTab(tab.id);
              }
            }}
            className="flex flex-col items-center justify-center h-full relative cursor-pointer group flex-1"
          >
            {isActive ? (
              <div className="flex flex-col items-center justify-center bg-white text-black p-2.5 rounded-full shadow-lg scale-110 animate-scale transition-all duration-300">
                {tab.renderIcon ? tab.renderIcon(true) : null}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-2.5 rounded-full transition-all duration-305">
                {tab.renderIcon ? tab.renderIcon(false) : null}
              </div>
            )}
            
            {/* Soft, small caption displayed on hover or if selected */}
            <span className={`text-[8px] font-bold uppercase tracking-widest mt-1 hidden transition-all ${
              isActive ? 'text-white opacity-100' : 'text-zinc-500 opacity-0 group-hover:opacity-100'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
