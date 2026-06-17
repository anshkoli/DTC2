import React, { useState } from 'react';
import { Mail, Phone, MapPin, Shield, Star, Heart, FileCheck, Award } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleWhatsAppChat = () => {
    const textStr = encodeURIComponent("Hello DTC! I'm interested in your sustainable beekeeping solutions and hives.");
    window.open(`https://wa.me/917738508276?text=${textStr}`, '_blank');
  };

  return (
    <footer id="dtc-footer" className="bg-[#1B5E20] text-gray-100 relative overflow-hidden">
      
      {/* Decorative top organic design curve */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-[#F4B400]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Presentation & Director Credential */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-[#F4B400] flex items-center justify-center font-bold text-white text-lg">
                DTC
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white block">Dheera Trading Company</span>
                <span className="text-xs text-[#FFF8E7]/80 block font-medium">Director: Yogesh Dawkhar</span>
              </div>
            </div>
            <p className="text-xs text-[#FFF8E7]/70 leading-relaxed">
              Leading developer and exporter of premium beekeeping hives, automatic honey tools, and organic agricultural supplies. Devoted to pollinator health and secure rural farmer incomes.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-[#FFC107]">
              <span>Motto:</span>
              <span className="bg-white/10 px-2 py-0.5 rounded-md italic">"Care for Planet and People"</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-[#F4B400] tracking-semibold uppercase mb-4">Product Explorer</h3>
            <ul className="space-y-2.5 text-xs text-gray-200">
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-[#FFC107] transition text-left">
                  Flow Beehive Boxes
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-[#FFC107] transition text-left">
                  Observation & Langstroth Hives
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-[#FFC107] transition text-left">
                  SS Honey Extractors
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('products')} className="hover:text-[#FFC107] transition text-left">
                  Pure Organic Wax Sheets
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('blogs')} className="hover:text-[#FFC107] transition text-left">
                  Beekeeping Guides & Blogs
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-[#F4B400] tracking-semibold uppercase mb-4">Corporate Office</h3>
            <ul className="space-y-3.5 text-xs text-gray-200">
              <li className="flex items-start">
                <MapPin className="w-4.5 h-4.5 text-[#FFC107] shrink-0 mr-2.5 mt-0.5" />
                <span>
                  301 Om Sai Apartment,<br />
                  Plot No. 71, Sector 12,<br />
                  Kamothe, Navi Mumbai - 410209
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-[#FFC107] shrink-0 mr-2.5" />
                <a href="tel:+917738508276" className="hover:text-[#FFC107] transition">
                  +91 7738508276
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-[#FFC107] shrink-0 mr-2.5" />
                <a href="mailto:dt.exim@gmail.com" className="hover:text-[#FFC107] transition">
                  dt.exim@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Farmers/Conservation Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#F4B400] tracking-semibold uppercase mb-1">Bee Protection Letter</h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              Subscribe to stay updated with sustainable agriculture guides, catalog additions, and seasonal honey-harvesting schedules.
            </p>
            {subscribed ? (
              <div className="bg-[#2E7D32] border border-[#F4B400]/40 px-3 py-2 text-xs rounded-lg text-white font-medium text-center">
                🎉 Subscribed! Welcome to DTC Honey Network.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Farmer or Beekeeper Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white text-gray-900 rounded-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#F4B400] hover:bg-[#FFC107] text-[#1B5E20] text-xs font-bold px-3 py-2 rounded-lg transition"
                >
                  Join
                </button>
              </form>
            )}

            {/* Direct Instant WhatsApp Floating Widget anchor */}
            <div className="pt-2">
              <button
                onClick={handleWhatsAppChat}
                className="w-full flex items-center justify-center space-x-2 bg-[#2E7D32]/80 hover:bg-[#25D366] text-white text-xs font-bold py-2 px-3 border border-white/20 rounded-lg transition-transform duration-300"
              >
                <span>💬 Quick WhatsApp Support</span>
              </button>
            </div>
          </div>

        </div>

        {/* Quality, Security & Director Credentials badge grid */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/5">
            <Shield className="w-5 h-5 text-[#F4B400]" />
            <div className="text-[10px] text-gray-300">
              <span className="font-bold text-white block">SSL Secure Server</span>
              <span>PCI-DSS checkout guards</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/5">
            <FileCheck className="w-5 h-5 text-[#F4B400]" />
            <div className="text-[10px] text-gray-300">
              <span className="font-bold text-white block">Checked Quality Control</span>
              <span>Checked by Expert QC Team</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/5">
            <Award className="w-5 h-5 text-[#F4B400]" />
            <div className="text-[10px] text-gray-300">
              <span className="font-bold text-white block">100% Sustainable Wood</span>
              <span>Raw eco-system friendly materials</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/5">
            <Star className="w-5 h-5 text-[#F4B400]" />
            <div className="text-[10px] text-gray-300">
              <span className="font-bold text-white block">Apis Mellifera & Cerena Ready</span>
              <span>Optimized sizing guides</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits copyright */}
        <div className="mt-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-300">
          <p>© {new Date().getFullYear()} Dheera Trading Company (DTC). All rights reserved.</p>
          <p className="mt-2 sm:mt-0 italic">Designed with Care for Planet and People • kamothe, Navi Mumbai</p>
        </div>

      </div>
    </footer>
  );
}
