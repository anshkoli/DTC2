import React from 'react';
import { User, ClipboardList, MapPin, Settings, Shield, Award, Mail, Phone, Calendar, Download } from 'lucide-react';
import { Order, Address } from '../types';

interface DashboardPageProps {
  orders: Order[];
  onTrackOrder: (order: Order) => void;
  setCurrentTab: (tab: string) => void;
}

export default function DashboardPage({ orders, onTrackOrder, setCurrentTab }: DashboardPageProps) {
  
  // Simulated customer profile details
  const profileInfo = {
    name: 'John Doe',
    email: 'farmer.john@gmail.com',
    phone: '+91 7738508276',
    apiaries: '2 Sites (Satara & Kamothe)',
    registered: 'June 10, 2026'
  };

  const savedAddresses: Address[] = [
    {
      id: 'ad1',
      name: 'John Doe',
      phone: '+91 7738508276',
      street: '301 Om Sai Apartment, Sector 12, Kamothe',
      city: 'Navi Mumbai',
      state: 'Maharashtra',
      zip: '410209',
      type: 'work',
      companyName: 'Dawkhar Farms',
      gstNumber: '27AAACD9033F1Z1'
    }
  ];

  const handleDownloadInvoice = (order: Order) => {
    const txt = `
============================================================
             DHEERA TRADING COMPANY (DTC)
       301 Om Sai Apartment, Sector 12, Kamothe
             Navi Mumbai, Maharashtra, 410209
             dt.exim@gmail.com | +91 7738508276
============================================================
PRODUCT GST TAX INVOICE

Invoice Number: ${order.invoiceNumber || 'INV-2026-DEFAULT'}
Date: ${new Date(order.createdAt).toLocaleDateString()}
Order Ref: ${order.id}
Payment Method: ${order.paymentMethod.toUpperCase()}
Status: ${order.isPaid ? 'PAID' : 'PENDING'}

------------------------------------------------------------
BILL TO:
Name: ${order.address.name}
Phone: ${order.address.phone}
Address: ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.zip}
${order.address.companyName ? `Company: ${order.address.companyName}` : ''}
${order.address.gstNumber ? `GSTIN: ${order.address.gstNumber}` : ''}

------------------------------------------------------------
LINE ITEMS:
${order.items.map(i => `* ${i.name}\n  Qty: ${i.quantity} x Price: Rs. ${i.price} = Rs. ${(i.price * i.quantity).toLocaleString()}`).join('\n')}

------------------------------------------------------------
Price Subtotal: Rs. ${order.subtotal.toLocaleString()}
Discount:       Rs. -${order.discount.toLocaleString()}
GST Tax (12%):  Rs. ${order.gstAmount.toLocaleString()}
Shipping:       Rs. ${order.shipping.toLocaleString()}
------------------------------------------------------------
TOTAL ACCOUNT:  Rs. ${order.total.toLocaleString()}
============================================================
            "Care for Planet and People"
============================================================
`;
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DTC-INVOICE-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-[#FFF8E7]/30 py-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-extrabold text-[#1B5E20] tracking-tight mb-8">My Beekeeping Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* A. LEFT MENU ACTIONS */}
          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-xs flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center font-bold text-xl mb-3">
                JD
              </div>
              <h3 className="font-bold text-base text-gray-900">{profileInfo.name}</h3>
              <span className="text-[10px] text-[#2E7D32] font-semibold bg-[#2E7D32]/5 px-2.5 py-0.5 rounded-full mt-1 border border-[#2E7D32]/25">
                DTC Member
              </span>
              
              <div className="w-full border-t border-gray-100 my-4 pt-4 text-left space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span className="truncate">{profileInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4 text-[#2E7D32]" />
                  <span>{profileInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-[#2E7D32]" />
                  <span>Joined {profileInfo.registered}</span>
                </div>
              </div>
            </div>

            {/* Platform rules reminder */}
            <div className="bg-[#1B5E20] text-amber-50 p-5 rounded-2xl space-y-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#FFC107] shrink-0" />
                <h4 className="font-bold text-xs">Sustainability Credit Rating</h4>
              </div>
              <p className="text-[10px] text-gray-100 leading-normal">
                Congratulations! Your pollinator rating is active on Dheera Trading Company networks. Keep check scores high, and get customized bulk order priority discounts.
              </p>
            </div>

          </div>

          {/* B. RIGHT VIEWS CONTENT */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* 1. Orders Listing */}
            <div className="bg-white border p-6 rounded-3xl shadow-xs text-left">
              <h3 className="text-base font-bold text-gray-900 border-b pb-3 mb-4 flex items-center space-x-2">
                <ClipboardList className="w-5 h-5 text-[#2E7D32]" />
                <span>My Active Shipments & Orders</span>
              </h3>

              {orders.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <p className="text-xs text-gray-500">You have not placed any beekeeping or hive orders yet.</p>
                  <button
                    onClick={() => setCurrentTab('products')}
                    className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-[11px] font-bold px-4 py-2 rounded-lg transition"
                  >
                    Explore Honey Hives Directory
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="border p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-5/50 border-gray-100">
                      <div>
                        <div className="flex items-center space-x-2.5">
                          <span className="text-xs font-bold text-gray-900">{ord.id}</span>
                          <span className="text-[10px] text-gray-500">{new Date(ord.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-[11px] text-gray-600 mt-1 space-x-3">
                          <span>Items: {ord.items.length}</span>
                          <span>•</span>
                          <span className="font-semibold text-gray-950">Total: Rs. {ord.total.toLocaleString()}</span>
                        </div>
                        <div className="mt-2.5 flex items-center space-x-2">
                          <span className="text-[10px] font-bold text-white bg-[#2E7D32] px-2.5 py-0.5 rounded-full capitalize">
                            Status: {ord.status}
                          </span>
                          <span className={`text-[10px] font-bold px-2 rounded-md ${ord.isPaid ? 'bg-amber-100 text-[#1B5E20]' : 'bg-gray-100 text-gray-500'}`}>
                            {ord.isPaid ? 'Paid' : 'Unpaid COD'}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
                        <button
                          onClick={() => handleDownloadInvoice(ord)}
                          className="flex items-center space-x-1.5 border border-[#2E7D32]/40 text-[#2E7D32] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#FFF8E7] transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Invoice (.txt)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Addresses Management */}
            <div className="bg-white border p-6 rounded-3xl shadow-xs text-left">
              <h3 className="text-base font-bold text-gray-900 border-b pb-3 mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#2E7D32]" />
                <span>My Saved Sites & Registered GSTIN</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedAddresses.map((adr) => (
                  <div key={adr.id} className="p-4 border rounded-xl bg-orange-50/20 border-orange-100 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-900">{adr.name}</span>
                      <span className="bg-[#2E7D32]/10 text-[#1B5E20] px-2 py-0.5 rounded-md uppercase text-[9px] block">
                        {adr.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-normal">
                      {adr.street}, {adr.city}, {adr.state} - {adr.zip}
                    </p>
                    <div className="text-[10px] text-gray-500 border-t pt-2 space-y-1">
                      {adr.companyName && <p><strong>Company:</strong> {adr.companyName}</p>}
                      {adr.gstNumber && <p><strong>Registered GSTIN:</strong> {adr.gstNumber}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
