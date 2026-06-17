import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, User, ChevronRight, ArrowLeft, Heart, Share2, Sparkles } from 'lucide-react';
import { BlogItem } from '../types';
import { OptimizedImage } from '../components/OptimizedImage';

interface BlogPageProps {
  blogs: BlogItem[];
}

export default function BlogPage({ blogs }: BlogPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<BlogItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  if (selectedArticle) {
    return (
      <div className="bg-[#FFF8E7]/30 py-10 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border rounded-3xl p-6 sm:p-10 shadow-sm">
          
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#1B5E20] hover:text-[#2E7D32] mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Beekeeping Guides</span>
          </button>

          <div className="space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold text-[#F4B400] block">
                DTC Education • {selectedArticle.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1B5E20] leading-tight select-all">
                {selectedArticle.title}
              </h1>
              
              <div className="flex flex-wrap text-xs text-gray-500 gap-4 pt-1">
                <span className="flex items-center"><User className="w-3.5 h-3.5 text-gray-400 mr-1" /> {selectedArticle.author}</span>
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 text-gray-400 mr-1" /> {selectedArticle.publishedDate}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 text-gray-400 mr-1" /> {selectedArticle.readTime} read</span>
              </div>
            </div>

            <div className="h-96 w-full rounded-2xl overflow-hidden border">
              <OptimizedImage src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" width={900} />
            </div>

            {/* Content text */}
            <div className="prose max-w-none text-sm text-gray-700 leading-relaxed font-sans space-y-4">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={index} className="text-lg font-bold text-[#1B5E20] pt-2">{paragraph.replace('###', '').trim()}</h3>;
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </div>

            {/* Author summary card */}
            <div className="pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 block">Article Author:</span>
                <span className="text-sm font-bold text-gray-900">{selectedArticle.author}</span>
                <p className="text-[10px] text-gray-500 mt-0.5">Agricultural & Apiculture Specialist, Navi Mumbai</p>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={(e) => handleLike(selectedArticle.id, e)}
                  className="flex items-center space-x-1 border px-3 py-1.5 rounded-lg text-xs hover:bg-red-5/40 text-red-500 font-bold transition"
                >
                  <Heart className="w-4 h-4 fill-red-500" />
                  <span>Approvals: {(likes[selectedArticle.id] || 0)}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E7]/30 py-12 lg:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center space-y-4 mb-14">
          <BookOpen className="w-12 h-12 text-[#F4B400] mx-auto" />
          <h1 className="text-4xl font-extrabold text-[#1B5E20] tracking-tight">Sustainable Beekeeping Guides</h1>
          <p className="text-sm text-gray-700 max-w-xl mx-auto">
            Supporting our company motto: "Care for Planet and People" with step-by-step hives management lessons and honey harvest insights.
          </p>
        </div>

        {/* Dynamic lists grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((item) => (
            <div
              id={`blog-card-${item.id}`}
              key={item.id}
              onClick={() => {
                setSelectedArticle(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative"
            >
              <div className="h-44 overflow-hidden relative">
                <OptimizedImage
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                  width={400}
                />
                <span className="absolute bottom-3 left-3 bg-[#1B5E20] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {item.tags[0] || 'Beekeeping'}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm text-gray-950 group-hover:text-[#1B5E20] transition line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.content.substring(0, 150)}...
                  </p>
                </div>

                <div className="pt-3 border-t flex justify-between items-center text-[10px] text-gray-500">
                  <span className="font-semibold text-gray-700">{item.author}</span>
                  <span className="flex items-center gap-1">Read article <ChevronRight className="w-3 h-3 text-[#2E7D32]" /></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive lesson prompt */}
        <div className="mt-16 bg-[#FFF8E7] rounded-3xl p-6 sm:p-8 border border-[#F4B400]/25 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-extrabold text-[#1B5E20] flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#F4B400]" />
              <span>Request Personal Beekeeping Consultation</span>
            </h3>
            <p className="text-xs text-gray-700 max-w-xl leading-relaxed">
              We arrange direct training lessons on wooden box integration, queen rearing cycles and protective suits for agricultural cooperatives and local farmers in Mumbai.
            </p>
          </div>
          <button
            onClick={() => {
              const textStr = encodeURIComponent("Hello Yogesh Dawkhar! I want to request a personal training consultation or customized hive setup details.");
              window.open(`https://wa.me/917738508276?text=${textStr}`, '_blank');
            }}
            className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold px-6 py-3 rounded-xl transition shrink-0 shadow-xs"
          >
            Ask on WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}
