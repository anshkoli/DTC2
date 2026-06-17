import React, { useState } from 'react';
import { Compass, ShoppingBag, Heart, ShieldCheck, Leaf, Users, Star, ArrowRight, HelpCircle, AlertCircle, Quote } from 'lucide-react';
import { Product, Category } from '../types';
import { OptimizedImage } from '../components/OptimizedImage';

interface HomeProps {
  categories: Category[];
  products: Product[];
  setCurrentTab: (tab: string) => void;
  setSelectedCategory: (catId: string) => void;
  addToCart: (product: Product, qty: number) => void;
  toggleWishlist: (product: Product) => void;
  wishlist: string[];
  openBulkOrderModal: () => void;
}

export default function Home({
  categories,
  products,
  setCurrentTab,
  setSelectedCategory,
  addToCart,
  toggleWishlist,
  wishlist,
  openBulkOrderModal
}: HomeProps) {
  const [beeCalculationQuantity, setBeeCalculationQuantity] = useState(5);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  // Pollination & food supply statistic calculation
  const calculatedPollinationTrees = beeCalculationQuantity * 12000;
  const calculatedCropYieldKg = beeCalculationQuantity * 45;

  return (
    <div className="bg-[#FFF8E7]/40 min-h-screen">
      
      {/* 1. HERO SECTION WITH ORGANIC DESIGN GREETING */}
      <section id="hero-section" className="relative bg-gradient-to-br from-[#FFF8E7] via-[#FFF8E7]/90 to-[#FFC107]/20 py-20 lg:py-28 overflow-hidden border-b border-[#F4B400]/10">
        
        {/* Subtle Decorative Yellow SVG Honeycombs */}
        <div className="absolute right-0 top-0 opacity-20 transform translate-x-12 -translate-y-12">
          <svg width="300" height="300" viewBox="0 0 100 100" fill="none" stroke="#F4B400" strokeWidth="0.5">
            <path d="M50 10 L80 28 L80 62 L50 80 L20 62 L20 28 Z" />
            <path d="M80 28 L110 10" />
            <path d="M50 80 L50 110" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-white/70 border border-[#F4B400]/40 px-3.5 py-1 rounded-full text-xs font-semibold text-[#1B5E20] shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Certified 100% Sustainable Natural Wood</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                Premium Beekeeping <br />
                <span className="text-[#1B5E20]">Equipment for Modern Beekeepers</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-700 max-w-xl leading-relaxed">
                Supporting sustainable beekeeping with high-quality hive boxes, automatic flow frames, manual honey extractors, multi-layer protective suits, and direct-to-farmer accessories.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={() => setCurrentTab('products')}
                  className="bg-[#2E7D32] hover:bg-[#1B5E20] hover:scale-101 text-white text-sm font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Products</span>
                </button>
                <button
                  id="hero-bulk-btn"
                  onClick={openBulkOrderModal}
                  className="bg-white hover:bg-orange-50/50 text-[#1B5E20] border-2 border-[#2E7D32]/80 text-sm font-bold px-8 py-4 rounded-full shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Request Bulk Order</span>
                </button>
              </div>

              {/* Company Director Quick Reference Info badge */}
              <div className="pt-6 border-t border-gray-200/60 grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-2xl font-bold text-[#1B5E20]">100%</span>
                  <span className="text-[10px] text-gray-600 block">Eco friendly Raw timber</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-[#F4B400]">QC Verified</span>
                  <span className="text-[10px] text-gray-600 block">Expert Inspection check</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-[#2E7D32]">Direct</span>
                  <span className="text-[10px] text-gray-600 block">Wholesale Farmer pricing</span>
                </div>
              </div>

            </div>

            {/* Hero Graphic: Beautiful illustrative frame with a float-effect overlay */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-md relative">
                <div className="absolute inset-0 bg-radial from-[#F4B400]/40 to-transparent rounded-full filter blur-xl opacity-70 transform -translate-y-6"></div>
                <OptimizedImage
                  src="https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A"
                  alt="DTC Sustainable Beekeeping"
                  className="rounded-3xl shadow-2xl relative z-10 border-4 border-white transform transition-transform duration-500 hover:rotate-1"
                  width={600}
                />
                <div className="absolute -bottom-6 -right-6 bg-[#FFF8E7] border-2 border-[#F4B400]/40 shadow-xl rounded-2xl p-4 z-20 max-w-[200px] text-left animate-bounce duration-1000">
                  <span className="text-xs text-[#2E7D32] block font-bold">"Care for Planet and People"</span>
                  <span className="text-[10px] text-gray-600">Beekeeping brings 60% richer flower pollination</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VISUAL CATEGORIES SECTION */}
      <section id="categories-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Explore Beekeeping Categories</h2>
        <p className="text-sm text-[#2E7D32] font-semibold mt-2 px-4 italic">Tailored layouts and sizes for Apis Mellifera, Cerena Indica, & Stingless Bees</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {categories.map((cat) => (
            <div
              id={`cat-card-${cat.id}`}
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentTab('products');
              }}
              className="bg-white border hover:border-[#F4B400] rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-32 overflow-hidden relative">
                <OptimizedImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              <div className="p-4 text-left">
                <span className="text-xs text-[#2E7D32] font-bold block mb-1">DTC Premium</span>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1B5E20] transition">{cat.name}</h3>
                <p className="text-[11px] text-gray-600 mt-1 line-clamp-2 leading-relaxed">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SAVE THE BEES POLLINATION CALCULATOR */}
      <section id="save-bees-section" className="bg-[#1B5E20] text-white py-16 relative overflow-hidden">
        
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg width="250" height="250" viewBox="0 0 100 100" fill="white">
            <path d="M 50 15 Q 65 30 50 45 Q 35 30 50 15" />
            <circle cx="50" cy="50" r="10" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-left">
              <span className="inline-block bg-[#F4B400]/20 text-[#FFC107] text-xs font-bold px-3 py-1 rounded-full border border-[#FFC107]/40 uppercase tracking-widest">
                Save the Bees Initiative
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Bees Do 60% of Global Crops Pollination</h2>
              <p className="text-sm text-gray-100 leading-relaxed max-w-lg">
                Beekeeping is not just about honey production—it is a critical pillar of environmental conservation and food security. When you manage a gentle garden hive, you raise regional crop yields and support plant biodiversity in your community.
              </p>
              
              {/* Dynamic Interactive Slide range */}
              <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                <label className="text-xs font-bold text-[#FFC107] block mb-2">
                  Select your projected Bee Hive count:
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={beeCalculationQuantity}
                    onChange={(e) => setBeeCalculationQuantity(Number(e.target.value))}
                    className="flex-1 accent-[#F4B400]"
                  />
                  <span className="text-xl font-extrabold bg-[#F4B400] text-[#1B5E20] px-4 py-1.5 rounded-lg">
                    {beeCalculationQuantity} Hives
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/10 pt-4">
                  <div>
                    <span className="text-[10px] text-gray-300 block uppercase font-medium">Projected Flowers Pollinated Daily</span>
                    <span className="text-xl font-extrabold text-[#FFC107]">
                      {calculatedPollinationTrees.toLocaleString()} Flowers
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-300 block uppercase font-medium">Regional Crop Yield Boost</span>
                    <span className="text-xl font-extrabold text-[#FFC107]">
                      +{calculatedCropYieldKg.toLocaleString()} Kg increase
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="w-full max-w-md relative">
                <OptimizedImage
                  src="https://lh3.googleusercontent.com/d/1Is1NNKrZ9g-K07WsQ0slAtEQpBpbH6Vd"
                  alt="Save the pollinators"
                  className="rounded-3xl shadow-2xl border-4 border-[#F4B400]/40 relative z-10"
                  width={600}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS / BEST SELLERS */}
      <section id="products-featured" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Best Sellers & Recommended Gear</h2>
        <p className="text-xs text-[#2E7D32] font-semibold mt-2">Precision checked by our Expert QC Team before shipping</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 text-left">
          {bestSellers.map((prod) => {
            const isLiked = wishlist.includes(prod.id);
            return (
              <div
                id={`featured-p-card-${prod.id}`}
                key={prod.id}
                className="bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group relative"
              >
                {/* Wishlist toggle absolute */}
                <button
                  onClick={() => toggleWishlist(prod)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full shadow-xs hover:text-red-500 transition z-10"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>

                <div 
                  className="h-44 overflow-hidden relative cursor-pointer"
                  onClick={() => {
                    // Navigate to details page
                    setSelectedCategory(prod.category);
                    setCurrentTab('products');
                  }}
                >
                  <OptimizedImage
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    width={400}
                  />
                  {prod.originalPrice && (
                    <span className="absolute bottom-3 left-3 bg-[#2E7D32] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      SAVE Rs. {prod.originalPrice - prod.price}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#F4B400] block mb-1">
                      {prod.category.replace('-', ' ')}
                    </span>
                    <h3 
                      className="text-sm font-bold text-gray-900 line-clamp-1 hover:text-[#1B5E20] transition cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(prod.category);
                        setCurrentTab('products');
                      }}
                    >
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{prod.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-[#1B5E20]">Rs. {prod.price.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="text-xs bg-[#F4B400] hover:bg-[#FFC107] text-[#1B5E20] font-bold px-3 py-1.5 rounded-md transition"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WHY CHOOSE DTC DESIGN BOARD */}
      <section id="why-choose-section" className="py-16 bg-[#FFF8E7] border-y border-[#F4B400]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Why Modern Beekeepers Choose DTC</h2>
          <p className="text-xs text-[#2E7D32] font-semibold mt-2">Engineered by Dheera Trading Company - Care for Planet and People</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            
            <div className="bg-white p-6 rounded-2xl border hover:border-[#F4B400]/40 shadow-xs transition duration-300">
              <div className="w-12 h-12 rounded-full bg-[#F4B400]/20 flex items-center justify-center text-[#F4B400] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Expert QC Quality Check</h3>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                "Every box checked by our Expert QC Team." High-grade precision cutting and seamless joints prevent draft cooling inside brood hives. Fits Indian standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border hover:border-[#F4B400]/40 shadow-xs transition duration-300">
              <div className="w-12 h-12 rounded-full bg-[#2E7D32]/20 flex items-center justify-center text-[#2E7D32] mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">100% Sustainable Wood</h3>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                "We use sustainable natural raw wood which can re-use and remain sustainable for our eco-system." Safely locks carbon footprint, with beautiful raw wood visuals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border hover:border-[#F4B400]/40 shadow-xs transition duration-300">
              <div className="w-12 h-12 rounded-full bg-[#1B5E20]/20 flex items-center justify-center text-[#1B5E20] mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Customize Order Friendly</h3>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                "We accept customize order as per customer requirements." Direct custom parameters for size, frame stacks, or multi-species setups (Apis Mellifera / Cerena Indica / Stingless Bees).
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="testimonials-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B5E20]/5 rounded-3xl p-8 lg:p-12 border border-[#2E7D32]/10 text-center relative overflow-hidden">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Beekeepers Feedback</h2>
          <p className="text-xs text-[#2E7D32] font-semibold mt-1">Trusted by rural and commercial apiary directors across India</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 text-left">
            
            <div className="bg-white p-6 rounded-2xl shadow-xs border relative">
              <Quote className="absolute right-4 top-4 w-10 h-10 text-amber-100" />
              <div className="flex items-center space-x-1 text-[#F4B400] mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4.5 h-4.5 fill-current" />)}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed italic">
                "We ordered 20 sets of the Automatic Flow Beehive Box with 7 frames for our organic orchard in Maharashtra. Honey on tap is real! Extremely quick extraction and our bees settled in beautifully. QC team checked every frame prior to shipping."
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xs uppercase">RP</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Ramesh Patel</h4>
                  <span className="text-[10px] text-gray-500 block">Apiary Manager, Pune</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border relative">
              <Quote className="absolute right-4 top-4 w-10 h-10 text-amber-100" />
              <div className="flex items-center space-x-1 text-[#F4B400] mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4.5 h-4.5 fill-current" />)}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed italic">
                "As an agricultural educator, the DTC Observation Hives are magnificent for showing queen laying habits to students. Safe, escape-proof thick acrylic glass and stunning wooden frame. Director Yogesh Dawkhar was extremely supportive on WhatsApp."
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#F4B400] text-white flex items-center justify-center font-bold text-xs uppercase">DK</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Dipali Kadam</h4>
                  <span className="text-[10px] text-gray-500 block">Agronomy Specialist, Navi Mumbai</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CONTACT & BULK INQUIRY Call to Action */}
      <section id="cta-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-[#F4B400] to-[#FFC107] rounded-3xl p-8 lg:p-12 shadow-xl border-2 border-white text-[#1B5E20] relative">
          <h2 className="text-3xl font-extrabold tracking-tight">Ready to start your Beekeeping journey?</h2>
          <p className="text-sm font-semibold text-amber-950 mt-2 max-w-xl mx-auto">
            Contact us for wholesale farmer prices, custom box structures, and bulk commercial orders today.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentTab('contact')}
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-bold px-8 py-3.5 rounded-full transition-transform duration-300"
            >
              Get in Touch
            </button>
            <button
              onClick={openBulkOrderModal}
              className="bg-white/90 hover:bg-white text-[#1B5E20] text-sm font-bold px-8 py-3.5 rounded-full transition-transform duration-300 shadow-sm"
            >
              Bulk Catalog Inquiry
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
