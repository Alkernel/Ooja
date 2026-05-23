import { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import AuthScreen from './components/AuthScreen';
import CategoriesSection from './components/CategoriesSection';
import AdminPanel from './components/AdminPanel';
import { PRODUCTS, CATEGORIES } from './data';
import { Product, CartItem, User, Order, CurrencyConfig, CURRENCIES, StoreSettings } from './types';
import { ArrowUpRight, Check, Shield, Truck, RefreshCw, Sparkles, MessageSquare, ExternalLink, Mail, Grid, Layers, ShoppingBag, Heart, Lock, Unlock, X, Bell } from 'lucide-react';

export default function App() {
  // Navigation: 'shop' (default), 'search', 'profile'
  const [currentTab, setCurrentTab] = useState<string>('shop');

  // Search and Category filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  // Reset subcategory selection when the main category changes
  useEffect(() => {
    setSelectedSubCategory('all');
  }, [selectedCategory]);
  const [previewProductId, setPreviewProductId] = useState<string>('ooja-001');

  // Preview index for product image galleries
  const [previewImageIndex, setPreviewImageIndex] = useState<number>(0);

  // Interactive Product detail Modal Context
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart Drawer open state and Cart item state (with LocalStorage persistence)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ooja_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Authentication State (with LocalStorage persistence)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ooja_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Orders State (with LocalStorage persistence)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ooja_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Success Feedbacks
  const [toastMessage, setToastMessage] = useState<string>('');

  // Product catalog list with local consistency
  const [dbProducts, setDbProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ooja_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('ooja_products', JSON.stringify(dbProducts));
  }, [dbProducts]);

  // Admin and Secure Passcode states
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('ooja_admin_unlocked') === 'true';
  });
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState<boolean>(false);
  const [passcodeVal, setPasscodeVal] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('ooja_admin_unlocked', String(isAdminUnlocked));
  }, [isAdminUnlocked]);

  // Registered Shopper profiles persistence (seeded with high-fidelity defaults)
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('ooja_registered_users');
    if (saved) return JSON.parse(saved);
    return [
      {
        email: 'akinwunmigbenga97@gmail.com',
        name: 'GBENGA',
        phone: '+234 810 000 0000',
        shippingAddress: '42 Isaac John Street, Ikeja',
        city: 'Lagos',
        zipCode: '100001',
        createdAt: '2026-05-22',
        preferredRoute: 'NG_TO_NG'
      },
      {
        email: 'chimamanda.a@ooja.io',
        name: 'CHIMAMANDA ADEBAYO',
        phone: '+234 902 444 8888',
        shippingAddress: 'Plot 12, Admiralty Way, Lekki Phase 1',
        city: 'Lagos',
        zipCode: '105101',
        createdAt: '2026-05-21',
        preferredRoute: 'NG_TO_NG'
      },
      {
        email: 'kofi.mensah@gmail.com',
        name: 'KOFI MENSAH',
        phone: '+233 24 456 7890',
        shippingAddress: '24 Ring Road Central',
        city: 'Accra',
        zipCode: '00233',
        createdAt: '2026-05-18',
        preferredRoute: 'AFRICA_EXP'
      },
      {
        email: 'steve.walker@studio.co.uk',
        name: 'STEPHEN WALKER',
        phone: '+44 7700 900077',
        shippingAddress: 'Appt 14, 82 Shoreditch High St',
        city: 'London',
        zipCode: 'E1 6JJ',
        createdAt: '2026-05-19',
        preferredRoute: 'US_AIR_CARGO'
      },
      {
        email: 'funmi.o@vanguard.ng',
        name: 'FUNMILAYO OKAFOR',
        phone: '+234 803 555 1212',
        shippingAddress: '56 Maitama Avenue',
        city: 'Abuja',
        zipCode: '900211',
        createdAt: '2026-05-23',
        preferredRoute: 'NG_TO_NG'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('ooja_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Global Announcement bulletin configurations
  const [announcement, setAnnouncement] = useState<{
    active: boolean;
    title: string;
    message: string;
    type: 'banner' | 'modal';
  }>(() => {
    const saved = localStorage.getItem('ooja_announcement');
    return saved ? JSON.parse(saved) : {
      active: true,
      title: 'SEASON SELECTIONS',
      message: 'AUTHENTIC RELEASES ARE NOW ONLINE. ENTER DISCOUNTS CODE NIGERIA20 AT SECURE CHECKOUT FOR 20% BATCH OFFERS.',
      type: 'banner'
    };
  });

  useEffect(() => {
    localStorage.setItem('ooja_announcement', JSON.stringify(announcement));
  }, [announcement]);

  const [maintenance, setMaintenance] = useState<{
    active: boolean;
    message: string;
  }>(() => {
    const saved = localStorage.getItem('ooja_maintenance');
    return saved ? JSON.parse(saved) : {
      active: false,
      message: 'THE STORE IS CURRENTLY UNDER SCHEDULED MAINTENANCE OPERATIONS. CHECK BACK FOR HIGH-FASHION RELEASES IN A MOMENT.'
    };
  });

  useEffect(() => {
    localStorage.setItem('ooja_maintenance', JSON.stringify(maintenance));
  }, [maintenance]);

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const defaultSettings: StoreSettings = {
      shippingThresholdText: 'Complimentary shipping worldwide on orders over ₦225,000',
      shippingThresholdUSD: 150,
      promoBannerTitle: 'NEW COLLECTIONS',
      promoBannerSeason: 'PRE-FALL ATMOSPHERE',
      promoBannerSubtitle: '20% OFF / SHOP NEW',
      promoBannerDescription: 'Engineering premium double-fleece cotton garments, hand-knit merino sweaters, and archival calfskin Chelsea boots to deliver unmatched visual tranquility.',
      promoBannerImage: 'https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?q=80&w=800&auto=format&fit=crop',
      showPromoBanner: true,
      showTrendingShowcase: true,
      trendingProductId: 'ooja-003',
      boldStoreLogo: true,
    };
    const saved = localStorage.getItem('ooja_store_settings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('ooja_store_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  const [hasDismissedAnnouncement, setHasDismissedAnnouncement] = useState<boolean>(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [staffPasscode, setStaffPasscode] = useState<string>('');
  const [staffError, setStaffError] = useState<string>('');

  // Wishlist and Product filters
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('ooja_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [sortBy, setSortBy] = useState<'default' | 'priceLow' | 'priceHigh'>('default');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<boolean>(false);

  // Currency selection: defaults to Naira (Nigerian store default)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyConfig>(() => {
    const saved = localStorage.getItem('ooja_currency');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.code) return parsed;
      } catch (e) {
        // Fallback to NGN
      }
    }
    return CURRENCIES[0]; // NGN
  });

  // Sync to localStorages
  useEffect(() => {
    localStorage.setItem('ooja_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('ooja_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Synchronize blocked users instantly on state transition
  useEffect(() => {
    if (currentUser && currentUser.email.toLowerCase() !== 'akinwunmigbenga97@gmail.com') {
      const match = registeredUsers.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
      if (match?.isBlocked) {
        setCurrentUser(null);
        setToastMessage("YOUR ACCOUNT WAS DEFERRED BY SYSTEM ADMINISTRATION.");
        setTimeout(() => setToastMessage(''), 6000);
      }
    }
  }, [currentUser, registeredUsers]);

  useEffect(() => {
    localStorage.setItem('ooja_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ooja_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ooja_currency', JSON.stringify(selectedCurrency));
  }, [selectedCurrency]);

  // Helper to format any pricing value dynamically based on currency exchange rate
  const formatPrice = (priceVal: number): string => {
    const converted = priceVal * selectedCurrency.rate;
    if (selectedCurrency.code === 'NGN') {
      return `₦${Math.round(converted).toLocaleString()}`;
    }
    if (selectedCurrency.code === 'GHS') {
      return `GH₵${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (selectedCurrency.code === 'USD') {
      return `$${converted.toFixed(2)}`;
    }
    if (selectedCurrency.code === 'ZAR') {
      return `R ${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (selectedCurrency.code === 'KES') {
      return `KSh ${Math.round(converted).toLocaleString()}`;
    }
    if (selectedCurrency.code === 'XOF') {
      return `CFA ${Math.round(converted).toLocaleString()}`;
    }
    return `${selectedCurrency.symbol}${converted.toFixed(2)}`;
  };

  // Wishlist actions
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isFav = prev.includes(productId);
      if (isFav) {
        setToastMessage('REMOVED FROM FAVORITES');
        return prev.filter((id) => id !== productId);
      } else {
        setToastMessage('ADDED TO FAVORITES');
        return [...prev, productId];
      }
    });
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  // Immediate Purchase Callback
  const handleBuyNow = (product: Product, size?: string) => {
    handleAddToCart(product, size);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Handle Cart Operations
  const handleAddToCart = (product: Product, size?: string) => {
    setCartItems((prevItems) => {
      // Check if item of same product and size already exists
      const existingIdx = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevItems, { product, selectedSize: size, quantity: 1 }];
      }
    });

    // Fire tiny premium feedback notification
    setToastMessage(`ADDED ${product.name.toUpperCase()} TO BAG`);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      updated[index].quantity = newQuantity;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddOrder = (order: Order) => {
    setOrders((prevOrders) => [order, ...prevOrders]);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((ord) => (ord.id === updatedOrder.id ? updatedOrder : ord))
    );
  };

  const handleUserLogin = (user: User) => {
    setCurrentUser(user);
    
    // Append or update user details in the clients ledger
    setRegisteredUsers((prev) => {
      const exists = prev.some((u) => u.email.toLowerCase() === user.email.toLowerCase());
      if (exists) {
        return prev.map((u) => u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, ...user } : u);
      }
      return [user, ...prev];
    });

    if (user.email.toLowerCase() === 'akinwunmigbenga97@gmail.com') {
      setIsAdminUnlocked(true);
      setCurrentTab('admin');
      setToastMessage('ADMIN DECK RETRIEVED SECURELY');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setIsAdminUnlocked(false);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  // Trigger search focus action
  const handleSearchClick = () => {
    setCurrentTab('search');
    // Allow focus transition delay
    setTimeout(() => {
      const elem = document.getElementById('search-explorer-input');
      elem?.focus();
    }, 100);
  };

  // Filtered Products List
  const filteredProducts = dbProducts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !onlyInStock || p.inStock;
    const matchesRating = !minRating || p.rating >= 4.8;
    return matchesCategory && matchesSearch && matchesStock && matchesRating;
  });

  const sortedProducts = [...filteredProducts];
  if (sortBy === 'priceLow') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceHigh') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // Check if primary administrator akinwunmigbenga97@gmail.com is currently logged-in
  const isAdminSession = currentUser?.email.toLowerCase() === 'akinwunmigbenga97@gmail.com';

  if (isAdminSession) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col justify-between relative font-sans">
        <main className="flex-1 w-full flex flex-col items-stretch max-w-7xl mx-auto pt-4 pb-12">
          <AdminPanel
            products={dbProducts}
            setProducts={setDbProducts}
            orders={orders}
            setOrders={setOrders}
            formatPrice={formatPrice}
            selectedCurrency={selectedCurrency}
            onClose={handleUserLogout}
            onLogout={handleUserLogout}
            registeredUsers={registeredUsers}
            setRegisteredUsers={setRegisteredUsers}
            announcement={announcement}
            setAnnouncement={setAnnouncement}
            maintenance={maintenance}
            setMaintenance={setMaintenance}
            storeSettings={storeSettings}
            setStoreSettings={setStoreSettings}
          />
        </main>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-zinc-900 border-2 border-white/10 text-[#00ff66] font-mono text-[10px] font-bold px-6 py-3.5 shadow-2xl z-50 flex items-center gap-2 animate-scale">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse"></span>
            {toastMessage.toUpperCase()}
          </div>
        )}
      </div>
    );
  }

  if (maintenance.active && !isAdminSession) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col justify-between items-center p-6 text-center font-sans">
        <header className="w-full py-4 max-w-7xl mx-auto flex justify-between items-center border-b-2 border-dashed border-black">
          <span className="text-xl font-black uppercase tracking-widest text-black">OOJA CO.</span>
          <span className="bg-amber-500 text-black font-mono text-[8.5px] font-black px-2 py-0.5 tracking-wider uppercase">[ OFF-LINE INDEX ]</span>
        </header>

        <main className="flex-1 w-full max-w-md flex flex-col justify-center items-stretch py-12">
          {!isStaffModalOpen ? (
            <div className="space-y-6 border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-zinc-50 relative">
              <div className="w-16 h-16 rounded-full bg-amber-500 border-4 border-black flex items-center justify-center mx-auto text-black font-extrabold text-3xl animate-bounce">
                !
              </div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight">[ STORE UNDER MAINTENANCE ]</h1>
              <p className="text-xs text-zinc-650 leading-relaxed uppercase font-mono font-bold">
                {maintenance.message || "We are currently running database index enhancements and updating seasonal inventory. All systems will return shortly."}
              </p>
              
              <div className="pt-6 border-t border-black/10">
                <button
                  onClick={() => setIsStaffModalOpen(true)}
                  className="text-[10px] sm:text-[11.5px] font-mono font-extrabold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors cursor-pointer select-none underline"
                >
                  🔒 STAFF OVERRIDE LOG IN
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 border-4 border-black p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-zinc-50 relative text-left">
              <div className="flex justify-between items-center border-b border-black pb-2">
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">[ STAFF ACCESS BYPASS ]</h2>
                <button 
                  onClick={() => {
                    setIsStaffModalOpen(false);
                    setStaffPasscode('');
                    setStaffError('');
                  }}
                  className="text-xs font-mono font-black text-zinc-450 hover:text-black hover:underline cursor-pointer"
                >
                  GO BACK
                </button>
              </div>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setStaffError('');
                  if (!staffPasscode) {
                    setStaffError('Please enter the administrative credentials key.');
                    return;
                  }
                  try {
                    const response = await fetch('/api/auth/login', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        email: 'akinwunmigbenga97@gmail.com',
                        password: staffPasscode
                      })
                    });
                    const data = await response.json();
                    if (response.ok && data.success) {
                      setCurrentUser(data.user);
                      setToastMessage('ADMIN OVERRIDE SESSION UNLOCKED UNLIMITED');
                      setTimeout(() => setToastMessage(''), 3000);
                    } else {
                      setStaffError(data.message || 'Signature mismatch: Access unauthorized.');
                    }
                  } catch (err) {
                    setStaffError('Network timeout coordinating remote credential verification.');
                  }
                }}
                className="space-y-4 font-mono"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Passcode/Credentials Secret</label>
                  <input
                    type="password"
                    required
                    value={staffPasscode}
                    onChange={(e) => setStaffPasscode(e.target.value)}
                    placeholder="Enter Staff Key Password"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-100 bg-white text-black"
                  />
                </div>

                {staffError && (
                  <p className="text-[10px] text-red-650 font-black uppercase leading-tight">
                    ⚠ {staffError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-black hover:bg-neutral-900 text-white font-mono text-xs font-black uppercase tracking-widest transition-all cursor-pointer border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  🔒 UNLOCK ATELIER CHANNELS
                </button>
              </form>
            </div>
          )}
        </main>

        <footer className="w-full py-4 text-[10px] font-mono text-zinc-400 uppercase border-t border-dashed border-black">
          Ooja Collection • Systems Synced OK
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between pb-24 lg:pb-0 relative font-sans">
      
      {/* Dynamic Marquee Announcement Banner Ticker */}
      {announcement.active && announcement.type === 'banner' && (
        <div id="announcement-global-ticker" className="bg-black text-[rgb(0,255,102)] font-mono text-[9px] sm:text-[10.5px] font-black py-2.5 px-4 text-center border-b-2 border-dashed border-[rgb(0,255,102)]/30 relative z-40 flex items-center justify-center gap-2">
          <Bell className="w-3.5 h-3.5 shrink-0 animate-bounce" />
          <span>📢 [ {announcement.title} ]: {announcement.message}</span>
        </div>
      )}

      {/* Header component */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        formatPrice={formatPrice}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        storeSettings={storeSettings}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col items-stretch max-w-7xl mx-auto pt-0 pb-12">
        
        {/* TAB 1: SHOPPING CATALOG (HOME) (SCREEN 1 ALIGNED DESIGN) */}
        {currentTab === 'shop' && (
          <div className="w-full flex flex-col items-stretch animate-fade-in text-black font-sans bg-white pb-6">
            
            {/* Interactive Coupon Code Ticker Banner */}
            <section className="px-4 pt-6 md:px-8">
              <div id="promotional-discount-banner" className="bg-[#18181b] text-white p-4.5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-xs font-sans flex flex-col lg:flex-row justify-between items-center gap-4 animate-scale">
                <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                  <div className="bg-white text-black text-[10px] font-black px-2.5 py-1 uppercase tracking-wider font-mono shrink-0">
                    20% OFF ATELIER OFFER
                  </div>
                  <p className="font-bold uppercase tracking-tight text-zinc-200">
                    Unlock a premium 20% discount across our entire Fall catalog with code checkout validation.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 items-center shrink-0">
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">[CLICK VOUCHER TO INSTANT COPY]</span>
                  <div className="flex gap-2">
                    {['WELCOME20', 'NIGERIA20'].map((code) => (
                      <button
                        key={code}
                        id={`copy-code-${code.toLowerCase()}`}
                        onClick={() => {
                          const clipboardObj = window.navigator.clipboard;
                          if (clipboardObj) {
                            clipboardObj.writeText(code);
                            setToastMessage(`SUCCESS: COPIED VOUCHER '${code}' TO CLIPBOARD.`);
                            setTimeout(() => setToastMessage(''), 2500);
                          }
                        }}
                        className="px-3.5 py-1.5 bg-zinc-800 hover:bg-white hover:text-black border border-white/20 hover:border-black font-mono font-black tracking-widest text-[11px] uppercase transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] active:translate-y-0.5"
                        title="Click to copy code"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            
            {/* Promo Release Banner Box (Styled to match the vibe of Screen 1 header banner) */}
            {storeSettings.showPromoBanner && (
              <section className="px-4 py-6 md:px-8 border-b-2 border-black">
                <div className="relative border-4 border-black bg-[#18181b] overflow-hidden flex flex-col md:flex-row shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none h-[400px] sm:h-[450px]">
                {/* Visual content details */}
                <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between text-white z-10 relative">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest block font-mono">[ {storeSettings.promoBannerSeason} ]</span>
                    <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white whitespace-pre-line">
                      {storeSettings.promoBannerTitle}
                    </h2>
                    <div className="text-xl sm:text-2xl font-black uppercase tracking-wide bg-white text-black px-3 py-1 inline-block mt-2">
                      {storeSettings.promoBannerSubtitle}
                    </div>
                  </div>
                  
                  <p className="text-[11px] sm:text-xs text-zinc-350 max-w-sm uppercase font-bold tracking-tight font-sans leading-relaxed">
                    {storeSettings.promoBannerDescription}
                  </p>

                  <div>
                    <button
                      id="banner-shop-cta"
                      onClick={() => {
                        const element = document.getElementById('curated-releases-container');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 bg-white text-black hover:bg-black hover:text-white border-2 border-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      <span>Browse Collections</span>
                      <ArrowUpRight className="w-4 h-4 text-black group-hover:text-white stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Right side portrait crop mockup from Unsplash (clean, fashionable contrast style) */}
                <div className="w-full md:w-1/2 h-full absolute md:relative inset-0 opacity-20 md:opacity-100 transition-opacity">
                  <img
                    src={storeSettings.promoBannerImage}
                    alt="Monochrome collection visual model"
                    className="w-full h-full object-cover grayscale brightness-90 contrast-125"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#18181b] via-transparent to-[#18181b]/40 md:from-transparent" />
                </div>
              </div>
            </section>
            )}

            {/* Shop By Category Circular Avatars List (As shown in Screen 1) */}
            <section className="px-4 py-8 md:px-8 border-b-2 border-black bg-zinc-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-black">[ Shop By Category ]</span>
                <button 
                  onClick={() => setCurrentTab('categories')}
                  className="text-xs font-bold uppercase text-zinc-500 hover:text-black underline tracking-wider cursor-pointer font-sans"
                >
                  See All Departments
                </button>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none select-none">
                {[
                  { id: 'all', name: 'All Collection', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=150&auto=format&fit=crop' },
                  { id: 'apparel', name: 'Apparel', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=150&auto=format&fit=crop' },
                  { id: 'footwear', name: 'Footwear & Boots', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=150&auto=format&fit=crop' },
                  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=150&auto=format&fit=crop' },
                  { id: 'lifestyle', name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=150&auto=format&fit=crop' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    id={`circular-cat-${cat.id}`}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedSubCategory('all');
                      setCurrentTab('categories');
                    }}
                    className="flex flex-col items-center gap-2.5 min-w-[80px] sm:min-w-[100px] focus:outline-none group cursor-pointer"
                  >
                    {/* Circle thumbnail image matching Screen 1 style */}
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 overflow-hidden bg-white flex items-center justify-center transition-all ${
                      selectedCategory === cat.id ? 'border-black ring-4 ring-black/10 scale-105' : 'border-zinc-300 hover:border-black'
                    }`}>
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover grayscale contrast-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className={`text-[10px] font-black uppercase text-center font-sans tracking-tight leading-tight ${
                      selectedCategory === cat.id ? 'text-black font-extrabold' : 'text-zinc-500 group-hover:text-black'
                    }`}>
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Interactive Trending Product Display Banner */}
            {storeSettings.showTrendingShowcase && (() => {
              const trendingProduct = dbProducts.find(p => p.id === (storeSettings.trendingProductId || 'ooja-003')) || dbProducts[0];
              if (!trendingProduct) return null;
              return (
                <section id="trending-product-showcase" className="px-4 py-8 md:px-8 bg-white border-b-2 border-black animate-scale">
                  <div className="border-4 border-black bg-zinc-50 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-all duration-300 ease-out relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center">
                    
                    {/* Corner Ribbon Detail */}
                    <div className="absolute top-0 right-0 bg-[#ea580c] text-white text-[9px] font-black uppercase px-10 py-1.5 rotate-45 translate-x-8 translate-y-4 tracking-widest font-mono shadow-sm">
                      TRENDING NOW
                    </div>

                    {/* Left details */}
                    <div className="flex-1 space-y-4 text-black text-left">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black bg-[#18181b] text-white px-2.5 py-1 uppercase tracking-widest font-mono inline-block">
                            🔥 CHOSEN SECTOR DROP
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 uppercase border-2 tracking-wider font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                            trendingProduct.inStock 
                              ? 'bg-green-100 text-green-850 border-green-600' 
                              : 'bg-red-100 text-red-750 border-red-600 animate-pulse'
                          }`}>
                            {trendingProduct.inStock ? '● IN STOCK' : '○ SOLD OUT'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-500 font-mono">ID: {trendingProduct.id}</span>
                          <span className="text-zinc-350">•</span>
                          <span className="text-xs font-semibold text-[#ea580c] uppercase tracking-wider font-mono">★ {trendingProduct.rating} / 5.0 Rating</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tighter leading-none font-sans text-black">
                          {trendingProduct.name}
                        </h3>
                      </div>

                      <p className="text-xs text-zinc-650 max-w-xl font-sans leading-relaxed">
                        {trendingProduct.description}
                      </p>

                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-[10px] font-black text-zinc-400 font-mono uppercase tracking-widest">[ CURRENT OFFER ]</span>
                        <span className="text-2xl font-black font-mono text-black">
                          {formatPrice(trendingProduct.price)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          id="trending-add-to-bag"
                          disabled={!trendingProduct.inStock}
                          onClick={() => {
                            const defaultSize = trendingProduct.sizes[1] || trendingProduct.sizes[0] || 'One Size';
                            handleAddToCart(trendingProduct, defaultSize);
                            setToastMessage(`SUCCESS: ADDED ${trendingProduct.name} (SIZE ${defaultSize}) TO YOUR BAG.`);
                            setTimeout(() => setToastMessage(''), 3000);
                            setIsCartOpen(true);
                          }}
                          className={`px-5 py-3 font-sans text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(234,88,12,0.6)] ${
                            trendingProduct.inStock
                              ? 'bg-black hover:bg-zinc-800 text-white active:translate-y-0.5'
                              : 'bg-zinc-200 text-zinc-500 cursor-not-allowed border border-zinc-300'
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" /> 
                          {trendingProduct.inStock ? 'Quick Add To Bag' : 'Sold Out'}
                        </button>

                        <button
                          id="trending-view-details"
                          onClick={() => setSelectedProduct(trendingProduct)}
                          className="px-5 py-3 bg-white hover:bg-zinc-50 text-black border-2 border-black font-sans text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 active:translate-y-0.5 animate-pulse"
                        >
                          <span>Inspect Silhouettes</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>

                    {/* Right side beautifully styled image presentation */}
                    <div className="w-full lg:w-[320.5px] h-[280.5px] border-4 border-black bg-white overflow-hidden p-2 relative shrink-0 group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <img
                        src={trendingProduct.images[0]}
                        alt={trendingProduct.name}
                        className="w-full h-full object-cover grayscale brightness-95 contrast-110 transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/90 text-white p-2 border-2 border-white/20 text-[9px] font-mono uppercase tracking-wider flex justify-between items-center bg-blur">
                        <span>[ HIGH-GRADE {trendingProduct.category.toUpperCase()} ]</span>
                        <span className="text-[#ea580c] font-bold">LIMITED PARCEL SIZES</span>
                      </div>
                    </div>

                  </div>
                </section>
              );
            })()}

            {/* Value Proposition bar in minimal blocks */}
            <section className="px-4 py-6 md:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-b-2 border-black bg-white">
              <div className="flex items-start gap-4 p-4 bg-zinc-50 border border-black/10">
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-black text-white shrink-0">
                  <Truck className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider mb-0.5">[ Worldwide Duty ]</h4>
                  <p className="text-[10.5px] text-zinc-500 font-sans tracking-tight">Rapid postal transit, automatic tracking credentials.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-zinc-50 border border-black/10">
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-black text-white shrink-0">
                  <RefreshCw className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider mb-0.5">[ 30-Day Envelope ]</h4>
                  <p className="text-[10.5px] text-zinc-500 font-sans tracking-tight">Fully insured returns, simple parcel return label.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-zinc-50 border border-black/10">
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-black text-white shrink-0">
                  <Shield className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider mb-0.5">[ Archive Original ]</h4>
                  <p className="text-[10.5px] text-zinc-500 font-sans tracking-tight">Certificates of authenticity included in container dossier.</p>
                </div>
              </div>
            </section>

            {/* Curated For You Catalogue Grid (Exactly as shown in Screen 1) */}
            <section id="curated-releases-container" className="px-4 py-8 md:px-8 scroll-mt-24">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <span className="text-[10px] font-bold uppercase text-zinc-400 font-sans tracking-widest">[ SELECTION CURATION ]</span>
                  <h3 className="text-xl font-black uppercase font-sans tracking-tight flex items-center gap-2">
                    Curated For You
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-zinc-400">DEPARTMENT:</span>
                  <span className="font-sans font-black bg-black text-white px-2.5 py-1 text-[10px] uppercase">{selectedCategory.toUpperCase()}</span>
                </div>
              </div>

              {/* Grid of beautifully designed product cards */}
              {sortedProducts.length === 0 ? (
                <div className="py-16 text-center border-2 border-black bg-zinc-50">
                  <p className="text-xs uppercase font-black">No products in this curated selection</p>
                  <button onClick={() => setSelectedCategory('all')} className="underline text-xs mt-2 uppercase font-mono">view all collection</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {sortedProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onViewDetails={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      isFavorite={wishlist.includes(prod.id)}
                      onToggleWishlist={handleToggleWishlist}
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 2: EXPLORE & FILTER SCREEN (SCREEN 3 ALIGNED DESIGN) */}
        {currentTab === 'search' && (
          <div className="px-4 py-8 md:px-8 space-y-8 animate-fade-in text-black font-sans">
            
            {/* Exploration header with beautiful full width search input */}
            <div className="space-y-4 max-w-3xl">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#71717a] font-mono">[ EXPLORATION SYSTEM ]</span>
                <h2 className="text-3xl font-black uppercase tracking-tight font-sans">Catalogue Explorer</h2>
                <p className="text-xs text-zinc-500 font-sans tracking-tight leading-relaxed mt-1">
                  Query our total list of pre-releases or apply filter matrix chips directly to focus your curation.
                </p>
              </div>
              
              <div className="relative">
                <input
                  id="search-explorer-input"
                  type="text"
                  placeholder="Query e.g. 'jacket', 'wool', 'accessories', 'leather'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-base sm:text-lg pl-5 pr-20 py-4.5 border-4 border-black outline-none font-sans font-bold uppercase tracking-tight placeholder-zinc-350 focus:bg-zinc-50/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                  aria-label="Collection Search Input"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                  {searchQuery && (
                    <button
                      id="clear-search-btn"
                      onClick={() => setSearchQuery('')}
                      className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-black underline cursor-pointer font-black"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Matrix Filters Row (Inspired heavily by Screen 3 Filters) */}
            <div className="pt-2 pb-1.5 border-y-2 border-black flex flex-wrap gap-2.5 items-center bg-zinc-50 p-3">
              <span className="text-[9px] font-black uppercase text-[#71717a] tracking-widest mr-1 sm:block hidden">[ FILTER SEGMENT ]:</span>
              
              {/* Sort By Price Capsule */}
              <button
                id="filter-chip-sort"
                onClick={() => {
                  setSortBy(prev => prev === 'default' ? 'priceLow' : prev === 'priceLow' ? 'priceHigh' : 'default');
                  setToastMessage('SORT ORDER UPDATED');
                  setTimeout(() => setToastMessage(''), 1500);
                }}
                className={`px-3.5 py-2 border-2 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  sortBy !== 'default' 
                    ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              >
                PRICE: {sortBy === 'default' ? 'DEFAULT' : sortBy === 'priceLow' ? 'LOW → HIGH' : 'HIGH → LOW'}
              </button>

              {/* Stock toggle capsule */}
              <button
                id="filter-chip-stock"
                onClick={() => {
                  setOnlyInStock(!onlyInStock);
                  setToastMessage(`STOCKS FILTER: ${!onlyInStock ? 'ACTIVE' : 'ALL'}`);
                  setTimeout(() => setToastMessage(''), 1500);
                }}
                className={`px-3.5 py-2 border-2 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  onlyInStock 
                    ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              >
                IN-STOCK: {onlyInStock ? '✓ ACTIVE' : 'ALL'}
              </button>

              {/* Rating toggle capsule */}
              <button
                id="filter-chip-rating"
                onClick={() => {
                  setMinRating(!minRating);
                  setToastMessage(`TOP RATED FILTER: ${!minRating ? 'ACTIVE' : 'ALL'}`);
                  setTimeout(() => setToastMessage(''), 1500);
                }}
                className={`px-3.5 py-2 border-2 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  minRating 
                    ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              >
                QUALITY: {minRating ? '★ 4.8+' : 'ALL'}
              </button>

              {/* Clear matrix filter button */}
              {(sortBy !== 'default' || onlyInStock || minRating || searchQuery) && (
                <button
                  id="reset-matrix-filters"
                  onClick={() => {
                    setSortBy('default');
                    setOnlyInStock(false);
                    setMinRating(false);
                    setSearchQuery('');
                    setToastMessage('FILTER MATRIX CLEARED');
                    setTimeout(() => setToastMessage(''), 1500);
                  }}
                  className="px-3.5 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer bg-white"
                >
                  [ Clear Matrix ]
                </button>
              )}
            </div>

            {/* Quick Suggestions Horizontal Circle Capsules (Screen 3 specific filter category tabs) */}
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-black uppercase text-[#71717a] tracking-widest">[ RAPID CATEGORY DIRECTORY ]:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Apparel', query: 'apparel' },
                  { name: 'Footwear', query: 'footwear' },
                  { name: 'Accessories', query: 'accessories' },
                  { name: 'Lifestyle', query: 'lifestyle' },
                  { name: 'Tees & Knits', query: 'cotton' },
                  { name: 'Jackets', query: 'jacket' },
                  { name: 'Leather', query: 'leather' },
                ].map((term) => (
                  <button
                    key={term.name}
                    id={`tag-suggest-${term.query}`}
                    onClick={() => {
                      setSearchQuery(term.query);
                      setToastMessage(`FILTER SET: ${term.name.toUpperCase()}`);
                      setTimeout(() => setToastMessage(''), 1000);
                    }}
                    className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase transition-all cursor-pointer ${
                      searchQuery === term.query 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-zinc-700 border-zinc-200 hover:border-black hover:text-black shadow-sm'
                    }`}
                  >
                    {term.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Results counter grid */}
            <div className="pt-4 border-t border-black/10">
              <div className="flex justify-between items-center mb-6 text-xs font-black text-black">
                <span className="font-mono">RETRIEVED {sortedProducts.length} SYSTEM RECORDS</span>
                {searchQuery && <span className="text-[#71717a]">TERM MATCH: "{searchQuery.toUpperCase()}"</span>}
              </div>

              {sortedProducts.length === 0 ? (
                <div className="py-16 text-center border-4 border-black text-black max-w-md mx-auto bg-zinc-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-sm font-black uppercase text-black mb-1">No matching dossier files found</p>
                  <p className="text-xs text-zinc-500 max-w-[280px] mx-auto font-sans leading-relaxed">
                    Adjust your query parameters or reset filters to explore our standard database indices.
                  </p>
                  <button
                    id="search-reset"
                    onClick={() => {
                      setSearchQuery('');
                      setSortBy('default');
                      setOnlyInStock(false);
                      setMinRating(false);
                    }}
                    className="mt-6 px-6 py-2.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black text-xs font-bold uppercase tracking-widest transition-all cursor-pointer font-sans"
                  >
                    Reset Query & Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {sortedProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onViewDetails={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      isFavorite={wishlist.includes(prod.id)}
                      onToggleWishlist={handleToggleWishlist}
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CATEGORIES DIRECTORY (JUMIA-STYLE SIDEBAR DIRECTORY & FILTER LAYOUT) */}
        {currentTab === 'categories' && (
          <CategoriesSection
            onViewProduct={setSelectedProduct}
            onAddToCart={(prod, size) => {
              handleAddToCart(prod, size);
              setIsCartOpen(true);
            }}
            formatPrice={formatPrice}
            initialSelectedCategory={selectedCategory}
            selectedCurrency={selectedCurrency}
          />
        )}

        {/* TAB 3: AUTHENTICATION AND ORDERS PROFILE */}
        {currentTab === 'profile' && (
          <AuthScreen
            currentUser={currentUser}
            onLogin={handleUserLogin}
            onLogout={handleUserLogout}
            onUpdateUser={handleUpdateUser}
            orders={orders}
            formatPrice={formatPrice}
            onUpdateOrder={handleUpdateOrder}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
            onAdminTrigger={() => setIsPasscodeModalOpen(true)}
          />
        )}

        {/* SECURE ATELIER ADMINISTRATIVE DESK (HIDDEN TAB) */}
        {currentTab === 'admin' && isAdminUnlocked && (
          <AdminPanel
            products={dbProducts}
            setProducts={setDbProducts}
            orders={orders}
            setOrders={setOrders}
            formatPrice={formatPrice}
            selectedCurrency={selectedCurrency}
            onClose={() => {
              setCurrentTab('shop');
            }}
            onLogout={handleUserLogout}
            registeredUsers={registeredUsers}
            setRegisteredUsers={setRegisteredUsers}
            announcement={announcement}
            setAnnouncement={setAnnouncement}
            maintenance={maintenance}
            setMaintenance={setMaintenance}
            storeSettings={storeSettings}
            setStoreSettings={setStoreSettings}
          />
        )}

        {/* TAB 5: WISHLIST (SAVED PRODUCTS TO VIEW LATER) */}
        {currentTab === 'wishlist' && (
          <div className="px-4 py-8 md:px-8 space-y-8 animate-fade-in text-black font-sans">
            <div className="space-y-4 max-w-3xl">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#71717a] font-mono">[ COLLECTOR DESIRED INDICES ]</span>
                <h2 className="text-3xl font-black uppercase tracking-tight font-sans">Saved Items</h2>
                <p className="text-xs text-zinc-500 font-sans tracking-tight leading-relaxed mt-1">
                  Your personalized selection of premium garments, luxury footwear, and lifestyle items. Saved to view, compare, or authenticate later.
                </p>
              </div>
            </div>

            {wishlist.length === 0 ? (
              <div className="py-16 text-center border-4 border-black text-black max-w-md mx-auto bg-zinc-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <Heart className="w-10 h-10 mx-auto text-zinc-300 mb-3 stroke-[1.5]" />
                <p className="text-sm font-black uppercase text-black mb-1">Your wishlist dossier is empty</p>
                <p className="text-xs text-zinc-500 max-w-[280px] mx-auto font-sans leading-relaxed">
                  As you browse our dynamic collections, click the heart icon on any archival garment page to index it for immediate lookup.
                </p>
                <div className="pt-2">
                  <button
                    id="wishlist-back-to-shop"
                    onClick={() => setCurrentTab('shop')}
                    className="mt-4 px-6 py-2.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black text-xs font-bold uppercase tracking-widest transition-all cursor-pointer font-sans"
                  >
                    Return to Collection Shop
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b-2 border-black pb-2 text-xs font-black">
                  <span className="font-mono text-[10px] sm:text-xs">RETRIEVED {wishlist.length} SAVED SYSTEM RECORDS</span>
                  <button 
                    onClick={() => {
                      setWishlist([]);
                      setToastMessage('ALL WISHLIST RECORDS CLEARED');
                      setTimeout(() => setToastMessage(''), 1500);
                    }}
                    className="text-zinc-500 hover:text-red-600 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider underline"
                  >
                    Clear All Saved
                  </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {dbProducts.filter(p => wishlist.includes(p.id)).map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onViewDetails={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      isFavorite={true}
                      onToggleWishlist={handleToggleWishlist}
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Structured Minimal Editorial Footer */}
      <footer className="w-full bg-black text-white border-t-2 border-black pt-12 pb-24 lg:pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 Brand Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img 
                  src="/src/assets/images/ooja_clean_logo_1779369136903.png" 
                  alt="Ooja Logo" 
                  className="w-full h-full object-contain filter brightness-100 contrast-100"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className={`text-xl tracking-[0.1em] uppercase text-white ${storeSettings.boldStoreLogo ? 'font-black' : 'font-bold'}`}>
                OOJA
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
              We engineer uncompromising minimalist garments. Deep visual stillness defined through pure high-contrast black and white palettes, double-fleece cotton weights, and Italian calfskin footwear.
            </p>
            <div className="text-[10px] font-bold text-zinc-500 font-sans">
              [ © 2026 OOJA. ALL RIGHTS RESERVED ]
            </div>
          </div>

          {/* Col 2 Collection Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">[Collections]</h4>
            <ul className="space-y-1 text-xs text-zinc-300 font-sans">
              <li><button onClick={() => { setCurrentTab('shop'); setSelectedCategory('apparel'); }} className="hover:underline cursor-pointer">Apparel Release</button></li>
              <li><button onClick={() => { setCurrentTab('shop'); setSelectedCategory('footwear'); }} className="hover:underline cursor-pointer">Footwear & Boots</button></li>
              <li><button onClick={() => { setCurrentTab('shop'); setSelectedCategory('accessories'); }} className="hover:underline cursor-pointer">Onyx Optical Accessories</button></li>
              <li><button onClick={() => { setCurrentTab('shop'); setSelectedCategory('lifestyle'); }} className="hover:underline cursor-pointer">Eclipse Stoneware</button></li>
            </ul>
          </div>

          {/* Col 3 Info Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">[Atelier Info]</h4>
            <ul className="space-y-1 text-xs text-zinc-300 font-sans">
              <li><a href="#" className="hover:underline flex items-center gap-1">Transit & Shipping <ExternalLink className="w-3 h-3 text-zinc-500" /></a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">Biodegradable Packing <ExternalLink className="w-3 h-3 text-zinc-500" /></a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">Terms of Authenticity <ExternalLink className="w-3 h-3 text-zinc-500" /></a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">Developer Sandbox <ExternalLink className="w-3 h-3 text-zinc-500" /></a></li>
            </ul>
          </div>

          {/* Col 4 Newsletter registration mockup */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">[Mailing Ledger]</h4>
            <p className="text-[11px] text-zinc-400">Subscribe for early notification releases and limited sample batch listings.</p>
            <div className="flex border-2 border-white bg-white">
              <input
                id="newsletter-email-input"
                type="email"
                placeholder="studio@collector.com"
                className="w-full px-3 py-2 text-xs text-black bg-transparent outline-none font-sans"
              />
              <button
                id="newsletter-submit"
                onClick={() => {
                  setToastMessage('EMAIL ADDED TO ATELIER LEDGER.');
                  const input = document.getElementById('newsletter-email-input') as HTMLInputElement;
                  if (input) input.value = '';
                }}
                className="px-4.5 bg-black text-white hover:bg-white hover:text-black border-l-2 border-white transition-all cursor-pointer flex items-center justify-center"
              >
                <Mail className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating toast notification bar */}
      {toastMessage && (
        <div 
          id="toast-notification"
          className="fixed bottom-20 md:bottom-8 right-5 z-50 bg-black text-white py-3.5 px-6 border-2 border-white text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-scale"
        >
          <Check className="w-4 h-4 text-[#16a34a] stroke-[3.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Product Detail Modal overlay */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          selectedCurrency={selectedCurrency}
          formatPrice={formatPrice}
        />
      )}

      {/* SECURE ATELIER ADMINISTRATIVE PASSCODE VERIFICATION OVERLAY */}
      {isPasscodeModalOpen && (
        <div id="admin-passcode-modal" className="fixed inset-0 bg-black/80 backdrop-blur-sm z-55 flex items-center justify-center p-4 select-none animate-fade-in animate-duration-150">
          <div className="bg-white border-4 border-black p-6 sm:p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left relative space-y-5">
            
            <button
              onClick={() => {
                setIsPasscodeModalOpen(false);
                setPasscodeVal('');
                setPasscodeError('');
              }}
              className="absolute top-4 right-4 p-1 hover:bg-zinc-100 transition-colors cursor-pointer text-black"
              title="Close panel"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-50 border-2 border-black flex items-center justify-center mx-auto mb-2 text-black">
                <Lock className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-black tracking-widest uppercase font-mono text-black">[ STAFF ENTRY SECURITY GATE ]</h3>
              <p className="text-[10.5px] text-zinc-500 font-sans leading-tight">
                Please enter the secure Ooja Atelier Administrative security key to initialize the command desk.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPasscodeError('');
                if (passcodeVal.trim() === '2026' || passcodeVal.trim().toLowerCase() === 'oojaadmin') {
                  setIsAdminUnlocked(true);
                  setIsPasscodeModalOpen(false);
                  setPasscodeVal('');
                  setCurrentTab('admin');
                  setToastMessage('ADMIN SESSION COMMENCED');
                  setTimeout(() => setToastMessage(''), 2500);
                } else {
                  setPasscodeError('INVALID ATELIER PASSKEY SIGNATURE');
                }
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="password"
                  required
                  placeholder="Security Key (Try '2026')"
                  value={passcodeVal}
                  onChange={(e) => {
                    setPasscodeVal(e.target.value);
                    setPasscodeError('');
                  }}
                  className="w-full text-center tracking-widest text-base p-3 border-2 border-black outline-none font-mono font-black placeholder-zinc-350 focus:bg-zinc-50 bg-white text-black"
                />
                {passcodeError && (
                  <p className="text-[10px] text-red-650 font-black font-mono uppercase text-center mt-2">
                    ⚠ {passcodeError}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPasscodeModalOpen(false);
                    setPasscodeVal('');
                    setPasscodeError('');
                  }}
                  className="flex-1 py-2.5 bg-white text-black hover:bg-zinc-50 border-2 border-black font-mono font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-black text-white hover:bg-zinc-900 border-2 border-black font-mono font-black uppercase text-[10px] tracking-wider transition-all cursor-pointer text-center"
                >
                  Unlock Gate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer panel */}
      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          currentUser={currentUser}
          onAddOrder={handleAddOrder}
          onLogin={handleUserLogin}
          selectedCurrency={selectedCurrency}
          formatPrice={formatPrice}
          storeSettings={storeSettings}
        />
      )}

      {/* Sticky Bottom Navigation for screen dimensions under desktop width */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
      />

      {/* Global Center Attention Popup Announcement Modal */}
      {announcement.active && announcement.type === 'modal' && !hasDismissedAnnouncement && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-scale font-sans">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative space-y-5">
            <button
              onClick={() => setHasDismissedAnnouncement(true)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="text-center space-y-3 pt-2">
              <span className="text-[9px] bg-red-150 border border-red-300 text-red-650 px-3 py-1 font-mono font-bold tracking-widest uppercase rounded">
                📢 STORE ANNOUNCEMENT
              </span>
              <h4 className="text-sm font-black uppercase text-black tracking-tight mt-2 font-mono leading-tight">
                {announcement.title}
              </h4>
              <p className="text-xs text-zinc-650 leading-relaxed font-semibold">
                {announcement.message}
              </p>
            </div>
            
            <button
              onClick={() => setHasDismissedAnnouncement(true)}
              className="w-full py-2.5 bg-black hover:bg-zinc-850 text-white font-mono text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)]"
            >
              OK, GOT IT
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
