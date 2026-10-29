"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutStudentAction } from "@/app/actions";
import {
  Clock,
  CheckCircle2,
  Lock,
  MessageCircle,
  PhoneCall,
  LogOut,
  Sparkles,
  Compass,
  Coffee,
  Utensils,
  Gamepad2,
} from "lucide-react";
import { StudentProfileDropdown } from "./StudentProfileDropdown";

interface PendingActivationViewProps {
  user: {
    name?: string | null;
    email?: string | null;
    studentId?: string | null;
    role?: string | null;
    status?: string | null;
  };
}

export function PendingActivationView({ user }: PendingActivationViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutStudentAction();
      router.push("/portal/login");
      router.refresh();
    });
  }

  const displayName = user?.name || "Học viên EHV";
  const userInitial = (displayName[0] || "H").toUpperCase();

  return (
    <div className="min-h-screen bg-white text-[#0b0c0b] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#d8ded2] sticky top-0 z-40">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="English Homestay Logo"
              width={36}
              height={36}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              priority
            />
            <span className="text-lg font-bold tracking-tight text-[#0b0c0b]">
              English<span className="text-[#09a86f]">Homestay</span>
            </span>
          </Link>

          {/* User Profile Dropdown */}
          <StudentProfileDropdown
            user={user}
            onLogout={handleLogout}
            isPending={isPending}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[900px] mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Status Hero Card */}
        <div className="bg-white border border-[#d8ded2] rounded-sm p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 max-w-[650px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-4">
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Đang chờ kích hoạt lớp học</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b0c0b]">
              Xin chào, {displayName}!
            </h1>

            <p className="text-sm text-[#6f736d] mt-3 leading-relaxed">
              Tài khoản của bạn đã được đăng ký thành công trên cổng học viên EHV. Ban quản trị đang tiến hành xác nhận và xếp bạn vào đúng <strong>Homestay Batch</strong>.
            </p>

            <p className="text-xs sm:text-sm text-[#0b0c0b]/80 mt-2 font-medium">
              Sau khi được kích hoạt, bạn sẽ có thể tham gia các minigame luyện từ vựng, tích lũy điểm XP, giữ chuỗi ngày học Streak và xem lịch sinh hoạt homestay.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://zalo.me/0866081995"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0068FF] hover:bg-[#0055d4] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn Zalo xác nhận kích hoạt ngay</span>
              </a>

              <a
                href="tel:0968199900"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#0b0c0b] hover:bg-black/5 border border-[#d8ded2] px-4 py-2.5 rounded-sm bg-white transition-all cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#09a86f]" />
                <span>Hotline: 096 819 99 00</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3-Step Enrollment Progress */}
        <div className="bg-white border border-[#d8ded2] rounded-sm p-6 sm:p-8">
          <h2 className="text-base sm:text-lg font-bold text-[#0b0c0b] mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#09a86f]" />
            Tiến trình kích hoạt tài khoản
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1 */}
            <div className="p-4 rounded-sm bg-white border border-[#bbffa6] relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#09a86f]">Bước 1</span>
                <CheckCircle2 className="w-4 h-4 text-[#09a86f]" />
              </div>
              <p className="font-bold text-sm text-[#0b0c0b]">Tạo tài khoản</p>
              <p className="text-xs text-[#6f736d] mt-1">
                Tài khoản học viên của bạn đã hoàn tất đăng ký.
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold text-[#09a86f] bg-white px-2 py-0.5 rounded-sm border border-[#bbffa6]">
                Đã hoàn thành
              </span>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-sm bg-amber-50/40 border border-amber-200 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-700">Bước 2</span>
                <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              </div>
              <p className="font-bold text-sm text-[#0b0c0b]">Xếp lớp & Phân nhóm</p>
              <p className="text-xs text-[#6f736d] mt-1">
                Admin đang gán Batch và kích hoạt trạng thái học viên.
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold text-amber-700 bg-white px-2 py-0.5 rounded-sm border border-amber-200">
                Đang xử lý
              </span>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-sm bg-white border border-[#d8ded2] relative opacity-75">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#6f736d]">Bước 3</span>
                <Lock className="w-4 h-4 text-[#6f736d]" />
              </div>
              <p className="font-bold text-sm text-[#0b0c0b]">Mở khóa Cổng Game</p>
              <p className="text-xs text-[#6f736d] mt-1">
                Bắt đầu chơi game học từ vựng, tính điểm XP và xem lịch sinh hoạt.
              </p>
              <span className="inline-block mt-2 text-[10px] font-medium text-[#6f736d] bg-white px-2 py-0.5 rounded-sm border border-[#d8ded2]">
                Sẽ tự động mở
              </span>
            </div>

          </div>
        </div>

        {/* Sneak Peek: Homestay Routine preview */}
        <div className="bg-white border border-[#d8ded2] rounded-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0b0c0b] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#09a86f]" />
                Xem trước một ngày tại English Homestay
              </h2>
              <p className="text-xs text-[#6f736d] mt-0.5">
                Những hoạt động bạn sẽ cùng trải nghiệm với bạn bè và tình nguyện viên
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-sm border border-[#d8ded2] bg-white flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center text-[#09a86f] mb-2.5">
                  <Coffee className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm text-[#0b0c0b]">Morning Coffee Talk</p>
                <p className="text-xs text-[#6f736d] mt-1 leading-relaxed">
                  Trò chuyện khởi động ngày mới cùng người nước ngoài qua những chủ đề đời sống tự nhiên.
                </p>
              </div>
              <span className="inline-block mt-3 text-[11px] font-semibold text-[#09a86f]">
                07:30 - 08:30 hàng ngày
              </span>
            </div>

            <div className="p-4 rounded-sm border border-[#d8ded2] bg-white flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center text-[#09a86f] mb-2.5">
                  <Utensils className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm text-[#0b0c0b]">Homestay Kitchen</p>
                <p className="text-xs text-[#6f736d] mt-1 leading-relaxed">
                  Cùng nấu ăn và học các từ vựng về gia vị, món ăn, chia sẻ văn hóa với bạn bè quốc tế.
                </p>
              </div>
              <span className="inline-block mt-3 text-[11px] font-semibold text-[#09a86f]">
                Bữa trưa & Bữa tối
              </span>
            </div>

            <div className="p-4 rounded-sm border border-[#d8ded2] bg-white flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center text-[#09a86f] mb-2.5">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm text-[#0b0c0b]">Evening Boardgames</p>
                <p className="text-xs text-[#6f736d] mt-1 leading-relaxed">
                  Buổi tối thư giãn với Werewolf, Taboo, Just One bằng tiếng Anh, cười thả ga và phản xạ nhanh.
                </p>
              </div>
              <span className="inline-block mt-3 text-[11px] font-semibold text-[#09a86f]">
                19:30 - 21:00 hàng ngày
              </span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
