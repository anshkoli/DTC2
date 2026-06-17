import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle, FileText, ArrowLeft, Building2, PhoneCall, Download } from 'lucide-react';
import { OrderItem, Address, Order } from '../types';

interface CheckoutPageProps {
  cartItems: OrderItem[];
  subtotal: number;
  discount: number;
  gstAmount: number;
  total: number;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
  onBack: () => void;
  setCurrentTab: (tab: string) => void;
}

export default function CheckoutPage({
  cartItems,
  subtotal,
  discount,
  gstAmount,
  total,
  onClearCart,
  onPlaceOrder,
  onBack,
  setCurrentTab
}: CheckoutPageProps) {
  
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  // Address entries
  const [name, setName] = useState('John Doe');
  const [phone, setPhone] = useState('+91 7738508276');
  const [street, setStreet] = useState('301 Om Sai Apartment, Sector 12, Kamothe');
  const [city, setCity] = useState('Navi Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [zip, setZip] = useState('410209');
  const [addressType, setAddressType] = useState<'home' | 'work'>('work');
  const [companyName, setCompanyName] = useState('Dawkhar Apiaries');
  const [gstNumber, setGstNumber] = useState('27AAACD9033F1Z1');

  // Payment method option
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'razorpay' | 'cod'>('cod');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const shippingAddress: Address = {
      id: 'adr_' + Math.random().toString(36).substring(2, 9),
      name,
      phone,
      street,
      city,
      state,
      zip,
      type: addressType,
      companyName: companyName || undefined,
      gstNumber: gstNumber || undefined
    };

    const mockOrder: Order = {
      id: 'DTC-ORD-' + Math.floor(100000 + Math.random() * 900000),
      userId: 'u_customer',
      items: [...cartItems],
      subtotal,
      shipping: total > 10000 ? 0 : 500,
      discount,
      gstAmount,
      total,
      address: shippingAddress,
      paymentMethod,
      status: 'processing',
      isPaid: paymentMethod !== 'cod',
      paidAt: paymentMethod !== 'cod' ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    // Save order in state first so we render invoice
    setSuccessOrder(mockOrder);
    
    // Propagate up to central state
    onPlaceOrder(mockOrder);
  };

  const handleDownloadInvoice = () => {
    if (!successOrder) return;
    const txt = `
============================================================
             DHEERA TRADING COMPANY (DTC)
       301 Om Sai Apartment, Sector 12, Kamothe
             Navi Mumbai, Maharashtra, 410209
             dt.exim@gmail.com | +91 7738508276
============================================================
PRODUCT GST TAX INVOICE

Invoice Number: ${successOrder.invoiceNumber}
Date: ${new Date(successOrder.createdAt).toLocaleDateString()}
Order Ref: ${successOrder.id}
Payment Method: ${successOrder.paymentMethod.toUpperCase()}
Status: ${successOrder.isPaid ? 'PAID' : 'PENDING ON DELIVERY'}

------------------------------------------------------------
BILL TO / SHIP TO:
Name: ${successOrder.address.name}
Phone: ${successOrder.address.phone}
Address: ${successOrder.address.street}, ${successOrder.address.city}, ${successOrder.address.state} - ${successOrder.address.zip}
${successOrder.address.companyName ? `Company: ${successOrder.address.companyName}` : ''}
${successOrder.address.gstNumber ? `GSTIN: ${successOrder.address.gstNumber}` : ''}

------------------------------------------------------------
LINE ITEMS:
${successOrder.items.map(i => `* ${i.name}\n  Qty: ${i.quantity} x Price: Rs. ${i.price} = Rs. ${(i.price * i.quantity).toLocaleString()}`).join('\n')}

------------------------------------------------------------
Price Subtotal: Rs. ${successOrder.subtotal.toLocaleString()}
Discount Code:  Rs. -${successOrder.discount.toLocaleString()}
GST Tax (12%):  Rs. ${successOrder.gstAmount.toLocaleString()}
Shipping Guard: Rs. ${successOrder.shipping.toLocaleString()}
------------------------------------------------------------
TOTAL ACCOUNT:  Rs. ${successOrder.total.toLocaleString()}
============================================================
            "Care for Planet and People"
============================================================
`;
    // Create text file blob to download
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DTC-INVOICE-${successOrder.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (successOrder) {
    return (
      <div className="bg-[#FFF8E7]/30 py-16 text-center">
        <div className="max-w-xl mx-auto px-6 text-center space-y-6 bg-white border border-[#2E7D32]/20 p-8 sm:p-10 rounded-3xl shadow-lg">
          
          <div className="w-16 h-16 bg-[#2E7D32]/10 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#1B5E20]">Order Placed Successfully!</h2>
            <p className="text-xs text-gray-600">Your secure order has been processed by Dheera Trading Company.</p>
            <div className="bg-[#FFF8E7] py-2 px-4 rounded-full text-xs font-semibold text-gray-800 inline-block border">
              Order ID: <span className="text-[#1B5E20]">{successOrder.id}</span>
            </div>
          </div>

          {/* Core Invoice Summary display */}
          <div className="border border-orange-100 rounded-2xl p-5 text-left text-xs bg-gray-5/50 space-y-3 font-mono">
            <div className="flex justify-between border-b pb-2 font-bold text-gray-800">
              <span>Invoice: {successOrder.invoiceNumber}</span>
              <span className="text-[#2E7D32]">12% GST Applied</span>
            </div>
            
            <div className="space-y-1 text-gray-600">
              <p><strong>Courier:</strong> Safe apiary transport cargo</p>
              <p><strong>Deliver Address:</strong> {successOrder.address.street}, {successOrder.address.city}, {successOrder.address.state}</p>
              {successOrder.address.gstNumber && <p><strong>Registered GSTIN:</strong> {successOrder.address.gstNumber}</p>}
            </div>

            <div className="border-t pt-2 space-y-1">
              {successOrder.items.map(i => (
                <div key={i.productId} className="flex justify-between">
                  <span>{i.name.substring(0, 30)}... x{i.quantity}</span>
                  <span>Rs. {(i.price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-2 space-y-1 text-gray-600 pt-2 border-dashed">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {successOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (12%):</span>
                <span>Rs. {successOrder.gstAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-extrabold text-gray-900 pt-1 border-t text-sm">
                <span>Paid Total:</span>
                <span>Rs. {successOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleDownloadInvoice}
              className="flex-1 bg-[#F4B400] hover:bg-[#FFC107] text-[#1B5E20] font-bold py-3.5 rounded-xl transition flex items-center justify-center space-x-2 text-xs shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download GST Invoice (.txt)</span>
            </button>
            <button
              onClick={() => {
                onClearCart();
                setCurrentTab('dashboard');
              }}
              className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3.5 rounded-xl transition text-xs"
            >
              Go Track in Dashboard
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E7]/30 py-10 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#1B5E20] hover:text-[#2E7D32] mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Shopping Cart</span>
        </button>

        <h1 className="text-3xl font-extrabold text-[#1B5E20] tracking-tight mb-8">Secure Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* A. LEFT COLUMNS SHIPPINGS AND GST DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b pb-3 flex items-center space-x-2">
                <Truck className="w-5 h-5 text-[#2E7D32]" />
                <span>Apiary Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-bold block mb-1">Street Address / Apiary Site Coordinates</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full text-xs border rounded-lg px-2.5 py-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold block mb-1">PIN ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-1">
                <label className="text-xs font-bold text-gray-800 self-center">Address Classifier:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAddressType('home')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${addressType === 'home' ? 'bg-[#F4B400] text-gray-900' : 'bg-gray-100 text-gray-600'}`}
                  >
                    Residential Site
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddressType('work')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${addressType === 'work' ? 'bg-[#F4B400] text-gray-900' : 'bg-gray-100 text-gray-600'}`}
                  >
                    Commercial Orchard / Apiary
                  </button>
                </div>
              </div>

            </div>

            {/* Optional Company and GST information for tax invoices */}
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b pb-3 flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#2E7D32]" />
                <span>GST Tax Invoice Input (Optional)</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold block mb-1">Company / Apiary Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dawkhar Honey Farms"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold block mb-1">GSTIN Registration Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 27AAACD9033F1Z1"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>
              <p className="text-[10px] text-gray-500 leading-normal">
                Providing your GST number enables a standard tax write-off and generates a detailed DTC invoice compliant with Indian standards.
              </p>
            </div>

            {/* Payment gateways selection panel */}
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b pb-3 flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-[#2E7D32]" />
                <span>Secure Payment Gateways</span>
              </h3>

              <div className="space-y-2">
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 border rounded-xl cursor-pointer transition flex items-center justify-between ${
                    paymentMethod === 'cod' ? 'border-[#F4B400] bg-[#FFF8E7]/40 font-bold' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3 text-xs">
                    <input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={() => {}} className="accent-[#2E7D32]" />
                    <div>
                      <span>Cash On Delivery / Bank Draft</span>
                      <p className="text-[10px] text-gray-500 font-normal">Pay upon receiving bee box cargo site delivery</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border rounded-xl cursor-pointer transition flex items-center justify-between ${
                    paymentMethod === 'upi' ? 'border-[#F4B400] bg-[#FFF8E7]/40 font-bold' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3 text-xs">
                    <input type="radio" value="upi" checked={paymentMethod === 'upi'} onChange={() => {}} className="accent-[#2E7D32]" />
                    <div>
                      <span>Instant UPI Core Transfer (GPay / PhonePe)</span>
                      <p className="text-[10px] text-gray-500 font-normal">Fast, direct digital transaction to dt.exim@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 border rounded-xl cursor-pointer transition flex items-center justify-between ${
                    paymentMethod === 'razorpay' ? 'border-[#F4B400] bg-[#FFF8E7]/40 font-bold' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3 text-xs">
                    <input type="radio" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => {}} className="accent-[#2E7D32]" />
                    <div>
                      <span>Razorpay secure checkout</span>
                      <p className="text-[10px] text-gray-500 font-normal">Supports Cards, Netbanking and EMI integrations</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* B. RIGHT ORDER BREAKDOWN */}
          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b pb-3 uppercase tracking-wide">Secure Order Review</h3>
              
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center text-xs">
                    <div className="text-left">
                      <span className="font-bold text-gray-800 block line-clamp-1">{item.name}</span>
                      <span className="text-[10px] text-gray-500">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#1B5E20]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Price Subtotal:</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Promotional Discount:</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Taxes (12%):</span>
                  <span>Rs. {gstAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-baseline">
                <span className="text-xs font-bold text-gray-900">Total Payable Amount:</span>
                <span className="text-xl font-black text-[#1B5E20]">Rs. {total.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-bold h-11 rounded-lg transition"
              >
                Place Secure Order & Invoice
              </button>

            </div>

            {/* Support hotline contact helper widget */}
            <div className="bg-white p-5 border rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-gray-900 flex items-center space-x-1.5">
                <PhoneCall className="w-4 h-4 text-[#2E7D32]" />
                <span>Direct Customer Hotline</span>
              </h4>
              <p className="text-[10px] text-gray-600 leading-normal">
                Facing payment grid locks? Connect securely with Yogesh Dawkhar directly at <strong>+91 7738508276</strong> or email <strong>dt.exim@gmail.com</strong>.
              </p>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
