import React, { useState, useMemo } from 'react';
import { Search, Grid, List, CheckCircle, SlidersHorizontal, Heart, RefreshCw, X } from 'lucide-react';
import { Product, Category } from '../types';
import { OptimizedImage } from '../components/OptimizedImage';

interface ProductsPageProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  onSelectProduct: (product: Product) => void;
  addToCart: (product: Product, qty: number) => void;
  toggleWishlist: (product: Product) => void;
  wishlist: string[];
}

export default function ProductsPage({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  addToCart,
  toggleWishlist,
  wishlist
}: ProductsPageProps) {
  
  // Local catalog filter states
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'priceAsc' | 'priceDesc' | 'name'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Clear filters utility
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMaxPrice(60000);
    setOnlyInStock(false);
    setSortBy('popular');
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesPrice = p.price <= maxPrice;
        const matchesStock = !onlyInStock || p.stock > 0;
        
        return matchesCategory && matchesSearch && matchesPrice && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'priceDesc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return b.rating - a.rating; // default: popular score
      });
  }, [products, selectedCategory, searchQuery, maxPrice, onlyInStock, sortBy]);

  // Paginated chunk
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="bg-[#FFF8E7]/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="text-left border-b pb-6 mb-8">
          <h1 className="text-3xl font-extrabold text-[#1B5E20] tracking-tight">DTC Beekeeping Catalog</h1>
          <p className="text-xs text-gray-700 font-medium">Sustainable Wooden Hive Boxes, Automatic comb extractors, and Professional farming tools.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* A. LEFT COLUMN FILTERS BLOCK */}
          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-xs text-left">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#2E7D32]" />
                  <span>Catalog Filters</span>
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] text-red-600 hover:underline font-bold flex items-center space-x-0.5"
                >
                  <X className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>

              {/* 1. Category selection lists */}
              <div className="mb-5">
                <label className="text-xs font-bold text-gray-800 block mb-2">Hive Category</label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedCategory === 'all' 
                        ? 'bg-[#F4B400]/20 text-[#1B5E20] font-bold border-l-4 border-[#F4B400]' 
                        : 'text-gray-700 hover:bg-[#FFF8E7]/60'
                    }`}
                  >
                    All Categories ({products.length})
                  </button>
                  {categories.map((cat) => {
                    const cnt = products.filter(p => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                          selectedCategory === cat.id 
                            ? 'bg-[#F4B400]/20 text-[#1B5E20] font-bold border-l-4 border-[#F4B400]' 
                            : 'text-gray-700 hover:bg-[#FFF8E7]/60'
                        }`}
                      >
                        {cat.name} ({cnt})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Range price slide */}
              <div className="mb-5 border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-gray-800">Max Budget Price</label>
                  <span className="text-xs font-extrabold text-[#2E7D32]">Rs. {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                  className="w-full accent-[#F4B400]"
                />
                <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                  <span>Rs. 0</span>
                  <span>Rs. 60,000</span>
                </div>
              </div>

              {/* 3. Availability Toggles */}
              <div className="mb-4 border-t pt-4 flex items-center justify-between">
                <label className="text-xs font-bold text-gray-800 cursor-pointer" htmlFor="stock-toggle">
                  In Stock Only
                </label>
                <input
                  id="stock-toggle"
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => { setOnlyInStock(e.target.checked); setCurrentPage(1); }}
                  className="w-4 h-4 rounded-sm border-gray-300 accent-[#2E7D32]"
                />
              </div>

            </div>

          </div>

          {/* B. RIGHT PRODUCTS GRID LISTINGS */}
          <div className="lg:col-span-3 space-y-6 text-left">
            
            {/* Top Toolbar controls */}
            <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Direct Instant Search input inside Toolbar */}
              <div className="w-full md:w-80 relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Filter by keyword (e.g. nuc box, gear...)"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-[#FFF8E7]/30 border border-[#F4B400]/25 rounded-full focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                />
              </div>

              {/* Sorting & Layout Toggles */}
              <div className="flex items-center justify-between w-full md:w-auto gap-4">
                
                <div className="flex items-center space-x-2">
                  <label className="text-xs text-gray-600 font-medium">Sort By:</label>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-white border text-xs py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                  >
                    <option value="popular">Popularity (Rating)</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>

                <div className="h-6 w-px bg-gray-200"></div>

                <div className="flex space-x-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-[#F4B400] text-[#1B5E20] font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-[#F4B400] text-[#1B5E20] font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Results volume feedback */}
            <div className="text-xs text-gray-600 px-1 flex justify-between items-center">
              <span>Showing {filteredProducts.length} Premium beekeeping products found</span>
              {selectedCategory !== 'all' && (
                <span className="bg-[#2E7D32]/10 text-[#1B5E20] px-2.5 py-0.5 rounded-full font-semibold">
                  Category: {selectedCategory.replace('-', ' ')}
                </span>
              )}
            </div>

            {/* Products Canvas list */}
            {paginatedProducts.length === 0 ? (
              <div className="bg-white border rounded-2xl p-12 text-center space-y-4">
                <RefreshCw className="w-12 h-12 text-[#F4B400] mx-auto animate-spin" />
                <h3 className="text-base font-bold text-gray-900">No Matching Beekeeping Product Found</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Try clearing some category options, lessening your price range bounds, or modifying your search key.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#2E7D32] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#1B5E20] transition"
                >
                  Reset Catalog Search
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              
              /* GRID VIEW DISPLAY */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((prod) => {
                  const isWished = wishlist.includes(prod.id);
                  return (
                    <div
                      id={`p-card-grid-${prod.id}`}
                      key={prod.id}
                      className="bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative"
                    >
                      <button
                        onClick={() => toggleWishlist(prod)}
                        className="absolute top-3.5 right-3.5 p-1.5 bg-white/80 backdrop-blur-xs rounded-full shadow-xs hover:text-red-500 transition z-10"
                      >
                        <Heart className={`w-4 h-4 ${isWished ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </button>

                      <div 
                        className="h-44 overflow-hidden relative cursor-pointer"
                        onClick={() => onSelectProduct(prod)}
                      >
                        <OptimizedImage
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                          width={400}
                        />
                        {prod.stock === 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Out of Stock</span>
                          </div>
                        )}
                        {prod.stock > 0 && prod.stock <= 5 && (
                          <span className="absolute top-3 left-3 bg-red-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase animate-pulse">
                            Only {prod.stock} left
                          </span>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#F4B400] mb-1">
                            <span>{prod.category.replace('-', ' ')}</span>
                            <span className="text-[#2E7D32]">★ {prod.rating}</span>
                          </div>
                          <h3
                            onClick={() => onSelectProduct(prod)}
                            className="text-sm font-bold text-gray-900 hover:text-[#1B5E20] cursor-pointer transition line-clamp-2"
                          >
                            {prod.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{prod.description}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-sm font-bold text-[#1B5E20]">Rs. {prod.price.toLocaleString()}</span>
                          {prod.stock > 0 ? (
                            <button
                              onClick={() => addToCart(prod, 1)}
                              className="text-xs bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold px-3 py-1.5 rounded-md transition"
                            >
                              Add To Cart
                            </button>
                          ) : (
                            <button
                              className="text-xs bg-gray-100 text-gray-400 font-bold px-3 py-1.5 rounded-md cursor-not-allowed"
                              disabled
                            >
                              Unavailable
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              
              /* LIST VIEW DISPLAY */
              <div className="space-y-4">
                {paginatedProducts.map((prod) => {
                  const isWished = wishlist.includes(prod.id);
                  return (
                    <div
                      id={`p-card-list-${prod.id}`}
                      key={prod.id}
                      className="bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row relative"
                    >
                      <button
                        onClick={() => toggleWishlist(prod)}
                        className="absolute top-4 right-4 p-1.5 bg-white/80 rounded-full shadow-xs hover:text-red-500 transition z-10"
                      >
                        <Heart className={`w-4 h-4 ${isWished ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </button>

                      <div 
                        className="w-full md:w-56 h-44 overflow-hidden shrink-0 cursor-pointer"
                        onClick={() => onSelectProduct(prod)}
                      >
                        <OptimizedImage
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover h-full"
                          width={400}
                        />
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-[#F4B400] mb-1">
                            <span>{prod.category.replace('-', ' ')}</span>
                            <span>•</span>
                            <span className="text-[#2E7D32]">⭐ {prod.rating} ({prod.reviewsCount} reviews)</span>
                          </div>
                          
                          <h3
                            onClick={() => onSelectProduct(prod)}
                            className="text-base font-bold text-gray-900 hover:text-[#1B5E20] cursor-pointer transition"
                          >
                            {prod.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2">{prod.description}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <span className="text-base font-extrabold text-[#1B5E20]">Rs. {prod.price.toLocaleString()}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => onSelectProduct(prod)}
                              className="text-xs border text-gray-700 font-bold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
                            >
                              See Details
                            </button>
                            {prod.stock > 0 ? (
                              <button
                                onClick={() => addToCart(prod, 1)}
                                className="text-xs bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold px-4 py-1.5 rounded-lg transition"
                              >
                                Add To Cart
                              </button>
                            ) : (
                              <span className="text-xs text-red-600 font-bold self-center">Out of Stock</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination numbers */}
            {totalPages > 1 && (
              <div className="pt-8 border-t flex justify-center space-x-1.5">
                {[...Array(totalPages)].map((_, i) => {
                  const pg = i + 1;
                  return (
                    <button
                      key={pg}
                      onClick={() => { setCurrentPage(pg); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                        currentPage === pg 
                          ? 'bg-[#2E7D32] text-white' 
                          : 'bg-white border text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pg}
                    </button>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
