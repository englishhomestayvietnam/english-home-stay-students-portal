"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  TOPICS_LIST,
  TOPIC_CATEGORIES,
  CEFR_LEVELS,
  TopicMeta,
  CEFRLevel,
} from "@/lib/games-data";
import {
  Users,
  Home,
  Clock,
  Utensils,
  Coffee,
  ShoppingBag,
  Shirt,
  Briefcase,
  GraduationCap,
  Languages,
  Calendar,
  MapPin,
  Compass,
  Car,
  CloudSun,
  Smile,
  HeartPulse,
  Heart,
  Sparkles,
  MessageSquare,
  Music,
  Trophy,
  Sun,
  Coins,
  Building2,
  AlertCircle,
  LifeBuoy,
  Target,
  Globe,
  Search,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

// Icon mapping helper
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Home,
  Clock,
  Utensils,
  Coffee,
  ShoppingBag,
  Shirt,
  Briefcase,
  GraduationCap,
  Languages,
  Calendar,
  MapPin,
  Compass,
  Car,
  CloudSun,
  Smile,
  HeartPulse,
  Heart,
  Sparkles,
  MessageSquare,
  Music,
  Trophy,
  Sun,
  Coins,
  Building2,
  AlertCircle,
  LifeBuoy,
  Target,
  Globe,
};

interface TopicCategorizationProps {
  onSelectTopic: (topicId: string) => void;
  selectedTopicId?: string | null;
}

