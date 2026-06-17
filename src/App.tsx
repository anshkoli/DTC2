import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page components imports
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AdminPage from './pages/AdminPage';
import LoginSignupPage from './pages/LoginSignupPage';

// Seed & initial data lists local backups supporting offline-first loading robustly
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COUPONS, EDUCATIONAL_BLOGS } from './data/initialRecords';
import { Product, Category, Coupon, BlogItem, Review, AuditLog, Order, OrderItem } from './types';
import { Sparkles, CheckCircle, X, ShieldCheck, Mail, PhoneCall } from 'lucide-react';

export default function App() {
  
  // Navigation Tabs router
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Core Entity States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Cart & Wishlist states
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]); // product ids
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Authentication states
  const [userRole, setUserRole] = useState<'guest' | 'customer' | 'admin'>('customer');

  // Multi-species search keyword proxy
  const [searchFilterKeyword, setSearchFilterKeyword] = useState<string>('');

  // Bulk Inquiry Modal State
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkProductNameStr, setBulkProductNameStr] = useState('');
  const [bulkName, setBulkName] = useState('Anand Dhangar');
  const [bulkPhone, setBulkPhone] = useState('+91 7738508276');
  const [bulkEmail, setBulkEmail] = useState('anand.orchards@gmail.com');
  const [bulkQty, setBulkQty] = useState('25');
  const [bulkCustomNotes, setBulkCustomNotes] = useState('Need customizable multi-tier pine boxes suited for Cerena Indica hives.');
  const [bulkInquirySubmitted, setBulkInquirySubmitted] = useState(false);

  // 1. Core API Loaders
  const refreshAllData = async () => {
    try {
      // Products
      const pRes = await fetch('/api/products');
      if (pRes.ok) {
        const pData = await pRes.json();
        setProducts(pData);
      } else {
        setProducts(INITIAL_PRODUCTS);
      }

      // Blogs
      const bRes = await fetch('/api/blogs');
      if (bRes.ok) {
        const bData = await bRes.json();
        setBlogs(bData);
      } else {
        setBlogs(EDUCATIONAL_BLOGS);
      }

      // Reviews
      const rRes = await fetch('/api/reviews');
      if (rRes.ok) {
        setReviews(await rRes.json());
      }

      // Audit logs
      const lRes = await fetch('/api/audit-logs');
      if (lRes.ok) {
        setAuditLogs(await lRes.json());
      }

      // Orders
      const oRes = await fetch('/api/orders');
      if (oRes.ok) {
        setOrders(await oRes.json());
      }

      // Coupons
      const cRes = await fetch('/api/coupons');
      if (cRes.ok) {
        setCoupons(await cRes.json());
      }

    } catch (err) {
      console.warn("API Server is compiling/booting. Loading initial seed records local fallback:", err);
      // Fallback local mounts
      setProducts(INITIAL_PRODUCTS);
      setBlogs(EDUCATIONAL_BLOGS);
      setCoupons(INITIAL_COUPONS);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // Sync cart counter
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Subtotal calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (cartSubtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }
  const cartGst = Math.round((cartSubtotal - discountAmount) * 0.12);
  const cartShipping = cartSubtotal > 10000 || cartSubtotal === 0 ? 0 : 500;
  const cartTotal = cartSubtotal - discountAmount + cartGst + cartShipping;

  // 2. Shopping Cart Actions
  const handleAddToCart = (product: Product, qty: number) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.productId === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.productId === product.id ? { ...item, quantity: Math.min(product.stock, item.quantity + qty) } : item
        );
      } else {
        return [...prevItems, { productId: product.id, name: product.name, price: product.price, quantity: qty, image: product.images[0] }];
      }
    });
    // Redirect to view
    setCurrentTab('cart');
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    setCartItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  // 3. Order Placements Server Sync
  const handlePlaceOrder = async (placedOrder: Order) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(placedOrder)
      });

      if (response.ok) {
        // Refresh live DB entries
        refreshAllData();
      } else {
        // Offline-first model: Save directly locally
        setOrders(prev => [placedOrder, ...prev]);
        setProducts(prevProducts => {
          return prevProducts.map(p => {
            const itemInOrder = placedOrder.items.find(item => item.productId === p.id);
            if (itemInOrder) {
              return { ...p, stock: Math.max(0, p.stock - itemInOrder.quantity) };
            }
            return p;
          });
        });
      }
    } catch (err) {
      console.warn("Failed to POST order to server database. Retaining locally:", err);
      setOrders(prev => [placedOrder, ...prev]);
    }
  };

  // 4. Submit Ratings / Reviews
  const handleSubmitReview = async (reviewObj: { productId: string; userName: string; rating: number; comment: string }) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewObj)
      });
      if (response.ok) {
        refreshAllData();
      } else {
        // Fallback local push
        const fallbackRev: Review = {
          id: 'fb_r_' + Math.random().toString(),
          productId: reviewObj.productId,
          userId: 'u_anonymous',
          userName: reviewObj.userName,
          rating: reviewObj.rating,
          comment: reviewObj.comment,
          date: new Date().toISOString().split('T')[0],
          approved: true
        };
        setReviews(prev => [fallbackRev, ...prev]);
      }
    } catch (error) {
      console.error("HTTP Review POST fail. Processing locally:", error);
    }
  };

  // 5. Admin Panel inventory modifiers
  const handleAdminAddNewProduct = async (prod: Product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...prod, author: `Admin (Yogesh Dawkhar)` })
      });
      if (response.ok) {
        refreshAllData();
      } else {
        setProducts(prev => [prod, ...prev]);
      }
    } catch (err) {
      setProducts(prev => [prod, ...prev]);
    }
  };

  const handleAdminUpdateProduct = async (pId: string, updatedProd: Product) => {
    try {
      const response = await fetch(`/api/products/${pId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProd)
      });
      if (response.ok) {
        refreshAllData();
      } else {
        setProducts(prev => prev.map(p => p.id === pId ? updatedProd : p));
      }
    } catch (err) {
      setProducts(prev => prev.map(p => p.id === pId ? updatedProd : p));
    }
  };

  const handleAdminDeleteProduct = async (pId: string) => {
    try {
      const response = await fetch(`/api/products/${pId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        refreshAllData();
      } else {
        setProducts(prev => prev.filter(p => p.id !== pId));
      }
    } catch (err) {
      setProducts(prev => prev.filter(p => p.id !== pId));
    }
  };

  // 6. Global Bulk Inquiry submission handle
  const handleBulkInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bulkName && bulkPhone && bulkQty) {
      setBulkInquirySubmitted(true);
      setTimeout(() => {
        setIsBulkModalOpen(false);
        setBulkInquirySubmitted(false);
        setBulkProductNameStr('');
      }, 3500);
    }
  };

  // Helper selectors
  const handleNavbarSearch = (query: string) => {
    setSearchFilterKeyword(query);
  };

  const handleOpenBulkCustom = (pName: string) => {
    setBulkProductNameStr(pName);
    setIsBulkModalOpen(true);
  };

  // Intercepting Products select for Details View
  const handleSelectProductFromList = (p: Product) => {
    setSelectedProduct(p);
    setCurrentTab('product-details');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between">
      
      {/* Dynamic Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tabId) => {
          setCurrentTab(tabId);
          setSelectedProduct(null); // Reset detail screen state on tab pivot
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onSearch={handleNavbarSearch}
        userRole={userRole}
        setUserRole={setUserRole}
        openBulkOrderModal={() => setIsBulkModalOpen(true)}
      />

      {/* Main Routed Canvas Page Frame */}
      <main className="flex-grow">
        
        {currentTab === 'home' && (
          <Home
            categories={categories}
            products={products}
            setCurrentTab={setCurrentTab}
            setSelectedCategory={setSelectedCategory}
            addToCart={handleAddToCart}
            toggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            openBulkOrderModal={() => setIsBulkModalOpen(true)}
          />
        )}

        {currentTab === 'about' && <AboutUs />}

        {currentTab === 'products' && (
          <ProductsPage
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={handleSelectProductFromList}
            addToCart={handleAddToCart}
            toggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        )}

        {currentTab === 'product-details' && selectedProduct && (
          <ProductDetailsPage
            product={selectedProduct}
            allProducts={products}
            currentReviews={reviews}
            onBack={() => {
              setCurrentTab('products');
              setSelectedProduct(null);
            }}
            addToCart={handleAddToCart}
            toggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onSubmitReview={handleSubmitReview}
            openBulkOrderModalCustom={handleOpenBulkCustom}
            onSelectProduct={handleSelectProductFromList}
          />
        )}

        {currentTab === 'cart' && (
          <CartPage
            cartItems={cartItems}
            allCoupons={coupons}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            currentCoupon={appliedCoupon}
            onApplyCoupon={setAppliedCoupon}
            onCheckout={() => setCurrentTab('checkout')}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            subtotal={cartSubtotal}
            discount={discountAmount}
            gstAmount={cartGst}
            total={cartTotal}
            onClearCart={() => setCartItems([])}
            onPlaceOrder={handlePlaceOrder}
            onBack={() => setCurrentTab('cart')}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            orders={orders}
            onTrackOrder={(ord) => {
              console.log("Tracking order id:", ord.id);
            }}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'contact' && <ContactPage />}

        {currentTab === 'blogs' && <BlogPage blogs={blogs} />}

        {currentTab === 'admin' && (
          userRole === 'admin' ? (
            <AdminPage
              products={products}
              categories={categories}
              auditLogs={auditLogs}
              onAddNewProduct={handleAdminAddNewProduct}
              onUpdateProduct={handleAdminUpdateProduct}
              onDeleteProduct={handleAdminDeleteProduct}
              onRefreshLogs={refreshAllData}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 border border-red-200 bg-red-50/50 rounded-3xl text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-red-600 animate-pulse" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Security Access Lock</h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Administrative privileges are protected. Please sign in with the secure administrative staff credentials in the beekeeping portal to unlock access.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentTab('auth');
                  }}
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition duration-300"
                >
                  Unseal DTC Administrative Portal
                </button>
              </div>
            </div>
          )
        )}

        {currentTab === 'auth' && (
          <LoginSignupPage
            onLoginSuccess={(role) => {
              setUserRole(role);
              setCurrentTab(role === 'admin' ? 'admin' : 'dashboard');
            }}
          />
        )}

      </main>

      {/* Structured corporate Footer */}
      <Footer setCurrentTab={(t) => {
        setCurrentTab(t);
        setSelectedProduct(null);
      }} />

      {/* GLOBAL ENTERPRISE BULK CATALOG INQUIRY MODAL OVERLAY */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 text-left shadow-2xl border border-orange-100 animate-slide-up space-y-5">
            
            {/* Close button */}
            <button
              onClick={() => setIsBulkModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1">
              <span className="p-1 px-2.5 bg-[#FFF8E7] text-[#1B5E20] border border-[#F4B400]/30 rounded-full font-bold uppercase text-[9px]">
                Corporate Sales Desk
              </span>
              <h3 className="text-xl font-extrabold text-[#1B5E20] tracking-tight mt-1">
                Request Bulk Quote & customization parameters
              </h3>
              <p className="text-xs text-gray-500">
                Direct to farmer pricing on wooden double-ventilated boxes and honey processors.
              </p>
            </div>

            {bulkInquirySubmitted ? (
              <div className="bg-[#2E7D32]/10 border border-[#2E7D32]/30 p-6 rounded-2xl text-center space-y-2 text-[#1B5E20]">
                <CheckCircle className="w-10 h-10 mx-auto animate-bounce text-[#2E7D32]" />
                <h4 className="font-bold text-sm">Bulk Quote Registered!</h4>
                <p className="text-[11px] text-gray-600 leading-normal">
                  Thank you. Your custom keep dimensions and frames list has been forwarded to <strong>Yogesh Dawkhar</strong>. We will coordinate on Whatsapp/Email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBulkInquirySubmit} className="space-y-4 text-xs font-sans">
                
                {bulkProductNameStr && (
                  <div className="bg-[#FFF8E7] p-3 rounded-xl border border-[#F4B400]/20 text-[#1B5E20] font-bold">
                    Targeting Gear: <span className="text-gray-900">{bulkProductNameStr}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-500 font-bold block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={bulkName}
                      onChange={(e) => setBulkName(e.target.value)}
                      className="w-full border rounded-lg p-2.5 bg-gray-5/50 focus:outline-[#2E7D32]"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 font-bold block mb-1">Active Phone/WhatsApp</label>
                    <input
                      type="text"
                      required
                      value={bulkPhone}
                      onChange={(e) => setBulkPhone(e.target.value)}
                      className="w-full border rounded-lg p-2.5 bg-gray-5/50 focus:outline-[#2E7D32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-500 font-bold block mb-1 font-sans">Email Coordinates</label>
                    <input
                      type="email"
                      required
                      value={bulkEmail}
                      onChange={(e) => setBulkEmail(e.target.value)}
                      className="w-full border rounded-lg p-2.5 bg-gray-5/50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 font-bold block mb-1">Projected Quantity needed (hives/stands)</label>
                    <input
                      type="number"
                      required
                      value={bulkQty}
                      onChange={(e) => setBulkQty(e.target.value)}
                      className="w-full border rounded-lg p-2.5 bg-gray-5/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 font-bold block mb-1">Customization Specifications / Comments</label>
                  <textarea
                    rows={4}
                    value={bulkCustomNotes}
                    onChange={(e) => setBulkCustomNotes(e.target.value)}
                    className="w-full border rounded-lg p-2.5 bg-gray-5/50 focus:outline-[#2E7D32]"
                  />
                </div>

                <div className="bg-[#FFF8E7] rounded-xl p-3 border text-[10px] text-gray-700 space-y-1">
                  <p className="font-semibold block text-gray-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Secure Wholesales Guaranteed</span>
                  </p>
                  <span>DTC accepts direct farm audits to guarantee custom precision sizing limits prior to shipping.</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold h-11 rounded-lg transition"
                >
                  Submit Quote Inquiry
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
