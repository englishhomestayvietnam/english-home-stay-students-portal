"use client";

import React, { useState, useMemo } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
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

  const [containerRef] = useAutoAnimate<HTMLDivElement>({
    duration: 180,
    easing: "ease-out",
  });
  const [gridRef] = useAutoAnimate<HTMLDivElement>({
    duration: 200,
    easing: "ease-out",
  });

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
    <div ref={containerRef} className="space-y-4">
      {/* ─── Compact Filter & Search Bar ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Level Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveLevel("all")}
            className={cn(
              "h-8 px-3 rounded-sm text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer border inline-flex items-center justify-center",
              activeLevel === "all"
                ? "bg-[#09a86f] text-white border-[#09a86f]"
                : "bg-white text-[#6f736d] border-[#d8ded2] hover:bg-[#f5f9f1] hover:text-[#0b0c0b]"
            )}
          >
            Tất cả ({levelCounts.all})
          </button>

          {CEFR_LEVELS.map((lvl) => {
            const isActive = activeLevel === lvl.id;
            const count = levelCounts[lvl.id] || 0;
            return (
              <button
                key={lvl.id}
                onClick={() => setActiveLevel(lvl.id)}
                className={cn(
                  "h-8 px-3 rounded-sm text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer border inline-flex items-center justify-center gap-1",
                  isActive
                    ? "bg-[#09a86f] text-white border-[#09a86f]"
                    : "bg-white text-[#0b0c0b] border-[#d8ded2] hover:border-[#09a86f] hover:bg-[#f5f9f1]"
                )}
              >
                <span>{lvl.id}</span>
                <span
                  className={cn(
                    "text-[10px]",
                    isActive ? "text-white/85" : "text-[#6f736d]"
                  )}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 text-[#6f736d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery.trim() ? searchQuery : ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm chủ đề hoặc từ vựng..."
            className="w-full h-8 pl-8 pr-7 text-xs bg-white border border-[#d8ded2] rounded-sm text-[#0b0c0b] placeholder-[#6f736d] focus:outline-none focus:border-[#09a86f]"
          />
          {searchQuery.trim() && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#6f736d] hover:text-[#0b0c0b] cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ─── Topics Grid (2 columns on mobile & tablet, 3 columns on desktop) ─── */}
      {filteredTopics.length > 0 ? (
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5"
        >
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
                  "group bg-white border rounded-sm p-3 sm:p-4 transition-all duration-150 cursor-pointer flex flex-col justify-between hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] hover:border-[#09a86f] min-w-0",
                  isSelected
                    ? "border-[#09a86f] ring-2 ring-[#09a86f]/20 bg-[#f5f9f1]/40"
                    : "border-[#d8ded2]"
                )}
              >
                <div>
                  {/* Top Row: Icon + Level Badge + Word Count (Equal Height Badges) */}
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center text-[#09a86f] group-hover:bg-[#09a86f] group-hover:text-white transition-colors shrink-0">
                      <IconComponent className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      {/* CEFR Level Badge */}
                      <span
                        className={cn(
                          "inline-flex items-center justify-center h-6 px-1.5 sm:px-2 text-[10px] font-bold leading-none rounded-sm border whitespace-nowrap",
                          levelInfo.badgeBg,
                          levelInfo.badgeText,
                          levelInfo.badgeBorder
                        )}
                        title={levelInfo.description}
                      >
                        <span className="sm:hidden">{topic.level}</span>
                        <span className="hidden sm:inline">{levelInfo.name}</span>
                      </span>

                      {/* Word Count Badge */}
                      <span className="inline-flex items-center justify-center h-6 px-1.5 sm:px-2 text-[10px] font-semibold leading-none rounded-sm bg-[#f5f9f1] border border-[#d8ded2] text-[#6f736d] whitespace-nowrap">
                        {topic.wordCount} từ
                      </span>
                    </div>
                  </div>

                  {/* Title & Meaning */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0b0c0b] group-hover:text-[#09a86f] transition-colors line-clamp-1">
                      {topic.nameEn}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#09a86f] mt-0.5 line-clamp-1">
                      {topic.nameVi}
                    </p>
                  </div>

                  {/* Description (Desktop / Tablet only so mobile 2-col cards stay loose & airy) */}
                  <p className="hidden sm:line-clamp-2 text-[11px] text-[#6f736d] mt-1.5 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Bottom Row: Sample Words Preview Chips & CTA */}
                <div className="mt-3.5 sm:pt-2.5 sm:border-t sm:border-[#d8ded2]/70 space-y-2">
                  <div className="hidden sm:flex flex-wrap gap-1">
                    {topic.previewWords.map((word) => (
                      <span
                        key={word}
                        className="text-[10px] font-mono px-1.5 py-0.2 bg-[#f5f9f1] border border-[#e2e8dc] text-[#6f736d] rounded-sm"
                      >
                        {word}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-1 text-xs">
                    <span className="text-[11px] font-bold text-[#09a86f] group-hover:underline inline-flex items-center gap-1 whitespace-nowrap">
                      <span>Chọn trò chơi</span>
                      <ArrowRight className="w-3 h-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="hidden sm:inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-semibold leading-none bg-[#e9ffe0] text-[#09a86f] rounded-sm whitespace-nowrap">
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