export function TopicCategorization({
  onSelectTopic,
  selectedTopicId,
}: TopicCategorizationProps) {
  const [activeLevel, setActiveLevel] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Count topics per level
  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = { all: TOPICS_LIST.length };
    TOPICS_LIST.forEach((t) => {
      counts[t.level] = (counts[t.level] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter topics based on active level, category & search query
  const filteredTopics = useMemo(() => {
    return TOPICS_LIST.filter((topic) => {
      // Level filter
      if (activeLevel !== "all" && topic.level !== activeLevel) {
        return false;
      }
      // Category filter
      if (activeCategory !== "all" && topic.category !== activeCategory) {
        return false;
      }
      // Search query
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchEn = topic.nameEn.toLowerCase().includes(query);
        const matchVi = topic.nameVi.toLowerCase().includes(query);
        const matchDesc = topic.description.toLowerCase().includes(query);
        const matchLevel = topic.level.toLowerCase() === query;
        const matchWords = topic.previewWords.some((w) =>
          w.toLowerCase().includes(query)
        );
        return matchEn || matchVi || matchDesc || matchLevel || matchWords;
      }
      return true;
    });
  }, [activeLevel, activeCategory, searchQuery]);

  return (
    <div className="space-y-5">
      {/* ─── Hero Intro Banner ─── */}
      <div className="bg-white border border-[#d8ded2] rounded-sm p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] text-[10px] font-bold uppercase tracking-wider">
                Phân loại bài học
              </span>
              <span className="text-xs text-[#6f736d] font-semibold">
                Level &rarr; Topic &rarr; Minigame
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0b0c0b]">
              Danh mục chủ đề từ vựng & Trình độ CEFR
            </h2>
            <p className="text-xs sm:text-sm text-[#6f736d] max-w-2xl">
              Lựa chọn theo trình độ tiếng Anh (A1 &ndash; B2) hoặc theo nhóm chủ đề sinh hoạt để luyện tập nối hình ảnh, tăng phản xạ giao tiếp tự nhiên cùng tình nguyện viên quốc tế.
            </p>
          </div>

          {/* Quick All-Words Mode CTA */}
          <button
            onClick={() => onSelectTopic("ALL")}
            className="self-start md:self-auto px-4 py-2.5 rounded-sm bg-[#09a86f] text-white hover:bg-[#089763] transition-all cursor-pointer shadow-xs flex items-center gap-2 text-xs font-bold shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#bbffa6]" />
            <span>Thử thách Tổng hợp (600 từ)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ─── Level Filter Tabs (A1 -> B2) ─── */}
        <div className="mt-5 pt-4 border-t border-[#d8ded2] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#6f736d] uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3 text-[#09a86f]" />
              Lọc theo trình độ (Level):
            </span>
            <span className="text-[11px] text-[#6f736d]">
              Đang hiển thị: <strong className="text-[#09a86f]">{filteredTopics.length}</strong> / {TOPICS_LIST.length} chủ đề
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveLevel("all")}
              className={cn(
                "px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all cursor-pointer border",
                activeLevel === "all"
                  ? "bg-[#09a86f] text-white border-[#09a86f]"
                  : "bg-white text-[#6f736d] border-[#d8ded2] hover:bg-[#f5f9f1] hover:text-[#0b0c0b]"
              )}
            >
              Tất cả Level ({levelCounts.all})
            </button>

            {CEFR_LEVELS.map((lvl) => {
              const isActive = activeLevel === lvl.id;
              const count = levelCounts[lvl.id] || 0;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevel(lvl.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5",
                    isActive
                      ? "bg-[#0b0c0b] text-white border-[#0b0c0b]"
                      : `${lvl.badgeBg} ${lvl.badgeText} ${lvl.badgeBorder} hover:opacity-90`
                  )}
                >
                  <span>{lvl.emoji}</span>
                  <span>{lvl.name}</span>
                  <span className="text-[10px] opacity-80">({count})</span>
                </button>
              );
            })}
          </div>

          {/* ─── Secondary Filter: Topic Category + Search ─── */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#f0f4ee]">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {TOPIC_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-2.5 py-1 rounded-sm text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer",
                      isActive
                        ? "bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] font-bold"
                        : "bg-[#f5f9f1] text-[#6f736d] border border-[#d8ded2] hover:text-[#0b0c0b]"
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-[#6f736d] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery.trim() ? searchQuery : ""}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm chủ đề, từ vựng, A1..."
                className="w-full pl-8 pr-3 py-1 text-xs bg-white border border-[#d8ded2] rounded-sm text-[#0b0c0b] placeholder-[#6f736d] focus:outline-none focus:border-[#09a86f]"
              />
              {searchQuery.trim() && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#6f736d] hover:text-[#0b0c0b] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Topics Grid ─── */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTopics.map((topic) => {
            const IconComponent = ICON_MAP[topic.iconName] || Sparkles;
            const isSelected = selectedTopicId === topic.id;
            const levelInfo =
              CEFR_LEVELS.find((l) => l.id === topic.level) || CEFR_LEVELS[0];

            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className={cn(
                  "group bg-white border rounded-sm p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-sm hover:border-[#09a86f]",
                  isSelected
                    ? "border-[#09a86f] ring-2 ring-[#09a86f]/20 bg-[#f5f9f1]/40"
                    : "border-[#d8ded2]"
                )}
              >
                <div>
                  {/* Top Row: Icon + Level Badge + Word Count */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="w-9 h-9 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center text-[#09a86f] group-hover:bg-[#09a86f] group-hover:text-white transition-colors">
                      <IconComponent className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* CEFR Level Badge */}
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-sm border",
                          levelInfo.badgeBg,
                          levelInfo.badgeText,
                          levelInfo.badgeBorder
                        )}
                        title={levelInfo.description}
                      >
                        {levelInfo.name}
                      </span>

                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-sm bg-[#f5f9f1] border border-[#d8ded2] text-[#6f736d]">
                        {topic.wordCount} từ
                      </span>
                    </div>
                  </div>

                  {/* Title & Meaning */}
                  <div>
                    <h3 className="text-sm font-bold text-[#0b0c0b] group-hover:text-[#09a86f] transition-colors flex items-center gap-1.5">
                      <span>{topic.nameEn}</span>
                    </h3>
                    <p className="text-xs font-semibold text-[#09a86f] mt-0.5">
                      {topic.nameVi}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-[#6f736d] mt-1.5 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Bottom Row: Sample Words Preview Chips & CTA */}
                <div className="mt-3.5 pt-2.5 border-t border-[#d8ded2]/70 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {topic.previewWords.map((word) => (
                      <span
                        key={word}
                        className="text-[10px] font-mono px-1.5 py-0.2 bg-[#f5f9f1] border border-[#e2e8dc] text-[#6f736d] rounded-xs"
                      >
                        {word}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[11px] font-bold text-[#09a86f] group-hover:underline flex items-center gap-1">
                      Chọn trò chơi
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-[10px] font-semibold bg-[#e9ffe0] text-[#09a86f] px-1.5 py-0.2 rounded-xs">
                      4 Minigames
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-[#d8ded2] rounded-sm p-10 text-center space-y-3">
          <div className="w-10 h-10 mx-auto rounded-sm bg-[#f5f9f1] border border-[#d8ded2] flex items-center justify-center text-[#6f736d]">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0b0c0b]">
            Không tìm thấy chủ đề phù hợp
          </h3>
          <p className="text-xs text-[#6f736d]">
            Vui lòng thử xóa bộ lọc trình độ hoặc nhập từ khóa tìm kiếm khác.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveLevel("all");
              setActiveCategory("all");
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Xem tất cả chủ đề</span>
          </button>
        </div>
      )}
    </div>
  );
}
