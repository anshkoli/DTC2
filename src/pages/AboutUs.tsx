import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Award, Sparkles, MapPin } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';

export default function AboutUs() {
  return (
    <div className="bg-[#FFF8E7]/30 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Title Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="p-1.5 px-3 bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-xs text-[#1B5E20] rounded-full font-bold uppercase tracking-wider">
            Our Story
          </span>
          <h1 className="text-4xl font-extrabold text-[#1B5E20]">About Dheera Trading Company (DTC)</h1>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto leading-relaxed italic">
            "Care for Planet and People" — leading the change in organic beekeeping solutions, agricultural accessories, and high-quality wooden hives.
          </p>
        </div>

        {/* 1. BRAND HERO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <OptimizedImage
              src="https://lh3.googleusercontent.com/d/163VFUaQ-CLmvYgbGUITRoydOAsY9pbev"
              alt="Sustainable Apiculture"
              className="rounded-3xl shadow-xl border-4 border-white"
              width={650}
            />
          </div>
          <div className="space-y-4 text-left">
            <h2 className="text-2xl font-bold text-gray-900">Beekeeping Meet Technology</h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              Founded under the visionary guidance of our Director, <strong>Yogesh Dawkhar</strong>, Dheera Trading Company (DTC) was born with a single-minded dedication: supporting regional farmer communities through ecological apiary tools that ensure nature's most vital pollinators are protected.
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              Based at the core of Kamothe, Navi Mumbai, we construct robust, double-ventilated beehive boxes crafted from premium natural raw wood. Our flagship flow hives completely eliminate spin centrifuge stress, allowing producers to tap pristine unfiltered organic honey safely directly from the brood comb.
            </p>
          </div>
        </div>

        {/* 2. MISSION, VISION & MOTTO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm text-left">
            <div className="w-10 h-10 rounded-full bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32] mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-950">Our Mission</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Democratize sustainable apiculture by delivering premium-standard gear. Empower farmers, protect biodiversity, and contribute to global ecosystem preservation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm text-left">
            <div className="w-10 h-10 rounded-full bg-[#1B5E20]/10 flex items-center justify-center text-[#1B5E20] mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-950">Our Vision</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Evolve as India's premier trustworthy platform for end-to-end bee farming, organic beekeeping supplies, and educational school apiary setups.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm text-left">
            <div className="w-10 h-10 rounded-full bg-[#F4B400]/10 flex items-center justify-center text-[#F4B400] mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-950">Our Motto</h3>
            <p className="text-xs text-[#1B5E20] font-bold italic mt-2 leading-relaxed">
              "Care for Planet and People"
            </p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              A balanced approach where agricultural commerce actively feeds regional carbon capture and promotes healthy insect populations.
            </p>
          </div>
        </div>

        {/* 3. DIRECTOR'S VISION MESSAGE */}
        <div className="bg-[#1B5E20] text-amber-50 rounded-3xl p-8 lg:p-12 mb-16 text-left relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 text-white font-serif text-9xl">DTC</div>
          
          <div className="space-y-4 relative z-10">
            <span className="text-xs text-[#FFC107] font-bold block uppercase tracking-wide">Director's Statement</span>
            <h3 className="text-xl sm:text-2xl font-bold">"Apiculture is the custodian of regional flora"</h3>
            <p className="text-sm font-light text-gray-100 leading-relaxed italic">
              "In India, family farms form the absolute backbone of our rural economy. By integrating beehives into standard vegetable orchards, we observe a dramatic rise in crop yields naturally without poisonous chemicals. We build boxes that can withstand rigorous moisture shifts, keeping bees safe and cozy. Join us as we conserve pollinators for tomorrow's generation."
            </p>
            
            <div className="pt-4 flex items-center space-x-3.5 border-t border-white/20">
              <div className="w-12 h-12 rounded-full bg-[#F4B400]/20 flex items-center justify-center font-bold text-lg text-[#FFC107]">YD</div>
              <div>
                <h4 className="text-sm font-bold text-white">Yogesh Dawkhar</h4>
                <p className="text-[11px] text-[#FFC107] block">Director, Dheera Trading Company</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. ENVIRONMENT & QUALITY ASSURANCE */}
        <div className="bg-white border rounded-2xl p-8 text-left space-y-6">
          <h3 className="text-lg font-bold text-gray-950 border-b pb-3">Quality Assurance & Beekeeping Standards</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#2E7D32]">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-bold text-sm text-gray-900">Expert Quality Control Team</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                "Every single box checked by our Expert QC Team." We inspect draft ventilation blocks, dovetail locking tolerance, and internal alignment frames to safeguard swarms perfectly against temperature extremes.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#2E7D32]">
                <Award className="w-5 h-5" />
                <h4 className="font-bold text-sm text-gray-900">Reusable Raw Pine & Cedar Wood</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                "We use sustainable natural raw wood which can re-use and remain sustainable for our eco-system." Organic wood materials absorb hive moisture naturally and maintain excellent insulation parameters during monsoons.
              </p>
            </div>
          </div>

          <div className="bg-[#FFF8E7] p-4 rounded-xl flex items-start space-x-3 border border-[#F4B400]/20">
            <Sparkles className="w-5 h-5 text-[#F4B400] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700 leading-relaxed">
              Whether you are an hobbyist bee lover or managing thousands of commercial Langstroth/ISI deep boxes, DTC guarantees premium food-safe stainless steel (Grade 304), heavy-duty lead-free soldering, and BPA-free polymer frames.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
