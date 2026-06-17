import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Heart, Search, User, FileText, Compass, TreePine, PhoneCall } from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onSearch: (query: string) => void;
  userRole: 'guest' | 'customer' | 'admin';
  setUserRole: (role: 'guest' | 'customer' | 'admin') => void;
  openBulkOrderModal: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cartCount,
  wishlistCount,
  onSearch,
  userRole,
  setUserRole,
  openBulkOrderModal
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'home', label: 'Home', icon: TreePine },
    { id: 'products', label: 'Products', icon: Compass },
    { id: 'blogs', label: 'Educational Blog', icon: FileText },
    { id: 'about', label: 'About Us', icon: TreePine },
    { id: 'contact', label: 'Contact Us', icon: PhoneCall },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setCurrentTab('products');
    setSearchOpen(false);
  };

  return (
    <header id="dtc-header" className="sticky top-0 z-50 bg-[#FFF8E7] border-b border-[#F4B400]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo & Tagline */}
          <div 
            id="brand-logo" 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-12 h-12 rounded-full bg-[#F4B400] flex items-center justify-center shadow-md border-2 border-[#2E7D32]/80 group relative overflow-hidden">
              <span className="text-white font-bold text-xl drop-shadow-sm font-sans">DTC</span>
              <div className="absolute inset-0 bg-[#FFC107]/20 transform translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1B5E20] font-sans tracking-tight">Dheera Trading Company</h1>
              <p className="text-xs text-[#2E7D32] italic font-medium">Care for Planet and People</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    currentTab === item.id 
                      ? 'bg-[#F4B400] text-white shadow-sm' 
                      : 'text-gray-800 hover:bg-[#F4B400]/10 hover:text-[#1B5E20]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div id="nav-actions" className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Direct Bulk Order Trigger button */}
            <button
              id="request-bulk-btn-navbar"
              onClick={openBulkOrderModal}
              className="hidden md:flex items-center bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-300 mr-2"
            >
              Request Bulk Order
            </button>

            {/* Live Predictive Search Trigger */}
            <button
              id="search-trigger-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-[#1B5E20] transition bg-white/60 rounded-full border border-orange-100 hover:shadow-xs"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Indicator */}
            <button
              id="wishlist-link-btn"
              onClick={() => setCurrentTab('dashboard')}
              className="p-2 text-gray-700 hover:text-red-500 transition bg-white/60 rounded-full border border-orange-100 hover:shadow-xs relative"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2E7D32] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Indicator */}
            <button
              id="cart-link-btn"
              onClick={() => setCurrentTab('cart')}
              className="p-2 text-gray-700 hover:text-[#2E7D32] transition bg-white/60 rounded-full border border-orange-100 hover:shadow-xs relative"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F4B400] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Dashboard & Admin Switcher Dropdown */}
            <div className="relative group">
              <button
                id="user-menu-btn"
                onClick={() => setCurrentTab(userRole === 'admin' ? 'admin' : 'dashboard')}
                className="flex items-center space-x-1 p-1.5 sm:p-2 bg-white/70 border border-orange-100 rounded-full text-gray-700 hover:text-[#2E7D32] transition"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-semibold px-1 capitalize">{userRole}</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#F4B400]/20 rounded-xl shadow-lg py-2 hidden group-hover:block z-50">
                <button
                  onClick={() => { 
                    if (userRole === 'admin') {
                      setUserRole('customer');
                    }
                    setCurrentTab('dashboard'); 
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-[#FFF8E7] hover:text-[#1B5E20] transition font-medium"
                >
                  Customer Dashboard
                </button>
                <button
                  onClick={() => { 
                    if (userRole === 'admin') {
                      setCurrentTab('admin'); 
                    } else {
                      setCurrentTab('auth');
                    }
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-[#FFF8E7] hover:text-[#1B5E20] transition font-medium"
                >
                  Admin Panel
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => { setUserRole('guest'); setCurrentTab('auth'); }}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-[#FFF8E7] transition font-medium"
                >
                  Sign Out / Switch Account
                </button>
              </div>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#2E7D32] transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Predictive Search Bar Dropdown */}
        {searchOpen && (
          <div id="predictive-search-container" className="py-3 border-t border-[#F4B400]/10 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="flex space-x-2">
              <input
                type="text"
                placeholder="Search premium boxes, flow frames, extractors, wax sheets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white border border-[#F4B400]/40 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#2E7D32] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1B5E20] transition"
              >
                Search
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#FFF8E7] border-t border-[#F4B400]/10 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                id={`mobile-nav-item-${item.id}`}
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                  currentTab === item.id 
                    ? 'bg-[#F4B400] text-white' 
                    : 'text-gray-800 hover:bg-white/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => {
                openBulkOrderModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold py-3 rounded-xl shadow-md transition"
            >
              Request Bulk Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
