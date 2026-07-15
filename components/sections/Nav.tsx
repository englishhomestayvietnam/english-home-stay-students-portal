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
    { label: 'Why Us', href: '#why' },
    { label: 'Our Method', href: '#method' },
    { label: 'Daily Routine', href: '#week' },
    { label: 'Campus Life', href: '#gallery' },
    { label: 'Testimonials', href: '#stories' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f5f9f1]/85 backdrop-blur-md border-b border-[#d8ded2]">
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between h-[76px]">
        
        {/* Brand Logo */}
        <Link href="#top" className="text-xl font-extrabold tracking-tight z-50 text-[#0b0c0b]">
          English<span className="text-[#09a86f]">Homestay</span>
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
            {'Free Test'}
          </Button>
          
          {/* Primary CTA - always visible */}
          <div className="relative group p-[2px] sm:p-[3px] rounded-full overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 z-50 shrink-0">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#09a86f_0%,#ffffff_50%,#09a86f_100%)]" />
            <Link 
              href="#contact"
              className="relative flex items-center justify-center h-[34px] sm:h-[38px] px-3 sm:px-6 rounded-full bg-[#09a86f] text-white hover:bg-[#089763] text-[13px] sm:text-sm font-bold transition-colors z-10 whitespace-nowrap"
            >
              Free Trial
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
                  {'Free Test'}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}