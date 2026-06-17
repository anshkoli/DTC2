import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bulk Order Inquiry');
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && text) {
      setSent(true);
      setName('');
      setEmail('');
      setPhone('');
      setText('');
    }
  };

  const handleWhatsAppInstant = () => {
    const textStr = encodeURIComponent("Hello Yogesh Dawkhar! I am interested in custom hive structures or bulk extractors.");
    window.open(`https://wa.me/917738508276?text=${textStr}`, '_blank');
  };

  return (
    <div className="bg-[#FFF8E7]/30 py-12 lg:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-14">
          <span className="p-1 px-3 bg-[#F4B400]/20 text-[#1B5E20] border border-[#F4B400]/40 rounded-full font-bold uppercase text-[10px] tracking-widest tracking-normal">
            DTC Customer Center
          </span>
          <h1 className="text-4xl font-extrabold text-[#1B5E20] tracking-tight">Connect with Dheera Trading Company</h1>
          <p className="text-sm text-gray-700 max-w-xl mx-auto leading-relaxed italic">
            Connecting farmers, agricultural institutions, and backyard apiculturists with expert bulk honey solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          
          {/* A. LEFT COLUMN COMPANY OFFICE LOCATOR */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-gray-950 border-b pb-3 uppercase tracking-wide">DTC Office</h3>
              
              <ul className="space-y-4 text-xs text-gray-700">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#2E7D32] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-950 block">Physical Headquarters</span>
                    <p className="mt-0.5 text-gray-600">
                      301 Om Sai Apartment, Plot No. 71,<br />
                      Sector 12, Kamothe, Navi Mumbai - 410209
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-[#2E7D32] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-950 block">Corporate Phone Line</span>
                    <a href="tel:+917738508276" className="mt-0.5 block text-gray-600 hover:text-[#2E7D32] font-semibold">
                      +91 7738508276
                    </a>
                  </div>
                </li>

                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-[#2E7D32] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-950 block">Export Email address</span>
                    <a href="mailto:dt.exim@gmail.com" className="mt-0.5 block text-gray-600 hover:text-[#2E7D32]">
                      dt.exim@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-[#2E7D32] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-950 block">Active Service Hours</span>
                    <span className="mt-0.5 block text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM IST</span>
                  </div>
                </li>
              </ul>

            </div>

            {/* Direct Instant WhatsApp Floating Widget */}
            <div className="bg-[#2E7D32] text-amber-50 p-6 rounded-3xl space-y-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#FFC107] shrink-0" />
                <h4 className="font-bold text-xs uppercase tracking-wide">WhatsApp Support Chat</h4>
              </div>
              <p className="text-[10px] text-gray-100 leading-relaxed">
                Connect directly with Director <strong>Yogesh Dawkhar</strong> to lock customization blueprints or draft bulk honey extractor pricing quotes in under 10 minutes.
              </p>
              <button
                onClick={handleWhatsAppInstant}
                className="w-full bg-[#FFC107] hover:bg-[#FFD54F] text-[#1B5E20] text-xs font-bold py-2.5 rounded-lg transition"
              >
                Launch Mobile WhatsApp Chat
              </button>
            </div>

          </div>

          {/* B. MIDDLE COLUMN MESSAGE FORM */}
          <div className="lg:col-span-2">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-100 shadow-sm text-left">
              <h3 className="text-base font-bold text-gray-950 border-b pb-3 mb-6 uppercase tracking-wide">Direct message / bulk Order Inquiry</h3>

              {sent ? (
                <div className="bg-[#2E7D32]/10 border border-[#2E7D32]/30 p-6 rounded-2xl text-center space-y-3 text-[#1B5E20]">
                  <Send className="w-10 h-10 mx-auto animate-bounce text-[#2E7D32]" />
                  <h4 className="font-bold text-base">Inquiry Saved Successfully!</h4>
                  <p className="text-xs text-gray-700 max-w-sm mx-auto">
                    Thank you. We have saved your beekeeping interest. Director Yogesh Dawkhar or Dheera Trading staff will reach back shortly!
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold py-2 px-5 rounded-lg transition"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 font-sans">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-500 font-bold block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Dhangar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 font-bold block mb-1">Email Coordinates</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. farmer@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-500 font-bold block mb-1">Active Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 9999999999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 font-bold block mb-1">Inquiry Core Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full text-xs border rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                      >
                        <option value="Bulk Order Inquiry">Bulk Order / Volume discount</option>
                        <option value="Custom Box Dimensions">Custom Hive box sizes request</option>
                        <option value="Education Training">Educational apiary setups for institutions</option>
                        <option value="Other">Standard customer inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 font-bold block mb-1">Detail inquiry text (mention total frames and location)</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="e.g. Interested in ordering 10 units of the 30 Frames Langstroth beehive box with stands for transit near Satara district..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full text-xs border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold py-3 rounded-lg transition"
                  >
                    Submit Secure message
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>

        {/* C. DECORATIVE OFFICE COORDS MAP BLOCK */}
        <div className="bg-white border p-6 rounded-3xl shadow-sm text-left">
          <h3 className="text-base font-bold text-gray-950 border-b pb-3 mb-4">Navi Mumbai Headquarters Map Representative</h3>
          
          <div className="bg-gradient-to-r from-orange-50 to-[#FFF8E7] h-64 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-dashed border-[#F4B400]/40">
            <div className="absolute inset-0 opacity-15">
              {/* Abstract decorative layout grid */}
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Visual locator coordinates point pin */}
            <div className="relative z-10 text-center space-y-2">
              <div className="w-12 h-12 bg-[#1B5E20] text-[#FFC107] rounded-full flex items-center justify-center mx-auto shadow-md border-2 border-white animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-gray-900">301 Om Sai Apartment, Sector 12</h4>
              <p className="text-[10px] text-gray-600 max-w-xs mx-auto">Plot No. 71, Kamothe, Navi Mumbai - Maharashtra, 410209 India.</p>
              <span className="text-[9px] bg-[#2E7D32]/10 text-[#1B5E20] px-2.5 py-0.5 rounded-full font-bold">GST registration address</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
