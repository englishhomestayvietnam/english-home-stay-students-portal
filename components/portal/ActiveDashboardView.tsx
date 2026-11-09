"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";
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

  const [mainContentRef] = useAutoAnimate<HTMLElement>({
    duration: 180,
    easing: "ease-out",
  });
  const [gamesStageRef] = useAutoAnimate<HTMLDivElement>({
    duration: 180,
    easing: "ease-out",
  });

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
      <main
        ref={mainContentRef}
        className="flex-1 max-w-[1140px] mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in duration-200"
      >

        {/* Gamification Bar */}
        <div className="bg-white border border-[#d8ded2] rounded-sm p-4 sm:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 overflow-hidden">
          
          <div className="flex items-center gap-3 sm:gap-3.5 w-full md:w-auto min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center shrink-0 text-[#09a86f]">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-xl font-extrabold text-[#0b0c0b] truncate">
                  {displayName}
                </h1>
                <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-[#09a86f] text-white whitespace-nowrap">
                  Active Student
                </span>
              </div>
              <p className="text-xs text-[#6f736d] mt-0.5 truncate">
                Lớp: <strong className="text-[#0b0c0b]">{cohort}</strong>
              </p>
            </div>
          </div>

          {/* Stats Pills */}
          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3.5 w-full md:w-auto">
            
            {/* Streak */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-sm bg-amber-50 border border-amber-200 min-w-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-bold text-amber-800 uppercase tracking-wider whitespace-nowrap">
                  Streak
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-amber-900 whitespace-nowrap">
                  {streak} Ngày
                </p>
              </div>
            </div>

            {/* XP Points */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] min-w-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#09a86f] fill-[#09a86f] shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-bold text-[#09a86f] uppercase tracking-wider whitespace-nowrap">
                  Tổng XP
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-[#0b0c0b] whitespace-nowrap">
                  {xp} XP
                </p>
              </div>
            </div>

            {/* Level Rank */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-sm bg-white border border-[#d8ded2] min-w-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#09a86f] shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-bold text-[#6f736d] uppercase tracking-wider whitespace-nowrap">
                  Xếp hạng
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-[#0b0c0b] whitespace-nowrap">
                  Explorer
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2 border-b border-[#d8ded2] pb-3">
          <button
            onClick={() => setActiveTab("games")}
            className={cn(
              "h-9 px-4 rounded-sm text-xs sm:text-sm font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center whitespace-nowrap",
              activeTab === "games"
                ? "bg-[#09a86f] text-white"
                : "bg-white text-[#6f736d] border border-[#d8ded2] hover:bg-black/5 hover:text-[#0b0c0b]"
            )}
          >
            Minigames
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={cn(
              "h-9 px-4 rounded-sm text-xs sm:text-sm font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center whitespace-nowrap",
              activeTab === "schedule"
                ? "bg-[#09a86f] text-white"
                : "bg-white text-[#6f736d] border border-[#d8ded2] hover:bg-black/5 hover:text-[#0b0c0b]"
            )}
          >
            Lịch sinh hoạt
          </button>
        </div>

        {/* Tab 1: Games Content */}
        {activeTab === "games" && (
          <div ref={gamesStageRef} className="space-y-4">
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
          <div className="bg-white border border-[#d8ded2] rounded-sm p-4 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#d8ded2]">
              <h3 className="text-sm sm:text-base font-bold text-[#0b0c0b]">
                Lịch sinh hoạt tuần này
              </h3>
              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 h-6 px-2.5 rounded-sm text-[11px] font-bold bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6]">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>{cohort}</span>
              </span>
            </div>

            <div className="divide-y divide-[#d8ded2]">
              {/* Event 1 */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 h-6 px-2 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] font-bold text-[11px] whitespace-nowrap">
                    <Calendar className="w-3 h-3" />
                    <span>Thứ 2 – Thứ 6</span>
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-[#0b0c0b]">
                    Morning Coffee Talk
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6f736d]">
                    <Clock className="w-3 h-3 text-[#09a86f]" />
                    <span>07:30 – 08:30</span>
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-[#6f736d]">
                  <MapPin className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
                  <span>Phòng sinh hoạt chung</span>
                </span>
              </div>

              {/* Event 2 */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 h-6 px-2 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] font-bold text-[11px] whitespace-nowrap">
                    <Calendar className="w-3 h-3" />
                    <span>Thứ 7</span>
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-[#0b0c0b]">
                    Outdoor City Walking Tour
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6f736d]">
                    <Clock className="w-3 h-3 text-[#09a86f]" />
                    <span>15:00 – 18:00</span>
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-[#6f736d]">
                  <MapPin className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
                  <span>Đi dã ngoại</span>
                </span>
              </div>

              {/* Event 3 */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 h-6 px-2 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] font-bold text-[11px] whitespace-nowrap">
                    <Calendar className="w-3 h-3" />
                    <span>Chủ Nhật</span>
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-[#0b0c0b]">
                    Homestay Movie & Pizza Night
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6f736d]">
                    <Clock className="w-3 h-3 text-[#09a86f]" />
                    <span>19:30 – 21:30</span>
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-[#6f736d]">
                  <MapPin className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
                  <span>Rạp phim Homestay</span>
                </span>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
