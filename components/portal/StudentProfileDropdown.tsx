"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  LogOut,
  Calendar,
  MessageCircle,
  PhoneCall,
  Copy,
  Check,
  Flame,
  Zap,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

interface StudentProfileDropdownProps {
  user: {
    id?: number | string | null;
    name?: string | null;
    email?: string | null;
    studentId?: string | null;
    cohort?: string | null;
    role?: string | null;
    status?: string | null;
    xp?: number | null;
    streak?: number | null;
  };
  onLogout: () => void;
  isPending?: boolean;
  onNavigateToSchedule?: () => void;
}

export function StudentProfileDropdown({
  user,
  onLogout,
  isPending = false,
  onNavigateToSchedule,
}: StudentProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user.name || "Học viên EHV";
  const userInitial = (displayName[0] || "H").toUpperCase();
  const studentId = user.studentId || (user.id ? `EHV-2026-${String(user.id).padStart(3, "0")}` : "EHV-2026-001");
  const cohort = user.cohort || "Hà Nội Batch 3 — Spring 2026";
  const email = user.email || "";
  const isActive = user.status === "active";

  // Close dropdown on click outside or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleCopyId(e: React.MouseEvent) {
    e.stopPropagation();
    if (studentId) {
      navigator.clipboard.writeText(studentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-sm bg-white border transition-all cursor-pointer select-none",
          isOpen
            ? "border-[#09a86f] bg-[#f5f9f1]/60 ring-1 ring-[#09a86f]/20"
            : "border-[#d8ded2] hover:border-[#09a86f]/40 hover:bg-[#f5f9f1]/40"
        )}
      >
        {/* Avatar initial */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-[#09a86f] text-white flex items-center justify-center text-xs font-bold shrink-0">
          {userInitial}
        </div>

        {/* User text details (Desktop) */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-[#0b0c0b] max-w-[130px] truncate leading-tight">
            {displayName}
          </span>
          <span className="text-[10px] text-[#6f736d] font-mono leading-tight mt-0.5">
            {studentId}
          </span>
        </div>

        {/* Chevron Icon */}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-[#6f736d] transition-transform duration-150",
            isOpen && "rotate-180 text-[#09a86f]"
          )}
        />
      </button>

      {/* Dropdown Menu Modal/Panel */}
      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-72 sm:w-80 bg-white border border-[#d8ded2] rounded-sm z-50 animate-in fade-in-50 zoom-in-95 duration-100"
          style={{ transformOrigin: "top right" }}
        >
          {/* Header Section: User Card */}
          <div className="p-4 border-b border-[#d8ded2] bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] text-[#09a86f] flex items-center justify-center font-bold text-sm shrink-0">
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-[#0b0c0b] truncate">{displayName}</p>
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-sm text-[9px] font-bold uppercase",
                      isActive
                        ? "bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6]"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    )}
                  >
                    {isActive ? "Active" : "Pending"}
                  </span>
                </div>
                {email && (
                  <p className="text-xs text-[#6f736d] truncate mt-0.5">{email}</p>
                )}
              </div>
            </div>

            {/* Student ID Pill with Copy button */}
            <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-sm bg-white border border-[#d8ded2]">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#6f736d] font-medium">Mã HV:</span>
                <span className="font-mono font-bold text-[#0b0c0b]">{studentId}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#09a86f] hover:text-[#089763] cursor-pointer"
                title="Sao chép mã học viên"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            {/* Cohort information */}
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#6f736d]">
              <GraduationCap className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
              <span className="truncate">{cohort}</span>
            </div>
          </div>

          {/* Gamification snapshot (if active student) */}
          {isActive && (
            <div className="p-3 bg-white border-b border-[#d8ded2] grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-sm bg-amber-50/70 border border-amber-200/80 flex items-center justify-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <div className="text-left">
                  <p className="text-[9px] uppercase font-bold text-amber-800">Streak</p>
                  <p className="text-xs font-extrabold text-amber-900">{user.streak || 1} Ngày</p>
                </div>
              </div>

              <div className="p-2 rounded-sm bg-[#e9ffe0]/70 border border-[#bbffa6]/80 flex items-center justify-center gap-1.5">
                <Zap className="w-4 h-4 text-[#09a86f] fill-[#09a86f] shrink-0" />
                <div className="text-left">
                  <p className="text-[9px] uppercase font-bold text-[#09a86f]">Điểm</p>
                  <p className="text-xs font-extrabold text-[#0b0c0b]">{user.xp || 50} XP</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions List */}
          <div className="p-1.5 space-y-0.5">
            {onNavigateToSchedule && (
              <button
                type="button"
                onClick={() => {
                  onNavigateToSchedule();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#0b0c0b] hover:bg-[#f5f9f1] rounded-sm transition-colors text-left cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#09a86f] shrink-0" />
                <span>Lịch sinh hoạt Homestay</span>
              </button>
            )}

            <a
              href="https://zalo.me/0866081995"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#0b0c0b] hover:bg-[#f5f9f1] rounded-sm transition-colors text-left cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#0068FF] shrink-0" />
              <span>Hỗ trợ qua Zalo giáo vụ</span>
            </a>

            <a
              href="tel:0968199900"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#0b0c0b] hover:bg-[#f5f9f1] rounded-sm transition-colors text-left cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#09a86f] shrink-0" />
              <span>Hotline: 096 819 99 00</span>
            </a>
          </div>

          {/* Footer Action: Logout */}
          <div className="p-1.5 border-t border-[#d8ded2] bg-white">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              disabled={isPending}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-sm transition-colors text-left cursor-pointer disabled:opacity-50"
            >
              <LogOut className="w-4 h-4 text-red-600 shrink-0" />
              <span>{isPending ? "Đang đăng xuất..." : "Đăng xuất tài khoản"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
