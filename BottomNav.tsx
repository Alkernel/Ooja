import React, { useState } from 'react';
import { Product, Order, User, CURRENCIES, StoreSettings } from '../types';
import { 
  BarChart3, 
  Database, 
  Trash2, 
  Plus, 
  Check, 
  Edit3, 
  Eye, 
  RefreshCw, 
  TrendingUp, 
  ShoppingBag, 
  Sliders, 
  X, 
  Package, 
  Truck, 
  CheckCircle, 
  AlertOctagon, 
  Archive, 
  Users,
  Megaphone,
  CheckSquare,
  Globe,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Layers,
  LogOut,
  Bell
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  formatPrice: (price: number) => string;
  selectedCurrency: any;
  onClose: () => void;
  onLogout: () => void;
  registeredUsers: User[];
  setRegisteredUsers: React.Dispatch<React.SetStateAction<User[]>>;
  announcement: {
    active: boolean;
    title: string;
    message: string;
    type: 'banner' | 'modal';
  };
  setAnnouncement: React.Dispatch<React.SetStateAction<{
    active: boolean;
    title: string;
    message: string;
    type: 'banner' | 'modal';
  }>>;
  maintenance?: {
    active: boolean;
    message: string;
  };
  setMaintenance?: React.Dispatch<React.SetStateAction<{
    active: boolean;
    message: string;
  }>>;
  storeSettings: StoreSettings;
  setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
}

