'use client';

import { Product } from '@/lib/firebase';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProductDisplayProps {
  product: Product;
}

export default function ProductDisplay({ product }: ProductDisplayProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7f4] via-[#e8f5e9] to-[#e0f2f1] py-4 px-3 sm:py-6 sm:px-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-[#235a49]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-0 w-24 h-24 sm:w-36 sm:h-36 bg-[#235a49]/5 rounded-full translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-20 h-20 sm:w-28 sm:h-28 bg-[#235a49]/5 rounded-full -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-28 h-28 sm:w-40 sm:h-40 bg-[#235a49]/5 rounded-full translate-y-1/2"></div>
      </div>

      <div className={`max-w-md mx-auto relative z-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Header with Logo */}
        <div className="text-center mb-4 sm:mb-6">
          <div className={`flex justify-center mb-2 sm:mb-3 transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Image
              src="/anveshan-logo.png"
              alt="Anveshan Farm"
              width={180}
              height={36}
              className="h-8 sm:h-10 w-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-[#235a49]/10">
            <div className="w-1.5 h-1.5 bg-[#235a49] rounded-full animate-pulse"></div>
            <p className="text-[10px] sm:text-xs text-[#235a49] font-semibold tracking-wider uppercase">
              Product Authentication
            </p>
          </div>
        </div>

        {/* Main Product Card */}
        <div className={`bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Product Header with gradient */}
          <div className="bg-gradient-to-br from-[#235a49] via-[#1e4d3f] to-[#163832] text-white px-4 sm:px-6 py-4 sm:py-5 relative overflow-hidden">
            {/* Animated decorative elements */}
            <div className="absolute -right-8 -top-8 w-28 h-28 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -right-4 top-6 w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full"></div>
            <div className="absolute left-1/2 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-lg"></div>

            <div className="relative">
              <div className="inline-flex items-center bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2">
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/90">
                  {product.category}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold leading-tight">{product.productName}</h1>
            </div>
          </div>

          {/* Verified Badge */}
          <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border-b border-emerald-100 px-4 sm:px-6 py-2.5 sm:py-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-shrink-0">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full"></span>
              </div>
              <div>
                <span className="text-emerald-700 text-xs sm:text-sm font-bold">Verified Authentic</span>
                <span className="text-emerald-600 text-[10px] sm:text-xs ml-1 font-medium">Product</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4 sm:p-6">
            <h2 className="text-xs sm:text-sm font-bold text-[#235a49] uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-[#235a49] to-[#3d8b6e] rounded-full"></span>
              Manufacturing Details
            </h2>

            {/* Modern Card Layout for Mobile */}
            <div className="space-y-2.5 sm:space-y-3">
              {/* Product Name Card */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-3 sm:p-4 border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#235a49]/10 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#235a49]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-800 font-semibold text-right flex-1">{product.productName}</p>
                </div>
              </div>

              {/* FSSAI License Card */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-xl p-3 sm:p-4 border border-amber-200/50 hover:shadow-md hover:border-amber-300/50 transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-md">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
                        <circle cx="12" cy="12" r="10" fill="#1a5f2a" stroke="#fbbf24" strokeWidth="1.5"/>
                        <text x="12" y="10" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">FSSAI</text>
                        <text x="12" y="14" textAnchor="middle" fill="#fbbf24" fontSize="3">License</text>
                        <path d="M6 16 L12 19 L18 16" stroke="#fbbf24" strokeWidth="1" fill="none"/>
                      </svg>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-amber-700 uppercase tracking-wide">FSSAI License</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-800 font-bold text-right flex-1 tracking-wide">{product.fssaiLicense}</p>
                </div>
              </div>

              {/* Manufactured By Card */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#235a49]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#235a49]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">MFD & PKD By</span>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">{product.manufacturedBy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer inside card */}
          <div className="bg-gradient-to-r from-[#235a49] to-[#1a4538] px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <span className="text-[10px] sm:text-xs font-medium">QR Verified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <svg className="w-3.5 h-3.5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] sm:text-xs font-semibold text-white">Secured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className={`mt-5 sm:mt-6 transition-all duration-500 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/anveshan.farms/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group border border-gray-100"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/anveshan.farm/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group border border-gray-100"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Website */}
            <a
              href="https://www.anveshan.farm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group border border-gray-100"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#235a49]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/channel/UCWfwcdRN7z7F394JWWtO53A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group border border-gray-100"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Bottom Footer */}
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl py-3 px-4 border border-white/50">
            <a href="https://www.anveshan.farm" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-[#235a49] font-bold hover:text-[#1a4538] transition-colors">
              Visit anveshan.farm
            </a>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 font-medium">Purity Aur Aapka Personal Connection</p>
          </div>
        </div>
      </div>
    </div>
  );
}
