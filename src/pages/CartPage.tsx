import React, { useState } from 'react';
import { ShoppingBag, X, ArrowRight, ShieldCheck, Ticket, RotateCw } from 'lucide-react';
import { OrderItem, Product, Coupon } from '../types';
import { OptimizedImage } from '../components/OptimizedImage';

interface CartPageProps {
  cartItems: OrderItem[];
  allCoupons: Coupon[];
  onUpdateQty: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  currentCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onCheckout: () => void;
  setCurrentTab: (tab: string) => void;
}

export default function CartPage({
  cartItems,
  allCoupons,
  onUpdateQty,
  onRemoveItem,
  currentCoupon,
  onApplyCoupon,
  onCheckout,
  setCurrentTab
}: CartPageProps) {
  
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponCodeError] = useState('');

  // Settle calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  let discountAmount = 0;
  if (currentCoupon && subtotal >= currentCoupon.minOrderValue) {
    if (currentCoupon.discountType === 'percentage') {
      discountAmount = (subtotal * currentCoupon.value) / 100;
    } else {
      discountAmount = currentCoupon.value;
    }
  }

  // GST calculation (standard 12% on apiculture items like honey extractors and stands)
  const gstAmount = Math.round((subtotal - discountAmount) * 0.12);
  const coreShipping = subtotal > 10000 ? 0 : 500; // Free shipping for large agricultural orders
  const total = subtotal - discountAmount + gstAmount + coreShipping;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponCodeError('');
    if (!couponCodeInput) return;

    const matched = allCoupons.find(c => c.code.toUpperCase() === couponCodeInput.toUpperCase().trim());
    if (matched) {
      if (subtotal < matched.minOrderValue) {
        setCouponCodeError(`Minimum order value is Rs. ${matched.minOrderValue} to apply this code.`);
      } else {
        onApplyCoupon(matched);
      }
    } else {
      setCouponCodeError('Invalid Coupon Code! Please try SAVEBEES or DTCFARMER.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FFF8E7]/30 min-h-[60vh] py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center space-y-5 bg-white border border-orange-100 p-8 rounded-3xl shadow-sm">
          <ShoppingBag className="w-16 h-16 text-[#F4B400] mx-auto animate-pulse" />
          <h2 className="text-xl font-bold text-gray-950">Your Cart is Currently Empty</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Support pollinators and sustainable keep by adding premium hive boxes, stainless extractors, or safety suits from our list.
          </p>
          <button
            onClick={() => setCurrentTab('products')}
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold py-3 rounded-lg transition"
          >
            Explore Beekeeping Gear
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E7]/30 py-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-extrabold text-[#1B5E20] tracking-tight mb-8">My Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. LEFT COLUMN PRODUCTS ITEMS LIST */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border p-4 sm:p-6 rounded-3xl shadow-xs space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex flex-col sm:flex-row items-center sm:justify-between border-b pb-4 border-gray-100 gap-4">
                  <div className="flex items-center space-x-4 w-full text-left">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border shrink-0">
                      <OptimizedImage src={item.image} alt={item.name} className="w-full h-full object-cover" width={100} placeholder="shimmer" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                      <span className="text-[10px] text-gray-500 font-semibold block">Unit cost: Rs. {item.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                    
                    {/* Qty Adjust controls */}
                    <div className="flex items-center border rounded-md overflow-hidden bg-gray-5/50 w-24 justify-between h-8 shrink-0">
                      <button
                        onClick={() => onUpdateQty(item.productId, Math.max(1, item.quantity - 1))}
                        className="px-2 text-xs font-bold text-gray-700 hover:bg-gray-100 h-full border-r"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.productId, item.quantity + 1)}
                        className="px-2 text-xs font-bold text-gray-700 hover:bg-gray-100 h-full border-l"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right w-24 shrink-0">
                      <span className="text-xs font-bold text-[#1B5E20] block">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.productId)}
                      className="text-gray-400 hover:text-red-500 transition p-1"
                      title="Remove product"
                    >
                      <X className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* Standard Promo listing alerts */}
            <div className="bg-[#FFF8E7] rounded-2xl p-4 border border-orange-100 text-xs text-gray-700 space-y-1">
              <span className="font-bold text-[#1B5E20] block mb-1">💡 Available Beekeeping Promo Vouchers:</span>
              <p>• <strong>SAVEBEES</strong> — Save 10% on beekeeping gear above Rs. 2,000</p>
              <p>• <strong>DTCFARMER</strong> — Flat Rs. 1,500 off on large bulk orders above Rs. 15,000</p>
            </div>

          </div>

          {/* 2. RIGHT COLUMN TOTAL ESTIMATES */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b pb-3 uppercase tracking-wide">Order Summary</h3>
              
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Price Subtotal:</span>
                  <span className="font-bold text-gray-950">Rs. {subtotal.toLocaleString()}</span>
                </div>

                {currentCoupon && (
                  <div className="flex justify-between text-red-600">
                    <span>Voucher Applied ({currentCoupon.code}):</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST Taxes (12%):</span>
                  <span className="font-bold text-gray-950">Rs. {gstAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Transport Shipping Guard:</span>
                  <span>{coreShipping === 0 ? <strong className="text-[#2E7D32]">FREE (Above 10k)</strong> : `Rs. ${coreShipping}`}</span>
                </div>
              </div>

              {/* Promo Coupon Entry field Form */}
              <div className="border-t border-b py-4 space-y-2">
                {currentCoupon ? (
                  <div className="bg-[#2E7D32]/10 p-3 rounded-lg flex items-center justify-between text-[#1B5E20] text-xs">
                    <div>
                      <span className="font-bold block">Coupon Applied !</span>
                      <span className="text-[10px] text-gray-600">{currentCoupon.description}</span>
                    </div>
                    <button
                      onClick={() => onApplyCoupon(null)}
                      className="text-[10px] underline font-bold hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER COUPON CODE"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 text-xs border rounded-lg px-2.5 py-2 uppercase placeholder:text-gray-300 focus:outline-[#2E7D32]"
                    />
                    <button
                      type="submit"
                      className="bg-gray-100 border text-gray-900 hover:bg-[#F4B400] text-xs font-bold px-4 py-2 rounded-lg transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[10px] text-red-600 font-medium">{couponError}</p>}
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-bold text-gray-900">Estimated Total:</span>
                <span className="text-2xl font-black text-[#1B5E20]">Rs. {total.toLocaleString()}</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-bold h-11 rounded-lg transition flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>Proceed To Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

            {/* Security PCI credentials */}
            <div className="bg-white p-4 border rounded-2xl flex items-center space-x-3 text-xs text-gray-600">
              <ShieldCheck className="w-6 h-6 text-[#2E7D32] shrink-0" />
              <span>
                PCI-DSS Compliant gateway. Direct UPI, Razorpay card processing and paper invoice downloads fully enabled.
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
