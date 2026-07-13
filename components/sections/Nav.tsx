"use client";

import React from 'react';
import Link from 'next/link';
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
export function Nav() {
  const links = [
    { label: 'Why English', href: '#why' },
    { label: 'Our Method', href: '#method' },
    { label: 'A Week Here', href: '#week' },
    { label: 'Life Here', href: '#gallery' },
    { label: 'Student Stories', href: '#stories' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f5f9f1]/85 backdrop-blur-md border-b border-[#d8ded2]">
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between h-[76px]">
        
        {/* Brand Logo */}
        <Link href="#top" className="text-xl font-extrabold tracking-tight z-50 text-[#0b0c0b]">
          English<span className="text-[#09a86f]">Homestay Vietnam</span>
        </Link>

        {/* Desktop Navigation Links (Shadcn NavigationMenu) */}
        <nav className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    render={<Link href={link.href} />}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-[#0b0c0b]/75 hover:text-[#0b0c0b] hover:bg-[#0b0c0b]/5 px-3 py-2 transition-colors duration-200 font-medium"
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
            render={<Link href={'#'} />}
            className="rounded-full border-[#d8ded2] text-[#0b0c0b] hover:bg-black/5 px-6 h-11 text-sm font-medium transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200 hidden lg:inline-flex"
          >
            {'Free Placement Test'}
          </Button>
          
          {/* Primary CTA - always visible */}
          <Button
            nativeButton={false}
            render={<Link href={'#contact'} />}
            className="rounded-full bg-[#09a86f] text-[#f5f9f1] hover:bg-[#089763] px-6 h-11 text-sm font-semibold transition-all shadow-md shadow-success/10 hover:shadow-lg hover:shadow-success/20 hover:-translate-y-0.5 active:translate-y-0 duration-200 z-50"
          >
            {'Book a Free Trial'}
          </Button>

          {/* Shadcn Mobile Drawer (Sheet) */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden p-2 z-50 text-[#0b0c0b] hover:bg-[#0b0c0b]/5 cursor-pointer"
                  aria-label="Toggle menu"
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
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              
              <nav className="flex flex-col gap-1 mt-4">
                {links.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
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
                      render={<Link href={'#'} />}
                      className="rounded-full border-[#d8ded2] text-[#0b0c0b] hover:bg-black/5 w-full text-center h-11 text-sm font-medium transition-all duration-200"
                    />
                  }
                >
                  {'Free Placement Test'}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}