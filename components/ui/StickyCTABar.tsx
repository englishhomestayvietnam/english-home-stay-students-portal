"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";

export function SignupModalProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useSignupModal() {
  return {
    open: false,
    openModal: () => {},
    closeModal: () => {},
    onOpenChange: () => {},
    triggerSource: "",
    initialStep: 1,
  };
}

export function StickyCTABar({ data }: { data?: any }) {
  const [visible, setVisible] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const isEnabled = data?.enable !== false;
  const headline = data?.headline || 'Học thử miễn phí cùng tình nguyện viên quốc tế';
  const subtext = data?.subtext || 'Trải nghiệm môi trường tiếng Anh homestay thực tế';
  const ctaLabel = data?.cta_label || 'Đăng ký ngay';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 550);
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        setNearBottom(rect.top < window.innerHeight * 0.8);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isEnabled || dismissed) return null;

  return (
    <aside
      aria-label="Đăng ký học thử"
      className={cn(
        "fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[85]",
        "w-[calc(100%-2rem)] max-w-[700px]",
        "transition-all duration-300 ease-out",
        visible && !nearBottom
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-12 opacity-0 pointer-events-none"
      )}
    >
      {/* Animated Flowing Gradient Border Wrapper */}
      <div className="p-[1.5px] rounded-full bg-gradient-to-r from-[#09a86f] via-[#bbffa6] via-[#09a86f] to-[#a0f585] bg-[length:200%_auto] animate-[gradientShift_4s_linear_infinite] shadow-lg">
        <div className="flex items-center justify-between gap-3 sm:gap-5 bg-white/95 backdrop-blur-md rounded-full py-3 sm:py-3.5 px-4 sm:px-6">
          
          {/* Left Content with Official Logo */}
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
            <Image
              src="/logo.svg"
              alt="English Homestay"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
            />

            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] sm:text-[15px] font-extrabold text-[#0b0c0b] truncate leading-snug">
                {headline}
              </p>
              <p className="text-[11.5px] sm:text-[12.5px] text-[#6f736d] truncate leading-snug mt-0.5 hidden xs:block sm:block">
                {subtext}
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/register"
              className="relative inline-flex p-[1.5px] sm:p-[2px] overflow-hidden rounded-full active:scale-95 transition-all duration-150 cursor-pointer !shadow-none"
            >
              {/* Rotating Border Gradient Animation */}
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#09a86f_0%,#bbffa6_35%,#ffffff_50%,#09a86f_75%,#09a86f_100%)] pointer-events-none" />

              {/* Inner button surface with Glass Shine sweep */}
              <span className="relative z-10 overflow-hidden inline-flex items-center gap-2 bg-[#09a86f] hover:bg-[#089763] text-white font-bold rounded-full px-5 sm:px-6 h-10 sm:h-11 text-xs sm:text-sm transition-colors">
                {/* Diagonal Glass Shine Reflection Sweep */}
                <span className="absolute inset-0 -translate-x-full animate-[shimmerRay_2.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none skew-x-[-20deg]" />

                <span className="relative z-10">{ctaLabel}</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Dismiss Button */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Đóng thông báo"
              className="w-8 h-8 rounded-full text-[#6f736d] hover:text-[#0b0c0b] hover:bg-black/5 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
