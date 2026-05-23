import { useState, FormEvent, useEffect } from 'react';
import { User as UserType, Order, CURRENCIES } from '../types';
import { 
  LogIn, 
  LogOut, 
  Package, 
  UserCheck, 
  ShieldAlert, 
  Key, 
  MapPin, 
  Mail, 
  RefreshCw, 
  User, 
  ClipboardList, 
  Settings, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  BellRing, 
  ChevronRight,
  Globe
} from 'lucide-react';

interface AuthScreenProps {
  currentUser: UserType | null;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
  onUpdateUser: (user: UserType) => void;
  orders: Order[];
  formatPrice: (price: number) => string;
  onUpdateOrder: (order: Order) => void;
  selectedCurrency: any;
  onCurrencyChange: (currency: any) => void;
  onAdminTrigger?: () => void;
}

export default function AuthScreen({
  currentUser,
  onLogin,
  onLogout,
  onUpdateUser,
  orders,
  formatPrice,
  onUpdateOrder,
  selectedCurrency,
  onCurrencyChange,
  onAdminTrigger,
}: AuthScreenProps) {
  const [isRegister, setIsRegister] = useState(false);
  
  // Login / Register fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');

  // Status alerts
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Editing profile fields
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAddress, setEditAddress] = useState(currentUser?.shippingAddress || '');
  const [editCity, setEditCity] = useState(currentUser?.city || '');
  const [editZip, setEditZip] = useState(currentUser?.zipCode || '');
  const [preferredRoute, setPreferredRoute] = useState<'NG_TO_NG' | 'AFRICA_EXP' | 'US_AIR_CARGO'>(currentUser?.preferredRoute || 'NG_TO_NG');
  const [isUpdating, setIsUpdating] = useState(false);

  // Interactive Disputes & Claims configuration
  const [disputeOrderId, setDisputeOrderId] = useState<string | null>(null);
  const [disputeReason, setDisputeReason] = useState<'broken' | 'wrong_item' | 'missing_items' | 'transit_lost'>('broken');
  const [disputeDesc, setDisputeDesc] = useState('');

  // Profile Active View Tab option
  const [activeTab, setActiveTab] = useState<'orders' | 'shipping' | 'preferences'>('orders');
  
  // Order delivery filter
  const [deliveryFilter, setDeliveryFilter] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');

  // Preferences mock states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsTracking, setSmsTracking] = useState(true);
  const [expressDeliveryOption, setExpressDeliveryOption] = useState(false);

  // Demo Sign-In triggers
  const handleDemoSignIn = () => {
    const demoUser: UserType = {
      email: 'collector@ooja.studio',
      name: 'Arthur Pendelton',
      phone: '+1 (555) 0192-384',
      shippingAddress: '404 Noir Boulevard, Loft 7B',
      city: 'San Francisco',
      zipCode: '94103',
      createdAt: '2026-05-20'
    };
    onLogin(demoUser);
    setEditName(demoUser.name);
    setEditPhone(demoUser.phone || '');
    setEditAddress(demoUser.shippingAddress || '');
    setEditCity(demoUser.city || '');
    setEditZip(demoUser.zipCode || '');
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please specify essential credentials to authenticate.');
      return;
    }

    setIsUpdating(true);
    try {
      // Direct administrative login verification to server-side endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      if (email.trim().toLowerCase() === 'akinwunmigbenga97@gmail.com') {
        setIsUpdating(false);
        const data = await response.json();
        
        if (response.ok && data.success) {
          const adminUser: UserType = data.user;
          onLogin(adminUser);
          setEditName(adminUser.name);
          setEditPhone(adminUser.phone || '');
          setEditAddress(adminUser.shippingAddress || '');
          setEditCity(adminUser.city || '');
          setEditZip(adminUser.zipCode || '');
          setSuccessMsg('Secure Admin Session Initiated.');
        } else {
          setErrorMsg(data.message || 'Signature mismatch: Invalid administrator credentials.');
        }
        return;
      }

      // For standard client profiles, we parse local registration/login flows
      setIsUpdating(false);

      // Verify if customer account in the central registers has been suspended
      const rawRegUsers = localStorage.getItem('ooja_registered_users');
      if (rawRegUsers) {
        const parsedRegUsers: UserType[] = JSON.parse(rawRegUsers);
        const matchedRecord = parsedRegUsers.find(ru => ru.email.toLowerCase() === email.trim().toLowerCase());
        if (matchedRecord?.isBlocked) {
          setErrorMsg('THIS ACCOUNT ACCESSIBILITY HAS BEEN SUSPENDED/DEFERRED BY STORE MANAGEMENT.');
          return;
        }
      }

      if (isRegister) {
        if (!name) {
          setErrorMsg('Please state your full name signature to register.');
          return;
        }
        const newUser: UserType = {
          email: email.trim().toLowerCase(),
          name,
          phone,
          shippingAddress: address,
          city,
          zipCode: zip,
          createdAt: new Date().toISOString().split('T')[0],
          preferredRoute: preferredRoute || 'NG_TO_NG'
        };
        onLogin(newUser);
        setEditName(newUser.name);
        setEditPhone(newUser.phone || '');
        setEditAddress(newUser.shippingAddress || '');
        setEditCity(newUser.city || '');
        setEditZip(newUser.zipCode || '');
        setSuccessMsg(`Welcome to Ooja Collection, ${newUser.name}! Profile initialized.`);
      } else {
        const loggedUser: UserType = {
          email: email.trim().toLowerCase(),
          name: email.split('@')[0].toUpperCase(),
          phone: phone || '+1 (555) 777-8888',
          shippingAddress: address || '789 Stark Parkway, Studio 3',
          city: city || 'New York',
          zipCode: zip || '10012',
          createdAt: new Date().toISOString().split('T')[0],
          preferredRoute: preferredRoute || 'NG_TO_NG'
        };
        onLogin(loggedUser);
        setEditName(loggedUser.name);
        setEditPhone(loggedUser.phone || '');
        setEditAddress(loggedUser.shippingAddress || '');
        setEditCity(loggedUser.city || '');
        setEditZip(loggedUser.zipCode || '');
        setSuccessMsg('Portfolio authenticated securely.');
      }
    } catch (err) {
      setIsUpdating(false);
      console.error('Authentication check failed:', err);
      setErrorMsg('Communication error checking credentials with security server.');
    }
  };

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsUpdating(true);
    setTimeout(() => {
      const updated: UserType = {
        ...currentUser,
        name: editName,
        phone: editPhone,
        shippingAddress: editAddress,
        city: editCity,
        zipCode: editZip,
        preferredRoute: preferredRoute,
      };
      onUpdateUser(updated);
      setIsUpdating(false);
      setSuccessMsg('Your default shipping route details were updated.');
      setTimeout(() => setSuccessMsg(''), 3500);
    }, 800);
  };

  const handleMarkAsReceived = (order: Order) => {
    const updatedOrder: Order = {
      ...order,
      status: 'received',
    };
    onUpdateOrder(updatedOrder);
    setSuccessMsg(`ORDER ${order.id} MARKED AS RECEIVED & VERIFIED BY CONSIGNEE`);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleSubmitDispute = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    const updatedOrder: Order = {
      ...targetOrder,
      status: 'disputed',
      disputeReason: disputeReason === 'broken' ? 'Broken/damaged goods received' :
                     disputeReason === 'wrong_item' ? 'Wrong items dispatched' :
                     disputeReason === 'missing_items' ? 'Missing items in package' :
                     'Transit flight lost/overdue delays',
      disputeDescription: disputeDesc,
      disputeStatus: 'pending',
    };

    onUpdateOrder(updatedOrder);
    setDisputeOrderId(null);
    setDisputeDesc('');
    setSuccessMsg(`DISPUTE CLAIM INITIATED SECURELY FOR ORDER CHECKPOINT ${orderId}`);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  // Filtered orders list
  const filteredOrders = orders.filter(
    (order) => {
      if (deliveryFilter === 'all') return true;
      return order.status === deliveryFilter;
    }
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 text-black bg-white select-none">
      {currentUser ? (
        /* ================= PREMIUM CUSTOMER PORTAL ================= */
        <div className="space-y-8 animate-fade-in">
          
          {/* Welcome Dashboard Profile Banner */}
          <div className="border-4 border-black p-6 sm:p-8 bg-zinc-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border-4 border-black bg-black text-white flex items-center justify-center font-black text-2xl select-none shrink-0">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-mono">[ ACTIVE CUSTOMER DOSSIER ]</span>
                <h3 className="text-xl font-black uppercase text-black font-sans leading-none">{currentUser.name}</h3>
                <p className="text-xs font-bold text-zinc-600 truncate">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Account analytics summary badges */}
              <div className="bg-white border-2 border-black px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-wide flex flex-col gap-0.5 justify-center min-w-[130px]">
                <span className="text-zinc-400 font-mono text-[9px]">[VIP STATUS]</span>
                <span className="text-black flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> ATELIER GOLD MEMBER</span>
              </div>
              <div className="bg-white border-2 border-black px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-wide flex flex-col gap-0.5 justify-center min-w-[130px]">
                <span className="text-zinc-400 font-mono text-[9px]">[MEMBERSHIP DATE]</span>
                <span className="text-black">{currentUser.createdAt}</span>
              </div>
              
              <button
                id="customer-logout-btn"
                onClick={onLogout}
                className="py-3 px-5 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-black hover:text-white border-2 border-black transition-all flex items-center justify-center gap-2 cursor-pointer h-full shrink-0"
              >
                <LogOut className="w-3.5 h-3.5 stroke-[2.5]" /> Log Out
              </button>
            </div>
          </div>

          {/* Quick Tabs to toggle sub-views in the Dashboard */}
          <div className="border-b-4 border-black flex flex-wrap gap-2 pt-2">
            <button
              id="dashboard-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-3 text-xs font-black uppercase tracking-widest border-t-2 border-x-2 border-black transition-all flex items-center gap-2 -mb-1 ${
                activeTab === 'orders' ? 'bg-black text-white border-b-2 border-b-black' : 'bg-white text-zinc-500 hover:text-black border-b-0'
              }`}
            >
              <Package className="w-4 h-4" /> My Orders ({orders.length})
            </button>
            <button
              id="dashboard-tab-shipping"
              onClick={() => setActiveTab('shipping')}
              className={`px-5 py-3 text-xs font-black uppercase tracking-widest border-t-2 border-x-2 border-black transition-all flex items-center gap-2 -mb-1 ${
                activeTab === 'shipping' ? 'bg-black text-white border-b-2 border-b-black' : 'bg-white text-zinc-500 hover:text-black border-b-0'
              }`}
            >
              <MapPin className="w-4 h-4" /> Shipping Address Registry
            </button>
            <button
              id="dashboard-tab-preferences"
              onClick={() => setActiveTab('preferences')}
              className={`px-5 py-3 text-xs font-black uppercase tracking-widest border-t-2 border-x-2 border-black transition-all flex items-center gap-2 -mb-1 ${
                activeTab === 'preferences' ? 'bg-black text-white border-b-2 border-b-black' : 'bg-white text-zinc-500 hover:text-black border-b-0'
              }`}
            >
              <Settings className="w-4 h-4" /> Account Preferences
            </button>
          </div>

          {/* Tab content 1: Order Tracker & Past Orders Ledger */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-black/10 pb-3">
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-black" /> Order History Ledger
                  </h3>
                  <p className="text-xs text-zinc-500 font-sans tracking-tight leading-relaxed">
                    Overview and real-time delivery tracking status for your recent orders.
                  </p>
                </div>
                
                {/* Real-time Order Filtering Controls */}
                {orders.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 bg-zinc-100 p-1 border-2 border-black text-[10px] font-bold uppercase tracking-wider">
                    {(['all', 'processing', 'shipped', 'delivered'] as const).map((filter) => (
                      <button
                        key={filter}
                        id={`filter-btn-${filter}`}
                        onClick={() => setDeliveryFilter(filter)}
                        className={`px-2.5 py-1 transition-colors cursor-pointer ${
                          deliveryFilter === filter ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {orders.length === 0 ? (
                <div className="p-12 border-4 border-dashed border-black bg-zinc-50 text-center max-w-xl mx-auto">
                  <Package className="w-12 h-12 mx-auto text-zinc-300 mb-3 stroke-[1.2]" />
                  <p className="text-sm font-black uppercase text-black mb-1">No Orders Filed on Record </p>
                  <p className="text-xs text-zinc-400 max-w-[340px] mx-auto font-sans leading-relaxed">
                    Once you checkout garments or luxury items from our digital collection shop, your real-time tracking details and billing invoices will reside here.
                  </p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-zinc-400 border border-black/10">
                  <p className="text-xs font-bold uppercase">No matching order records found for filter: {deliveryFilter}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border-2 border-black p-5 sm:p-6 bg-white space-y-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {/* Order top ledger information bar */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-dashed border-black pb-4 gap-3">
                        <div className="space-y-1">
                          <div className="text-xs font-mono font-black uppercase text-black tracking-widest flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-black"></span>
                            ORDER REF: {order.id}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-400 font-mono">AUTHORIZED TRANSAC DATE: {order.date}</div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                          <div className="text-right">
                            <span className="text-[10px] block text-zinc-400 font-bold tracking-wider font-mono">TOTAL BILL:</span>
                            <span className="text-base font-black font-mono text-black">{formatPrice(order.total)}</span>
                          </div>
                          <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border inline-block font-mono ${
                              order.status === 'received' ? 'bg-[#15803d] text-white border-[#15803d]' :
                              order.status === 'disputed' ? 'bg-[#c2410c] text-white border-[#c2410c]' :
                              'bg-black text-white border-black'
                            }`}>
                              {order.status === 'processing' && '✓ ORDER PLACED'}
                              {order.status === 'shipped' && '✈ DISPATCHED'}
                              {order.status === 'delivered' && '✦ DELIVERED'}
                              {order.status === 'received' && '✦ RECEIVED & VERIFIED'}
                              {order.status === 'disputed' && '⚠ DISPUTED / CLAIMED'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* E-commerce Interactive Tracking Stepper Progress Line */}
                      <div className="py-2 px-1 bg-zinc-50 border border-black/10">
                        <div className="relative">
                          {/* Running line background banner */}
                          <div className="absolute top-[14px] left-[15%] right-[15%] h-1 bg-zinc-200 z-0">
                            <div 
                              className="h-full bg-black transition-all duration-700" 
                              style={{ 
                                width: 
                                  order.status === 'processing' ? '0%' : 
                                  order.status === 'shipped' ? '50%' : '100%' 
                              }}
                            />
                          </div>

                          {/* 3 Step tracking points */}
                          <div className="relative z-10 flex justify-between">
                            <div className="flex flex-col items-center w-[30%]">
                              <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs bg-black text-white shadow-sm">
                                1
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-wider block mt-1.5 text-black">Placed</span>
                              <span className="text-[8px] text-zinc-400 font-mono font-bold">In Warehouse</span>
                            </div>

                            <div className="flex flex-col items-center w-[30%]">
                              <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs transition-colors ${
                                order.status === 'shipped' || order.status === 'delivered' 
                                  ? 'bg-black text-white' : 'bg-white text-zinc-300'
                              }`}>
                                <Truck className="w-4 h-4" />
                              </div>
                              <span className={`text-[10px] font-black uppercase tracking-wider block mt-1.5 ${
                                order.status === 'shipped' || order.status === 'delivered' ? 'text-black' : 'text-zinc-300'
                              }`}>Dispatched</span>
                              <span className="text-[8px] text-zinc-400 font-mono font-bold">Air Courier Transit</span>
                            </div>

                            <div className="flex flex-col items-center w-[30%]">
                              <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-xs transition-colors ${
                                order.status === 'delivered' ? 'bg-black text-white' : 'bg-white text-zinc-300'
                              }`}>
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <span className={`text-[10px] font-black uppercase tracking-wider block mt-1.5 ${
                                order.status === 'delivered' ? 'text-black' : 'text-zinc-300'
                              }`}>Delivered</span>
                              <span className="text-[8px] text-zinc-400 font-mono font-bold">At Delivery Point</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Items nested list rendering */}
                      <div className="space-y-3.5 pt-2">
                        <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest block">[ INCLUDED ITEMS - QTY LEDGER ]</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3.5 items-center p-2 border border-black/5 rounded-none bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                              <img src={item.image} alt={item.productName} className="w-10 h-12 object-cover border-2 border-black shrink-0" referrerPolicy="no-referrer" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-black text-black truncate uppercase font-sans">{item.productName}</p>
                                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                                  QTY: {item.quantity} {item.size ? `| COLOR-SIZE: ${item.size}` : ''}
                                </p>
                              </div>
                              <span className="text-xs font-black font-mono text-black">{formatPrice(item.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Logistics Carrier details and route */}
                      <div className="text-[10px] bg-zinc-50 p-4 border border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 font-mono uppercase text-zinc-500">
                        <div>
                          SHIPPING CARRIER: <strong className="text-black">
                            {order.logisticsRoute === 'NG_TO_NG' ? 'GIG LOGISTICS / SHALOM LOCAL' : 'DHL AVIATION WORLDWIDE'}
                          </strong>
                        </div>
                        <div>
                          ROUTING CODE: <strong className="text-black px-1.5 py-0.5 bg-zinc-200">
                            {order.logisticsRoute === 'NG_TO_NG' && '🇳🇬 NIGERIA TO NIGERIA DOMESTIC'}
                            {order.logisticsRoute === 'AFRICA_EXP' && '🌍 OTHER AFRICAN REGIONAL'}
                            {order.logisticsRoute === 'US_AIR_CARGO' && '🇺🇸 UNITED STATES FLIGHT CARGO'}
                            {!order.logisticsRoute && '🇳🇬 NIGERIA TO NIGERIA DOMESTIC'}
                          </strong>
                        </div>
                        <div>
                          WAYBILL NO: <strong className="text-black underline">#OJ-DHL-{order.id.replace('OJ-', '')}-TR</strong>
                        </div>
                      </div>

                      {/* Interactive Customer Actions for received orders and disputes */}
                      {order.status !== 'received' && order.status !== 'disputed' && disputeOrderId !== order.id && (
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          <button
                            id={`receive-btn-${order.id}`}
                            onClick={() => handleMarkAsReceived(order)}
                            className="flex-1 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white border-2 border-[#15803d] hover:border-[#166534] text-[11px] font-black uppercase tracking-widest cursor-pointer text-center transition-all flex items-center justify-center gap-1.5 active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] font-sans"
                          >
                            <CheckCircle2 className="w-4 h-4 shrink-0" /> I Have Received My Order
                          </button>
                          
                          <button
                            id={`dispute-trigger-${order.id}`}
                            onClick={() => {
                              setDisputeOrderId(order.id);
                              setDisputeReason('broken');
                              setDisputeDesc('');
                            }}
                            className="py-2.5 px-4 bg-white hover:bg-zinc-50 text-[#c2410c] hover:text-[#9a3412] border-2 border-[#c2410c] text-[11px] font-black uppercase tracking-widest cursor-pointer text-center transition-all flex items-center justify-center gap-1.5 active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] font-sans"
                          >
                            <ShieldAlert className="w-4 h-4 shrink-0" /> Open Dispute / Damaged Item
                          </button>
                        </div>
                      )}

                      {/* Dispute Form Inline Drawer */}
                      {disputeOrderId === order.id && (
                        <div className="border-4 border-black p-4 sm:p-5 bg-zinc-50 space-y-4 animate-scale text-black">
                          <div className="border-b-2 border-black pb-2 flex justify-between items-center">
                            <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 font-sans">
                              <ShieldAlert className="w-4 h-4 text-[#c2410c]" /> COMMENCE CLAIM COMPLAINT FOR REF: {order.id}
                            </h4>
                            <button
                              type="button"
                              onClick={() => setDisputeOrderId(null)}
                              className="text-[10px] font-mono font-black uppercase text-zinc-400 hover:text-black underline cursor-pointer"
                            >
                              [CANCEL]
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 font-mono">
                                Select Primary Claim Reason
                              </label>
                              <select
                                id={`dispute-reason-sel-${order.id}`}
                                value={disputeReason}
                                onChange={(e: any) => setDisputeReason(e.target.value)}
                                className="w-full px-2.5 py-2 text-xs border-2 border-black bg-white rounded-none outline-none font-sans focus:bg-zinc-50 text-black font-semibold"
                              >
                                <option value="broken">Broken / Damaged / Torn on Arrival</option>
                                <option value="wrong_item">Incorrect Item / Size / Variation dispatches</option>
                                <option value="missing_items">Missing garments / Short parcel content</option>
                                <option value="transit_lost">Package took too long / Courier transit failure</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 font-mono">
                                Detailed Witness Case Account of Broken/Faulty Goods
                              </label>
                              <textarea
                                id={`dispute-desc-text-${order.id}`}
                                required
                                rows={3}
                                value={disputeDesc}
                                onChange={(e) => setDisputeDesc(e.target.value)}
                                placeholder="Explain clearly which goods are broken/damaged or why you wish to dispute this order. Our desk will investigate..."
                                className="w-full px-2.5 py-2 text-xs border-2 border-black bg-white rounded-none outline-none font-sans focus:bg-zinc-50 text-black placeholder:text-zinc-400 resize-none font-medium leading-relaxed"
                              />
                            </div>

                            <button
                              id={`submit-claim-btn-${order.id}`}
                              type="button"
                              onClick={() => handleSubmitDispute(order.id)}
                              className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-widest transition-colors cursor-pointer text-center font-mono"
                            >
                              Authorize Secure Claims Investigation
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Dispute Summary Block */}
                      {order.status === 'disputed' && (
                        <div className="bg-orange-50 border-2 border-[#c2410c] p-4 text-xs space-y-2">
                          <div className="flex items-center gap-2 text-[#c2410c]">
                            <ShieldAlert className="w-4 h-4 shrink-0" />
                            <strong className="text-[10px] uppercase tracking-wider font-mono">[ UNDER SECURE CLAIM INVESTIGATION ]</strong>
                          </div>
                          <div>
                            <span className="font-bold text-zinc-400 uppercase block text-[9px] font-mono">Declared Dispute Reason:</span>
                            <p className="font-semibold text-black text-xs font-sans mt-0.5">{order.disputeReason || 'Broken or faulty goods received.'}</p>
                          </div>
                          <div>
                            <span className="font-bold text-zinc-400 uppercase block text-[9px] font-mono">Detailed Customer Statements:</span>
                            <p className="text-zinc-700 italic font-sans text-xs mt-0.5 font-medium">"{order.disputeDescription || 'No details specified.'}"</p>
                          </div>
                          <div className="pt-2 border-t border-dashed border-[#c2410c]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono text-zinc-500 gap-1.5">
                            <span>REGIONAL CLAIMS DESK STATUS: <strong className="text-[#c2410c]">ASSIGNED ATELIER AGENT (#90)</strong></span>
                            <span>DECISION: <strong className="text-white bg-[#c2410c] px-2 py-0.5 uppercase">{order.disputeStatus || 'PENDING'}</strong></span>
                          </div>
                          
                          {/* Option to accept resolution and mark as received */}
                          <div className="pt-2 flex justify-end border-t border-[#c2410c]/10">
                            <button
                              id={`resolve-dispute-${order.id}`}
                              onClick={() => {
                                const resolved: Order = {
                                  ...order,
                                  status: 'received',
                                  disputeStatus: 'resolved'
                                };
                                onUpdateOrder(resolved);
                                setSuccessMsg(`DISPUTE FOR ORDER ${order.id} RESOLVED MUTUALLY - PACKAGE LOGGED AS RECEIVED`);
                                setTimeout(() => setSuccessMsg(''), 3500);
                              }}
                              className="px-3.5 py-1.5 bg-[#15803d] text-white hover:bg-[#166534] text-[10px] font-black uppercase tracking-wider font-mono cursor-pointer transition-colors"
                            >
                              [ Close Dispute: Accept Refund / Settlement ]
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab content 2: Shipping default coordinates address list */}
          {activeTab === 'shipping' && (
            <div className="animate-fade-in max-w-2xl">
              <form onSubmit={handleUpdateProfile} className="border-4 border-black p-6 sm:p-8 space-y-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-black" /> [Default Shipping Registry]
                  </h3>
                  <p className="text-xs text-zinc-500 font-sans tracking-tight mb-2">
                    Configure your delivery dossier. These credentials populate automatically when proceeding to check out your shopping bag.
                  </p>
                </div>

                {successMsg && (
                  <div id="auth-success-alert" className="p-3 bg-zinc-50 text-xs font-bold border-2 border-black text-[#16a34a] flex items-center gap-1.5 font-mono animate-scale">
                    ✓ {successMsg}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 font-mono">Full Legal / Consignee Name</label>
                    <input
                      id="profile-edit-name"
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border-2 border-black rounded-none outline-none font-sans focus:bg-zinc-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 font-mono">Contact Phone Number</label>
                    <input
                      id="profile-edit-phone"
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border-2 border-black rounded-none outline-none font-sans focus:bg-zinc-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 font-mono">Delivery Street Address</label>
                    <input
                      id="profile-edit-address"
                      type="text"
                      required
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border-2 border-black rounded-none outline-none font-sans focus:bg-zinc-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 font-mono">City / Settlement</label>
                      <input
                        id="profile-edit-city"
                        type="text"
                        required
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs border-2 border-black rounded-none outline-none font-sans focus:bg-zinc-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 font-mono">Zip / Postal Code</label>
                      <input
                        id="profile-edit-zip"
                        type="text"
                        required
                        value={editZip}
                        onChange={(e) => setEditZip(e.target.value)}
                        className="w-full px-3 py-2 text-xs border-2 border-black rounded-none outline-none font-sans focus:bg-zinc-50"
                      />
                    </div>
                  </div>

                  {/* Custom Regional Logistics Setting */}
                  <div className="border-t-2 border-dashed border-black pt-4">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-zinc-500 mb-1.5 font-mono">
                      [ PREFERRED REGIONAL LOGISTICS ROUTE ]
                    </label>
                    <div className="space-y-2">
                      <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                        Specify your primary delivery pipeline. Our atelier exclusively supports standard domestic dispatch lines, regional sub-Saharan air networks, or high-speed transatlantic cargo:
                      </p>
                      <select
                        id="preferred-logistics-route-select"
                        value={preferredRoute}
                        onChange={(e) => setPreferredRoute(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs border-2 border-black bg-white rounded-none outline-none font-sans font-bold focus:bg-zinc-100 uppercase cursor-pointer"
                      >
                        <option value="NG_TO_NG">🇳🇬 Nigeria to Nigeria (Domestic express dispatch)</option>
                        <option value="AFRICA_EXP">🌍 Other African countries (Region hub cargo: Ghana, South Africa, Kenya etc.)</option>
                        <option value="US_AIR_CARGO">🇺🇸 United States (Premium Transatlantic flight cargo via DHL)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="update-profile-btn"
                    type="submit"
                    disabled={isUpdating}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  >
                    {isUpdating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      'Synchronize Atelier Registry'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab content 3: Luxury Shop E-commerce preferences switches */}
          {activeTab === 'preferences' && (
            <div className="animate-fade-in max-w-2xl">
              <div className="border-4 border-black p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight flex items-center gap-2">
                    <BellRing className="w-5 h-5 text-black" /> [Account Dispatch Preferences]
                  </h3>
                  <p className="text-xs text-zinc-500 font-sans tracking-tight">
                    Review notification configurations, tracking parameters and specialized logistics settings for your client identifier.
                  </p>
                </div>

                <div className="space-y-4 pt-2 divide-y-2 divide-dashed divide-black/10">
                  {/* Option Entry 1 */}
                  <div className="flex justify-between items-center py-4 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider block">Email Dispatches & Newsletters</span>
                      <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                        Receive exclusive access notices concerning direct drops, pre-releases, and VIP promotional events.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={emailNotifications} 
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>

                  {/* Option Entry 2 */}
                  <div className="flex justify-between items-center py-4 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider block">SMS Flight Cargo Alerts</span>
                      <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                        Trigger direct courier tracking SMS updates onto your registered cellular phone line immediately upon shipment transit.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={smsTracking} 
                        onChange={(e) => setSmsTracking(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>

                  {/* Option Entry 3 */}
                  <div className="flex justify-between items-center py-4 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider block">Opt-In Priority Flight Logistics</span>
                      <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                        Prefer DHL Priority Flight Cargo delivery when orders register over Complimentary threshold. 
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={expressDeliveryOption} 
                        onChange={(e) => setExpressDeliveryOption(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>

                {/* Account Settings Currency Switcher */}
                <div className="py-5 border-t-2 border-dashed border-black/10 space-y-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-black uppercase tracking-wider block">[ Shopping Currency / Region Switcher ]</span>
                    <p className="text-[11px] text-zinc-500 font-sans leading-tight">
                      Adjust your active catalog region and price multipliers. The pricing values for all available garments, checkouts, and shipping bounds will convert instantly.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {CURRENCIES.map((curr) => {
                      const isSelected = selectedCurrency && curr.code === selectedCurrency.code;
                      return (
                        <button
                          key={curr.code}
                          type="button"
                          onClick={() => {
                            onCurrencyChange(curr);
                            setSuccessMsg(`Currency adjusted to ${curr.code} (${curr.symbol})`);
                            setTimeout(() => setSuccessMsg(''), 2505);
                          }}
                          className={`px-3 py-2 text-[11px] font-bold font-mono border-2 uppercase transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] scale-[1.02]' 
                              : 'bg-white text-zinc-700 border-zinc-200 hover:border-black hover:text-black hover:bg-zinc-50'
                          }`}
                        >
                          <span className="mr-1.5">{curr.flag}</span>
                          <span>{curr.code} ({curr.symbol})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-zinc-50 p-4 border border-black/10 flex gap-3">
                  <Globe className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider font-mono block">[ REGIONAL DATAPLANE GATEWAY ]</span>
                    <p className="text-[11px] text-zinc-500 font-sans leading-snug">
                      Your identity portfolio acts in complete synchrony with global regional security pipelines (GDPR compliance node fully certified).
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSuccessMsg('Dispatch configurations updated successfully.');
                    setTimeout(() => setSuccessMsg(''), 2500);
                  }}
                  className="w-full py-3.5 text-xs font-black uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
                >
                  Save Dispatch Preferences
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* ================= EMPTY OR UNAUTHENTICATED CUSTOMER REGISTRATION ================= */
        <div className="max-w-md mx-auto border-4 border-black p-6 sm:p-8 space-y-6 bg-white animate-fade-in shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          
          {/* Logo and Greeting Header */}
          <div className="text-center space-y-2 pb-4 border-b-2 border-black">
            <h2 className="text-3xl font-black tracking-tighter uppercase font-sans">CUSTOMER PORTAL</h2>
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest leading-none font-mono">
              {isRegister ? 'Register customer shopping credentials' : 'Authenticate member ID profile'}
            </p>
          </div>

          {/* Form Action alerts */}
          {errorMsg && (
            <div id="auth-error-alert" className="p-3 bg-zinc-50 text-xs font-bold border-2 border-[#ea580c] text-[#ea580c] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div id="auth-success-alert" className="p-3 bg-zinc-50 text-xs font-bold border-2 border-black text-[#16a34a] flex items-center gap-1.5 animate-scale">
              ✓ {successMsg}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            {/* Optional Name signature registration */}
            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">Your Full Name Signature</label>
                <input
                  id="auth-register-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arthur Pendelton"
                  className="w-full px-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">Email Address</label>
              <div className="relative">
                <input
                  id="auth-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@ooja.studio"
                  className="w-full pl-10 pr-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                />
                <Mail className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">Security Password</label>
              <div className="relative">
                <input
                  id="auth-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                />
                <Key className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Delivery pre-registration details (Optional during account configuration) */}
            {isRegister && (
              <div className="pt-2 border-t-2 border-dashed border-black space-y-4">
                <h4 className="text-[10px] font-black uppercase text-black tracking-widest font-mono">[ Default Shipping Coordinates ]</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-bold uppercase text-zinc-400">Phone</label>
                    <input
                      id="auth-register-phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 0192"
                      className="w-full px-2.5 py-1.5 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase text-zinc-400">City</label>
                    <input
                      id="auth-register-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Chicago"
                      className="w-full px-2.5 py-1.5 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase text-zinc-400">Default Street Address</label>
                  <input
                    id="auth-register-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="12 Oakwood Avenue"
                    className="w-full px-2.5 py-1.5 text-xs border-2 border-black outline-none font-sans focus:bg-zinc-50"
                  />
                </div>
              </div>
            )}

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-4 text-xs font-bold uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <LogIn className="w-4 h-4 stroke-[2.5]" /> {isRegister ? 'Register Account' : 'Authenticate Signature & Log In'}
            </button>
          </form>

          {/* Alternator and Guest Presets */}
          <div className="space-y-4 pt-4 border-t-2 border-black">
            <button
              id="auth-toggle-view"
              onClick={() => setIsRegister(!isRegister)}
              className="w-full text-center text-xs font-bold text-zinc-500 hover:text-black underline cursor-pointer"
            >
              {isRegister ? 'Already registered customer? Log In' : 'New customer store visitor? Register Profile'}
            </button>

            {/* High level instant guest credential loader */}
            {!isRegister && (
              <div className="p-4 bg-zinc-50 border-2 border-dotted border-black text-center space-y-2.5">
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-wider font-mono">[ Demo Client Secure Bypass ]</p>
                <button
                  id="auth-demo-signin-btn"
                  onClick={handleDemoSignIn}
                  className="px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest border-2 border-black hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-1.5 mx-auto shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                >
                  <UserCheck className="w-3.5 h-3.5 stroke-[2]" /> Instant Demo Sign-In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Security Staff Interface Entry point */}
      <div className="max-w-md mx-auto pt-6 border-t border-black/10 text-center select-none pb-4">
        <button
          type="button"
          onClick={() => {
            if (onAdminTrigger) {
              onAdminTrigger();
            }
          }}
          className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-450 hover:text-black hover:underline cursor-pointer"
        >
          [ ⚙ ATELIER STAFF PORTAL TERMINAL ENTRY ]
        </button>
      </div>

    </div>
  );
}
