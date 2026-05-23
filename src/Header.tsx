import { useState, useEffect, FormEvent } from 'react';
import { CartItem, Product, User, Order, CurrencyConfig, StoreSettings } from '../types';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, Box, CheckCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  currentUser: User | null;
  onAddOrder: (order: Order) => void;
  onLogin?: (user: User) => void;
  selectedCurrency: CurrencyConfig;
  formatPrice: (price: number) => string;
  storeSettings: StoreSettings;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentUser,
  onAddOrder,
  onLogin,
  selectedCurrency,
  formatPrice,
  storeSettings,
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Checkout Stages: 'cart', 'auth_prompt', 'info', 'payment', 'success'
  const [stage, setStage] = useState<'cart' | 'auth_prompt' | 'info' | 'payment' | 'success'>('cart');
  const [createdOrderId, setCreatedOrderId] = useState('');

  // Form states pre-filled with logged-in user if available
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState(currentUser?.shippingAddress || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [zipCode, setZipCode] = useState(currentUser?.zipCode || '');
  const [checkoutLogisticsRoute, setCheckoutLogisticsRoute] = useState<'NG_TO_NG' | 'AFRICA_EXP' | 'US_AIR_CARGO'>(currentUser?.preferredRoute || 'NG_TO_NG');

  // Dynamic user synchronization effect
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setAddress(currentUser.shippingAddress || '');
      setCity(currentUser.city || '');
      setZipCode(currentUser.zipCode || '');
      setCheckoutLogisticsRoute(currentUser.preferredRoute || 'NG_TO_NG');
    }
  }, [currentUser]);

  // Payment mock state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // Coupon Code & Vouchers States
  const [couponInput, setCouponInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'WELCOME20' || code === 'NIGERIA20' || code === 'AFRICA20' || code === 'MEGASALE20' || code === 'OOJA20') {
      setAppliedPromo(code);
      setDiscountPercent(20);
      setPromoError('');
    } else if (code === 'EXCLUSIVE30' || code === 'VIP30') {
      setAppliedPromo(code);
      setDiscountPercent(30);
      setPromoError('');
    } else {
      setPromoError('INVALID PROMOTIONAL CODE');
    }
    setCouponInput('');
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    setDiscountPercent(0);
    setPromoError('');
  };

  const subtotal = cartItems.reduce((currSum, item) => currSum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const shippingCharge = discountedSubtotal >= (storeSettings.shippingThresholdUSD || 150) || subtotal === 0 ? 0 : 15;
  const estimatedTax = parseFloat((discountedSubtotal * 0.08).toFixed(2));
  const grandTotal = discountedSubtotal + shippingCharge + estimatedTax;

  const handleGoToInfo = () => {
    // If cart is empty, do nothing
    if (cartItems.length === 0) return;
    if (!currentUser) {
      setStage('auth_prompt');
    } else {
      setStage('info');
    }
  };

  const handleInfoSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address || !city || !zipCode) {
      alert('Please fill out all shipping details.');
      return;
    }
    setStage('payment');
  };

  const handleProcessPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      alert('Please enter your card payment details.');
      return;
    }

    setIsProcessingCheckout(true);

    // Simulate luxury card payment authorization delay
    setTimeout(() => {
      const orderId = `OJ-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        items: cartItems.map((item) => ({
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.selectedSize,
          image: item.product.images[0]
        })),
        total: grandTotal,
        status: 'processing',
        logisticsRoute: checkoutLogisticsRoute
      };

      onAddOrder(newOrder);
      setCreatedOrderId(orderId);
      setIsProcessingCheckout(false);
      setStage('success');
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark backdrop overlay */}
      <div 
        onClick={() => {
          if (stage !== 'success' && !isProcessingCheckout) {
            onClose();
          }
        }} 
        className="fixed inset-0 bg-[#000000]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Cart Drawer Panel Content */}
      <div 
        id="cart-drawer-panel"
        className="relative w-full max-w-md bg-white h-full border-l-4 border-black flex flex-col justify-between shadow-2xl z-10 animate-slide-left text-black"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b-2 border-black bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            <span className="text-xs font-black uppercase tracking-widest font-sans">
              {stage === 'cart' && `Shopping Bag (${cartItems.length})`}
              {stage === 'auth_prompt' && 'Secure Identification'}
              {stage === 'info' && 'Atelier Checkout'}
              {stage === 'payment' && 'Secure Payment'}
              {stage === 'success' && 'Order Confirmed'}
            </span>
          </div>
          <button
            id="close-cart-drawer"
            onClick={onClose}
            disabled={isProcessingCheckout}
            className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Dynamic Inner views based on checkout step */}
        <div className="flex-1 overflow-y-auto p-5 thin-scrollbar">
          
          {/* STEP 1: Shopping Bag Item list */}
          {stage === 'cart' && (
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 border-2 border-black flex items-center justify-center text-black mb-4 bg-zinc-50">
                    <ShoppingBag className="w-6 h-6 stroke-[2]" />
                  </div>
                  <p className="text-sm font-black uppercase mb-1">Your bag is currently empty</p>
                  <p className="text-xs text-zinc-400 max-w-[220px] mb-6 font-sans">Explore our curated collections of minimal clothing and design pieces.</p>
                  <button
                    id="cart-shop-now-btn"
                    onClick={onClose}
                    className="px-6 py-3 text-xs font-bold tracking-widest uppercase bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 border-b-2 border-black pb-4">
                    <div className="w-16 h-20 bg-zinc-50 border-2 border-black overflow-hidden shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-bold font-sans tracking-tight text-black line-clamp-1 uppercase">{item.product.name}</h4>
                          <span className="text-xs font-black font-sans">{formatPrice(item.product.price)}</span>
                        </div>
                        {item.selectedSize && (
                          <span className="inline-block mt-0.5 text-[9px] font-sans uppercase bg-black text-white px-1.5 py-0.5 font-bold">
                            SIZE: {item.selectedSize}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border-2 border-black bg-white">
                          <button
                            id={`qty-minus-${idx}`}
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <span className="px-2 text-xs font-bold font-sans text-center min-w-[20px]">{item.quantity}</span>
                          <button
                            id={`qty-plus-${idx}`}
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>

                        {/* Trash */}
                        <button
                          id={`cart-remove-${idx}`}
                          onClick={() => onRemoveItem(idx)}
                          className="w-7 h-7 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Coupon section inside shopping bag */}
              {cartItems.length > 0 && (
                <div className="mt-6 border-2 border-dashed border-black p-3.5 bg-zinc-50">
                  <span className="text-[9px] font-black tracking-wider uppercase text-zinc-400 block mb-1.5 font-mono">
                    [ PROMOTION / DISCOUNT PORTFOLIO ]
                  </span>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-black text-white p-2.5 text-xs font-bold border border-black animate-scale rounded-none">
                      <span className="flex items-center gap-1.5 uppercase font-mono tracking-widest text-[9.5px]">
                        ✓ CODE: {appliedPromo} ({discountPercent}% OFF)
                      </span>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="text-[9px] text-zinc-300 hover:text-white uppercase underline cursor-pointer font-black"
                      >
                        [REMOVE]
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        id="cart-promo-input"
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setPromoError('');
                          setCouponInput(e.target.value);
                        }}
                        placeholder="e.g. NIGERIA20, WELCOME20"
                        className="flex-1 px-2.5 py-1.5 text-xs text-black border-2 border-black rounded-none outline-none font-sans uppercase focus:bg-white"
                      />
                      <button
                        id="cart-apply-promo-btn"
                        type="submit"
                        className="px-4 py-1.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer rounded-none"
                      >
                        Apply Code
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <div className="text-[10px] text-[#ea580c] font-black tracking-widest uppercase mt-1.5 font-mono">
                      ⚠ {promoError}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 1.5: Auth prompt for membership checkout */}
          {stage === 'auth_prompt' && (
            <div className="space-y-6 py-4 animate-fade-in text-black font-sans">
              <h3 className="text-xs font-black uppercase tracking-widest text-black mb-2 border-b-2 border-black pb-2">[ SECURED IDENTIFICATION ]</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans mt-2">
                Join our premium roster of collectors to track delivery status, manage order dossier documents, and record lifetime loyalty credentials.
              </p>

              {/* Inline authentication module */}
              <div className="border-2 border-black p-5 space-y-4 bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] font-black uppercase tracking-wider block text-black">[ COLLECTOR SIGN IN ]</span>
                <p className="text-[11px] text-zinc-500 font-sans">
                  Quick-authenticate with our active member dossier credentials:
                </p>
                <div className="p-3 bg-white border border-black/10 font-mono text-[10.5px] space-y-1">
                  <div><span className="text-zinc-400">EMAIL:</span> collector@ooja.com</div>
                  <div><span className="text-zinc-400">STATUS:</span> ACTIVE MEMBERSHIP</div>
                </div>
                <button
                  type="button"
                  id="checkout-auth-signin"
                  onClick={() => {
                    const demoUser: User = {
                      email: 'collector@ooja.com',
                      name: 'Arthur Pendelton',
                      phone: '+1 (555) 754-0925',
                      shippingAddress: '404 Noir Boulevard, Loft 7B',
                      city: 'London',
                      zipCode: 'EC1A 1BB',
                      createdAt: '2026-05-20'
                    };
                    if (onLogin) {
                      onLogin(demoUser);
                    }
                    setStage('info');
                  }}
                  className="w-full py-3 bg-black text-white hover:bg-white hover:text-black border-2 border-black text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Proceed with Member ID
                </button>
              </div>

              <div className="border-2 border-black p-5 space-y-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] font-black uppercase tracking-wider block text-zinc-400">[ REGISTER ANONYMOUS GUEST ]</span>
                <p className="text-[11px] text-zinc-500 font-sans">
                  Checkout immediately without creating an account. You can configure your profile code or register manually later.
                </p>
                <button
                  type="button"
                  id="checkout-auth-guest"
                  onClick={() => {
                    setStage('info');
                  }}
                  className="w-full py-3 bg-white text-black hover:bg-zinc-50 border-2 border-black text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Checkout as Guest
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Checkout shipping details */}
          {stage === 'info' && (
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#000000] mb-2 border-b-2 border-black pb-2">[Shipping Destination]</h3>
              
              <div>
                <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">Full Legal Name</label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Samuel Stark"
                  className="w-full px-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">Contact Email</label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="samuel@studio.com"
                  className="w-full px-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">Billing & Delivery Address</label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="12 Archival Street, Studio 4A"
                  className="w-full px-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="w-full px-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">Zip / Postal Code</label>
                  <input
                    id="checkout-zipcode"
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="10001"
                    className="w-full px-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                  />
                </div>
              </div>

              {/* Checkout Logistics Route dropdown chooser */}
              <div className="border-t-2 border-dashed border-black pt-3">
                <label className="block text-[10px] font-black tracking-wider uppercase text-zinc-900 mb-1 font-mono">
                  [ Select Logistics Cargo Route ]
                </label>
                <select
                  id="checkout-logistics-route-select"
                  value={checkoutLogisticsRoute}
                  onChange={(e) => setCheckoutLogisticsRoute(e.target.value as any)}
                  className="w-full px-2.5 py-2 text-xs border-2 border-black bg-white rounded-none outline-none font-sans font-bold uppercase cursor-pointer text-black"
                >
                  <option value="NG_TO_NG">🇳🇬 Nigeria to Nigeria (Dom Express - GIG)</option>
                  <option value="AFRICA_EXP">🌍 Other African (Regional Air - Ghana, SA, Kenya)</option>
                  <option value="US_AIR_CARGO">🇺🇸 United States (Transatlantic Premium - DHL)</option>
                </select>
                <p className="text-[9px] text-zinc-400 mt-1 uppercase font-mono">
                  Customs clearances and secure cargo flights handled via GIG Courier & DHL Aviation global network.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-[10px] text-zinc-400 font-sans leading-normal">
                  * All physical deliveries undergo climate-neutral wrapping using certified organic and biodegradable cotton composite covers.
                </p>
              </div>
            </form>
          )}

          {/* STEP 3: Payment authorization details */}
          {stage === 'payment' && (
            <form onSubmit={handleProcessPayment} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#000000] mb-2 border-b-2 border-black pb-2">[Credit Authorization]</h3>
              
              <div className="p-4 bg-zinc-50 border-2 border-black mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase">[Delivery Target]</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">{name} — {address}, {city}</div>
                </div>
                <button
                  type="button"
                  id="back-to-info-btn"
                  onClick={() => setStage('info')}
                  className="text-xs font-bold uppercase tracking-widest underline text-black hover:text-zinc-500"
                >
                  Edit
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    id="checkout-card-num"
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                    placeholder="4000 1234 5678 9010"
                    className="w-full pl-10 pr-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                  />
                  <CreditCard className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">Expiry Date</label>
                  <input
                    id="checkout-card-expired"
                    type="text"
                    required
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1">CVV / CVN</label>
                  <input
                    id="checkout-card-cvv"
                    type="password"
                    required
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="***"
                    className="w-full px-3 py-2 text-sm border-2 border-black outline-none font-sans focus:bg-zinc-50"
                  />
                </div>
              </div>

              <div className="p-3 bg-zinc-50 border-2 border-black">
                <div className="text-[10px] text-zinc-500 font-sans tracking-wide leading-normal">
                  SECURED SSL ENCRYPTION — Your details are authorized via our black and white sandbox vault protocol. No real funds are transferred during this exhibition runtime.
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: Checkout Success receipt */}
          {stage === 'success' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-16 h-16 text-black stroke-[1.2] mb-6 animate-scale" />
              <h3 className="text-xl font-black uppercase tracking-widest mb-2 font-sans">Payment Authorized</h3>
              <p className="text-xs text-zinc-400 mb-6 max-w-[280px]">
                Your Order <strong className="text-black">{createdOrderId}</strong> was added to your client profile history. A shipment notice is queued.
              </p>

              <div className="w-full p-4 bg-zinc-50 border-2 border-black text-left font-sans text-[11px] space-y-2 mb-8">
                <div className="flex justify-between border-b border-black pb-1 font-bold">
                  <span className="text-zinc-400">ORDER NO:</span>
                  <span>{createdOrderId}</span>
                </div>
                <div className="flex justify-between border-b border-black pb-1">
                  <span className="text-zinc-400">DELIVER TO:</span>
                  <span className="truncate max-w-[180px] font-bold">{name}</span>
                </div>
                <div className="flex justify-between border-b border-black pb-1">
                  <span className="text-zinc-400">ADDRESS:</span>
                  <span className="truncate max-w-[160px] font-bold">{address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">GRAND TOTAL:</span>
                  <span className="font-black text-black">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                id="cart-new-shopping-cta"
                onClick={() => {
                  setStage('cart');
                  onClose();
                }}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all cursor-pointer"
              >
                Return to Collection
              </button>
            </div>
          )}
        </div>

        {/* Bottom Total / Price recap sticky block */}
        {stage !== 'success' && cartItems.length > 0 && (
          <div className="p-5 border-t-2 border-black bg-zinc-50 text-black">
            {/* Detailed prices checklist */}
            <div className="space-y-1.5 text-xs font-bold text-zinc-500 mb-4">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span className="text-black">{formatPrice(subtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#16a34a] animate-scale">
                  <span>DISCOUNT ({discountPercent}% OFF):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ESTIMATED TAX (8%):</span>
                <span className="text-black">{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING:</span>
                <span className="text-black">
                  {shippingCharge === 0 ? 'COMPLIMENTARY' : formatPrice(shippingCharge)}
                </span>
              </div>
              <div className="flex justify-between border-t-2 border-black pt-2 text-sm font-black text-black font-sans">
                <span>TOTAL:</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Action CTAs according to step */}
            {stage === 'cart' && (
              <button
                id="cart-checkout-continue"
                onClick={handleGoToInfo}
                className="w-full py-4 text-xs font-bold uppercase tracking-widest bg-black text-white border-2 border-black hover:bg-white hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            )}

            {stage === 'info' && (
              <button
                id="checkout-shipping-continue"
                onClick={handleInfoSubmit}
                className="w-full py-4 text-xs font-bold uppercase tracking-widest bg-black text-white border-2 border-black hover:bg-white hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Payment
              </button>
            )}

            {stage === 'payment' && (
              <button
                id="checkout-payment-submit"
                onClick={handleProcessPayment}
                disabled={isProcessingCheckout}
                className="disabled:opacity-50 w-full py-4 text-xs font-bold uppercase tracking-widest bg-black text-white border-2 border-black hover:bg-white hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessingCheckout ? (
                  <span className="animate-pulse">Authorizing Vault...</span>
                ) : (
                  <>
                    <Box className="w-4 h-4 stroke-[2.5]" /> Place Order {formatPrice(grandTotal)}
                  </>
                )}
              </button>
            )}

            {/* Back to previous action */}
            {stage !== 'cart' && (
              <button
                id="checkout-back-btn"
                onClick={() => {
                  if (stage === 'auth_prompt') setStage('cart');
                  if (stage === 'info') {
                    if (!currentUser) {
                      setStage('auth_prompt');
                    } else {
                      setStage('cart');
                    }
                  }
                  if (stage === 'payment') setStage('info');
                }}
                disabled={isProcessingCheckout}
                className="w-full text-center mt-3 text-xs font-bold uppercase tracking-widest text-[#000000] hover:underline transition-all cursor-pointer"
              >
                [Go Back]
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
