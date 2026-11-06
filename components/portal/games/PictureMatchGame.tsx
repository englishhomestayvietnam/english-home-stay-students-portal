"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Volume2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Trophy,
  Layers,
  Grid,
  FileText,
  Puzzle,
  Undo2,
  Lightbulb,
  GripVertical,
} from "lucide-react";
import {
  getPictureMatchQuestions,
  getPictureMatchPairs,
  getFillInBlankQuestions,
  getSentenceBuilderQuestions,
  getTopicMeta,
  VocabWord,
} from "@/lib/games-data";

interface PictureMatchGameProps {
  onAddXp: (amount: number) => void;
  topicId?: string | null;
  onBackToTopics?: () => void;
  onSelectTopic?: (topicId: string) => void;
}

const OPTION_KEYS = ["A", "B", "C", "D"];

export function PictureMatchGame({
  onAddXp,
  topicId,
  onBackToTopics,
}: PictureMatchGameProps) {
  // Modes: null (game selection hub) | 'quiz' | 'grid' | 'fill' | 'sentence'
  const [mode, setMode] = useState<"quiz" | "grid" | "fill" | "sentence" | null>(null);

  // ─── Quiz Mode State ──────────────────────────────────────────────────────────
  const [quizQuestions, setQuizQuestions] = useState<
    ReturnType<typeof getPictureMatchQuestions>
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // ─── Grid Match Mode State ───────────────────────────────────────────────────
  const [gridPairs, setGridPairs] = useState<VocabWord[]>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<VocabWord[]>([]);
  const [selectedEnglishId, setSelectedEnglishId] = useState<number | null>(null);
  const [selectedMeaningId, setSelectedMeaningId] = useState<number | null>(null);
  const [wrongPair, setWrongPair] = useState<{ enId: number; viId: number } | null>(null);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [isGridCompleted, setIsGridCompleted] = useState(false);

  // ─── Fill-in-the-Blank Mode State ────────────────────────────────────────────
  const [fillQuestions, setFillQuestions] = useState<
    ReturnType<typeof getFillInBlankQuestions>
  >([]);
  const [fillIndex, setFillIndex] = useState(0);
  const [selectedFillWord, setSelectedFillWord] = useState<string | null>(null);
  const [fillScore, setFillScore] = useState(0);
  const [isFillCompleted, setIsFillCompleted] = useState(false);

  // ─── Sentence Builder Mode State ─────────────────────────────────────────────
  const [sentenceQuestions, setSentenceQuestions] = useState<
    ReturnType<typeof getSentenceBuilderQuestions>
  >([]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [placedWords, setPlacedWords] = useState<{ id: string; word: string }[]>([]);
  const [availableWords, setAvailableWords] = useState<{ id: string; word: string }[]>([]);
  const [isSentenceChecked, setIsSentenceChecked] = useState(false);
  const [isSentenceCorrect, setIsSentenceCorrect] = useState(false);
  const [sentenceScore, setSentenceScore] = useState(0);
  const [isSentenceCompleted, setIsSentenceCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<{
    id: string;
    word: string;
    source: "available" | "placed";
    sourceIndex?: number;
  } | null>(null);
  const [isOverSentenceZone, setIsOverSentenceZone] = useState(false);
  const [dragOverPlacedIndex, setDragOverPlacedIndex] = useState<number | null>(null);
  const [isOverAvailableZone, setIsOverAvailableZone] = useState(false);

  // Initialize or re-initialize when topicId changes
  useEffect(() => {
    setMode(null);
    setQuizQuestions(getPictureMatchQuestions(5, topicId));
    const pairs = getPictureMatchPairs(4, topicId);
    setGridPairs(pairs);
    setShuffledMeanings([...pairs].sort(() => 0.5 - Math.random()));
    setFillQuestions(getFillInBlankQuestions(5, topicId));
    const sQuestions = getSentenceBuilderQuestions(5, topicId);
    setSentenceQuestions(sQuestions);

    setCurrentIndex(0);
    setSelectedWord(null);
    setScore(0);
    setIsQuizCompleted(false);

    setSelectedEnglishId(null);
    setSelectedMeaningId(null);
    setWrongPair(null);
    setMatchedIds([]);
    setIsGridCompleted(false);

    setFillIndex(0);
    setSelectedFillWord(null);
    setFillScore(0);
    setIsFillCompleted(false);

    setSentenceIndex(0);
    setPlacedWords([]);
    setAvailableWords(sQuestions[0] ? [...sQuestions[0].scrambledWords] : []);
    setIsSentenceChecked(false);
    setIsSentenceCorrect(false);
    setSentenceScore(0);
    setIsSentenceCompleted(false);
  }, [topicId]);

  // Audio pronunciation helper
  function playPronunciation(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  }

  // Auto-play audio when question loads in Quiz mode
  useEffect(() => {
    if (mode === "quiz" && quizQuestions.length > 0 && quizQuestions[currentIndex]) {
      playPronunciation(quizQuestions[currentIndex].target.word);
    }
  }, [currentIndex, quizQuestions, mode]);

  // Reset sentence tray when sentenceIndex changes
  useEffect(() => {
    if (sentenceQuestions[sentenceIndex]) {
      setPlacedWords([]);
      setAvailableWords([...sentenceQuestions[sentenceIndex].scrambledWords]);
      setIsSentenceChecked(false);
      setIsSentenceCorrect(false);
    }
  }, [sentenceIndex, sentenceQuestions]);

  // Handle Quiz answer
  function handleSelectQuizOption(word: string, isCorrect: boolean) {
    if (selectedWord) return;
    setSelectedWord(word);
    playPronunciation(word);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      onAddXp(25);
    }
  }

  function handleNextQuizQuestion() {
    setSelectedWord(null);
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  }

  function resetQuiz() {
    setQuizQuestions(getPictureMatchQuestions(5, topicId));
    setCurrentIndex(0);
    setSelectedWord(null);
    setScore(0);
    setIsQuizCompleted(false);
  }

  // ─── Grid Match Handlers ────────────────────────────────────────────────────
  function handleSelectEnglishCard(item: VocabWord) {
    if (matchedIds.includes(item.id) || wrongPair) return;
    setSelectedEnglishId(item.id);
    playPronunciation(item.word);

    if (selectedMeaningId !== null) {
      checkGridMatch(item.id, selectedMeaningId);
    }
  }

  function handleSelectMeaningCard(item: VocabWord) {
    if (matchedIds.includes(item.id) || wrongPair) return;
    setSelectedMeaningId(item.id);

    if (selectedEnglishId !== null) {
      checkGridMatch(selectedEnglishId, item.id);
    }
  }

  function checkGridMatch(enId: number, viId: number) {
    if (enId === viId) {
      const nextMatches = [...matchedIds, enId];
      setMatchedIds(nextMatches);
      setSelectedEnglishId(null);
      setSelectedMeaningId(null);
      setWrongPair(null);
      onAddXp(25);

      if (nextMatches.length === gridPairs.length) {
        setTimeout(() => {
          setIsGridCompleted(true);
        }, 350);
      }
    } else {
      setWrongPair({ enId, viId });
      setTimeout(() => {
        setSelectedEnglishId(null);
        setSelectedMeaningId(null);
        setWrongPair(null);
      }, 650);
    }
  }

  function resetGrid() {
    const pairs = getPictureMatchPairs(4, topicId);
    setGridPairs(pairs);
    setShuffledMeanings([...pairs].sort(() => 0.5 - Math.random()));
    setMatchedIds([]);
    setSelectedEnglishId(null);
    setSelectedMeaningId(null);
    setWrongPair(null);
    setIsGridCompleted(false);
  }

  // ─── Fill-in-the-Blank Handlers ──────────────────────────────────────────────
  function handleSelectFillOption(word: string, isCorrect: boolean, exampleSentence: string) {
    if (selectedFillWord) return;
    setSelectedFillWord(word);

    if (isCorrect) {
      setFillScore((prev) => prev + 1);
      onAddXp(30);
      playPronunciation(exampleSentence);
    } else {
      playPronunciation(word);
    }
  }

  function handleNextFillQuestion() {
    setSelectedFillWord(null);
    if (fillIndex + 1 < fillQuestions.length) {
      setFillIndex((prev) => prev + 1);
    } else {
      setIsFillCompleted(true);
    }
  }

  function resetFill() {
    setFillQuestions(getFillInBlankQuestions(5, topicId));
    setFillIndex(0);
    setSelectedFillWord(null);
    setFillScore(0);
    setIsFillCompleted(false);
  }

  // ─── Sentence Builder Handlers (Click + Drag & Drop) ─────────────────────────
  function handlePickSentenceWord(item: { id: string; word: string }) {
    if (isSentenceChecked) return;
    setPlacedWords((prev) => [...prev, item]);
    setAvailableWords((prev) => prev.filter((w) => w.id !== item.id));
  }

  function handleReturnSentenceWord(item: { id: string; word: string }) {
    if (isSentenceChecked) return;
    setPlacedWords((prev) => prev.filter((w) => w.id !== item.id));
    setAvailableWords((prev) => [...prev, item]);
  }

  function handleDragStartAvailable(
    e: React.DragEvent<HTMLButtonElement>,
    item: { id: string; word: string }
  ) {
    if (isSentenceChecked) return;
    setDraggedItem({ id: item.id, word: item.word, source: "available" });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
  }

  function handleDragStartPlaced(
    e: React.DragEvent<HTMLButtonElement>,
    item: { id: string; word: string },
    index: number
  ) {
    if (isSentenceChecked) return;
    setDraggedItem({
      id: item.id,
      word: item.word,
      source: "placed",
      sourceIndex: index,
    });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
  }

  function handleDragEndSentence() {
    setDraggedItem(null);
    setIsOverSentenceZone(false);
    setDragOverPlacedIndex(null);
    setIsOverAvailableZone(false);
  }

  function handleDropOnSentenceZone(
    e: React.DragEvent<HTMLElement>,
    targetIndex?: number
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedItem || isSentenceChecked) {
      handleDragEndSentence();
      return;
    }

    if (draggedItem.source === "available") {
      const itemToMove = availableWords.find((w) => w.id === draggedItem.id);
      if (itemToMove) {
        setAvailableWords((prev) => prev.filter((w) => w.id !== itemToMove.id));
        setPlacedWords((prev) => {
          const next = [...prev];
          const insertIdx =
            targetIndex !== undefined ? targetIndex : next.length;
          next.splice(insertIdx, 0, itemToMove);
          return next;
        });
      }
    } else if (
      draggedItem.source === "placed" &&
      draggedItem.sourceIndex !== undefined
    ) {
      const fromIdx = draggedItem.sourceIndex;
      const toIdx =
        targetIndex !== undefined ? targetIndex : placedWords.length - 1;
      if (fromIdx !== toIdx) {
        setPlacedWords((prev) => {
          const next = [...prev];
          const [moved] = next.splice(fromIdx, 1);
          next.splice(toIdx, 0, moved);
          return next;
        });
      }
    }

    handleDragEndSentence();
  }

  function handleDropOnAvailableZone(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedItem || isSentenceChecked) {
      handleDragEndSentence();
      return;
    }

    if (draggedItem.source === "placed") {
      const itemToReturn = placedWords.find((w) => w.id === draggedItem.id);
      if (itemToReturn) {
        setPlacedWords((prev) => prev.filter((w) => w.id !== itemToReturn.id));
        setAvailableWords((prev) => [...prev, itemToReturn]);
      }
    }

    handleDragEndSentence();
  }

  function handleHintSentenceWord() {
    if (isSentenceChecked) return;
    const currentSQ = sentenceQuestions[sentenceIndex];
    if (!currentSQ) return;
    const expectedTokens = currentSQ.fullSentence.trim().split(/\s+/);
    const nextExpectedWord = expectedTokens[placedWords.length];
    if (!nextExpectedWord) return;

    const matchInAvailable = availableWords.find(
      (w) => w.word.toLowerCase() === nextExpectedWord.toLowerCase()
    );
    if (matchInAvailable) {
      handlePickSentenceWord(matchInAvailable);
    }
  }

  function handleCheckSentence() {
    if (placedWords.length === 0) return;
    const currentSQ = sentenceQuestions[sentenceIndex];
    if (!currentSQ) return;

    const assembledText = placedWords.map((w) => w.word).join(" ");
    const isMatched =
      assembledText.trim().toLowerCase() ===
      currentSQ.fullSentence.trim().toLowerCase();

    setIsSentenceChecked(true);
    setIsSentenceCorrect(isMatched);

    if (isMatched) {
      setSentenceScore((prev) => prev + 1);
      onAddXp(35);
      playPronunciation(currentSQ.fullSentence);
    }
  }

  function handleNextSentenceQuestion() {
    if (sentenceIndex + 1 < sentenceQuestions.length) {
      setSentenceIndex((prev) => prev + 1);
    } else {
      setIsSentenceCompleted(true);
    }
  }

  function handleRetryCurrentSentence() {
    if (sentenceQuestions[sentenceIndex]) {
      setPlacedWords([]);
      setAvailableWords([...sentenceQuestions[sentenceIndex].scrambledWords]);
      setIsSentenceChecked(false);
      setIsSentenceCorrect(false);
    }
  }

  function resetSentence() {
    const sQuestions = getSentenceBuilderQuestions(5, topicId);
    setSentenceQuestions(sQuestions);
    setSentenceIndex(0);
    setPlacedWords([]);
    setAvailableWords(sQuestions[0] ? [...sQuestions[0].scrambledWords] : []);
    setIsSentenceChecked(false);
    setIsSentenceCorrect(false);
    setSentenceScore(0);
    setIsSentenceCompleted(false);
  }

  const currentQ = quizQuestions[currentIndex];
  const currentFillQ = fillQuestions[fillIndex];
  const currentSentenceQ = sentenceQuestions[sentenceIndex];
  const topicMeta = getTopicMeta(topicId);

  const GAME_OPTIONS = [
    {
      id: "quiz" as const,
      badge: "Game 1 • Trắc nghiệm",
      title: "Trắc nghiệm Từ vựng & Hình ảnh",
      description:
        "Xem hình ảnh minh họa kèm gợi ý nghĩa tiếng Việt, nghe phát âm và chọn từ tiếng Anh chính xác trong 4 đáp án.",
      xpLabel: "+25 XP / câu đúng",
      metaLabel: "5 câu hỏi • Từ vựng & Phát âm",
      icon: Layers,
    },
    {
      id: "grid" as const,
      badge: "Game 2 • Phản xạ",
      title: "Ghép Cặp Từ Vựng & Nghĩa (Word Match)",
      description:
        "Nối 4 từ tiếng Anh (kèm phát âm & ảnh minh họa) ở cột trái với đúng nghĩa tiếng Việt và giải nghĩa ở cột phải.",
      xpLabel: "+100 XP / màn",
      metaLabel: "4 cặp từ • Ghi nhớ nhanh",
      icon: Grid,
    },
    {
      id: "fill" as const,
      badge: "Game 3 • Ngữ cảnh",
      title: "Điền Từ Vào Câu (Fill in the Blank)",
      description:
        "Đọc câu giao tiếp thực tế tại Homestay và chọn từ vựng phù hợp nhất để điền vào chỗ trống.",
      xpLabel: "+30 XP / câu đúng",
      metaLabel: "5 câu giao tiếp • Ứng dụng thực tế",
      icon: FileText,
    },
    {
      id: "sentence" as const,
      badge: "Game 4 • Cấu trúc câu",
      title: "Sắp Xếp Câu Hoàn Chỉnh (Sentence Builder)",
      description:
        "Sắp xếp các từ bị xáo trộn thành câu hội thoại hoàn chỉnh đúng ngữ pháp và luyện nghe phát âm cả câu.",
      xpLabel: "+35 XP / câu đúng",
      metaLabel: "5 câu hội thoại • Ngữ pháp & Nói",
      icon: Puzzle,
    },
  ];

  const activeGameMeta = GAME_OPTIONS.find((g) => g.id === mode);

  function maskTargetWord(text: string, word: string) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.replace(new RegExp(`\\b${escaped}\\w*\\b`, "gi"), "[...]");
  }

  return (
    <div className="bg-white border border-[#d8ded2] rounded-sm p-4 sm:p-6 space-y-5">
      
      {/* ─── Clean Single-Row Navigation Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#d8ded2]">
        
        {/* Left: Contextual Back Button + Active Topic Information */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {mode !== null ? (
            <button
              type="button"
              onClick={() => setMode(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#e9ffe0] hover:bg-[#bbffa6]/60 text-[#09a86f] text-xs font-bold border border-[#bbffa6] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Danh sách 4 trò chơi</span>
            </button>
          ) : (
            onBackToTopics && (
              <button
                type="button"
                onClick={onBackToTopics}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#f5f9f1] hover:bg-[#e9ffe0] text-[#0b0c0b] text-xs font-bold border border-[#d8ded2] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#09a86f]" />
                <span>Đổi chủ đề</span>
              </button>
            )
          )}

          <div className="h-4 w-px bg-[#d8ded2] hidden sm:block" />

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#0b0c0b]">
              {topicMeta.nameEn}
            </span>
            <span className="text-xs text-[#6f736d]">
              ({topicMeta.nameVi})
            </span>
            {topicMeta.id !== "ALL" && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6]">
                Level {topicMeta.level}
              </span>
            )}
          </div>
        </div>

        {/* Right: Step status or Active Game Title Badge */}
        {mode === null ? (
          <span className="text-xs font-semibold text-[#6f736d]">
            Chọn 1 trong 4 trò chơi bên dưới để bắt đầu
          </span>
        ) : (
          activeGameMeta && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-2.5 py-1 rounded-sm bg-[#f5f9f1] border border-[#d8ded2] text-xs font-bold text-[#0b0c0b]">
                {activeGameMeta.title}
              </span>
            </div>
          )
        )}
      </div>

      {/* ─── STEP 2: Game Selection Hub (Shown first after picking a Topic) ─── */}
      {mode === null && (
        <div className="space-y-5">
          {/* Topic Banner Summary */}
          <div className="p-4 sm:p-5 rounded-sm bg-[#f5f9f1]/80 border border-[#d8ded2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] text-[10px] font-bold uppercase">
                  Chủ đề đã chọn
                </span>
                <span className="text-xs font-bold text-[#09a86f]">
                  {topicMeta.wordCount} từ vựng
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#0b0c0b]">
                {topicMeta.nameEn} — {topicMeta.nameVi}
              </h2>
              <p className="text-xs text-[#6f736d]">
                {topicMeta.description}
              </p>
            </div>

            {topicMeta.previewWords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:justify-end max-w-xs">
                {topicMeta.previewWords.map((w) => (
                  <span
                    key={w}
                    className="px-2 py-0.5 text-[11px] font-mono font-semibold bg-white border border-[#d8ded2] rounded-sm text-[#0b0c0b]"
                  >
                    {w}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 4 Game Cards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f736d] mb-3">
              Chọn trò chơi bạn muốn luyện tập:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GAME_OPTIONS.map((game) => {
                const IconComp = game.icon;
                return (
                  <div
                    key={game.id}
                    onClick={() => setMode(game.id)}
                    className="group bg-white border border-[#d8ded2] hover:border-[#09a86f] rounded-sm p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xs"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-10 h-10 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center text-[#09a86f] group-hover:bg-[#09a86f] group-hover:text-white transition-colors">
                          <IconComp className="w-5 h-5 stroke-[2.2]" />
                        </div>

                        <span className="px-2.5 py-0.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] text-[11px] font-bold">
                          {game.xpLabel}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#09a86f]">
                          {game.badge}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-[#0b0c0b] group-hover:text-[#09a86f] transition-colors mt-0.5">
                          {game.title}
                        </h4>
                      </div>

                      <p className="text-xs text-[#6f736d] leading-relaxed">
                        {game.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#d8ded2]/70 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#6f736d]">
                        {game.metaLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#09a86f] group-hover:translate-x-0.5 transition-transform">
                        <span>Vào chơi</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── Mode 1: Quiz Flashcard Mode ─── */}
      {mode === "quiz" && (
        <div className="space-y-4">
          {isQuizCompleted ? (
            /* Quiz Completed View */
            <div className="py-8 px-4 text-center bg-white rounded-sm border border-[#bbffa6] my-2">
              <div className="w-12 h-12 mx-auto rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center mb-3 text-[#09a86f]">
                <Trophy className="w-6 h-6 stroke-[2.2]" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#0b0c0b]">
                Hoàn thành chủ đề {topicMeta.nameEn}!
              </h3>

              <p className="text-xs text-[#6f736d] mt-1">
                Điểm đúng: <strong className="text-[#09a86f]">{score}/{quizQuestions.length} câu</strong> (+{score * 25} XP).
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Chơi lượt mới</span>
                </button>
                <button
                  onClick={() => setMode(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] text-xs font-bold hover:bg-[#bbffa6]/60 transition-colors cursor-pointer"
                >
                  <span>Đổi trò chơi khác</span>
                </button>
                {onBackToTopics && (
                  <button
                    onClick={onBackToTopics}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-white text-[#6f736d] border border-[#d8ded2] text-xs font-bold hover:bg-[#f5f9f1] hover:text-[#0b0c0b] transition-colors cursor-pointer"
                  >
                    <span>← Chọn chủ đề khác</span>
                  </button>
                )}
              </div>
            </div>
          ) : currentQ ? (
            <div className="space-y-4">
              
              {/* Progress Bar & Question Indicator */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0b0c0b]">
                    Câu hỏi {currentIndex + 1}/{quizQuestions.length}
                  </span>
                  {/* Visual 5-step Segmented Progress Bar */}
                  <div className="flex items-center gap-1">
                    {quizQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "w-4 h-1.5 rounded-sm transition-all",
                          idx < currentIndex
                            ? "bg-[#09a86f]"
                            : idx === currentIndex
                            ? "bg-[#09a86f] ring-1 ring-[#09a86f]"
                            : "bg-[#d8ded2]"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <span className="font-bold text-[#09a86f] bg-[#e9ffe0] px-2 py-0.5 rounded-sm border border-[#bbffa6] text-[11px]">
                  +25 XP / câu đúng
                </span>
              </div>

              {/* Picture Card + 4 Interactive Choices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                
                {/* Left: Picture Display + Clear Meaning Clue */}
                <div className="flex flex-col justify-between bg-[#f5f9f1] border border-[#d8ded2] rounded-sm overflow-hidden">
                  <div className="relative aspect-4/3 w-full">
                    <Image
                      src={currentQ.target.image}
                      alt={currentQ.target.word}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                    />

                    {/* Audio pronounce button on photo */}
                    <button
                      onClick={() => playPronunciation(currentQ.target.word)}
                      className="absolute bottom-2.5 right-2.5 px-2.5 py-1.5 rounded-sm bg-white/95 hover:bg-white text-[#09a86f] border border-[#d8ded2] shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                      title="Nghe phát âm bản ngữ"
                    >
                      <Volume2 className={cn("w-3.5 h-3.5", isPlayingAudio && "animate-pulse")} />
                      <span>Nghe phát âm</span>
                    </button>
                  </div>

                  {/* Vietnamese Meaning & Definition Clue so stock photos are never ambiguous */}
                  <div className="p-3 bg-white border-t border-[#d8ded2] space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] font-bold text-[10px]">
                        Nghĩa tiếng Việt ({currentQ.target.pos})
                      </span>
                      <span className="font-extrabold text-sm text-[#0b0c0b]">
                        {currentQ.target.vi}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6f736d] leading-relaxed">
                      {maskTargetWord(currentQ.target.definition, currentQ.target.word)}
                    </p>
                  </div>
                </div>

                {/* Right: Choices List */}
                <div className="flex flex-col justify-between space-y-2.5">
                  <p className="text-xs font-bold text-[#6f736d] uppercase tracking-wider">
                    Chọn từ tiếng Anh phù hợp nhất với bức ảnh:
                  </p>

                  <div className="space-y-2 flex-1 flex flex-col justify-center">
                    {currentQ.options.map((opt, idx) => {
                      const isChosen = selectedWord === opt.word;
                      const hasAnswered = Boolean(selectedWord);
                      const keyLabel = OPTION_KEYS[idx] || `${idx + 1}`;

                      return (
                        <button
                          key={opt.word}
                          disabled={hasAnswered}
                          onClick={() => handleSelectQuizOption(opt.word, opt.isCorrect)}
                          className={cn(
                            "w-full p-3 rounded-sm text-xs text-left transition-all border flex items-center justify-between cursor-pointer",
                            hasAnswered
                              ? opt.isCorrect
                                ? "bg-[#e9ffe0] border-[#09a86f] text-[#09a86f] font-bold"
                                : isChosen
                                ? "bg-red-50 border-red-300 text-red-700"
                                : "bg-white border-[#d8ded2] text-[#6f736d] opacity-50"
                              : "bg-white border-[#d8ded2] text-[#0b0c0b] hover:border-[#09a86f] hover:bg-[#f5f9f1]"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            {/* Key Tag: A, B, C, D */}
                            <span
                              className={cn(
                                "w-5 h-5 rounded-sm font-bold text-[11px] flex items-center justify-center shrink-0 border",
                                hasAnswered
                                  ? opt.isCorrect
                                    ? "bg-[#09a86f] text-white border-[#09a86f]"
                                    : isChosen
                                    ? "bg-red-600 text-white border-red-600"
                                    : "bg-[#f5f9f1] text-[#6f736d] border-[#d8ded2]"
                                  : "bg-[#f5f9f1] text-[#6f736d] border-[#d8ded2]"
                              )}
                            >
                              {keyLabel}
                            </span>

                            {/* Word & Phonetic */}
                            <div>
                              <span className="font-bold text-sm text-[#0b0c0b] mr-2">
                                {opt.word}
                              </span>
                              <span className="text-[11px] text-[#6f736d] font-mono">
                                {opt.phonetic}
                              </span>
                            </div>
                          </div>

                          {/* Vietnamese translation shown when selected */}
                          {hasAnswered && (
                            <div className="flex items-center gap-1.5 shrink-0 text-[11px]">
                              {opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-[#09a86f]" />
                              )}
                              {isChosen && !opt.isCorrect && (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span className={opt.isCorrect ? "text-[#09a86f] font-semibold" : "text-red-700 font-semibold"}>
                                {opt.vi}
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Explanation & Next Button upon answering */}
              {selectedWord && (
                <div className="p-3.5 bg-[#e9ffe0]/50 border border-[#bbffa6] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in-50">
                  <div className="space-y-0.5">
                    <p className="text-xs text-[#0b0c0b]">
                      <strong className="text-[#09a86f] mr-1">
                        {currentQ.target.word}
                      </strong>
                      ({currentQ.target.vi}): {currentQ.target.definition}
                    </p>
                    <p className="text-[11px] text-[#6f736d] italic">
                      &quot;{currentQ.target.example}&quot;
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuizQuestion}
                    className="px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors shrink-0 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>
                      {currentIndex + 1 < quizQuestions.length
                        ? "Câu tiếp theo"
                        : "Xem kết quả"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* ─── Mode 2: 4-Pair Word & Meaning Match Mode ─── */}
      {mode === "grid" && (
        <div className="space-y-4">
          {isGridCompleted ? (
            <div className="py-8 px-4 text-center bg-white rounded-sm border border-[#bbffa6] my-2">
              <div className="w-12 h-12 mx-auto rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center mb-3 text-[#09a86f]">
                <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-[#0b0c0b]">
                Tuyệt vời! Bạn đã ghép đúng cả 4 cặp từ vựng!
              </h3>
              <p className="text-xs text-[#6f736d] mt-1">
                Đã cộng <strong className="text-[#09a86f]">+100 XP</strong> vào tài khoản học viên.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={resetGrid}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ghép 4 cặp mới</span>
                </button>
                <button
                  onClick={() => setMode(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] text-xs font-bold hover:bg-[#bbffa6]/60 transition-colors cursor-pointer"
                >
                  <span>Đổi trò chơi khác</span>
                </button>
                {onBackToTopics && (
                  <button
                    onClick={onBackToTopics}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-white text-[#6f736d] border border-[#d8ded2] text-xs font-bold hover:bg-[#f5f9f1] hover:text-[#0b0c0b] transition-colors cursor-pointer"
                  >
                    <span>← Chọn chủ đề khác</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Instructions & Progress */}
              <div className="p-3 rounded-sm bg-[#f5f9f1] border border-[#d8ded2] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs text-[#0b0c0b]">
                  <strong>Cách chơi:</strong> Chọn <strong>1 từ tiếng Anh</strong> ở cột bên trái, sau đó chọn <strong>nghĩa tiếng Việt</strong> tương ứng ở cột bên phải.
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {wrongPair && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-sm">
                      ✗ Chưa khớp, thử lại nhé!
                    </span>
                  )}
                  <span className="font-bold text-xs text-[#09a86f] bg-[#e9ffe0] px-2.5 py-1 rounded-sm border border-[#bbffa6]">
                    Đã ghép: {matchedIds.length} / {gridPairs.length} cặp (+25 XP/cặp)
                  </span>
                </div>
              </div>

              {/* Balanced 2-Column Matching Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Left Column: 4 English Words + Thumbnail + Audio */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#6f736d] px-1">
                    1. Chọn từ tiếng Anh (Cột A)
                  </div>

                  {gridPairs.map((item, idx) => {
                    const isMatched = matchedIds.includes(item.id);
                    const isSelected = selectedEnglishId === item.id;
                    const isWrong = wrongPair?.enId === item.id;

                    return (
                      <div
                        key={`en-${item.id}`}
                        onClick={() => handleSelectEnglishCard(item)}
                        className={cn(
                          "w-full p-3 rounded-sm border transition-all flex items-center justify-between gap-3 min-h-[78px]",
                          isMatched
                            ? "bg-[#e9ffe0]/60 border-[#09a86f] cursor-default"
                            : isWrong
                            ? "bg-red-50 border-red-400 ring-2 ring-red-200 cursor-pointer"
                            : isSelected
                            ? "bg-[#e9ffe0] border-[#09a86f] ring-2 ring-[#09a86f]/30 cursor-pointer"
                            : "bg-white border-[#d8ded2] hover:border-[#09a86f] hover:bg-[#f5f9f1]/60 cursor-pointer"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={cn(
                              "w-6 h-6 rounded-sm text-xs font-bold flex items-center justify-center shrink-0 border",
                              isMatched || isSelected
                                ? "bg-[#09a86f] text-white border-[#09a86f]"
                                : isWrong
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-[#f5f9f1] text-[#6f736d] border-[#d8ded2]"
                            )}
                          >
                            {idx + 1}
                          </span>

                          <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-[#d8ded2] shrink-0 bg-[#f5f9f1]">
                            <Image
                              src={item.image}
                              alt={item.word}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-extrabold text-sm sm:text-base text-[#0b0c0b]">
                                {item.word}
                              </span>
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-xs bg-[#f5f9f1] border border-[#d8ded2] text-[#6f736d]">
                                {item.pos}
                              </span>
                            </div>
                            <span className="text-xs text-[#6f736d] font-mono block mt-0.5">
                              {item.phonetic}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isMatched ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#09a86f] bg-white px-2 py-1 rounded-sm border border-[#bbffa6]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Đã ghép</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playPronunciation(item.word);
                              }}
                              className="p-2 rounded-sm bg-[#f5f9f1] hover:bg-[#e9ffe0] text-[#09a86f] border border-[#d8ded2] cursor-pointer transition-colors"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: 4 Vietnamese Meanings + Definitions */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#6f736d] px-1">
                    2. Chọn nghĩa tương ứng (Cột B)
                  </div>

                  {shuffledMeanings.map((item, idx) => {
                    const isMatched = matchedIds.includes(item.id);
                    const isSelected = selectedMeaningId === item.id;
                    const isWrong = wrongPair?.viId === item.id;
                    const letterKey = OPTION_KEYS[idx] || `${idx + 1}`;

                    return (
                      <button
                        key={`vi-${item.id}`}
                        type="button"
                        disabled={isMatched}
                        onClick={() => handleSelectMeaningCard(item)}
                        className={cn(
                          "w-full p-3 rounded-sm border text-left transition-all flex items-center justify-between gap-3 min-h-[78px]",
                          isMatched
                            ? "bg-[#e9ffe0]/60 border-[#09a86f] cursor-default"
                            : isWrong
                            ? "bg-red-50 border-red-400 ring-2 ring-red-200 cursor-pointer"
                            : isSelected
                            ? "bg-[#e9ffe0] border-[#09a86f] ring-2 ring-[#09a86f]/30 cursor-pointer"
                            : "bg-white border-[#d8ded2] hover:border-[#09a86f] hover:bg-[#f5f9f1]/60 cursor-pointer"
                        )}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span
                            className={cn(
                              "w-6 h-6 rounded-sm text-xs font-bold flex items-center justify-center shrink-0 border mt-0.5",
                              isMatched || isSelected
                                ? "bg-[#09a86f] text-white border-[#09a86f]"
                                : isWrong
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-[#f5f9f1] text-[#6f736d] border-[#d8ded2]"
                            )}
                          >
                            {letterKey}
                          </span>

                          <div className="min-w-0">
                            <span className="font-extrabold text-sm sm:text-base text-[#0b0c0b] block">
                              {item.vi}
                            </span>
                            <p className="text-[11px] text-[#6f736d] line-clamp-2 mt-0.5 leading-relaxed">
                              {maskTargetWord(item.definition, item.word)}
                            </p>
                          </div>
                        </div>

                        {isMatched && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#09a86f] bg-white px-2 py-1 rounded-sm border border-[#bbffa6] shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{item.word}</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Mode 3: Fill-in-the-Blank Sentence Mode ─── */}
      {mode === "fill" && (
        <div className="space-y-4">
          {isFillCompleted ? (
            <div className="py-8 px-4 text-center bg-white rounded-sm border border-[#bbffa6] my-2">
              <div className="w-12 h-12 mx-auto rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center mb-3 text-[#09a86f]">
                <Trophy className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0b0c0b]">
                Hoàn thành bài Điền Từ chủ đề {topicMeta.nameEn}!
              </h3>
              <p className="text-xs text-[#6f736d] mt-1">
                Điểm đúng: <strong className="text-[#09a86f]">{fillScore}/{fillQuestions.length} câu</strong> (+{fillScore * 30} XP).
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  onClick={resetFill}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Luyện bộ câu mới</span>
                </button>
                <button
                  onClick={() => setMode(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] text-xs font-bold hover:bg-[#bbffa6]/60 transition-colors cursor-pointer"
                >
                  <span>Đổi trò chơi khác</span>
                </button>
                {onBackToTopics && (
                  <button
                    onClick={onBackToTopics}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-white text-[#6f736d] border border-[#d8ded2] text-xs font-bold hover:bg-[#f5f9f1] hover:text-[#0b0c0b] transition-colors cursor-pointer"
                  >
                    <span>← Chọn chủ đề khác</span>
                  </button>
                )}
              </div>
            </div>
          ) : currentFillQ ? (
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0b0c0b]">
                    Câu {fillIndex + 1}/{fillQuestions.length}
                  </span>
                  <div className="flex items-center gap-1">
                    {fillQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "w-4 h-1.5 rounded-sm transition-all",
                          idx < fillIndex
                            ? "bg-[#09a86f]"
                            : idx === fillIndex
                            ? "bg-[#09a86f] ring-1 ring-[#09a86f]"
                            : "bg-[#d8ded2]"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <span className="font-bold text-[#09a86f] bg-[#e9ffe0] px-2 py-0.5 rounded-sm border border-[#bbffa6] text-[11px]">
                  +30 XP / câu đúng
                </span>
              </div>

              {/* Left Image + Right Sentence Blank & Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {/* Left: Picture & Meaning Hint */}
                <div className="flex flex-col justify-between bg-[#f5f9f1] border border-[#d8ded2] rounded-sm overflow-hidden">
                  <div className="relative aspect-4/3 w-full">
                    <Image
                      src={currentFillQ.target.image}
                      alt={currentFillQ.target.word}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <button
                      onClick={() => playPronunciation(currentFillQ.target.example)}
                      className="absolute bottom-2.5 right-2.5 px-2.5 py-1.5 rounded-sm bg-white/95 hover:bg-white text-[#09a86f] border border-[#d8ded2] shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                      title="Nghe toàn bộ câu ví dụ"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe câu</span>
                    </button>
                  </div>
                  <div className="p-3 bg-white border-t border-[#d8ded2] space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] font-bold text-[10px]">
                        Gợi ý nghĩa ({currentFillQ.target.pos})
                      </span>
                      <span className="font-bold text-[#0b0c0b]">
                        {currentFillQ.target.vi}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6f736d] leading-relaxed">
                      {currentFillQ.target.definition}
                    </p>
                  </div>
                </div>

                {/* Right: Sentence Card + 4 Options */}
                <div className="flex flex-col justify-between space-y-3">
                  {/* Context Sentence Box */}
                  <div className="p-4 sm:p-5 rounded-sm bg-[#f5f9f1]/70 border border-[#d8ded2] space-y-2">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6f736d]">
                      Hoàn thành câu giao tiếp:
                    </span>
                    <p className="text-base sm:text-lg font-semibold text-[#0b0c0b] leading-relaxed">
                      <span>{currentFillQ.sentenceBefore}</span>
                      <span
                        className={cn(
                          "inline-flex items-center justify-center mx-1.5 px-3 py-0.5 font-extrabold transition-all align-baseline",
                          selectedFillWord
                            ? selectedFillWord === currentFillQ.target.word
                              ? "rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#09a86f]"
                              : "rounded-sm bg-red-50 text-red-700 border border-red-300"
                            : "min-w-[88px] border-b-2 border-[#09a86f] bg-[#e9ffe0]/40 text-transparent select-none"
                        )}
                      >
                        {selectedFillWord
                          ? currentFillQ.missingWordInSentence
                          : "\u00A0"}
                      </span>
                      <span>{currentFillQ.sentenceAfter}</span>
                    </p>
                  </div>

                  {/* 4 Choices */}
                  <div className="space-y-2">
                    {currentFillQ.options.map((opt, idx) => {
                      const isChosen = selectedFillWord === opt.word;
                      const hasAnswered = Boolean(selectedFillWord);
                      const keyLabel = OPTION_KEYS[idx] || `${idx + 1}`;

                      return (
                        <button
                          key={opt.word}
                          disabled={hasAnswered}
                          onClick={() =>
                            handleSelectFillOption(
                              opt.word,
                              opt.isCorrect,
                              currentFillQ.target.example
                            )
                          }
                          className={cn(
                            "w-full p-2.5 rounded-sm text-xs text-left transition-all border flex items-center justify-between cursor-pointer",
                            hasAnswered
                              ? opt.isCorrect
                                ? "bg-[#e9ffe0] border-[#09a86f] text-[#09a86f] font-bold"
                                : isChosen
                                ? "bg-red-50 border-red-300 text-red-700"
                                : "bg-white border-[#d8ded2] text-[#6f736d] opacity-50"
                              : "bg-white border-[#d8ded2] text-[#0b0c0b] hover:border-[#09a86f] hover:bg-[#f5f9f1]"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                "w-5 h-5 rounded-sm font-bold text-[11px] flex items-center justify-center shrink-0 border",
                                hasAnswered
                                  ? opt.isCorrect
                                    ? "bg-[#09a86f] text-white border-[#09a86f]"
                                    : isChosen
                                    ? "bg-red-600 text-white border-red-600"
                                    : "bg-[#f5f9f1] text-[#6f736d] border-[#d8ded2]"
                                  : "bg-[#f5f9f1] text-[#6f736d] border-[#d8ded2]"
                              )}
                            >
                              {keyLabel}
                            </span>
                            <div>
                              <span className="font-bold text-sm text-[#0b0c0b] mr-2">
                                {opt.word}
                              </span>
                              <span className="text-[11px] text-[#6f736d] font-mono">
                                {opt.phonetic}
                              </span>
                            </div>
                          </div>

                          {hasAnswered && (
                            <div className="flex items-center gap-1.5 shrink-0 text-[11px]">
                              {opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-[#09a86f]" />
                              )}
                              {isChosen && !opt.isCorrect && (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span
                                className={
                                  opt.isCorrect
                                    ? "text-[#09a86f] font-semibold"
                                    : "text-red-700 font-semibold"
                                }
                              >
                                {opt.vi}
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Next Button after answering */}
              {selectedFillWord && (
                <div className="p-3.5 bg-[#e9ffe0]/50 border border-[#bbffa6] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-[#0b0c0b]">
                      Câu hoàn chỉnh: &quot;{currentFillQ.target.example}&quot;
                    </p>
                    <p className="text-[11px] text-[#6f736d]">
                      Từ khóa: <strong className="text-[#09a86f]">{currentFillQ.target.word}</strong> ({currentFillQ.target.vi})
                    </p>
                  </div>
                  <button
                    onClick={handleNextFillQuestion}
                    className="px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors shrink-0 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>
                      {fillIndex + 1 < fillQuestions.length
                        ? "Câu tiếp theo"
                        : "Xem kết quả"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* ─── Mode 4: Sentence Builder Mode (Per Topic) ─── */}
      {mode === "sentence" && (
        <div className="space-y-4">
          {isSentenceCompleted ? (
            <div className="py-8 px-4 text-center bg-white rounded-sm border border-[#bbffa6] my-2">
              <div className="w-12 h-12 mx-auto rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center mb-3 text-[#09a86f]">
                <Trophy className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0b0c0b]">
                Hoàn thành bài Ghép Câu chủ đề {topicMeta.nameEn}!
              </h3>
              <p className="text-xs text-[#6f736d] mt-1">
                Điểm đúng: <strong className="text-[#09a86f]">{sentenceScore}/{sentenceQuestions.length} câu</strong> (+{sentenceScore * 35} XP).
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  onClick={resetSentence}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ghép bộ câu mới</span>
                </button>
                <button
                  onClick={() => setMode(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] text-xs font-bold hover:bg-[#bbffa6]/60 transition-colors cursor-pointer"
                >
                  <span>Đổi trò chơi khác</span>
                </button>
                {onBackToTopics && (
                  <button
                    onClick={onBackToTopics}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-white text-[#6f736d] border border-[#d8ded2] text-xs font-bold hover:bg-[#f5f9f1] hover:text-[#0b0c0b] transition-colors cursor-pointer"
                  >
                    <span>← Chọn chủ đề khác</span>
                  </button>
                )}
              </div>
            </div>
          ) : currentSentenceQ ? (
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0b0c0b]">
                    Câu {sentenceIndex + 1}/{sentenceQuestions.length}
                  </span>
                  <div className="flex items-center gap-1">
                    {sentenceQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "w-4 h-1.5 rounded-sm transition-all",
                          idx < sentenceIndex
                            ? "bg-[#09a86f]"
                            : idx === sentenceIndex
                            ? "bg-[#09a86f] ring-1 ring-[#09a86f]"
                            : "bg-[#d8ded2]"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <span className="font-bold text-[#09a86f] bg-[#e9ffe0] px-2 py-0.5 rounded-sm border border-[#bbffa6] text-[11px]">
                  +35 XP / câu đúng
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                {/* Left (5 cols): Picture + Target Word Card */}
                <div className="md:col-span-5 flex flex-col justify-between bg-[#f5f9f1] border border-[#d8ded2] rounded-sm overflow-hidden">
                  <div className="relative aspect-4/3 w-full">
                    <Image
                      src={currentSentenceQ.target.image}
                      alt={currentSentenceQ.target.word}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 340px"
                    />
                    <button
                      onClick={() => playPronunciation(currentSentenceQ.fullSentence)}
                      className="absolute bottom-2.5 right-2.5 px-2.5 py-1.5 rounded-sm bg-white/95 hover:bg-white text-[#09a86f] border border-[#d8ded2] shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                      title="Nghe câu mẫu"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe câu mẫu</span>
                    </button>
                  </div>
                  <div className="p-3 bg-white border-t border-[#d8ded2] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-[#09a86f]">
                        {currentSentenceQ.target.word}{" "}
                        <span className="text-xs font-mono font-normal text-[#6f736d]">
                          {currentSentenceQ.target.phonetic}
                        </span>
                      </span>
                      <span className="text-xs font-bold text-[#0b0c0b]">
                        {currentSentenceQ.target.vi}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6f736d] leading-relaxed">
                      {currentSentenceQ.target.definition}
                    </p>
                  </div>
                </div>

                {/* Right (7 cols): Sentence Builder Workspace */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b0c0b]">
                        Kéo và thả các từ vào ô bên dưới để tạo câu hoàn chỉnh:
                      </span>
                      {!isSentenceChecked && availableWords.length > 0 && (
                        <button
                          type="button"
                          onClick={handleHintSentenceWord}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-sm cursor-pointer transition-colors"
                        >
                          <Lightbulb className="w-3 h-3 text-amber-600" />
                          <span>Gợi ý 1 từ</span>
                        </button>
                      )}
                    </div>

                    {/* Assembled Sentence Drop Zone */}
                    <div
                      onDragOver={(e) => {
                        if (isSentenceChecked) return;
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                        setIsOverSentenceZone(true);
                      }}
                      onDragLeave={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setIsOverSentenceZone(false);
                          setDragOverPlacedIndex(null);
                        }
                      }}
                      onDrop={(e) => handleDropOnSentenceZone(e)}
                      className={cn(
                        "min-h-[96px] p-3.5 rounded-sm border-2 border-dashed transition-all flex flex-wrap items-center gap-2",
                        isSentenceChecked
                          ? isSentenceCorrect
                            ? "border-[#09a86f] bg-[#e9ffe0]/40"
                            : "border-red-300 bg-red-50/30"
                          : isOverSentenceZone
                          ? "border-[#09a86f] bg-[#e9ffe0]/50 ring-2 ring-[#09a86f]/15"
                          : "border-[#d8ded2] bg-[#f5f9f1]/60"
                      )}
                    >
                      {placedWords.map((item, idx) => {
                        const isDraggingThis =
                          draggedItem?.id === item.id &&
                          draggedItem?.source === "placed";
                        const isDropTarget = dragOverPlacedIndex === idx;
                        return (
                          <button
                            key={`placed-${item.id}`}
                            type="button"
                            draggable={!isSentenceChecked}
                            disabled={isSentenceChecked}
                            onDragStart={(e) => handleDragStartPlaced(e, item, idx)}
                            onDragEnd={handleDragEndSentence}
                            onDragOver={(e) => {
                              if (isSentenceChecked) return;
                              e.preventDefault();
                              e.stopPropagation();
                              e.dataTransfer.dropEffect = "move";
                              setDragOverPlacedIndex(idx);
                            }}
                            onDragLeave={() => {
                              if (dragOverPlacedIndex === idx) {
                                setDragOverPlacedIndex(null);
                              }
                            }}
                            onDrop={(e) => handleDropOnSentenceZone(e, idx)}
                            onClick={() => handleReturnSentenceWord(item)}
                            className={cn(
                              "px-3 py-2 rounded-sm text-xs font-bold transition-all border flex items-center gap-1.5 select-none shadow-2xs",
                              !isSentenceChecked &&
                                "cursor-grab active:cursor-grabbing",
                              isDraggingThis && "opacity-40 scale-95",
                              isDropTarget &&
                                !isDraggingThis &&
                                "ring-2 ring-[#09a86f] -translate-y-0.5 bg-[#e9ffe0]",
                              isSentenceChecked
                                ? isSentenceCorrect
                                  ? "bg-[#e9ffe0] border-[#09a86f] text-[#09a86f]"
                                  : "bg-red-50 border-red-300 text-red-700"
                                : "bg-white border-[#09a86f] text-[#0b0c0b] hover:border-red-300 hover:bg-red-50/40"
                            )}
                            title="Kéo để đổi vị trí hoặc bấm để trả từ về khay"
                          >
                            {!isSentenceChecked && (
                              <GripVertical className="w-3.5 h-3.5 text-[#6f736d] shrink-0" />
                            )}
                            <span>{item.word}</span>
                            {!isSentenceChecked && (
                              <Undo2 className="w-3 h-3 text-[#6f736d]/70 ml-0.5 shrink-0" />
                            )}
                          </button>
                        );
                      })}

                      {/* Empty Slot Placeholders for Remaining Words */}
                      {!isSentenceChecked &&
                        availableWords.map((_, slotIdx) => {
                          const targetIdx = placedWords.length + slotIdx;
                          const isFirstEmptySlot = slotIdx === 0;
                          return (
                            <div
                              key={`slot-${targetIdx}`}
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                e.dataTransfer.dropEffect = "move";
                                setIsOverSentenceZone(true);
                              }}
                              onDrop={(e) => handleDropOnSentenceZone(e)}
                              className={cn(
                                "h-8 min-w-[60px] px-2.5 rounded-sm border border-dashed flex items-center justify-center text-[11px] font-mono select-none transition-colors",
                                isFirstEmptySlot && isOverSentenceZone
                                  ? "border-[#09a86f] bg-[#e9ffe0]/70 text-[#09a86f] font-bold"
                                  : "border-[#cbd3c4] bg-white/50 text-[#6f736d]/60"
                              )}
                            >
                              {targetIdx + 1}
                            </div>
                          );
                        })}
                    </div>

                    {/* Available Scrambled Words Tray (Also a Drop Zone to return words) */}
                    <div
                      onDragOver={(e) => {
                        if (isSentenceChecked || draggedItem?.source !== "placed")
                          return;
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                        setIsOverAvailableZone(true);
                      }}
                      onDragLeave={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setIsOverAvailableZone(false);
                        }
                      }}
                      onDrop={handleDropOnAvailableZone}
                      className={cn(
                        "space-y-2 p-3 rounded-sm border transition-colors",
                        isOverAvailableZone
                          ? "border-[#09a86f] bg-[#e9ffe0]/30"
                          : "border-[#d8ded2] bg-white"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#6f736d] uppercase tracking-wider">
                          Khay từ vựng (Kéo thả lên ô trên hoặc chạm để chọn):
                        </span>
                        {placedWords.length > 0 && !isSentenceChecked && (
                          <button
                            type="button"
                            onClick={handleRetryCurrentSentence}
                            className="text-[11px] font-semibold text-[#6f736d] hover:text-red-600 inline-flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Đặt lại khay</span>
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 min-h-[42px] items-center">
                        {availableWords.length === 0 ? (
                          <span className="text-xs text-[#09a86f] font-medium italic">
                            Đã xếp hết các từ lên câu — hãy bấm &quot;Kiểm tra câu&quot; bên dưới!
                          </span>
                        ) : (
                          availableWords.map((item) => {
                            const isDraggingThis =
                              draggedItem?.id === item.id &&
                              draggedItem?.source === "available";
                            return (
                              <button
                                key={`avail-${item.id}`}
                                type="button"
                                draggable={!isSentenceChecked}
                                onDragStart={(e) => handleDragStartAvailable(e, item)}
                                onDragEnd={handleDragEndSentence}
                                onClick={() => handlePickSentenceWord(item)}
                                className={cn(
                                  "px-3 py-2 rounded-sm text-xs font-bold bg-[#f5f9f1] border border-[#d8ded2] text-[#0b0c0b] hover:border-[#09a86f] hover:bg-[#e9ffe0]/50 transition-all cursor-grab active:cursor-grabbing flex items-center gap-1.5 select-none shadow-2xs",
                                  isDraggingThis && "opacity-40 scale-95 border-[#09a86f]"
                                )}
                                title="Kéo thả vào câu hoặc bấm để chọn"
                              >
                                <GripVertical className="w-3.5 h-3.5 text-[#6f736d] shrink-0" />
                                <span>{item.word}</span>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Check / Retry / Next Actions */}
                  <div className="pt-3 border-t border-[#d8ded2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    {!isSentenceChecked ? (
                      <button
                        type="button"
                        onClick={handleCheckSentence}
                        disabled={placedWords.length === 0}
                        className={cn(
                          "px-4 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer",
                          placedWords.length > 0
                            ? "bg-[#09a86f] text-white hover:bg-[#089763]"
                            : "bg-[#d8ded2] text-[#6f736d] cursor-not-allowed"
                        )}
                      >
                        Kiểm tra câu
                      </button>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        {isSentenceCorrect ? (
                          <button
                            type="button"
                            onClick={handleNextSentenceQuestion}
                            className="px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>
                              {sentenceIndex + 1 < sentenceQuestions.length
                                ? "Câu tiếp theo"
                                : "Xem kết quả"}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleRetryCurrentSentence}
                            className="px-4 py-2 rounded-sm bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Sắp xếp lại</span>
                          </button>
                        )}
                      </div>
                    )}

                    {isSentenceChecked && (
                      <div
                        className={cn(
                          "text-xs font-bold flex items-center gap-1.5",
                          isSentenceCorrect ? "text-[#09a86f]" : "text-red-600"
                        )}
                      >
                        {isSentenceCorrect ? (
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Chính xác! +35 XP</span>
                          </span>
                        ) : (
                          <span>Chưa đúng thứ tự. Bấm &quot;Nghe câu mẫu&quot; hoặc &quot;Sắp xếp lại&quot; nhé!</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ─── Footer Info Bar ─── */}
      <div className="pt-3 border-t border-[#d8ded2] flex items-center justify-between text-[11px] text-[#6f736d]">
        <span>Học từ vựng trực quan kèm âm thanh chuẩn bản ngữ</span>
        <span className="text-[#09a86f] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Tự động cộng XP
        </span>
      </div>

    </div>
  );
}
