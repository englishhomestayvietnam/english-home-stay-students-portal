import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { FadeIn } from '@/components/ui/FadeIn';

/**
 * Hero Section component - displays at the top of the landing page.
 * Renders either a full-screen background video or a fallback Ken Burns animated image.
 */
export function Hero({ data }: { data?: any }) {
  // Extract URL from poster media relation
  const posterUrl = (data?.poster?.imagekit?.url || data?.poster?.url) || 'https://picsum.photos/seed/placeholder/800/600';

  return (
    <section className="relative w-full aspect-[16/9] max-[768px]:aspect-[4/5] flex items-end overflow-hidden text-white p-0" id="top">
      {/* Background Media Container: Contains the image/video & opacity overlay */}
      <div className="absolute inset-0 overflow-hidden bg-tertiary">
        <Image
          src={posterUrl}
          alt={data?.poster?.alt || "Students laughing together during an English Homestay conversation session"}
          fill
          className="object-cover animate-kenburns"
          priority
        />
        {/* Dark opacity (15%) + Gradient overlay to ensure text readability */}
        <div 
          className="absolute inset-0 pointer-events-none bg-tertiary/45 bg-gradient-to-b bg-black/50"
        />
      </div>

      {/* Hero content foreground layout */}
      <div className="max-w-[1180px] mx-auto px-[5%] relative z-10 pb-[6%] w-full">
        <FadeIn>
          <h1 className="t-display text-white max-w-[780px] leading-[1.1] max-[768px]:text-[26px] max-[480px]:text-[20px]" dangerouslySetInnerHTML={{ __html: data?.headline || 'English Homestay' }}></h1>
          <p className="text-sm text-white/85 max-w-[560px] mt-[2%] max-[768px]:text-[15px] max-[480px]:text-[13px] max-[768px]:mt-2">{data?.subheadline || 'Luyện tiếng Anh mỗi ngày'}</p>
          <div className="flex gap-[2%] mt-[4%] max-[768px]:mt-3 flex-wrap">
            {/* Primary CTA button */}
            <Link href={'#'} className="btn btn-primary">
              {data?.primary_cta_label || 'Bắt đầu ngay'}
            </Link>
            
            {/* Secondary CTA button */}
            <Link href={'#'} className="btn btn-secondary border-white/50 text-white hover:bg-white/20 backdrop-blur-md">
              {data?.secondary_cta_label || 'Kiểm tra trình độ miễn phí'}
            </Link>
          </div>
        </FadeIn>
      </div>
      
      {/* Scroll indicator overlay - hidden on very small screens since 16:9 is short */}
      <div className="absolute bottom-[4%] right-[4%] z-10 text-white/70 flex items-center gap-2 text-[10px] tracking-wider uppercase after:content-[''] after:w-[1px] after:h-[20px] after:bg-white/50 after:animate-scrolldrop max-[600px]:hidden">
        Scroll
      </div>
    </section>
  );
}
