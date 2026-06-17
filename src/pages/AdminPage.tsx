import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, PlusCircle, Trash2, ListFilter, Cpu, ClipboardList, CheckCircle, PackageOpen, LayoutDashboard, Database, RefreshCw, Edit, Plus, X } from 'lucide-react';
import { Product, Category, AuditLog } from '../types';
import { OptimizedImage } from '../components/OptimizedImage';

interface AdminPageProps {
  products: Product[];
  categories: Category[];
  auditLogs: AuditLog[];
  onAddNewProduct: (prod: Product) => void;
  onUpdateProduct: (prodId: string, prod: Product) => void;
  onDeleteProduct: (prodId: string) => void;
  onRefreshLogs: () => void;
}

export default function AdminPage({
  products,
  categories,
  auditLogs,
  onAddNewProduct,
  onUpdateProduct,
  onDeleteProduct,
  onRefreshLogs
}: AdminPageProps) {
  
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'products' | 'ai-import' | 'audit-logs'>('dashboard');

  // Editing state support
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New manual product inputs
  const [newpName, setNewpName] = useState('');
  const [newpPrice, setNewpPrice] = useState('4500');
  const [newpCategory, setNewpCategory] = useState('wooden-boxes');
  const [newpDesc, setNewpDesc] = useState('');
  const [newpStock, setNewpStock] = useState('20');
  
  // List of product image URLs
  const [newpImages, setNewpImages] = useState<string[]>([
    'https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A'
  ]);
  const [newImgInput, setNewImgInput] = useState('');
  
  const [newpFeatures, setNewpFeatures] = useState('Sustainable Wood, Expert QC Approved');

  // AI Product Import states
  const [rawTextCatalog, setRawTextCatalog] = useState('Dheera Trading Company Autumn Catalog:\nProduct: Stainless Honey Extractor v4\nPrice: Rs. 14500\nCategory: honey-extractors\nFeatures: 4 Frames hand crank, SS304 material, seamless gear ratio.\nStock: 12');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [parsedProductPreview, setParsedProductPreview] = useState<Partial<Product> | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // Settle some dashboard numbers
  const totalSku = products.length;
  const totalStockAmount = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const lowStockProducts = products.filter(p => p.stock <= 5);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Helper to append a manual image URL
  const handleAddManualImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (newImgInput.trim()) {
      setNewpImages(prev => [...prev, newImgInput.trim()]);
      setNewImgInput('');
    }
  };

  // Helper to remove a manual image URL
  const handleRemoveManualImage = (indexToRemove: number) => {
    setNewpImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Helper to start editing an existing product
  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setNewpName(product.name);
    setNewpPrice(String(product.price));
    setNewpCategory(product.category);
    setNewpDesc(product.description || '');
    setNewpStock(String(product.stock));
    setNewpImages(product.images && product.images.length > 0 ? [...product.images] : ['https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A']);
    setNewpFeatures(product.features ? product.features.join(', ') : 'Sustainable Wood, Expert QC Approved');
    
    // Auto-scroll or focus focus
    const formElement = document.getElementById('inventory-form-heading');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newpName || !newpPrice || !newpCategory) return;

    const finalImages = newpImages.length > 0 ? newpImages : ['https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A'];

    if (editingProduct) {
      // Update existing item logic
      const updatedProduct: Product = {
        ...editingProduct,
        name: newpName,
        price: parseInt(newpPrice) || 2000,
        description: newpDesc || 'Premium grade sustainable apiculture supply.',
        category: newpCategory,
        stock: parseInt(newpStock) || 0,
        images: finalImages,
        features: newpFeatures.split(',').map(f => f.trim()).filter(Boolean),
      };

      onUpdateProduct(editingProduct.id, updatedProduct);
      showToast(`Successfully updated "${newpName}" in Catalog!`);
      setEditingProduct(null);
    } else {
      // Normal create logic
      const manualProd: Product = {
        id: 'dtc_p_' + Math.floor(Math.random() * 900000 + 100000),
        name: newpName,
        price: parseInt(newpPrice) || 2000,
        description: newpDesc || 'Premium grade sustainable apiculture supply.',
        category: newpCategory,
        stock: parseInt(newpStock) || 10,
        status: 'published',
        rating: 4.8,
        reviewsCount: 1,
        images: finalImages,
        features: newpFeatures.split(',').map(f => f.trim()).filter(Boolean),
        isBestSeller: false,
        specifications: {
          "Wood grade": "Traditional Seasoned Timber",
          "QC Status": "Expert Inspected",
          "Standards": "DTC India standard Compliant"
        },
        tags: ['DTC', 'Farming', newpCategory]
      };

      onAddNewProduct(manualProd);
      showToast(`Successfully added "${newpName}" manually!`);
    }
    
    // reset form
    setNewpName('');
    setNewpDesc('');
    setNewpStock('20');
    setNewpPrice('4500');
    setNewpImages(['https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A']);
    setNewpFeatures('Sustainable Wood, Expert QC Approved');
  };

  // Run AI parsing with full-stack server
  const handleAIParse = async () => {
    setAiLoading(true);
    setAiError('');
    setParsedProductPreview(null);

    try {
      const response = await fetch('/api/parse-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textCatalog: rawTextCatalog })
      });

      if (!response.ok) {
        throw new Error('Server AI parser failed to respond. Is server running?');
      }

      const parsedData = await response.json();
      
      if (parsedData.success && parsedData.parsedProduct) {
        setParsedProductPreview(parsedData.parsedProduct);
        showToast('Gemini successfully structured your catalog product!');
      } else {
        setAiError(parsedData.error || 'Got unexpected representation response from Gemini parser');
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Error executing API parse catalog.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleApproveAndAddAIProduct = () => {
    if (!parsedProductPreview) return;
    
    const finalProd: Product = {
      id: 'dtc_ai_' + Math.floor(Math.random() * 900000 + 100000),
      name: parsedProductPreview.name || 'AI Parsed Wooden Box',
      price: parsedProductPreview.price || 4000,
      description: parsedProductPreview.description || 'Pristinely parsed sustainable item.',
      category: parsedProductPreview.category || 'wooden-boxes',
      stock: parsedProductPreview.stock || 15,
      status: 'published',
      rating: 5.0,
      reviewsCount: 1,
      images: parsedProductPreview.images || ['https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A'],
      features: parsedProductPreview.features || ['Expert QC Checked', 'Eco friendly Wood'],
      isBestSeller: false,
      specifications: parsedProductPreview.specifications || {
        "AI QC check": "Passed",
        "Standard": "Indian bee farming spec"
      },
      tags: parsedProductPreview.tags || ['AI-Parsed', 'Sustainable']
    };

    onAddNewProduct(finalProd);
    showToast(`Successfully published AI extracted product: "${finalProd.name}"!`);
    setParsedProductPreview(null);
  };

  return (
    <div className="bg-gray-5/50 min-h-screen py-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-5 mb-8 gap-4">
          <div>
            <span className="text-[10px] text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Protected Admin Space
            </span>
            <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight mt-1">DTC Enterprise Operations</h1>
          </div>

          <div className="flex bg-white p-1 rounded-xl border space-x-1 text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('dashboard')}
              className={`px-4 py-2 rounded-lg transition ${activeSubTab === 'dashboard' ? 'bg-[#2E7D32] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Dashboard Stats
            </button>
            <button
              onClick={() => setActiveSubTab('products')}
              className={`px-4 py-2 rounded-lg transition ${activeSubTab === 'products' ? 'bg-[#2E7D32] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Manage Inventory
            </button>
            <button
              onClick={() => setActiveSubTab('ai-import')}
              className={`px-4 py-2 rounded-lg transition ${activeSubTab === 'ai-import' ? 'bg-[#2E7D32] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              AI Product Importer
            </button>
            <button
              onClick={() => setActiveSubTab('audit-logs')}
              className={`px-4 py-2 rounded-lg transition ${activeSubTab === 'audit-logs' ? 'bg-[#2E7D32] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Security Audit Logs
            </button>
          </div>
        </div>

        {/* Global Floating Toast */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 bg-gray-950 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-gray-800 animate-slide-in">
            <CheckCircle className="w-4.5 h-4.5 text-[#FFC107]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* SUBTAB 1: STATS BOARD */}
        {activeSubTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                <span className="text-xs text-gray-500 font-semibold block uppercase">Total Catalog SKUs</span>
                <span className="text-3xl font-black text-gray-900 block mt-1">{totalSku} SKUs</span>
                <span className="text-[10px] text-gray-500 block mt-1">Across {categories.length} segments</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                <span className="text-xs text-gray-500 font-semibold block uppercase">Stated Inventory Valuation</span>
                <span className="text-3xl font-black text-[#1B5E20] block mt-1">Rs. {totalStockAmount.toLocaleString()}</span>
                <span className="text-[10px] text-gray-500 block mt-1">Sum value of raw wooden products</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                <span className="text-xs text-gray-500 font-semibold block uppercase">Low Stock Trigger warning</span>
                <span className={`text-3xl font-black block mt-1 ${lowStockProducts.length > 0 ? 'text-red-600' : 'text-[#2E7D32]'}`}>
                  {lowStockProducts.length} Alerts
                </span>
                <span className="text-[10px] text-gray-500 block mt-1">Items with stock count under 5</span>
              </div>

            </div>

            {/* Low supply alert block */}
            {lowStockProducts.length > 0 && (
              <div className="bg-red-50 border border-red-100 text-red-900 p-5 rounded-2xl space-y-2 text-xs">
                <strong className="flex items-center space-x-2 text-red-700">
                  <ShieldAlert className="w-4.5 h-4.5" />
                  <span>ALERT: Critical low-level bee supply count!</span>
                </strong>
                <p className="text-gray-700 text-[11px]">
                  The following precision beekeeping tools are running out. Restock to keep delivery lead-time low:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {lowStockProducts.map(p => (
                    <div key={p.id} className="bg-white border rounded-lg p-2 flex justify-between font-medium">
                      <span>{p.name}</span>
                      <strong className="text-red-600">Only {p.stock} left</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: INVENTORY & MANUAL ADD */}
        {activeSubTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left form adding */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl border shadow-sm">
              <h3 id="inventory-form-heading" className="text-sm font-bold text-gray-900 border-b pb-3 mb-4 flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <PlusCircle className="w-4.5 h-4.5 text-[#2E7D32]" />
                  <span>{editingProduct ? 'Edit Existing Product' : 'Publish Product Entry'}</span>
                </span>
                {editingProduct && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setNewpName('');
                      setNewpDesc('');
                      setNewpStock('20');
                      setNewpPrice('4500');
                      setNewpImages(['https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A']);
                      setNewpFeatures('Sustainable Wood, Expert QC Approved');
                    }}
                    className="text-[10px] text-red-600 hover:underline bg-red-50 border border-red-200 px-2.5 py-1 rounded-full font-bold transition duration-300"
                  >
                    Cancel Edit
                  </button>
                )}
              </h3>

              <form onSubmit={handleManualAddSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="text-gray-500 font-bold block mb-1 font-sans">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 Frames Langstroth box"
                    value={newpName}
                    onChange={(e) => setNewpName(e.target.value)}
                    className="w-full border rounded-lg p-2.5 focus:outline-[#2E7D32] text-xs font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 font-sans">
                  <div>
                    <label className="text-gray-500 font-bold block mb-1">Price (Rs.)</label>
                    <input
                      type="number"
                      required
                      value={newpPrice}
                      onChange={(e) => setNewpPrice(e.target.value)}
                      className="w-full border rounded-lg p-2.5 text-xs font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 font-bold block mb-1">Initial Stock count</label>
                    <input
                      type="number"
                      required
                      value={newpStock}
                      onChange={(e) => setNewpStock(e.target.value)}
                      className="w-full border rounded-lg p-2.5 text-xs font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 font-bold block mb-1 font-sans">Segment Category</label>
                  <select
                    value={newpCategory}
                    onChange={(e) => setNewpCategory(e.target.value)}
                    className="w-full border rounded-lg p-2.5 bg-white text-xs font-sans"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* INTERACTIVE MULTIPLE IMAGE URLs INPUT AND THUMBNAILS LIST */}
                <div className="border border-[#F4B400]/25 p-4 rounded-2xl bg-[#FFF8E7]/30 space-y-3 font-sans">
                  <label className="text-gray-700 font-extrabold block">Product Images Gallery</label>
                  
                  {/* Mini previews */}
                  {newpImages.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {newpImages.map((imgUrl, index) => (
                        <div key={index} className="relative group w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-2xs">
                          <img src={imgUrl} alt="Preview thumbnail" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveManualImage(index)}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            title="Remove image URL"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-400 italic">No images currently assigned. Paste a link below.</p>
                  )}

                  {/* Attachment inputs */}
                  <div className="flex space-x-1.5 focus-within:ring-1 focus-within:ring-[#2E7D32] rounded-lg border bg-white overflow-hidden p-1">
                    <input
                      type="text"
                      placeholder="Paste Image URL..."
                      value={newImgInput}
                      onChange={(e) => setNewImgInput(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 text-[11px] outline-none border-0"
                    />
                    <button
                      type="button"
                      onClick={handleAddManualImage}
                      className="bg-[#2E7D32]/10 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white p-2 rounded-md transition font-bold shrink-0 flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[9px] text-gray-500 leading-tight block">
                    Ensure at least one image URL is loaded. Drag & drop or copy link addresses freely.
                  </span>
                </div>

                <div>
                  <label className="text-gray-500 font-bold block mb-1 font-sans">Features list (separated by comma)</label>
                  <input
                    type="text"
                    value={newpFeatures}
                    onChange={(e) => setNewpFeatures(e.target.value)}
                    className="w-full border rounded-lg p-2.5 text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="text-gray-500 font-bold block mb-1 font-sans">Product Description</label>
                  <textarea
                    rows={3}
                    placeholder="Durability specs, ventilation parameters..."
                    value={newpDesc}
                    onChange={(e) => setNewpDesc(e.target.value)}
                    className="w-full border rounded-lg p-2.5 text-xs font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full font-bold py-2.5 rounded-lg transition text-xs font-sans ${
                    editingProduct ? 'bg-[#F4B400] hover:bg-black text-gray-950 font-extrabold shadow-md' : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-xs'
                  }`}
                >
                  {editingProduct ? 'Update and Save Changes' : 'Save Manually to Live Directory'}
                </button>
              </form>
            </div>

            {/* Right inventory lists */}
            <div className="lg:col-span-2 bg-white border p-6 rounded-3xl shadow-sm text-left">
              <h3 className="text-sm font-bold text-gray-900 border-b pb-3 mb-4 flex items-center justify-between font-sans">
                <span>Active Stock Items ({products.length})</span>
                <span className="text-[10px] text-gray-500 italic">"Care for Planet and People"</span>
              </h3>

              <div className="space-y-3 font-sans">
                {products.map((p) => (
                  <div key={p.id} className="border rounded-xl p-3 flex justify-between items-center gap-4 bg-gray-5/40 text-xs font-sans">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden shrink-0">
                        <OptimizedImage src={p.images && p.images[0] ? p.images[0] : 'https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A'} alt="" className="w-full h-full object-cover" width={80} placeholder="shimmer" />
                      </div>
                      <div>
                        <span className="font-extrabold text-gray-950 block">{p.name}</span>
                        <div className="space-x-2 text-[10px] text-gray-500">
                          <span>Cat: <strong>{p.category}</strong></span>
                          <span>•</span>
                          <span>Stock: <strong className={p.stock <= 5 ? 'text-red-600 font-bold' : ''}>{p.stock} units</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <strong className="text-gray-950 shrink-0">Rs. {p.price.toLocaleString()}</strong>
                      
                      <div className="flex items-center space-x-1.5 bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="text-gray-500 hover:text-[#2E7D32] hover:bg-[#2E7D32]/5 rounded-md transition p-1.5"
                          title="Edit this product details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            onDeleteProduct(p.id);
                            showToast(`Deleted "${p.name}"!`);
                          }}
                          className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition p-1.5"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 3: AI IMPORT PARK USING GEMINI */}
        {activeSubTab === 'ai-import' && (
          <div className="bg-white border p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
            
            <div className="border-b pb-4 space-y-2">
              <div className="flex items-center space-x-2.5">
                <Cpu className="w-6 h-6 text-[#2E7D32]" />
                <h3 className="text-lg font-bold text-gray-950">AI Catalog OCR Extraction Module</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
                Paste raw OCR product catalogs, invoices or specifications from PDF literature here. The backend Gemini model parses it into a structured product format mapping specifications, tags, description and pricing models beautifully.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* Left text input paste */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-800 block">Paste Raw Catalog Content Text Block:</label>
                <textarea
                  rows={8}
                  value={rawTextCatalog}
                  onChange={(e) => setRawTextCatalog(e.target.value)}
                  placeholder="Paste OCR text e.g., product dimensions, weight, price list..."
                  className="w-full text-xs border rounded-2xl p-4 font-mono focus:outline-[#2E7D32]"
                />

                <button
                  onClick={handleAIParse}
                  disabled={aiLoading}
                  className="w-full bg-[#1B5E20] hover:bg-black text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center space-x-2 text-xs"
                >
                  {aiLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Gemini Processing Catalog... Please wait</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4" />
                      <span>Run AI Parse Catalog</span>
                    </>
                  )}
                </button>

                {aiError && (
                  <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-xs leading-relaxed text-left font-semibold">
                    Error: {aiError}
                  </div>
                )}
              </div>

              {/* Right extraction preview and saving button */}
              <div className="bg-orange-50/20 border border-orange-100 p-6 rounded-2xl text-left space-y-4 min-h-[300px] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-gray-400 block mb-1">Extraction Review Sandbox</span>
                  
                  {parsedProductPreview ? (
                    <div className="space-y-4 animate-fade-in text-xs">
                      
                      <div className="bg-[#2E7D32]/10 p-3.5 rounded-xl text-[#1B5E20] font-bold border flex items-center space-x-2">
                        <CheckCircle className="w-4.5 h-4.5" />
                        <span>Successfully extracted by Gemini AI!</span>
                      </div>

                      <div className="space-y-2 border pb-3">
                        <p><strong>Name:</strong> {parsedProductPreview.name}</p>
                        <p><strong>Price:</strong> Rs. {parsedProductPreview.price?.toLocaleString() || '4,500'}</p>
                        <p><strong>Category:</strong> {parsedProductPreview.category}</p>
                        <p><strong>Description:</strong> {parsedProductPreview.description}</p>
                        <p><strong>Features:</strong> {parsedProductPreview.features?.join(', ')}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="font-bold border-b pb-1">Technical Specs:</p>
                        {parsedProductPreview.specifications && Object.entries(parsedProductPreview.specifications).map(([k, v]) => (
                          <div key={k} className="flex justify-between font-mono text-[11px] text-gray-600">
                            <strong>{k}:</strong>
                            <span>{String(v)}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500 space-y-2">
                      <Cpu className="w-10 h-10 text-gray-300 mx-auto" />
                      <p className="text-xs leading-normal">
                        No active AI extraction preview yet. Paste raw catalogue text on the left and run AI Parsing to begin operations.
                      </p>
                    </div>
                  )}
                </div>

                {parsedProductPreview && (
                  <button
                    onClick={handleApproveAndAddAIProduct}
                    className="w-full bg-[#F4B400] hover:bg-[#FFC107] text-[#1B5E20] font-bold py-3 rounded-lg transition text-xs"
                  >
                    Approve and Publish AI Structured Product on live website
                  </button>
                )}

              </div>

            </div>

          </div>
        )}

        {/* SUBTAB 4: SECURITY AUDIT LOGS */}
        {activeSubTab === 'audit-logs' && (
          <div className="bg-white border p-6 rounded-3xl shadow-sm text-left spacing-y-4">
            
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-950 flex items-center space-x-2">
                  <Database className="w-5 h-5 text-[#2E7D32]" />
                  <span>Administrative Security Audit Logs</span>
                </h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Real action auditing tracking system logs directly recorded on server db.</p>
              </div>

              <button
                onClick={onRefreshLogs}
                className="flex items-center space-x-1 border hover:bg-gray-50 text-xs px-3 py-1.5 rounded-lg text-gray-700 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Logs</span>
              </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {auditLogs.map((log) => (
                <div key={log.id} className="border-b pb-2 text-[11px] flex justify-between gap-4 font-mono">
                  <div className="text-left">
                    <span className="text-gray-400">[{log.timestamp}]</span>
                    <span className="text-[#1B5E20] font-bold ml-2">({log.user})</span>
                    <span className="text-gray-800 ml-2">{log.action}</span>
                  </div>
                  <span className="text-gray-400 capitalize">{log.type}</span>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