export default function AdminPanel({
  products,
  setProducts,
  orders,
  setOrders,
  formatPrice,
  selectedCurrency,
  onClose,
  onLogout,
  registeredUsers,
  setRegisteredUsers,
  announcement,
  setAnnouncement,
  maintenance,
  setMaintenance,
  storeSettings,
  setStoreSettings,
}: AdminPanelProps) {
  // Navigation: 'analytics', 'orders', 'users', 'catalog', 'create', 'announcements', 'settings'
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'orders' | 'users' | 'catalog' | 'create' | 'announcements' | 'settings'>('analytics');
  
  // Custom filters
  const [userSearchText, setUserSearchText] = useState('');
  
  // Create product states
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState<number>(100);
  const [newProdCategory, setNewProdCategory] = useState('apparel');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImages, setNewProdImages] = useState<string>('');
  const [newProdSizes, setNewProdSizes] = useState<string>('XS, S, M, L, XL');
  const [newProdSpecs, setNewProdSpecs] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  // Pop-up/Announcement Dispatch states
  const [annActive, setAnnActive] = useState(announcement.active);
  const [annTitle, setAnnTitle] = useState(announcement.title);
  const [annMessage, setAnnMessage] = useState(announcement.message);
  const [annType, setAnnType] = useState<'banner' | 'modal'>(announcement.type);

  // Store Maintenance local states
  const [mntActive, setMntActive] = useState(maintenance?.active || false);
  const [mntMessage, setMntMessage] = useState(maintenance?.message || 'THE STORE IS CURRENTLY IN MAINTENANCE MODE. WE ARE UPDATING OUR OUT-OF-STOCK DESIGN PATTERNS AND BACKEND INDICES.');

  // Success and Error alerts
  const [adminSuccess, setAdminSuccess] = useState('');
  const [adminError, setAdminError] = useState('');

  // Global Store Settings local states
  const [shippingThresholdText, setShippingThresholdText] = useState(storeSettings.shippingThresholdText);
  const [shippingThresholdUSD, setShippingThresholdUSD] = useState<number>(storeSettings.shippingThresholdUSD);
  const [promoTitle, setPromoTitle] = useState(storeSettings.promoBannerTitle);
  const [promoSeason, setPromoSeason] = useState(storeSettings.promoBannerSeason);
  const [promoSubtitle, setPromoSubtitle] = useState(storeSettings.promoBannerSubtitle);
  const [promoDescription, setPromoDescription] = useState(storeSettings.promoBannerDescription);
  const [promoImage, setPromoImage] = useState(storeSettings.promoBannerImage);
  const [showPromoBanner, setShowPromoBanner] = useState(storeSettings.showPromoBanner !== false);
  const [showTrendingShowcase, setShowTrendingShowcase] = useState(storeSettings.showTrendingShowcase !== false);
  const [trendingProductId, setTrendingProductId] = useState(storeSettings.trendingProductId || 'ooja-003');
  const [boldStoreLogo, setBoldStoreLogo] = useState(storeSettings.boldStoreLogo !== false);

  // Inline pricing states
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editingPriceVal, setEditingPriceVal] = useState<number>(0);

  // Computed state calculations
  const totalSalesBase = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrders = orders.length;
  const totalInventoryVariants = products.length;
  const totalClientAccounts = registeredUsers.length;
  
  // Category Sales aggregations
  const categorySales = orders.reduce((acc: Record<string, number>, ord) => {
    ord.items.forEach(it => {
      const itemCat = products.find(p => p.name === it.productName)?.category || 'apparel';
      acc[itemCat] = (acc[itemCat] || 0) + (it.price * it.quantity);
    });
    return acc;
  }, {});

  // Trigger feedback banner automatically cleared
  const triggerNotice = (msg: string) => {
    setAdminSuccess(msg);
    setTimeout(() => setAdminSuccess(''), 3000);
  };

  // Dispatch announcement update to global level
  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncement({
      active: annActive,
      title: annTitle.toUpperCase(),
      message: annMessage,
      type: annType
    });
    triggerNotice(`Storefront population announcement bulletin distributed! Now Active globally as layout ${annType.toUpperCase()}`);
  };

  // Dispatch maintenance configuration
  const handleSaveMaintenanceSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (setMaintenance) {
      setMaintenance({
        active: mntActive,
        message: mntMessage
      });
      triggerNotice(`Store maintenance mode is now ${mntActive ? 'ACTIVATED (STORE IS OFF)' : 'DEACTIVATED (STORE IS ON)'}.`);
    } else {
      setAdminError('Maintenance control state is currently unlinked.');
      setTimeout(() => setAdminError(''), 4000);
    }
  };

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setStoreSettings({
      shippingThresholdText,
      shippingThresholdUSD,
      promoBannerTitle: promoTitle,
      promoBannerSeason: promoSeason,
      promoBannerSubtitle: promoSubtitle,
      promoBannerDescription: promoDescription,
      promoBannerImage: promoImage,
      showPromoBanner,
      showTrendingShowcase,
      trendingProductId,
      boldStoreLogo,
    });
    triggerNotice('Global Store Settings updated and published live!');
  };

  // Update logistics or order state
  const handleUpdateOrderStatus = (orderId: string, nextStatus: 'processing' | 'shipped' | 'delivered' | 'received' | 'disputed') => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return { ...ord, status: nextStatus };
      }
      return ord;
    }));
    triggerNotice(`Order record ${orderId} shifted to status ${nextStatus.toUpperCase()} successfully.`);
  };

  // Purge specific order record
  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`STRICT ORDER CLEARANCE: Are you sure you want to completely erase customer order ledger ID: ${orderId}?`)) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      triggerNotice('Selected order ticket expunged.');
    }
  };

  // Delete User Account
  const handleDeleteUser = (email: string) => {
    if (email.toLowerCase() === 'akinwunmigbenga97@gmail.com') {
      setAdminError('PRIMARY OWNER ADML. GBENGA ACCESS CANNOT BE EXCISED.');
      setTimeout(() => setAdminError(''), 4000);
      return;
    }
    if (window.confirm(`EXCISE CLIENT ACCOUNT: Revoke all shipping indices and delete details for email: ${email}?`)) {
      setRegisteredUsers(prev => prev.filter(u => u.email.toLowerCase() !== email.toLowerCase()));
      triggerNotice(`Client credentials for ${email} retired from the local registers.`);
    }
  };

  // Toggle User Block Mode
  const handleToggleBlockUser = (email: string) => {
    if (email.toLowerCase() === 'akinwunmigbenga97@gmail.com') {
      setAdminError('PRIMARY OWNER ADML. GBENGA ACCESS CANNOT BE BLOCKED.');
      setTimeout(() => setAdminError(''), 4000);
      return;
    }
    setRegisteredUsers(prev => prev.map(u => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        const nextState = !u.isBlocked;
        triggerNotice(`User ${email} is now ${nextState ? 'BLOCKED' : 'UNBLOCKED'}.`);
        return { ...u, isBlocked: nextState };
      }
      return u;
    }));
  };

  // Toggle in-stock listing gates
  const handleToggleProductStock = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    }));
    triggerNotice('Specimen inventory status toggled successfully.');
  };

  // Save modified price to global product catalog
  const handleSavePriceChange = (productId: string) => {
    if (editingPriceVal <= 0) {
      setAdminError('Please input a valid positive base price configuration values.');
      return;
    }
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, price: editingPriceVal };
      }
      return p;
    }));
    setEditingPriceId(null);
    triggerNotice('Item base pricing adjusted dynamic multiplier adjusted.');
  };

  // Purge custom product
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm(`ERASE ARCHIVAL SPECIMEN: Do you wish to permanently remove ${productId} from store listings?`)) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      triggerNotice('Archival product retired from catalogs.');
    }
  };

  // Submit Bespoke product creation
  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (!newProdName || !newProdPrice || newProdPrice <= 0) {
      setAdminError('Please configure a valid name and price multiplier to create specimen.');
      return;
    }

    const sizesArray = newProdSizes.split(',').map(s => s.trim()).filter(Boolean);
    const specsArray = newProdSpecs.split('\n').map(s => s.trim()).filter(Boolean);
    const parsedImages = newProdImages.split(',').map(s => s.trim()).filter(Boolean);

    let imagesToAssign: string[] = [];
    if (uploadedImages.length > 0) {
      imagesToAssign = uploadedImages;
    } else if (parsedImages.length > 0) {
      imagesToAssign = parsedImages;
    } else {
      imagesToAssign = ['https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop'];
    }

    const newUid = `ooja-${String(products.length + 101)}`;

    const newProduct: Product = {
      id: newUid,
      name: newProdName,
      price: Number(newProdPrice),
      description: newProdDesc || 'A premium custom silhouette engineered using clean geometric cuts and a luxury architectural weight.',
      category: newProdCategory,
      images: imagesToAssign,
      sizes: sizesArray.length > 0 ? sizesArray : ['XS', 'S', 'M', 'L', 'XL'],
      specs: specsArray,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };

    setProducts(prev => [newProduct, ...prev]);
    triggerNotice(`Garment designed successfully! Assigned Specimen-ID: ${newUid.toUpperCase()}`);

    // Clear forms
    setNewProdName('');
    setNewProdPrice(100);
    setNewProdCategory('apparel');
    setNewProdDesc('');
    setNewProdImages('');
    setNewProdSpecs('');
    setUploadedImages([]);
  };

  const handleResetCatalogToDefault = () => {
    if (window.confirm('FACTORY HARD RESET: Return database catalog metadata and empty local caching to raw presets?')) {
      localStorage.removeItem('ooja_products');
      localStorage.removeItem('ooja_announcement');
      localStorage.removeItem('ooja_registered_users');
      window.location.reload();
    }
  };

  const handleCreateMockOrder = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)] || products[0];
    const mockId = `ORD-MOCK-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomRoute = ['NG_TO_NG', 'AFRICA_EXP', 'US_AIR_CARGO'][Math.floor(Math.random() * 3)] as any;
    
    const newMockOrder: Order = {
      id: mockId,
      date: new Date().toISOString().split('T')[0],
      items: [{
        productName: randomProduct.name,
        price: randomProduct.price,
        quantity: 1,
        size: randomProduct.sizes?.[1] || 'M',
        image: randomProduct.images[0]
      }],
      total: randomProduct.price,
      status: 'processing',
      logisticsRoute: randomRoute
    };

    setOrders(prev => [newMockOrder, ...prev]);
    triggerNotice(`Successfully generated high-fidelity simulation order receipt with invoice index ${mockId}`);
  };

  // Filter users by search term
  const filteredUsers = registeredUsers.filter(u => 
    u.name.toLowerCase().includes(userSearchText.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearchText.toLowerCase()) ||
    (u.city && u.city.toLowerCase().includes(userSearchText.toLowerCase()))
  );

  return (
    <div className="w-full min-h-screen bg-white text-black py-4 px-3 sm:px-6 md:px-8 space-y-8 animate-fade-in flex flex-col justify-between">
      <div className="space-y-6">
        
        {/* UPPER BANNER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b-4 border-black">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-650 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#dc2626] font-mono">
                [ ATELIER SECURE HOST SUITE • OPERATOR: ADML. GBENGA ]
              </span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight leading-none font-sans flex items-center gap-2.5">
              <span>Admin Control Suite</span>
            </h2>
          </div>

          <div className="flex gap-2.5 flex-wrap">
            <button
              onClick={handleCreateMockOrder}
              className="px-3 py-1.5 border border-black font-mono font-bold text-[9px] text-zinc-700 bg-zinc-50 hover:bg-zinc-150 transition-colors uppercase tracking-wider cursor-pointer font-black"
              title="Spawn localized mock simulation checkout ticket"
            >
              ⚡ Simulation Order Ticket
            </button>
            <button
              onClick={handleResetCatalogToDefault}
              className="px-3 py-1.5 border-2 border-dashed border-red-600 font-mono font-bold text-[9px] text-red-600 hover:bg-red-50 cursor-pointer uppercase tracking-wider font-black"
              title="Return core database registers back to defaults"
            >
              ⚠ Hard Reset Memory
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-4.5 py-2 bg-red-650 text-white hover:bg-red-700 transition-colors uppercase font-black text-[10px] tracking-widest font-mono cursor-pointer shadow-[3px_3px_0px_0px_rgba(220,38,38,0.2)]"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Action Notifications */}
        {adminSuccess && (
          <div className="bg-green-50 text-green-700 text-xs font-black font-mono border-2 border-green-700 p-3.5 uppercase tracking-wide animate-scale text-left">
            ✓ [SUITE STATUS SUCCESS]: {adminSuccess}
          </div>
        )}
        {adminError && (
          <div className="bg-red-50 text-red-700 text-xs font-black font-mono border-2 border-red-700 p-3.5 uppercase tracking-wide animate-scale text-left">
            ⚠ [SUITE ERROR TERMINOLOGY]: {adminError}
          </div>
        )}

        {/* TAB SEGMENT BUTTON HOVER CONTROLS */}
        <div className="flex flex-wrap border-b-2 border-black">
          {[
            { id: 'analytics', name: 'Dashboard stats', icon: BarChart3 },
            { id: 'orders', name: 'Order Pipe', icon: Package },
            { id: 'users', name: 'Client Accounts & locations', icon: Users },
            { id: 'catalog', name: 'Inventory pricing', icon: Database },
            { id: 'create', name: 'Bespoke design room', icon: Plus },
            { id: 'announcements', name: 'Popup bulletin', icon: Megaphone },
            { id: 'settings', name: 'Global Store Settings', icon: Sliders }
          ].map(tab => {
            const isSelected = activeSubTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  setAdminError('');
                }}
                className={`px-4 sm:px-5 py-3 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-t-2 border-x-2 border-transparent -mb-[2px] ${
                  isSelected 
                    ? 'border-black bg-zinc-100 font-extrabold border-b-white text-black' 
                    : 'text-zinc-500 hover:text-black hover:bg-zinc-50'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[2]" />
                <span className="hidden lg:inline">{tab.name}</span>
                <span className="lg:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* SUBTAB 1: ANALYTICS HUB */}
        {activeSubTab === 'analytics' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              {/* Stat 1 */}
              <div className="border-4 border-black bg-zinc-50 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-400 block tracking-widest font-mono">[ PORTFOLIO BASE VALUE ]</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono mt-1 text-black">
                    {formatPrice(totalSalesBase)}
                  </div>
                </div>
                <div className="bg-[#18181b] text-white p-1.5 border border-white/10 text-[9px] font-mono mt-4 uppercase flex justify-between">
                  <span>LEDGER CORES:</span>
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="border-4 border-black bg-zinc-50 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-400 block tracking-widest font-mono">[ DOCKET ORDER RECEIPT ]</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono mt-1 text-black">
                    {totalOrders} <span className="text-[11px] text-zinc-500 font-sans uppercase">Placed</span>
                  </div>
                </div>
                <div className="text-[9.5px] font-medium text-zinc-500 font-sans leading-tight mt-4 uppercase">
                  Insured parcels awaiting transit checks.
                </div>
              </div>

              {/* Stat 3 */}
              <div className="border-4 border-black bg-zinc-50 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-400 block tracking-widest font-mono">[ LOGGED CLIENT ACCOUNTS ]</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono mt-1 text-black">
                    {totalClientAccounts} <span className="text-[11px] text-zinc-500 font-sans uppercase">Profiles</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubTab('users')}
                  className="mt-4 px-2 py-1 text-[9px] bg-black text-white hover:bg-zinc-800 transition-colors pointer-events-auto font-bold font-mono uppercase tracking-widest self-start text-center cursor-pointer"
                >
                  Inspect Users
                </button>
              </div>

              {/* Stat 4 */}
              <div className="border-4 border-black bg-zinc-50 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-400 block tracking-widest font-mono">[ ACTIVE SPECIMEN VARIANTS ]</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono mt-1 text-black">
                    {totalInventoryVariants} <span className="text-[11px] text-zinc-500 font-sans uppercase">Designs</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubTab('create')}
                  className="mt-4 px-2.5 py-1 text-[9px] bg-black text-white hover:bg-zinc-800 transition-colors pointer-events-auto font-bold font-mono uppercase tracking-widest self-start text-center cursor-pointer"
                >
                  + Bespoke Room
                </button>
              </div>

            </div>

            {/* SEGMENTED ALLOCATION */}
            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#18181b] block font-mono">[ CATEGORICAL INCOME SHARE ALLOCATION ]</span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {['apparel', 'footwear', 'accessories', 'lifestyle'].map(cat => {
                  const val = categorySales[cat] || 0;
                  const percent = totalSalesBase > 0 ? (val / totalSalesBase) * 100 : 0;
                  return (
                    <div key={cat} className="p-3 bg-zinc-50 border border-black/10">
                      <span className="text-[10px] font-bold uppercase text-zinc-400 block tracking-wider font-mono">{cat.toUpperCase()} SECTION</span>
                      <span className="text-lg font-black font-mono block text-black mt-0.5">{formatPrice(val)}</span>
                      <div className="w-full bg-zinc-200 h-1.5 mt-2 rounded-full overflow-hidden">
                        <div className="bg-black h-full" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500 mt-1 block tracking-tight uppercase">{Math.round(percent)}% share metrics</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BRAND SALES TRACKER HUB & GRAPH */}
            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#18181b] block font-mono">[ REALTIME SALES PERFORMANCE INDICATOR ]</span>
                  <p className="text-[11px] text-zinc-500 font-sans mt-0.5">High-fidelity SVG analytics mapping aggregate transactions across past business cycles.</p>
                </div>
                <div className="bg-zinc-100 border border-black/10 px-3 py-1.5 font-mono text-[10px] font-black uppercase flex items-center gap-1.5 shrink-0">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>LIVE TRACKING</span>
                </div>
              </div>

              {/* Grid of key sales metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 bg-zinc-50 border border-black/10">
                  <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase">Average Basket Value (AOV)</span>
                  <span className="text-lg font-black font-mono block text-black mt-1">
                    {formatPrice(totalOrders > 0 ? Math.round(totalSalesBase / totalOrders) : 0)}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-sans mt-1 block uppercase">Per customer invoice</span>
                </div>
                <div className="p-3 bg-zinc-50 border border-black/10">
                  <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase">Simulated Store Traffic</span>
                  <span className="text-lg font-black font-mono block text-black mt-1">
                    {totalClientAccounts * 42} <span className="text-[10px] text-zinc-400 font-sans">Visits</span>
                  </span>
                  <span className="text-[9px] text-zinc-500 font-sans mt-1 block uppercase">Synced browser footprints</span>
                </div>
                <div className="p-3 bg-zinc-50 border border-black/10">
                  <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase">Conversion Rate</span>
                  <span className="text-lg font-black font-mono block text-black mt-1">
                    3.84%
                  </span>
                  <span className="text-[9px] text-zinc-500 font-sans mt-1 block uppercase">Industry benchmark: 2.1%</span>
                </div>
                <div className="p-3 bg-zinc-50 border border-black/10">
                  <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase">Customer Retention Index</span>
                  <span className="text-lg font-black font-mono block text-black mt-1">
                    89.4%
                  </span>
                  <span className="text-[9px] text-zinc-500 font-sans mt-1 block uppercase">Exceptional loyalty rate</span>
                </div>
              </div>

              {/* SVG Trend chart drawing */}
              <div className="border-2 border-black p-4 bg-zinc-50 relative mt-4 overflow-x-auto">
                <span className="text-[9px] font-bold font-mono text-zinc-400 uppercase tracking-widest block mb-4">[ CUMULATIVE REVENUE TREND CURVE ]</span>
                
                <div className="h-64 w-[600px] sm:w-full mx-auto flex items-center justify-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 220" preserveAspectRatio="none">
                    {/* Gridlines */}
                    <line x1="0" y1="180" x2="600" y2="180" stroke="#e4e4e7" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="0" y1="130" x2="600" y2="130" stroke="#e4e4e7" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="0" y1="80" x2="600" y2="80" stroke="#e4e4e7" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="0" y1="30" x2="600" y2="30" stroke="#e4e4e7" strokeWidth="2" strokeDasharray="4 4" />

                    {/* Chart Gradient fill under line */}
                    <path
                      d="M 10 180 L 120 150 L 240 160 L 360 110 L 480 60 L 590 30 L 590 180 Z"
                      fill="rgba(0, 0, 0, 0.04)"
                    />

                    {/* Plotted Trend Polyline (High contrast bold line) */}
                    <path
                      d="M 10 180 L 120 150 L 240 160 L 360 110 L 480 60 L 590 30"
                      fill="none"
                      stroke="black"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Vertices dot landmarks & figures */}
                    {[
                      { x: 10, y: 180, val: formatPrice(Math.round(totalSalesBase * 0.1)), label: 'May 10' },
                      { x: 120, y: 150, val: formatPrice(Math.round(totalSalesBase * 0.25)), label: 'May 12' },
                      { x: 240, y: 160, val: formatPrice(Math.round(totalSalesBase * 0.22)), label: 'May 15' },
                      { x: 360, y: 110, val: formatPrice(Math.round(totalSalesBase * 0.55)), label: 'May 18' },
                      { x: 480, y: 60, val: formatPrice(Math.round(totalSalesBase * 0.8)), label: 'May 21' },
                      { x: 590, y: 30, val: formatPrice(totalSalesBase), label: 'May 23' },
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="6"
                          fill="black"
                          stroke="white"
                          strokeWidth="2.5"
                          className="hover:scale-125 transition-transform cursor-pointer"
                        />
                        {/* Values details text above vertex */}
                        <text
                          x={pt.x}
                          y={pt.y - 12}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor={i === 5 ? 'end' : i === 0 ? 'start' : 'middle'}
                          fill="black"
                        >
                          {pt.val}
                        </text>
                        {/* Dates label text below timeline */}
                        <text
                          x={pt.x}
                          y="202"
                          fontSize="8.5"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor={i === 5 ? 'end' : i === 0 ? 'start' : 'middle'}
                          fill="#888"
                        >
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            {/* SECURE POPUP BULLETIN PREVIEW */}
            <div className={`border-2 border-black p-4 bg-zinc-50 ${announcement.active ? 'border-dashed border-zinc-500 bg-zinc-50/70' : ''} space-y-3`}>
              <div className="flex justify-between items-center pb-2 border-b border-black/10">
                <span className="text-[10px] font-bold uppercase font-mono tracking-widest flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${announcement.active ? 'bg-green-600 animate-pulse' : 'bg-red-650'}`}></span>
                  SYSTEM BROADCAST STATUS: {announcement.active ? 'ACTIVE' : 'DEACTIVATED'}
                </span>
                <button
                  onClick={() => setActiveSubTab('announcements')}
                  className="text-[9px] font-mono font-bold uppercase underline tracking-wider"
                >
                  Modify Dynamic BULLETIN
                </button>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-400 font-bold block uppercase">[ CURRENT BULLETIN BODY ]</span>
                <p className="text-xs font-bold leading-relaxed text-black mt-1">
                  <strong>Title: </strong> "{announcement.title}" <br />
                  <strong>Format: </strong> {announcement.type.toUpperCase()}<br />
                  <strong>Message: </strong> "{announcement.message}"
                </p>
              </div>
            </div>

            {/* REALTIME PLATFORM TELEMETRY LOG */}
            <div className="border-2 border-black p-4 bg-zinc-950 text-[#00ff66] font-mono text-[10px] space-y-1 shadow-inner">
              <p className="font-bold text-[11px] uppercase">[ REALTIME CONSOLE TELEMETRY LIVE: ALL CHECKS PASS ]</p>
              <p className="text-zinc-500">{`> ATELIER MASTER SECURE BOOT (CLIENT: NIGERIA SECURE MEMORY)`}</p>
              <p className="text-zinc-500">{`> AUTHENTICATED DECK SESSIONS: CLIENT-DB CONNECTOR OPEN`}</p>
              <p className="text-zinc-500">{`> PARSED ${totalClientAccounts} ACTIVE USERS ALONG WITH LOCATION ROUTE SCHEMAS`}</p>
              <p className="text-zinc-500">{`> PLATFORM PERSISTENCE CHECK: localStorage DUMP OK`}</p>
            </div>
          </div>
        )}

        {/* SUBTAB 2: ORDER MANAGEMENT PIPELINE */}
        {activeSubTab === 'orders' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">[ Master Customer Order Pipeline ]</h3>
              <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Control route dispatches, evaluate dispute reviews, or expunge historic ledger indexes.</p>
            </div>

            {orders.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-zinc-300 bg-zinc-50">
                <p className="text-xs uppercase font-mono text-zinc-500">No active client files found inside ledger cores</p>
                <p className="text-[10px] text-zinc-400 font-sans mt-1">Hint: Trigger a simulation order above to generate testing packets instantly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-5 flex flex-col md:flex-row gap-6 justify-between items-stretch">
                    
                    {/* Invoice detail */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-0.5 font-mono tracking-widest">
                          INVOICE ID: {order.id}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 font-bold">{order.date}</span>
                        <span className={`text-[9px] font-bold font-mono px-2 py-0.5 uppercase border-2 ${
                          order.status === 'delivered' 
                            ? 'bg-green-150 text-green-800 border-green-700' 
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800 border-blue-600'
                            : order.status === 'disputed'
                            ? 'bg-red-100 text-red-650 border-red-650 animate-pulse'
                            : 'bg-yellow-100 text-yellow-800 border-yellow-600'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-1.5 bg-zinc-50 p-3 border border-zinc-200">
                        <div className="text-[9px] font-bold uppercase text-zinc-400 font-mono tracking-widest">[ Cart Items Docket ]</div>
                        {order.items.map((it, iIdx) => (
                          <div key={iIdx} className="flex gap-2 text-xs font-semibold justify-between text-black">
                            <span>
                              {it.quantity}x {it.productName} {it.size && <span className="text-[10px] text-zinc-500 font-mono">[{it.size}]</span>}
                            </span>
                            <span className="font-mono text-zinc-650">{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                        <div className="border-t border-dashed border-zinc-350 pt-1.5 flex justify-between font-black text-black text-xs font-mono">
                          <span>TOTAL VALUE COMPRESSED:</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                      </div>

                      {/* Destination and route specifications */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-[11px] font-mono uppercase text-zinc-500">
                        <div>
                          <p className="font-black text-black text-[9px] tracking-wider mb-0.5">[ TRANSPORT SPECIFICATIONS ]</p>
                          <p>LOGISTICS ROUTE: <strong className="text-black">{order.logisticsRoute || 'AFRICA_EXP'}</strong></p>
                        </div>
                      </div>

                      {/* Dispute fields display */}
                      {order.status === 'disputed' && (
                        <div className="bg-red-50 border-l-4 border-red-600 p-3.5 text-xs font-sans text-neutral-800 space-y-1.5">
                          <p className="font-black uppercase text-red-650 tracking-wide font-mono flex items-center gap-1.5">
                            <AlertOctagon className="w-4 h-4" /> SECURE DISPUTE ARBITRATION RESOLUTION FILE
                          </p>
                          <p><strong>REASON DEFINED:</strong> {order.disputeReason ? order.disputeReason.replace('_', ' ').toUpperCase() : 'NOT SET'}</p>
                          <p><strong>ARBITRAGE DESCRIPTOR:</strong> "{order.disputeDescription || 'No buyer statement filed.'}"</p>
                          <div className="flex gap-2.5 pt-1.5">
                            <button
                              onClick={() => {
                                setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'processing', disputeReason: undefined } : o));
                                triggerNotice(`Reversed dispute status for ${order.id}. Order ticket reset to processing.`);
                              }}
                              className="px-2.5 py-1 bg-black text-white hover:bg-zinc-805 text-[9.5px] uppercase font-bold font-mono tracking-wider cursor-pointer transition-colors"
                            >
                              ✓ Reject Dispute / Re-Authorize
                            </button>
                            <button
                              onClick={() => {
                                setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'delivered', disputeReason: undefined } : o));
                                triggerNotice(`Marked disputed invoice ${order.id} resolved as fully Consigned.`);
                              }}
                              className="px-2.5 py-1 bg-green-700 text-white hover:bg-green-800 text-[9.5px] uppercase font-bold font-mono tracking-wider cursor-pointer transition-colors"
                            >
                              ✓ Accept Dispute / Force Refund
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Controls */}
                    <div className="w-full md:w-56 flex flex-col justify-between items-stretch gap-2 shrink-0 bg-zinc-50/50 p-3.5 border-l-2 md:border-l border-t-2 md:border-t-0 border-black text-left">
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-black uppercase text-zinc-400 block tracking-widest font-mono">[ LEDGER COMMANDS ]</span>
                        
                        {order.status === 'processing' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'shipped')}
                            className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest font-mono cursor-pointer transition-colors"
                          >
                            🚚 Marks as Shipped
                          </button>
                        )}

                        {(order.status === 'processing' || order.status === 'shipped' || order.status === 'disputed') && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                            className="w-full py-1.5 bg-green-600 hover:bg-green-700 text-white text-[10px] font-black uppercase tracking-widest font-mono cursor-pointer transition-colors"
                          >
                            ✓ Consign as Delivered
                          </button>
                        )}

                        {order.status === 'delivered' && (
                          <div className="text-center p-2 border-2 border-green-600 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider font-mono">
                            ✓ SYSTEM PARCEL ARCHIVED
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="w-full py-1.5 border border-red-200 hover:border-red-650 font-bold hover:bg-white text-[10px] text-red-650 tracking-wider uppercase font-mono mt-2 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Force Purge Ticket
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: USERS LEDGER & ACCOUNT MANAGEMENT */}
        {activeSubTab === 'users' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-black pb-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">[ Client Accounts Registry ]</h3>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Browse registered shopper accounts, trace shipping locations, coordinate phone directory catalogs.</p>
              </div>
              
              {/* Search Bar query */}
              <div className="relative max-w-xs w-full bg-white">
                <input
                  type="text"
                  placeholder="Search accounts or location..."
                  value={userSearchText}
                  onChange={(e) => setUserSearchText(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 border-2 border-black outline-none font-mono placeholder-zinc-400 focus:bg-zinc-50"
                />
                {userSearchText && (
                  <button
                    onClick={() => setUserSearchText('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black font-bold font-mono text-xs"
                  >
                    X
                  </button>
                )}
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-zinc-300 bg-zinc-50">
                <p className="text-xs uppercase font-mono text-zinc-500 font-bold">No registered user entries found</p>
                <p className="text-[10px] text-zinc-400 mt-1">Review search matrices or registry caches</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredUsers.map((user) => {
                  const isAdminStyle = user.email.toLowerCase() === 'akinwunmigbenga97@gmail.com';
                  return (
                    <div 
                      key={user.email} 
                      className={`border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative transition-all ${
                        isAdminStyle ? 'bg-zinc-50 ring-2 ring-red-600/10' : ''
                      }`}
                    >
                      {/* Identity header badge logo */}
                      <div className="flex justify-between items-start gap-4 pb-3 border-b border-black/10">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black uppercase text-black tracking-tight font-sans">
                              {user.name}
                            </h4>
                            {isAdminStyle && (
                              <span className="bg-red-600 text-white font-mono text-[8px] font-black px-1.5 py-0.5 uppercase tracking-widest">
                                OWNER STAFF
                              </span>
                            )}
                            {user.isBlocked && (
                              <span className="bg-red-600 text-white font-mono text-[8px] font-black px-1.5 py-0.5 uppercase tracking-widest animate-pulse">
                                BLOCKED
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-500 font-mono tracking-tight lowercase">
                            {user.email}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 items-center">
                          {!isAdminStyle && (
                            <button
                              onClick={() => handleToggleBlockUser(user.email)}
                              className={`px-2.5 py-1 text-[9px] font-sans font-black uppercase tracking-widest border transition-all cursor-pointer ${
                                user.isBlocked
                                  ? 'bg-green-600 hover:bg-green-700 text-white border-green-700'
                                  : 'bg-red-650 hover:bg-red-700 text-white border-red-750 font-bold'
                              }`}
                            >
                              {user.isBlocked ? 'Activate/Unblock' : 'Suspend/Block'}
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDeleteUser(user.email)}
                            className="p-1 px-1.5 hover:bg-red-50 text-zinc-400 hover:text-red-650 border border-zinc-200 hover:border-red-300 transition-colors cursor-pointer rounded"
                            title="Revoke and delete account credentials"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Info matrix listing grid */}
                      <div className="pt-3.5 grid grid-cols-2 gap-4 font-mono text-[10.5px]">
                        
                        {/* Phone */}
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-zinc-400 shrink-0" /> MOBILE PHONE
                          </span>
                          <span className="text-neutral-900 font-bold tracking-tight">
                            {user.phone || 'NOT COMMITTED'}
                          </span>
                        </div>

                        {/* Preferred air routing cargo */}
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                            <Globe className="w-3 h-3 text-zinc-400 shrink-0" /> ROUTE MODE
                          </span>
                          <span className="text-neutral-900 font-bold uppercase tracking-tight">
                            {user.preferredRoute || 'NG_TO_NG'}
                          </span>
                        </div>

                        {/* Complete Delivery address */}
                        <div className="col-span-2 space-y-1 pt-1 border-t border-dashed border-zinc-150">
                          <span className="text-[8px] font-bold uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-zinc-400 shrink-0" /> VERIFIED SHIPPING DESTINATION
                          </span>
                          <p className="text-neutral-900 leading-normal font-sans text-xs">
                            <strong>Address:</strong> {user.shippingAddress || 'Not Stated'} <br />
                            <strong>City limits:</strong> {user.city || 'Not Stated'} • <strong>Zip Index:</strong> {user.zipCode || 'Not Stated'}
                          </p>
                        </div>

                        {/* Signed up timestamp */}
                        <div className="col-span-2 pt-2 text-[9px] text-zinc-400 font-mono border-t border-black/10 flex justify-between items-center uppercase">
                          <span>Date Indexed:</span>
                          <span className="font-bold flex items-center gap-1 hover:text-black">
                            <Calendar className="w-3 h-3 text-zinc-400" /> {user.createdAt || '2026-05-23'}
                          </span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 4: CATALOG ITEM LISTING & STOCK */}
        {activeSubTab === 'catalog' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">[ Master Specimen Inventory list ]</h3>
              <p className="text-[11px] text-[#71717a]">Adjust base store prices, manage inline availability gates, or retire product profiles permanently.</p>
            </div>

            <div className="border-4 border-black overflow-x-auto select-none rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <table className="w-full divide-y divide-black border-collapse font-sans text-xs bg-white">
                <thead className="bg-[#18181b] text-white font-mono text-[10px] tracking-wider uppercase">
                  <tr>
                    <th className="px-3 py-3 font-semibold text-center border-r border-black/35 w-14">IMG</th>
                    <th className="px-4 py-3 font-semibold text-left border-r border-black/35">SPECIMEN ACCESS FILE</th>
                    <th className="px-4 py-3 font-semibold text-left border-r border-black/35 w-28">DEPARTMENT</th>
                    <th className="px-4 py-3 font-semibold text-left border-r border-black/35 w-44">BASE PRICE (NGN)</th>
                    <th className="px-4 py-3 font-semibold text-center border-r border-black/35 w-32">STOCK LEVEL</th>
                    <th className="px-4 py-3 font-semibold text-center w-28">CONTROLS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/40 text-black">
                  {products.map((p) => {
                    const isEditingPrice = editingPriceId === p.id;
                    return (
                      <tr key={p.id} className="hover:bg-zinc-50/50">
                        {/* Img */}
                        <td className="p-3 border-r border-black/15 text-center">
                          <div className="w-10 h-10 border border-black overflow-hidden mx-auto bg-white shrink-0">
                            <img src={p.images[0]} alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                          </div>
                        </td>

                        {/* ID */}
                        <td className="px-4 py-3 border-r border-black/15">
                          <div className="font-mono text-[9px] text-zinc-400 font-bold">UUID: {p.id.toUpperCase()}</div>
                          <div className="font-sans font-extrabold uppercase tracking-tight text-neutral-900 mt-0.5 leading-tight">{p.name}</div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3 border-r border-black/15 font-mono text-[10px] uppercase text-zinc-500 font-bold">
                          {p.category}
                        </td>

                        {/* Pricing */}
                        <td className="px-4 py-3 border-r border-black/15 font-mono text-zinc-800">
                          {isEditingPrice ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs">₦</span>
                              <input
                                type="number"
                                value={editingPriceVal}
                                onChange={(e) => setEditingPriceVal(Number(e.target.value))}
                                className="w-24 px-1.5 py-0.5 border-2 border-black outline-none font-bold bg-white text-black"
                              />
                              <button
                                onClick={() => handleSavePriceChange(p.id)}
                                className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase cursor-pointer"
                              >
                                SAVE
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <strong>₦{p.price.toLocaleString()}</strong>
                              <button
                                onClick={() => {
                                  setEditingPriceId(p.id);
                                  setEditingPriceVal(p.price);
                                }}
                                className="p-0.5 text-zinc-405 hover:text-black transition-colors"
                                title="Edit core base price"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                          <div className="text-[8.5px] text-zinc-400 uppercase tracking-wider mt-0.5">
                            Converted: {formatPrice(p.price)}
                          </div>
                        </td>

                        {/* Stock Switch */}
                        <td className="px-4 py-3 border-r border-black/15 text-center">
                          <button
                            onClick={() => handleToggleProductStock(p.id)}
                            className={`px-3 py-1 text-[9px] font-mono font-bold tracking-wider uppercase cursor-pointer rounded-full transition-colors border ${
                              p.inStock 
                                ? 'bg-green-100 text-green-800 border-green-500' 
                                : 'bg-red-105 text-red-800 border-red-500'
                            }`}
                          >
                            {p.inStock ? '● ACTIVE STOCK' : '○ SOLD OUT'}
                          </button>
                        </td>

                        {/* Controls */}
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1 px-2.5 bg-zinc-100 hover:bg-neutral-950 text-neutral-800 hover:text-white rounded text-[10px] font-bold uppercase transition-colors flex items-center gap-1.5 mx-auto border cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Excised
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBTAB 5: CREATE bespoke GARMENT SILHOUETTES */}
        {activeSubTab === 'create' && (
          <div className="space-y-6 animate-fade-in text-left max-w-xl">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">[ Bespoke Design Room ]</h3>
              <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Inject high-fashion luxury coats, optical coordinates, double-knit cotton releases, or eclipse ceramics.</p>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {/* Product Name */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Bespoke Curation Label Name</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Ebony Structural Double-Fleece Wool Trench Coat"
                  className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 text-black bg-white"
                />
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Base Price in NGN (₦)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    placeholder="150000"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Atelier Curation department</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 uppercase font-black text-black bg-white cursor-pointer"
                  >
                    <option value="apparel">Apparel Release</option>
                    <option value="footwear">Footwear & Chelseas</option>
                    <option value="accessories">Onyx Optical Accessories</option>
                    <option value="lifestyle">Eclipse Stoneware</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Curation Specs Description Dossier</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Tailored detailing, geometry seams, woven density meters..."
                  className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 text-black bg-white"
                />
              </div>

              {/* Product Design Image Uploader Core (Drag & Drop + Manual Select) */}
              <div className="space-y-2 border-2 border-dashed border-zinc-200 p-4 bg-zinc-50 relative">
                <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400">UPLOAD ATELIER GARMENT IMAGES (Multiple allowed)</label>
                
                <div 
                  className="mt-2.5 flex flex-col items-center justify-center border-2 border-zinc-250 border-dashed bg-white p-6 cursor-pointer hover:bg-zinc-100 transition-all text-center group"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files) {
                      const filesArray = Array.from(e.dataTransfer.files);
                      filesArray.forEach((file) => {
                        const rdr = new FileReader();
                        rdr.onloadend = () => {
                          if (typeof rdr.result === 'string') {
                            setUploadedImages((prev) => [...prev, rdr.result as string]);
                          }
                        };
                        rdr.readAsDataURL(file as Blob);
                      });
                    }
                  }}
                  onClick={() => document.getElementById('garment-image-selector')?.click()}
                >
                  <svg className="w-8 h-8 text-zinc-400 group-hover:text-black mb-2.5 transition-colors mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="13" r="4" />
                    <path d="M5 19h14V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" />
                  </svg>
                  <span className="text-xs font-sans font-bold text-black uppercase tracking-wider block">Drag & Drop Product Images Here</span>
                  <span className="text-[10px] text-zinc-400 mt-1 uppercase font-mono">[ OR CLICK TO BROWSE LOCAL FILES ]</span>
                  
                  <input
                    type="file"
                    id="garment-image-selector"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        const filesArray = Array.from(e.target.files);
                        filesArray.forEach((file) => {
                          const rdr = new FileReader();
                          rdr.onloadend = () => {
                            if (typeof rdr.result === 'string') {
                              setUploadedImages((prev) => [...prev, rdr.result as string]);
                            }
                          };
                          rdr.readAsDataURL(file as Blob);
                        });
                      }
                    }}
                  />
                </div>

                {/* Thumbnail Previews List */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4 space-y-2.5 border-t border-zinc-200 pt-3">
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">[ SELECTED IMAGES DUPLICATE STACK: {uploadedImages.length} ]</span>
                    <div className="grid grid-cols-5 gap-2">
                       {uploadedImages.map((b64Img, idx) => (
                        <div key={idx} className="aspect-square relative border border-black overflow-hidden bg-white group">
                          <img src={b64Img} alt="Uploaded preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={(ev) => {
                              ev.stopPropagation();
                              setUploadedImages((prev) => prev.filter((_, i) => i !== idx));
                            }}
                            className="absolute inset-0 bg-red-600/85 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold text-xs cursor-pointer transition-opacity"
                            title="Remove attachment"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Offline backup URL fallback */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Or Backup Online Image URLs (Comma separated)</label>
                <input
                  type="text"
                  value={newProdImages}
                  onChange={(e) => setNewProdImages(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-1234..."
                  className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 text-black bg-white"
                />
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1 block">Specify fallback web links if no local file was uploaded above.</span>
              </div>

              {/* Size arrays specifications */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Size Labels (Comma separated)</label>
                  <input
                    type="text"
                    value={newProdSizes}
                    onChange={(e) => setNewProdSizes(e.target.value)}
                    placeholder="XS, S, M, L, XL"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Specifications (New line split)</label>
                  <textarea
                    rows={2}
                    value={newProdSpecs}
                    onChange={(e) => setNewProdSpecs(e.target.value)}
                    placeholder="100% Double-weight fleece wool&#13;Designed and detailed in Nigeria"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 text-black bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono font-black uppercase text-xs tracking-widest cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
              >
                + CONSIGNE ATELIER SPECIMEN
              </button>
            </form>
          </div>
        )}

        {/* SUBTAB 6: SECURITY BULLETIN DISPATCH (POP-UP AND BANNER ANNOUNCEMENTS) */}
        {activeSubTab === 'announcements' && (
          <div className="space-y-6 animate-fade-in text-left max-w-xl">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">[ Platform Bulletin Dispatch ]</h3>
              <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Publish floating alerts, top navigation tickers, or seasonal pop-up notification panels immediately to user storefront matrices.</p>
            </div>

            <form onSubmit={handlePublishAnnouncement} className="space-y-4 border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-sans">
              
              {/* Active Toggle */}
              <div className="flex items-center justify-between p-3 border-2 border-black bg-zinc-50">
                <div className="space-y-0.5">
                  <span className="block text-xs font-black uppercase tracking-tight text-neutral-900">BULLETIN BROADCAST FLAG STATUS</span>
                  <span className="block text-[9.5px] text-zinc-500 font-mono uppercase tracking-wider">Is notification visible to client browsers?</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAnnActive(!annActive)}
                  className={`px-4.5 py-1.5 font-mono text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer rounded-full ${
                    annActive 
                      ? 'bg-green-700 text-white border-green-755' 
                      : 'bg-zinc-200 text-zinc-505 border-zinc-300'
                  }`}
                >
                  {annActive ? '● ON / BROADCAST' : '○ OFF / SILENT'}
                </button>
              </div>

              {/* Broadcast Alert Format Choice selection */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1.5">ALERT FORMAT SPECS</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAnnType('banner')}
                    className={`p-3 border-2 font-mono text-center text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
                      annType === 'banner' 
                        ? 'border-black bg-zinc-100 font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                        : 'border-zinc-200 hover:border-black'
                    }`}
                  >
                    Marquee Ticker Banner
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnnType('modal')}
                    className={`p-3 border-2 font-mono text-center text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
                      annType === 'modal' 
                        ? 'border-black bg-zinc-100 font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                        : 'border-zinc-200 hover:border-black'
                    }`}
                  >
                    Center Pop-up dialog Modal
                  </button>
                </div>
              </div>

              {/* Title parameter */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">BULLETIN ATELIER HEADING</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="COUPON VOUCHER RELEASE ALERT"
                  className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans font-bold uppercase bg-white text-black"
                />
              </div>

              {/* Message parameter */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">BULLETIN TEXT CONTENT MESSAGE BODY</label>
                <textarea
                  rows={4}
                  required
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  placeholder="Unlock 20% discount on double-weight wool trench coats."
                  className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 bg-white text-black"
                />
              </div>

              {/* Preview simulated component box */}
              <div className="p-3 border-2 border-dashed border-zinc-300 bg-zinc-50 space-y-2">
                <span className="text-[9px] font-bold font-mono text-zinc-400 uppercase tracking-widest block">[ LIVE ATELIER CLIENT PREVIEW ]</span>
                
                {annType === 'banner' ? (
                  <div className="bg-[#18181b] text-white p-3 border-2 border-black text-[10px] font-mono text-center uppercase tracking-tight">
                    🔥 <strong>{annTitle || 'BULLETIN TITLE'}:</strong> {annMessage || 'Announcement message body goes here...'}
                  </div>
                ) : (
                  <div className="bg-white border-2 border-black p-4 text-center space-y-1.5 shadow-md">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase">[ OVERLAY DIALOG POP-UP BANNER ]</span>
                    <h5 className="font-extrabold text-sm text-black leading-tight uppercase font-mono">{annTitle || 'BULLETIN HEADING'}</h5>
                    <p className="text-[11px] text-zinc-650 leading-relaxed font-sans">{annMessage || 'Announcement message body goes here...'}</p>
                    <button type="button" className="px-3.5 py-1 bg-black text-white text-[9px] font-mono font-black uppercase tracking-wider">
                      Dismiss Dialog
                    </button>
                  </div>
                )}
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono font-black uppercase text-xs tracking-widest cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
              >
                🗲 DISTRIBUTE LIVE BULLETIN ATELIER
              </button>

            </form>

            {/* Maintenance & Store Shutdown core parameters */}
            <div className="space-y-6 pt-6 border-t-4 border-black">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">[ Store Status & Maintenance Settings ]</h3>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Toggle live storefront accessibility. When activated, all shoppers are greeted with a customized, clean status screen blocking regular browsing operations while administrators retain complete entry access.</p>
              </div>

              <form onSubmit={handleSaveMaintenanceSettings} className="space-y-4 border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-sans">
                {/* Active Toggle */}
                <div className="flex items-center justify-between p-3 border-2 border-black bg-amber-500/10">
                  <div className="space-y-0.5">
                    <span className="block text-xs font-black uppercase tracking-tight text-neutral-900">🔒 MAINTENANCE MODE GATE STATUS</span>
                    <span className="block text-[9.5px] text-zinc-500 font-mono uppercase tracking-wider">Shutdown regular storefront access?</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMntActive(!mntActive)}
                    className={`px-4.5 py-1.5 font-mono text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer rounded-full ${
                      mntActive
                        ? 'bg-amber-500 text-black border-amber-600 font-extrabold'
                        : 'bg-zinc-200 text-zinc-505 border-zinc-300'
                    }`}
                  >
                    {mntActive ? '● ON / SHUTDOWN ACTIVE' : '○ OFF / STOREFRONT LIVE'}
                  </button>
                </div>

                {/* Custom Maintenance Message parameters */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">USER FAREWELL STATUS MESSAGE</label>
                  <textarea
                    rows={3}
                    required
                    value={mntMessage}
                    onChange={(e) => setMntMessage(e.target.value)}
                    placeholder="We're currently updating our store with new seasonal releases and running an indexing cycle. The checkout registers will return shortly. Thank you for your support!"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 bg-white text-black"
                  />
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1 block">This customized message will be shown clearly to visitors.</span>
                </div>

                {/* Submit trigger button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono font-black uppercase text-xs tracking-widest cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
                >
                  🔒 SAVE & LOCK STOREFRONT INDEX STATUS
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SUBTAB 7: GLOBAL STORE CONFIGURATION HUB */}
        {activeSubTab === 'settings' && (
          <div className="space-y-6 animate-fade-in text-left max-w-xl">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">[ Global Store Settings ]</h3>
              <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Control complimentary shipping thresholds, configure currency boundaries, design promotional campaigns, adjust front-end announcements & upload promotional graphic banners.</p>
            </div>

            <form onSubmit={handleSaveStoreSettings} className="space-y-5 border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-sans">
              
              {/* Shipping threshold configs */}
              <div className="border-t-2 border-black pt-4 mt-2 space-y-4">
                <span className="text-[11px] font-black uppercase text-zinc-900 tracking-wider font-mono block">◇ Shipping & Cost Threshold Rules</span>
                
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Shipping Badge Display text</label>
                  <input
                    type="text"
                    required
                    value={shippingThresholdText}
                    onChange={(e) => setShippingThresholdText(e.target.value)}
                    placeholder="Complimentary shipping worldwide on orders over ₦225,000"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans font-bold bg-white text-black"
                  />
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1 block">Manual text input displayed directly in the header banner.</span>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Free Shipping Cart cutoff threshold label in USD</label>
                  <input
                    type="number"
                    required
                    value={shippingThresholdUSD}
                    onChange={(e) => setShippingThresholdUSD(Number(e.target.value))}
                    placeholder="150"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans font-bold bg-white text-black"
                  />
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1 block">Used in calculations internally (e.g. 150 USD calculates as equivalent converted limits).</span>
                </div>
              </div>

              {/* Promo release banner configs */}
              <div className="border-t-2 border-black pt-4 mt-4 space-y-4">
                <span className="text-[11px] font-black uppercase text-zinc-900 tracking-wider font-mono block">◇ Dynamic Promo Showcase Banner Configs</span>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Promo Season Label</label>
                  <input
                    type="text"
                    required
                    value={promoSeason}
                    onChange={(e) => setPromoSeason(e.target.value)}
                    placeholder="PRE-FALL ATMOSPHERE"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans font-bold bg-white text-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Promo Main Title</label>
                  <textarea
                    rows={2}
                    required
                    value={promoTitle}
                    onChange={(e) => setPromoTitle(e.target.value)}
                    placeholder="NEW&#10;COLLECTIONS"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans font-bold bg-white text-black"
                  />
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1 block">Line breaks are preserved inside the hero layout.</span>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Promo Coupon Subtitle</label>
                  <input
                    type="text"
                    required
                    value={promoSubtitle}
                    onChange={(e) => setPromoSubtitle(e.target.value)}
                    placeholder="20% OFF / SHOP NEW"
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans font-bold bg-white text-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">Promo Description Card Text</label>
                  <textarea
                    rows={3}
                    required
                    value={promoDescription}
                    onChange={(e) => setPromoDescription(e.target.value)}
                    placeholder="Engineering premium garments to deliver unmatched visual tranquility..."
                    className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50 bg-white text-black"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase text-zinc-400">Promo Banner Display Image</label>
                  
                  {/* Image input/drag block */}
                  <div 
                    className="border-2 border-dashed border-zinc-300 hover:border-black p-4 text-center cursor-pointer bg-zinc-50 group hover:bg-zinc-100/50 transition-all rounded-none"
                    onClick={() => document.getElementById('promo-image-file-selector')?.click()}
                  >
                    <svg className="w-6 h-6 text-zinc-400 group-hover:text-black mb-1.5 transition-colors mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="text-[11px] font-sans font-bold text-black uppercase tracking-wider block">Upload Brand Banner Image</span>
                    <span className="text-[9px] text-zinc-400 uppercase font-mono">[ BROWSE COMPUTER FOR LOCAL GRAPHICS ]</span>
                    
                    <input
                      type="file"
                      id="promo-image-file-selector"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              setPromoImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </div>

                  {/* Fallback Display Graphic URL Input */}
                  <div>
                    <label className="block text-[9px] font-mono font-bold uppercase text-zinc-400 mb-1">Or direct web URL</label>
                    <input
                      type="text"
                      value={promoImage}
                      onChange={(e) => setPromoImage(e.target.value)}
                      placeholder="https://images.unsplash.com/promo-image.jpg"
                      className="w-full px-3 py-2 text-xs border-2 border-black outline-none font-sans font-bold bg-white text-black"
                    />
                  </div>

                  {/* Promo image preview card */}
                  {promoImage && (
                    <div className="p-3 border-2 border-dashed border-zinc-300 bg-zinc-50 space-y-2">
                      <span className="text-[9px] font-bold font-mono text-zinc-400 uppercase tracking-widest block">[ HERO DISPLAY PREVIEW ]</span>
                      <div className="relative border-2 border-black h-28 overflow-hidden bg-black/10">
                        <img 
                          src={promoImage} 
                          alt="Showcase Preview" 
                          className="w-full h-full object-cover grayscale tracking-tight"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Toggles and Selector Section */}
              <div className="border-t-2 border-black pt-4 mt-4 space-y-4">
                <span className="text-[11px] font-black uppercase text-zinc-900 tracking-wider font-mono block">◇ Showcase Toggles & Logo Visibility</span>

                <div className="flex items-center justify-between p-3 border-2 border-black bg-zinc-50">
                  <div>
                    <span className="text-[11px] font-bold uppercase block">Show Promo Release Banner</span>
                    <span className="text-[9px] text-zinc-400 font-mono block">TOGGLE THE ENTIRE HERO BANNER ON MAIN STORE PAGE</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showPromoBanner}
                    onChange={(e) => setShowPromoBanner(e.target.checked)}
                    className="w-5 h-5 accent-black cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 border-2 border-black bg-zinc-50">
                  <div>
                    <span className="text-[11px] font-bold uppercase block">Show Trending Product Section</span>
                    <span className="text-[9px] text-zinc-400 font-mono block">TOGGLE THE HOVERABLE TRENDING BANNER PORTAL</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showTrendingShowcase}
                    onChange={(e) => setShowTrendingShowcase(e.target.checked)}
                    className="w-5 h-5 accent-black cursor-pointer"
                  />
                </div>

                {showTrendingShowcase && (
                  <div className="p-3 border-2 border-black bg-zinc-50/50 space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500">Featured Trending Product</label>
                    <select
                      value={trendingProductId}
                      onChange={(e) => setTrendingProductId(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border-2 border-black outline-none font-mono font-bold bg-white text-black"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          [{p.id}] {p.name} - {p.price} USD
                        </option>
                      ))}
                    </select>
                    <span className="text-[9px] text-zinc-400 uppercase font-mono block">Choose which dynamic database product is highlighted in the trending banner slot.</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 border-2 border-black bg-zinc-50">
                  <div>
                    <span className="text-[11px] font-bold uppercase block">Heavy Bold Store Logo Text</span>
                    <span className="text-[9px] text-zinc-400 font-mono block">APPLY HEAVY FONT-BLACK STYLE IN HEADER & FOOTER</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={boldStoreLogo}
                    onChange={(e) => setBoldStoreLogo(e.target.checked)}
                    className="w-5 h-5 accent-black cursor-pointer"
                  />
                </div>
              </div>

              {/* Save settings trigger */}
              <button
                type="submit"
                className="w-full py-4 bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono font-black uppercase text-xs tracking-widest cursor-pointer transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 mt-2"
              >
                💾 SAVE & DEPLOY GLOBAL STORE SETTINGS
              </button>

            </form>
          </div>
        )}

      </div>

      <div className="pt-8 border-t border-zinc-200 text-center text-[10px] font-mono text-zinc-400 uppercase">
        Authenticated sandbox core • Memory database pipeline checked successfully is OK
      </div>
    </div>
  );
}
