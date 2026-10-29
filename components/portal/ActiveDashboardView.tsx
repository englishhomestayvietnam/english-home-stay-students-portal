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
  LogOut,
  Coffee,
  CheckCircle2,
  RotateCcw,
  Calendar,
  MessageSquare,
  ShieldCheck,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { StudentProfileDropdown } from "./StudentProfileDropdown";

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

// Interactive Coffee Talk Vocab pairs
const INITIAL_PAIRS = [
  { id: "1", en: "Make yourself at home", vi: "Cứ tự nhiên như ở nhà nhé" },
  { id: "2", en: "Grab a bite", vi: "Ăn nhẹ một chút" },
  { id: "3", en: "Count me in!", vi: "Cho mình tham gia với!" },
  { id: "4", en: "Hit the road", vi: "Khởi hành, lên đường thôi" },
];

// Interactive Situation Quiz Question
const QUIZ_QUESTIONS = [
  {
    id: 1,
    scenario: "Tình nguyện viên Sarah đang nấu bữa tối và hỏi: 'Could you please give me a hand with chopping the veggies?'",
    question: "Bạn nên đáp lại như thế nào tự nhiên và đúng nhất?",
    options: [
      { id: "A", text: "No, I don't have hands.", isCorrect: false },
      { id: "B", text: "Sure thing! Where's the knife and cutting board?", isCorrect: true, explanation: "'Give me a hand' là cụm từ tự nhiên nghĩa là 'giúp một tay'!" },
      { id: "C", text: "Yes, you can take my hand.", isCorrect: false },
    ],
  },
  {
    id: 2,
    scenario: "Buổi sáng tại phòng khách Homestay, bạn Tom hỏi: 'How did you sleep last night?'",
    question: "Câu trả lời tự nhiên nhất theo phong cách bản ngữ là:",
    options: [
      { id: "A", text: "Like a baby! The bed is super comfy.", isCorrect: true, explanation: "'Sleep like a baby' là thành ngữ bản xứ nghĩa là ngủ rất ngon giấc!" },
      { id: "B", text: "I slept on the bed with eyes closed.", isCorrect: false },
      { id: "C", text: "No sleep, only stay.", isCorrect: false },
    ],
  },
];

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

  // Game 1: Matching Game State
  const [selectedWord, setSelectedWord] = useState<{ id: string; type: "en" | "vi" } | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [game1Completed, setGame1Completed] = useState(false);

  // Game 2: Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  function handleLogout() {
    startTransition(async () => {
      await logoutStudentAction();
      router.push("/portal/login");
      router.refresh();
    });
  }

  // Handle word selection in Matching Game
  function handleSelectWord(id: string, type: "en" | "vi") {
    if (matchedIds.includes(id)) return;

    if (!selectedWord) {
      setSelectedWord({ id, type });
      return;
    }

    if (selectedWord.type === type) {
      setSelectedWord({ id, type });
      return;
    }

    // Checking if matching
    if (selectedWord.id === id) {
      const newMatches = [...matchedIds, id];
      setMatchedIds(newMatches);
      setSelectedWord(null);
      setXp((prev) => prev + 25);

      if (newMatches.length === INITIAL_PAIRS.length) {
        setGame1Completed(true);
      }
    } else {
      setSelectedWord(null);
    }
  }

  function resetGame1() {
    setMatchedIds([]);
    setSelectedWord(null);
    setGame1Completed(false);
  }

  function handleQuizAnswer(optionId: string, isCorrect: boolean) {
    if (selectedOption) return;
    setSelectedOption(optionId);
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      setXp((prev) => prev + 30);
    }
  }

  function nextQuizQuestion() {
    setSelectedOption(null);
    if (currentQuizIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  }

  function resetQuiz() {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
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

            <span className="hidden md:inline-block px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6]">
              {cohort}
            </span>
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
              "px-4 py-2 rounded-sm text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2",
              activeTab === "games"
                ? "bg-[#09a86f] text-white"
                : "bg-white text-[#6f736d] border border-[#d8ded2] hover:bg-black/5 hover:text-[#0b0c0b]"
            )}
          >
            <Sparkles className="w-4 h-4" />
            <span>Nhiệm vụ & Minigames</span>
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={cn(
              "px-4 py-2 rounded-sm text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2",
              activeTab === "schedule"
                ? "bg-[#09a86f] text-white"
                : "bg-white text-[#6f736d] border border-[#d8ded2] hover:bg-black/5 hover:text-[#0b0c0b]"
            )}
          >
            <Calendar className="w-4 h-4" />
            <span>Lịch sinh hoạt Homestay</span>
          </button>
        </div>

        {/* Tab 1: Games Content */}
        {activeTab === "games" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Minigame 1: Coffee Talk Vocab Matcher */}
            <div className="bg-white border border-[#d8ded2] rounded-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-sm bg-[#e9ffe0] border border-[#bbffa6]">
                      <Coffee className="w-4 h-4 text-[#09a86f]" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0b0c0b]">Coffee Talk Vocab Matcher</h3>
                      <p className="text-xs text-[#6f736d]">Ghép cặp cụm từ tiếng Anh giao tiếp tự nhiên</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#09a86f] bg-[#e9ffe0] px-2.5 py-1 rounded-sm border border-[#bbffa6]">
                    +25 XP / cặp
                  </span>
                </div>

                {game1Completed ? (
                  <div className="py-8 text-center bg-white rounded-sm border border-[#bbffa6] my-4">
                    <div className="w-12 h-12 mx-auto rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center mb-3 text-[#09a86f]">
                      <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <h4 className="text-base font-bold text-[#0b0c0b]">Xuất sắc! Bạn đã hoàn thành bài ghép từ!</h4>
                    <p className="text-xs text-[#6f736d] mt-1">Đã cộng +100 XP vào tài khoản học viên.</p>
                    <button
                      onClick={resetGame1}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Chơi lại
                    </button>
                  </div>
                ) : (
                  <div className="my-4 space-y-3">
                    <p className="text-xs text-[#6f736d]">
                      Chọn 1 ô Tiếng Anh và 1 ô Tiếng Việt tương ứng để nối cặp:
                    </p>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* English column */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold text-[#6f736d] uppercase">English Phrase</p>
                        {INITIAL_PAIRS.map((item) => {
                          const isMatched = matchedIds.includes(item.id);
                          const isSelected = selectedWord?.id === item.id && selectedWord?.type === "en";
                          return (
                            <button
                              key={`en-${item.id}`}
                              disabled={isMatched}
                              onClick={() => handleSelectWord(item.id, "en")}
                              className={cn(
                                "w-full p-2.5 rounded-sm text-xs font-bold text-left transition-all border cursor-pointer",
                                isMatched
                                  ? "bg-[#e9ffe0] border-[#09a86f] text-[#09a86f] opacity-60 cursor-default line-through"
                                  : isSelected
                                  ? "bg-[#bbffa6] border-[#09a86f] text-[#0b0c0b] scale-[1.01]"
                                  : "bg-white border-[#d8ded2] text-[#0b0c0b] hover:bg-[#f5f9f1]"
                              )}
                            >
                              {item.en}
                            </button>
                          );
                        })}
                      </div>

                      {/* Vietnamese column */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold text-[#6f736d] uppercase">Ý nghĩa tiếng Việt</p>
                        {INITIAL_PAIRS.map((item) => {
                          const isMatched = matchedIds.includes(item.id);
                          const isSelected = selectedWord?.id === item.id && selectedWord?.type === "vi";
                          return (
                            <button
                              key={`vi-${item.id}`}
                              disabled={isMatched}
                              onClick={() => handleSelectWord(item.id, "vi")}
                              className={cn(
                                "w-full p-2.5 rounded-sm text-xs font-medium text-left transition-all border cursor-pointer",
                                isMatched
                                  ? "bg-[#e9ffe0] border-[#09a86f] text-[#09a86f] opacity-60 cursor-default line-through"
                                  : isSelected
                                  ? "bg-[#bbffa6] border-[#09a86f] text-[#0b0c0b] scale-[1.01]"
                                  : "bg-white border-[#d8ded2] text-[#0b0c0b] hover:bg-[#f5f9f1]"
                              )}
                            >
                              {item.vi}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#d8ded2] flex items-center justify-between text-[11px] text-[#6f736d]">
                <span>Đã nối: {matchedIds.length}/{INITIAL_PAIRS.length} cặp</span>
                <span className="text-[#09a86f] font-semibold">Tự động cập nhật XP</span>
              </div>
            </div>

            {/* Minigame 2: Homestay Scenario Challenge */}
            <div className="bg-white border border-[#d8ded2] rounded-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-sm bg-[#e9ffe0] border border-[#bbffa6]">
                      <MessageSquare className="w-4 h-4 text-[#09a86f]" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0b0c0b]">Homestay Real Scenario</h3>
                      <p className="text-xs text-[#6f736d]">Xử lý tình huống giao tiếp thực tế với Tây</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#09a86f] bg-[#e9ffe0] px-2.5 py-1 rounded-sm border border-[#bbffa6]">
                    +30 XP
                  </span>
                </div>

                {quizFinished ? (
                  <div className="py-8 text-center bg-white rounded-sm border border-[#bbffa6] my-4">
                    <div className="w-12 h-12 mx-auto rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center mb-3 text-[#09a86f]">
                      <Trophy className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <h4 className="text-base font-bold text-[#0b0c0b]">
                      Bạn đã hoàn thành thử thách tình huống!
                    </h4>
                    <p className="text-xs text-[#6f736d] mt-1">
                      Điểm đúng: {quizScore}/{QUIZ_QUESTIONS.length} câu.
                    </p>
                    <button
                      onClick={resetQuiz}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Thử lại
                    </button>
                  </div>
                ) : (
                  <div className="my-4 space-y-3">
                    <div className="p-3 bg-white rounded-sm border border-[#d8ded2]">
                      <p className="text-[11px] font-bold text-[#09a86f] uppercase">
                        Tình huống câu {currentQuizIndex + 1}/{QUIZ_QUESTIONS.length}
                      </p>
                      <p className="text-xs sm:text-sm text-[#0b0c0b] font-medium mt-1">
                        {QUIZ_QUESTIONS[currentQuizIndex].scenario}
                      </p>
                    </div>

                    <p className="text-xs font-bold text-[#0b0c0b]">
                      {QUIZ_QUESTIONS[currentQuizIndex].question}
                    </p>

                    <div className="space-y-2">
                      {QUIZ_QUESTIONS[currentQuizIndex].options.map((opt) => {
                        const isChosen = selectedOption === opt.id;
                        return (
                          <button
                            key={opt.id}
                            disabled={Boolean(selectedOption)}
                            onClick={() => handleQuizAnswer(opt.id, opt.isCorrect)}
                            className={cn(
                              "w-full p-3 rounded-sm text-xs sm:text-sm text-left transition-all border flex items-center justify-between",
                              selectedOption
                                ? opt.isCorrect
                                  ? "bg-[#e9ffe0] border-[#09a86f] text-[#09a86f] font-bold"
                                  : isChosen
                                  ? "bg-red-50 border-red-300 text-red-700"
                                  : "bg-white border-[#d8ded2] text-[#6f736d] opacity-50"
                                : "bg-white border-[#d8ded2] text-[#0b0c0b] hover:bg-[#f5f9f1] cursor-pointer"
                            )}
                          >
                            <span>
                              <strong className="mr-2">{opt.id}.</strong> {opt.text}
                            </span>
                            {selectedOption && opt.isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-[#09a86f] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {selectedOption && (
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-[#6f736d]">
                          {QUIZ_QUESTIONS[currentQuizIndex].options.find((o) => o.id === selectedOption)?.explanation || ""}
                        </span>
                        <button
                          onClick={nextQuizQuestion}
                          className="px-4 py-1.5 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors cursor-pointer"
                        >
                          {currentQuizIndex + 1 < QUIZ_QUESTIONS.length ? "Câu tiếp theo" : "Xem kết quả"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#d8ded2] flex items-center justify-between text-[11px] text-[#6f736d]">
                <span>Phản xạ giao tiếp thực tế</span>
                <span className="text-[#09a86f] font-semibold">Tự tin trò chuyện</span>
              </div>
            </div>

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
              <span className="px-3 py-1 rounded-sm text-xs font-bold bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6]">
                Batch: {cohort}
              </span>
            </div>

            <div className="divide-y divide-[#d8ded2] pt-2">
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-white border border-[#d8ded2] flex items-center justify-center font-bold text-xs text-[#09a86f]">
                    T2 - T6
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0b0c0b]">Morning Coffee Talk (7:30 - 8:30)</p>
                    <p className="text-xs text-[#6f736d]">Thực hành nói tiếng Anh tự do theo chủ đề ngày mới</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#09a86f] bg-white px-3 py-1 rounded-sm border border-[#d8ded2] self-start sm:self-auto">
                  Phòng sinh hoạt chung
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-white border border-[#d8ded2] flex items-center justify-center font-bold text-xs text-[#09a86f]">
                    Thứ 7
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0b0c0b]">Outdoor City Walking Tour (15:00 - 18:00)</p>
                    <p className="text-xs text-[#6f736d]">Dẫn bạn bè quốc tế dạo phố và giới thiệu ẩm thực Việt</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#09a86f] bg-white px-3 py-1 rounded-sm border border-[#d8ded2] self-start sm:self-auto">
                  Đi dã ngoại
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-white border border-[#d8ded2] flex items-center justify-center font-bold text-xs text-[#09a86f]">
                    Chủ Nhật
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0b0c0b]">Homestay Movie & Pizza Night (19:30 - 21:30)</p>
                    <p className="text-xs text-[#6f736d]">Xem phim tiếng Anh có thảo luận nhóm và ăn tối cùng nhau</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#09a86f] bg-white px-3 py-1 rounded-sm border border-[#d8ded2] self-start sm:self-auto">
                  Rạp phim Homestay
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
