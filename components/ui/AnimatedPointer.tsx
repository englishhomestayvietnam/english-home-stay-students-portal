"use client";

import React from "react";
import { cn } from "@/lib/utils";

type PointerDirection = "left" | "right" | "up" | "down" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export function AnimatedPointer({
  direction = "top-right",
  label,
  className,
  delay = 0.6,
}: {
  direction?: PointerDirection;
  label?: string;
  className?: string;
  delay?: number;
}) {
  const directionMap: Record<PointerDirection, string> = {
    left: "rotate-180",
    right: "rotate-0",
    up: "-rotate-90",
    down: "rotate-90",
    "top-left": "rotate-[145deg]",
    "top-right": "-rotate-145deg",
    "bottom-left": "rotate-[35deg]",
    "bottom-right": "-rotate-35deg",
  };

  return (
    <div
      className={cn(
        "pointer-events-none inline-flex items-center gap-2 select-none",
        "animate-[fadeIn_0.5s_ease-out_both]",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={cn(directionMap[direction], "relative")}>
        <svg
          width="72"
          height="52"
          viewBox="0 0 72 52"
          fill="none"
          className={cn(
            "block",
            "drop-shadow-[0_4px_10px_rgba(9,168,111,0.35)]",
            "animate-[wigglePointer_2.2s_ease-in-out_infinite]"
          )}
          style={{ animationDelay: `${delay + 0.2}s` }}
        >
          <path
            d="M3 32 C 10 46, 22 22, 32 22 C 42 22, 44 34, 50 30"
            stroke="#09a86f"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M68 6 L 48 20 L 56 4 L 68 6 Z"
            fill="#09a86f"
            stroke="#09a86f"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="38" r="2.5" fill="#09a86f" opacity="0.7" />
        </svg>
      </div>

      {label && (
        <div
          className={cn(
            "relative",
            "animate-[bounceY_1.8s_ease-in-out_infinite]",
            "before:content-[''] before:absolute before:w-0 before:h-0",
            "before:border-t-[8px] before:border-t-transparent",
            "before:border-b-[8px] before:border-b-transparent",
            "before:border-r-[10px] before:border-r-[var(--color-success)]",
            "before:-left-2 before:top-1/2 before:-translate-y-1/2"
          )}
          style={{ animationDelay: `${delay + 0.4}s` }}
        >
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5",
              "bg-[var(--color-success)] text-white",
              "text-[12px] font-bold whitespace-nowrap",
              "rounded-full shadow-[0_4px_14px_rgba(9,168,111,0.35)]",
              "tracking-tight"
            )}
          >
            <span className="text-[14px]">✨</span>
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
