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
  const posterUrl = data?.poster?.url || 'https://picsum.photos/seed/homestay-hero/1600/1200';

  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden text-white p-0" id="top">
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
      <div className="max-w-[1180px] mx-auto px-6 relative z-10 pb-24 w-full">
        <FadeIn>
          <h1 className="t-display text-white max-w-[780px]" dangerouslySetInnerHTML={{ __html: data?.headline || 'English Homestay' }}></h1>
          <p className="t-body-lg text-white/85 max-w-[560px] mt-4">{data?.subheadline || 'Practice english every day'}</p>
          <div className="flex gap-3.5 mt-8 flex-wrap">
            {/* Primary CTA button */}
            <Link href={'#'} className="btn btn-primary">
              {data?.primary_cta_label || 'Get Started'}
            </Link>
            
            {/* Secondary CTA button */}
            <Link href={'#'} className="btn btn-secondary border-white/50 text-white hover:bg-white/20 backdrop-blur-md">
              {data?.secondary_cta_label || 'Take a Free Placement Test'}
            </Link>
          </div>
        </FadeIn>
      </div>
      
      {/* Scroll indicator overlay */}
      <div className="absolute bottom-6 right-6 z-10 text-white/70 flex items-center gap-2 text-xs tracking-wider uppercase after:content-[''] after:w-[1px] after:h-[28px] after:bg-white/50 after:animate-scrolldrop">
        Scroll
      </div>
    </section>
  );
}
