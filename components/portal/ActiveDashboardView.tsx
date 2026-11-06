"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutStudentAction } from "@/app/actions";
import { cn } from "@/lib/utils";
import {
  Flame,
  Award,
  Zap,
  Sparkles,
  Calendar,
  ShieldCheck,
  GraduationCap,
  Clock,
  MapPin,
} from "lucide-react";
import { StudentProfileDropdown } from "./StudentProfileDropdown";
import { PictureMatchGame } from "./games/PictureMatchGame";
import { TopicCategorization } from "./games/TopicCategorization";

interface ActiveDashboardViewProps {
  user: {
    id: number | string;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    status?: string | null;
    studentId?: string | null;
    cohort?: string | null;
    xp?: number | null;
    streak?: number | null;
  };
}

export function ActiveDashboardView({ user }: ActiveDashboardViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [xp, setXp] = useState(Number(user.xp) || 50);
  const streak = Number(user.streak) || 1;
  const cohort = user.cohort || "Hà Nội Batch 3 — Spring 2026";
  const studentId = user.studentId || `EHV-2026-${String(user.id).padStart(3, "0")}`;
  const displayName = user.name || "Học viên EHV";
  const userInitial = (displayName[0] || "H").toUpperCase();

  // Active Tab state: 'games' | 'schedule'
  const [activeTab, setActiveTab] = useState<"games" | "schedule">("games");

  // Categorization: selected topic (topic -> game)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  function handleLogout() {
    startTransition(async () => {
      await logoutStudentAction();
      router.push("/portal/login");
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-white text-[#0b0c0b] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#d8ded2] sticky top-0 z-40">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="English Homestay Logo"
                width={34}
                height={34}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                priority
              />
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#0b0c0b]">
                English<span className="text-[#09a86f]">Homestay</span>
              </span>
            </Link>
          </div>

          {/* User Profile Dropdown */}
          <StudentProfileDropdown
            user={{
              ...user,
              studentId,
              cohort,
              xp,
              streak,
            }}
            onLogout={handleLogout}
            isPending={isPending}
            onNavigateToSchedule={() => setActiveTab("schedule")}
          />

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1140px] mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Gamification Bar */}
        <div className="bg-white border border-[#d8ded2] rounded-sm p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-12 h-12 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center shrink-0 text-[#09a86f]">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-[#0b0c0b]">
                  {displayName}
                </h1>
                <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-[#09a86f] text-white">
                  Active Student
                </span>
              </div>
              <p className="text-xs text-[#6f736d] mt-0.5">
                Lớp: <strong className="text-[#0b0c0b]">{cohort}</strong>
              </p>
            </div>
          </div>

          {/* Stats Pills */}
          <div className="flex items-center gap-2.5 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
            
            {/* Streak */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-amber-50 border border-amber-200">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
              <div>
                <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Streak</p>
                <p className="text-sm font-extrabold text-amber-900">{streak} Ngày</p>
              </div>
            </div>

            {/* XP Points */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#e9ffe0] border border-[#bbffa6]">
              <Zap className="w-5 h-5 text-[#09a86f] fill-[#09a86f]" />
              <div>
                <p className="text-[10px] font-bold text-[#09a86f] uppercase tracking-wider">Tổng XP</p>
                <p className="text-sm font-extrabold text-[#0b0c0b]">{xp} XP</p>
              </div>
            </div>

            {/* Level Rank */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white border border-[#d8ded2]">
              <Award className="w-5 h-5 text-[#09a86f]" />
              <div>
                <p className="text-[10px] font-bold text-[#6f736d] uppercase tracking-wider">Xếp hạng</p>
                <p className="text-sm font-extrabold text-[#0b0c0b]">Explorer</p>
              </div>
            </div>

          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#d8ded2] pb-3">
          <button
            onClick={() => setActiveTab("games")}
            className={cn(
              "px-4 py-2 rounded-sm text-xs sm:text-sm font-bold transition-all cursor-pointer",
              activeTab === "games"
                ? "bg-[#09a86f] text-white"
                : "bg-white text-[#6f736d] border border-[#d8ded2] hover:bg-black/5 hover:text-[#0b0c0b]"
            )}
          >
            Nhiệm vụ & Minigames
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={cn(
              "px-4 py-2 rounded-sm text-xs sm:text-sm font-bold transition-all cursor-pointer",
              activeTab === "schedule"
                ? "bg-[#09a86f] text-white"
                : "bg-white text-[#6f736d] border border-[#d8ded2] hover:bg-black/5 hover:text-[#0b0c0b]"
            )}
          >
            Lịch sinh hoạt Homestay
          </button>
        </div>

        {/* Tab 1: Games Content */}
        {activeTab === "games" && (
          <div className="space-y-4">
            {!selectedTopic ? (
              /* Topic Categorization Section: topic -> game */
              <TopicCategorization
                onSelectTopic={(topicId) => setSelectedTopic(topicId)}
                selectedTopicId={selectedTopic}
              />
            ) : (
              /* Single Game View: Picture Match Game */
              <PictureMatchGame
                topicId={selectedTopic}
                onBackToTopics={() => setSelectedTopic(null)}
                onSelectTopic={(t) => setSelectedTopic(t)}
                onAddXp={(val) => setXp((prev) => prev + val)}
              />
            )}
          </div>
        )}

        {/* Tab 2: Schedule Content */}
        {activeTab === "schedule" && (
          <div className="bg-white border border-[#d8ded2] rounded-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0b0c0b]">
                  Lịch sinh hoạt Homestay tuần này
                </h3>
                <p className="text-xs text-[#6f736d]">
                  Thời khóa biểu các buổi giao lưu cùng tình nguyện viên quốc tế
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{cohort}</span>
              </div>
            </div>

            <div className="divide-y divide-[#d8ded2] pt-2">
              {/* Event 1 */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] font-bold text-xs whitespace-nowrap shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Thứ 2 – Thứ 6</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-sm text-[#0b0c0b]">Morning Coffee Talk</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6f736d] bg-white px-2 py-0.5 rounded-sm border border-[#d8ded2]">
                        <Clock className="w-3 h-3 text-[#09a86f]" />
                        07:30 – 08:30
                      </span>
                    </div>
                    <p className="text-xs text-[#6f736d] mt-1">
                      Thực hành nói tiếng Anh tự do theo chủ đề ngày mới cùng bạn bè
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b0c0b] bg-white px-3 py-1.5 rounded-sm border border-[#d8ded2] shrink-0 self-start sm:self-auto">
                  <MapPin className="w-3.5 h-3.5 text-[#09a86f]" />
                  <span>Phòng sinh hoạt chung</span>
                </span>
              </div>

              {/* Event 2 */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] font-bold text-xs whitespace-nowrap shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Thứ 7</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-sm text-[#0b0c0b]">Outdoor City Walking Tour</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6f736d] bg-white px-2 py-0.5 rounded-sm border border-[#d8ded2]">
                        <Clock className="w-3 h-3 text-[#09a86f]" />
                        15:00 – 18:00
                      </span>
                    </div>
                    <p className="text-xs text-[#6f736d] mt-1">
                      Dẫn bạn bè quốc tế dạo phố và giới thiệu ẩm thực đặc sắc Hà Nội
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b0c0b] bg-white px-3 py-1.5 rounded-sm border border-[#d8ded2] shrink-0 self-start sm:self-auto">
                  <MapPin className="w-3.5 h-3.5 text-[#09a86f]" />
                  <span>Đi dã ngoại</span>
                </span>
              </div>

              {/* Event 3 */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] font-bold text-xs whitespace-nowrap shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Chủ Nhật</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-sm text-[#0b0c0b]">Homestay Movie & Pizza Night</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6f736d] bg-white px-2 py-0.5 rounded-sm border border-[#d8ded2]">
                        <Clock className="w-3 h-3 text-[#09a86f]" />
                        19:30 – 21:30
                      </span>
                    </div>
                    <p className="text-xs text-[#6f736d] mt-1">
                      Xem phim tiếng Anh có thảo luận nhóm và ăn tối ấm cúng cùng nhau
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b0c0b] bg-white px-3 py-1.5 rounded-sm border border-[#d8ded2] shrink-0 self-start sm:self-auto">
                  <MapPin className="w-3.5 h-3.5 text-[#09a86f]" />
                  <span>Rạp phim Homestay</span>
                </span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-sm bg-white border border-[#d8ded2] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#0b0c0b]">
                <ShieldCheck className="w-4 h-4 text-[#09a86f]" />
                <span>Cần đổi lịch hoặc đăng ký hoạt động thêm?</span>
              </div>
              <a
                href="https://zalo.me/0866081995"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#09a86f] hover:underline"
              >
                Nhắn Giáo vụ qua Zalo
              </a>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
