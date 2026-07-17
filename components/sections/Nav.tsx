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
  const defaultLinks = [
    { label: 'Tại sao chọn chúng tôi', href: '#why' },
    { label: 'Phương pháp', href: '#method' },
    { label: 'Lịch trình', href: '#week' },
    { label: 'Hình ảnh', href: '#gallery' },
    { label: 'Học viên', href: '#stories' },
    { label: 'Hỏi đáp', href: '#faq' },
  ];

  const links = data?.links?.length ? data.links : defaultLinks;
  const logoText = data?.logo_text || 'English Homestay VN';
  const primaryCtaLabel = data?.primary_cta_label || 'Học thử';
  const primaryCtaUrl = data?.primary_cta_url || '#contact';
  const secondaryCtaLabel = data?.secondary_cta_label || 'Thi thử';
  const secondaryCtaUrl = data?.secondary_cta_url || '#';

  const logoParts = logoText.split('Homestay');

  return (
    <header className="sticky top-0 z-50 bg-[#f5f9f1]/85 backdrop-blur-md border-b border-[#d8ded2]">
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between h-[76px]">
        
        {/* Brand Logo */}
        <Link href="#top" className="z-50 flex items-center gap-3">
          <Image src="/logo.svg" alt="English Homestay Logo" width={48} height={48} className="w-12 h-12" />
          <span className="text-2xl font-extrabold tracking-tight text-[#0b0c0b]">
            {logoParts[0]}
            {logoParts.length > 1 && <span className="text-[#09a86f]">Homestay</span>}
            {logoParts.slice(1).join('Homestay')}
          </span>
        </Link>

        {/* Desktop Navigation Links (Shadcn NavigationMenu) */}
        <nav className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {links.map((link: any) => (
                <NavigationMenuItem key={link.href || link.url}>
                  <NavigationMenuLink
                    render={<Link href={link.href || link.url} />}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-[#0b0c0b]/75 hover:text-[#0b0c0b] hover:bg-[#0b0c0b]/5 px-3 py-2 transition-colors duration-200 font-medium whitespace-nowrap text-xs xl:text-sm"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Global Action CTAs */}
        <div className="flex items-center gap-3">
          {/* Secondary CTA - hidden on tablet/mobile viewport */}
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={secondaryCtaUrl} />}
            className="rounded-full border-[#d8ded2] text-[#0b0c0b] hover:bg-black/5 px-6 h-11 text-sm font-medium transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200 hidden lg:inline-flex"
          >
            {secondaryCtaLabel}
          </Button>
          
          {/* Primary CTA - always visible */}
          <div className="relative group p-[2px] sm:p-[3px] rounded-full overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 z-50 shrink-0">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#09a86f_0%,#ffffff_50%,#09a86f_100%)]" />
            <Link 
              href={primaryCtaUrl}
              className="relative flex items-center justify-center h-[34px] sm:h-[38px] px-3 sm:px-6 rounded-full bg-[#09a86f] text-white hover:bg-[#089763] text-[13px] sm:text-sm font-bold transition-colors z-10 whitespace-nowrap"
            >
              {primaryCtaLabel}
            </Link>
          </div>

          {/* Shadcn Mobile Drawer (Sheet) */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden p-2 z-50 text-[#0b0c0b] hover:bg-[#0b0c0b]/5 cursor-pointer"
                  aria-label="Mở menu"
                />
              }
            >
              <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                <span className="block w-6 h-0.5 bg-[#0b0c0b] rounded" />
                <span className="block w-6 h-0.5 bg-[#0b0c0b] rounded" />
                <span className="block w-6 h-0.5 bg-[#0b0c0b] rounded" />
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
                  render={
                    <Button
                      variant="outline"
                      nativeButton={false}
                      render={<Link href={secondaryCtaUrl} />}
                      className="rounded-full border-[#d8ded2] text-[#0b0c0b] hover:bg-black/5 w-full text-center h-11 text-sm font-medium transition-all duration-200"
                    />
                  }
                >
                  {secondaryCtaLabel}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}