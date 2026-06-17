import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

/**
 * Optimizes Google Drive (lh3.googleusercontent.com/d/) and Unsplash image URLs
 * by appending dimension flags and conversion tags to leverage server-side resizing
 * and modern image compression formats (WebP).
 */
export function getOptimizedSrc(src: string, width: number = 600, options: { format?: string; blur?: boolean } = {}) {
  if (!src) return '';

  // 1. Check for Google User Content/Drive images
  if (src.includes('lh3.googleusercontent.com')) {
    // Strip existing sizing parameters that might be appended after '='
    let baseUrl = src;
    const lastEqIndex = src.lastIndexOf('=');
    if (lastEqIndex !== -1 && lastEqIndex > src.indexOf('.com/d/')) {
      baseUrl = src.substring(0, lastEqIndex);
    }

    if (options.blur) {
      // Tiny 30px width with '-rw' suffix telling Google to convert & serve WebP format
      return `${baseUrl}=w30-rw`;
    } else {
      const sizeParam = `w${width}`;
      const formatParam = options.format || 'rw'; // rw converts to WebP natively
      return `${baseUrl}=${sizeParam}-${formatParam}`;
    }
  }

  // 2. Check for Unsplash images
  if (src.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(src);
      // set output format and dynamic width
      urlObj.searchParams.set('fm', options.blur ? 'webp' : (options.format || 'webp'));
      if (options.blur) {
        urlObj.searchParams.set('w', '30');
        urlObj.searchParams.set('q', '15');
        urlObj.searchParams.set('blur', '8');
      } else {
        urlObj.searchParams.set('w', width.toString());
        urlObj.searchParams.set('q', '80');
      }
      return urlObj.toString();
    } catch (e) {
      return src;
    }
  }

  // 3. Fallback for generic URLs
  return src;
}

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'placeholder'> {
  src: string;
  alt: string;
  width?: number; // Target optimized width (e.g. 100, 300, 600, 1200)
  height?: number; // Target height if applicable
  className?: string; // Sizing, rounding, or positioning styles on the image/wrapper
  wrapperClassName?: string; // Custom styling for the wrapping element
  placeholder?: 'blur' | 'shimmer' | 'none';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 600,
  height,
  className = '',
  wrapperClassName = '',
  placeholder = 'blur',
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Lazy loading Intersection Observer
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Pre-fetch 200px before appearing on screen
        threshold: 0.01
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  // Generate URLs
  const highResSrc = getOptimizedSrc(src, width);
  const blurSrc = getOptimizedSrc(src, 30, { blur: true });
  
  // Decide what style/features are on the wrapper vs style of the image itself
  // Extract block display, sizing, clipping and hover classes to build a robust wrapper container.
  const hasDimensions = className.includes('w-') || className.includes('h-');
  const sizeClasses = className.match(/\b(w-\S+|h-\S+|aspect-\S+|px-\S+|py-\S+|p-\S+|m-\S+)\b/g)?.join(' ') || '';
  const blockClasses = className.match(/\b(block|inline-block|inline|grid|flex|relative|absolute|fixed|overflow-hidden)\b/g)?.join(' ') || '';
  const roundingClasses = className.match(/\b(rounded\S+|border\S+|shadow\S+)\b/g)?.join(' ') || '';
  
  // Combine extracted styles to decorate the wrapper cleanly
  const finalWrapperClass = `relative overflow-hidden ${blockClasses} ${sizeClasses} ${roundingClasses} ${
    !hasDimensions ? 'w-full h-full' : ''
  } ${wrapperClassName}`.trim();

  // Strip extracted styles from the ultimate image element if they duplicate on layout
  const cleanedImageClass = className
    .replace(/\b(rounded\S+|border\S+|shadow\S+)\b/g, '')
    .trim();

  // Determine if dynamic blurring is supported for this resource
  const supportsBlur = src.includes('lh3.googleusercontent.com') || src.includes('images.unsplash.com');
  const activePlaceholder = supportsBlur ? placeholder : (placeholder === 'blur' ? 'shimmer' : placeholder);

  return (
    <div ref={wrapperRef} className={finalWrapperClass}>
      {/* 1. Shimmer Skeleton Placeholder */}
      {activePlaceholder === 'shimmer' && !isLoaded && (
        <div 
          id={`shimmer-${alt.replace(/\s+/g, '-').toLowerCase()}`}
          className="absolute inset-0 bg-neutral-100 animate-pulse bg-gradient-to-r from-neutral-100 via-neutral-150 to-neutral-100" 
        />
      )}

      {/* 2. Low-Resolution Blur-Up Placeholder */}
      {activePlaceholder === 'blur' && blurSrc && (
        <motion.img
          src={blurSrc}
          alt={`Blurry preview of ${alt}`}
          className={`absolute inset-0 w-full h-full object-cover filter blur-md scale-[1.05] pointer-events-none ${cleanedImageClass}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* 3. Highly-optimized High-Resolution Image (Vetted & loaded on viewport proximity) */}
      {isInView ? (
        <motion.img
          src={highResSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`w-full h-full object-cover ${cleanedImageClass}`}
          width={width}
          height={height}
          {...rest}
        />
      ) : (
        // Render an empty structural block if not in viewport yet to keep spacing accurate
        <div className="w-full h-full" />
      )}
    </div>
  );
};
