import React, { useState } from 'react';
import { Heart, ShoppingCart, ShieldCheck, Mail, ArrowLeft, Star, Phone, Share2, ClipboardList, CheckCircle } from 'lucide-react';
import { Product, Review } from '../types';
import { OptimizedImage } from '../components/OptimizedImage';

interface ProductDetailsPageProps {
  product: Product;
  allProducts: Product[];
  currentReviews: Review[];
  onBack: () => void;
  addToCart: (product: Product, qty: number) => void;
  toggleWishlist: (product: Product) => void;
  wishlist: string[];
  onSubmitReview: (review: { productId: string; userName: string; rating: number; comment: string }) => void;
  openBulkOrderModalCustom: (pName: string) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetailsPage({
  product,
  allProducts,
  currentReviews,
  onBack,
  addToCart,
  toggleWishlist,
  wishlist,
  onSubmitReview,
  openBulkOrderModalCustom,
  onSelectProduct
}: ProductDetailsPageProps) {
  
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  // Review Entry form
  const [revName, setRevName] = useState('');
  const [revComment, setRevComment] = useState('');
  const [revScore, setRevScore] = useState(5);
  const [revSubmitted, setRevSubmitted] = useState(false);

  const isLiked = wishlist.includes(product.id);
  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const matchedReviews = currentReviews.filter(r => r.productId === product.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (revName && revComment) {
      onSubmitReview({
        productId: product.id,
        userName: revName,
        rating: revScore,
        comment: revComment
      });
      setRevSubmitted(true);
      setRevName('');
      setRevComment('');
    }
  };

  return (
    <div className="bg-[#FFF8E7]/30 py-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation button */}
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#1B5E20] hover:text-[#2E7D32] mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to products catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 sm:p-8 rounded-3xl border border-orange-100 shadow-sm mb-12">
          
          {/* 1. LEFT COLUMN GALLERY & IMAGES */}
          <div className="space-y-4">
            <div className="h-96 overflow-hidden rounded-2xl border bg-gray-50 flex items-center justify-center relative">
              <OptimizedImage
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                width={800}
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === img ? 'border-[#F4B400] scale-95' : 'border-gray-200'
                    }`}
                  >
                    <OptimizedImage src={img} alt="thumbnail" className="w-full h-full object-cover" width={120} placeholder="shimmer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. RIGHT COLUMN DESCRIPTION & CART CONTROL */}
          <div className="space-y-6">
            
            <div>
              <span className="text-xs uppercase font-bold text-[#F4B400] block mb-1">
                DTC Quality • {product.category.replace('-', ' ')}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B5E20] leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1 text-[#F4B400]">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4.5 h-4.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-gray-800 ml-1.5">{product.rating} ({matchedReviews.length} reviews)</span>
                </div>
                <span className="text-xs text-gray-300">|</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  product.stock > 0 ? 'bg-[#2E7D32]/10 text-[#1B5E20]' : 'bg-red-100 text-red-600'
                }`}>
                  {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">DTC Wholesale Price</span>
              <div className="flex items-baseline space-x-3 mt-1">
                <span className="text-3xl font-black text-[#1B5E20]">Rs. {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <p className="text-xs text-[#2E7D32] italic font-semibold mt-1">Inclusive of GST taxes where specified in quotes</p>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed font-sans">{product.description}</p>

            {/* Product bullet list features */}
            {product.features && product.features.length > 0 && (
              <ul className="space-y-1.5 pt-2 text-xs text-gray-700">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Quantity Controller & add/wishlist */}
            <div className="border-t border-gray-100 pt-4 space-y-4">
              {product.stock > 0 ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  
                  {/* Qty count selector */}
                  <div className="flex items-center border rounded-lg overflow-hidden w-full sm:w-28 bg-[#FFF8E7]/10 h-11 shrink-0 justify-between">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 h-full hover:bg-orange-50/50 font-bold transition text-gray-700"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 h-full hover:bg-orange-50/50 font-bold transition text-gray-700"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold h-11 rounded-lg transition flex items-center justify-center space-x-2 shadow-sm text-xs"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add To Shopping Cart</span>
                  </button>
                  
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-3 border rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-5/40 transition flex items-center justify-center"
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                </div>
              ) : (
                <button
                  className="w-full bg-gray-100 text-gray-400 font-bold py-3 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Product Temporarily Out Of Stock
                </button>
              )}

              {/* Utility actions: Share & Custom Bulk Order */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center space-x-2 border rounded-lg py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition"
                >
                  <Share2 className="w-4 h-4 text-gray-500" />
                  <span>{copied ? 'Copied Link!' : 'Share Product'}</span>
                </button>
                <button
                  onClick={() => openBulkOrderModalCustom(product.name)}
                  className="flex items-center justify-center space-x-2 bg-[#F4B400]/10 border border-[#F4B400]/40 text-[#1B5E20] font-semibold py-2.5 rounded-lg text-xs hover:bg-[#F4B400]/25 transition"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Get Bulk Quote</span>
                </button>
              </div>

            </div>

            {/* Quality assurance banner */}
            <div className="bg-[#FFF8E7] rounded-xl p-3 border border-orange-100 text-xs text-gray-700 flex items-center space-x-3.5">
              <ShieldCheck className="w-6 h-6 text-[#2E7D32]" />
              <span>
                "Every box checked by our Expert QC Team." Crafted with premium joinery from premium natural reusable raw wood. Built to serve apiary operations flawlessly.
              </span>
            </div>

          </div>

        </div>

        {/* 3. PRODUCT SPECIFICATIONS TABLE */}
        <div className="bg-white border rounded-2xl p-6 mb-12 text-left">
          <h3 className="text-base font-bold text-gray-950 border-b pb-3 mb-4">Core Specifications & sizing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between py-1.5 border-b border-gray-50 text-xs text-left">
                <span className="font-semibold text-gray-600 w-1/3 shrink-0">{key}</span>
                <span className="text-gray-900 w-2/3">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. REVIEWS SECTION WITH ADDING FORMS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white border p-6 sm:p-8 rounded-3xl mb-12">
          
          {/* Review scores summary side */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-base font-semibold text-gray-950 border-b pb-3 block">Customer Feedback</h3>
            <div className="text-center bg-[#FFF8E7]/30 py-6 rounded-2xl border border-orange-100">
              <span className="text-5xl font-black text-[#1B5E20]">{product.rating}</span>
              <span className="text-[#F4B400] text-xl block mt-1">★ ★ ★ ★ ★</span>
              <span className="text-[10px] text-gray-500 block mt-1">{matchedReviews.length} total approvals</span>
            </div>
            
            {/* Add feedback box */}
            {revSubmitted ? (
              <div className="bg-[#2E7D32]/10 border border-[#2E7D32]/30 p-4 rounded-2xl text-center space-y-2 text-[#1B5E20]">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <h4 className="font-bold text-xs">Review Submitted!</h4>
                <p className="text-[10px] text-gray-600">Thank you for sharing your experience with DTC Beekeeping Gear.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3 pt-3 border-t">
                <h4 className="text-xs font-bold text-gray-800">Add a Public Review</h4>
                
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (Farmer / Institution)"
                    value={revName}
                    onChange={(e) => setRevName(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold block mb-1">Select Rating:</label>
                  <select
                    value={revScore}
                    onChange={(e) => setRevScore(Number(e.target.value))}
                    className="w-full text-xs border rounded-lg px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="5">⭐⭐⭐⭐★ 5 Stars (Outstanding)</option>
                    <option value="4">⭐⭐⭐⭐☆ 4 Stars (Good)</option>
                    <option value="3">⭐⭐⭐☆☆ 3 Stars (Average)</option>
                  </select>
                </div>

                <div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your harvest experience, durability, joint finish..."
                    value={revComment}
                    onChange={(e) => setRevComment(e.target.value)}
                    className="w-full text-xs border rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-[11px] font-bold py-2 rounded-lg transition"
                >
                  Submit Real Review
                </button>
              </form>
            )}

          </div>

          {/* Review listings side */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-semibold text-gray-950 border-b pb-3">Approved Reviews ({matchedReviews.length})</h3>
            
            {matchedReviews.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-8">Be the first to review this DTC product! Use the form on the left.</p>
            ) : (
              <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2">
                {matchedReviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-gray-5/50 border border-gray-100 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-800">{rev.userName}</span>
                      <span className="text-[10px] text-gray-400">{rev.date}</span>
                    </div>
                    <div className="text-amber-500 text-[10px]">
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </div>
                    <p className="text-xs text-gray-700 font-serif leading-relaxed">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* 5. RELATED PRODUCTS GRID */}
        {related.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-950 text-center">Related Beekeeping Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    // Navigate directly by triggering product select
                    onSelectProduct(prod);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border rounded-2xl overflow-hidden hover:shadow-md cursor-pointer transition duration-300"
                >
                  <div className="h-36 overflow-hidden">
                    <OptimizedImage src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" width={320} />
                  </div>
                  <div className="p-4 text-left">
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{prod.name}</h4>
                    <span className="text-xs font-bold text-[#1B5E20] block mt-1">Rs. {prod.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
