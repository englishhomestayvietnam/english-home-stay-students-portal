"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Navigation Bar Component - rendered at the top of the viewport.
 * Uses shadcn navigation components (NavigationMenu, Sheet, Button)
 * with base-ui primitives for smooth accessibility and responsiveness.
 */
export function Nav({ data }: { data?: any }) {
  const links = [
    { label: data?.links?.why || 'Tại sao chọn chúng tôi', href: '#why' },
    { label: data?.links?.method || 'Phương pháp', href: '#method' },
    { label: data?.links?.week || 'Thông tin các khóa học', href: '#week' },
    { label: data?.links?.gallery || 'Hình ảnh', href: '#gallery' },
    { label: data?.links?.stories || 'Học viên', href: '#stories' },
    { label: data?.links?.faq || 'Hỏi đáp', href: '#faq' },
  ];
  const logoText = data?.logo_text || 'English Homestay VN';
  const primaryCtaLabel = data?.primary_cta_label || 'Học thử miễn phí';
  const secondaryCtaLabel = data?.secondary_cta_label || 'Tư vấn 1-1';

  const logoParts = logoText.split('Homestay');

  return (
    <header className="sticky top-0 z-50 bg-[#f5f9f1]/90 backdrop-blur-md border-b border-[#d8ded2]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12 flex items-center justify-between h-[68px] sm:h-[76px]">
        
        {/* Brand Logo */}
        <Link href="#top" className="z-50 flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Image src="/logo.svg" alt="English Homestay Logo" width={48} height={48} className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 object-contain" priority loading="eager" />
          <span className="hidden sm:inline-block text-base sm:text-lg xl:text-xl font-extrabold tracking-tight text-[#0b0c0b] whitespace-nowrap">
            {logoParts[0]}
            {logoParts.length > 1 && <span className="text-[#09a86f]">Homestay</span>}
            {logoParts.slice(1).join('Homestay')}
          </span>
        </Link>

        {/* Desktop Navigation Links (Shadcn NavigationMenu) */}
        <nav className="hidden xl:flex items-center mx-3 2xl:mx-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-0 2xl:gap-1">
              {links.map((link: any) => (
                <NavigationMenuItem key={link.href || link.url}>
                  <NavigationMenuLink
                    render={<Link href={link.href || link.url} />}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-[#0b0c0b]/75 hover:text-[#0b0c0b] hover:bg-[#0b0c0b]/5 px-2 2xl:px-3 py-2 transition-colors duration-200 font-medium whitespace-nowrap text-xs 2xl:text-sm"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Global Action CTAs & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Student Portal CTA */}
          <Link
            href="/portal"
            className="rounded-full border border-[#d8ded2] text-[#0b0c0b] hover:bg-black/5 hover:border-[#09a86f]/40 active:scale-95 px-3.5 xl:px-4.5 h-9.5 xl:h-10 text-xs xl:text-[13.5px] font-medium transition-all duration-150 hidden xl:inline-flex items-center justify-center shrink-0 cursor-pointer bg-white whitespace-nowrap"
          >
            Cổng học viên
          </Link>
          
          {/* Primary CTA ("Học thử miễn phí") - Visible outside on BOTH mobile & desktop */}
          <div className="relative inline-flex shrink-0">
            <Link
              href="/register"
              className="relative inline-flex p-[1.5px] sm:p-[2px] overflow-hidden rounded-full active:scale-95 transition-all duration-150 shrink-0 cursor-pointer !shadow-none"
            >
              {/* Rotating Border Gradient Animation */}
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#09a86f_0%,#bbffa6_35%,#ffffff_50%,#09a86f_75%,#09a86f_100%)] pointer-events-none" />

              {/* Inner solid emerald button with Glass Shine sweep */}
              <span className="relative z-10 overflow-hidden flex items-center justify-center h-8.5 sm:h-9.5 px-3.5 sm:px-5 rounded-full bg-[#09a86f] hover:bg-[#089763] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap">
                {/* Diagonal Glass Shine Reflection Sweep */}
                <span className="absolute inset-0 -translate-x-full animate-[shimmerRay_2.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none skew-x-[-20deg]" />

                <span className="relative z-10">{primaryCtaLabel}</span>
              </span>
            </Link>

            {/* Urgency badge positioned cleanly on the right */}
            <span className="absolute -top-1.5 -right-1 z-30 pointer-events-none">
              <span className="relative inline-flex items-center justify-center bg-[#e84e2b] text-white text-[8.5px] font-extrabold rounded-full px-1.5 py-0.5 tracking-tighter shadow-sm">
                HOT
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#e84e2b] opacity-60 animate-[ping_1.4s_ease-out_infinite]" />
              </span>
            </span>
          </div>

          {/* Shadcn Mobile Drawer (Sheet Trigger) */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden p-2 text-[#0b0c0b] hover:bg-[#0b0c0b]/5 cursor-pointer w-10 h-10 flex items-center justify-center"
                  aria-label="Mở menu"
                />
              }
            >
              <div className="w-5 h-4 relative flex flex-col justify-between items-center">
                <span className="block w-5 h-0.5 bg-[#0b0c0b] rounded" />
                <span className="block w-5 h-0.5 bg-[#0b0c0b] rounded" />
                <span className="block w-5 h-0.5 bg-[#0b0c0b] rounded" />
              </div>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-[320px] bg-[#f5f9f1] border-l border-[#d8ded2] p-6 pt-20 flex flex-col justify-between"
            >
              <SheetTitle className="sr-only">Menu Điều hướng</SheetTitle>
              
              <nav className="flex flex-col gap-1 mt-4">
                {links.map((link: any) => (
                  <SheetClose
                    key={link.href || link.url}
                    nativeButton={false}
                    render={
                      <Link
                        href={link.href || link.url}
                        className="text-base font-semibold py-3.5 border-b border-[#d8ded2]/40 text-[#0b0c0b]/80 hover:text-[#0b0c0b] transition-colors duration-200"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>

              {/* Action CTAs in mobile drawer panel */}
              <div className="flex flex-col gap-3 mt-auto">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href="/portal"
                      className="rounded-full border border-[#d8ded2] bg-white text-[#0b0c0b] hover:bg-black/5 w-full flex items-center justify-center h-11 text-sm font-medium transition-all duration-200"
                    >
                      Cổng học viên (Portal)
                    </Link>
                  }
                />
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href="/register"
                      className="rounded-full w-full flex items-center justify-center h-12 text-sm font-bold bg-[#09a86f] hover:bg-[#089763] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    >
                      ✨ {primaryCtaLabel}
                    </Link>
                  }
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
