import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Hero Section component - displays at the top of the landing page.
 * Renders either a full-screen background video or a fallback Ken Burns animated image.
 */
export function Hero() {
  const posterUrl = 'https://picsum.photos/seed/homestay-hero/1600/1200';

  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden text-white p-0" id="top">
      {/* Background Media Container: Contains the image/video & opacity overlay */}
      <div className="absolute inset-0 overflow-hidden bg-tertiary">
        <Image
          src={posterUrl}
          alt="Students laughing together during an English Homestay conversation session"
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
        <h1 className="t-display text-white max-w-[780px]" dangerouslySetInnerHTML={{ __html: 'English Homestay' }}></h1>
        <p className="t-body-lg text-white/85 max-w-[560px] mt-4">Practice english every day</p>
        <div className="flex gap-3.5 mt-8 flex-wrap">
          {/* Primary CTA button using shadcn */}
          <Button
            nativeButton={false}
            render={<Link href={'#'} />}
            className="rounded-full bg-[#09a86f] text-[#f5f9f1] hover:bg-[#089763] px-6 h-11 text-sm font-semibold transition-all shadow-md shadow-success/10 hover:shadow-lg hover:shadow-success/20 hover:-translate-y-0.5 active:translate-y-0 duration-200"
          >
            {'Get Started'}
          </Button>
          
          {/* Secondary CTA button using shadcn - stylized with glassmorphic borders */}
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={'#'} />}
            className="rounded-full border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 h-11 text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200"
          >
            {'Take a Free Placement Test'}
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator overlay */}
      <div className="absolute bottom-6 right-6 z-10 text-white/70 flex items-center gap-2 text-xs tracking-wider uppercase after:content-[''] after:w-[1px] after:h-[28px] after:bg-white/50 after:animate-scrolldrop">
        Scroll
      </div>
    </section>
  );
}
