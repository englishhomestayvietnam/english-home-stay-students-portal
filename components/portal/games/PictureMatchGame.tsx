"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
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
  Lightbulb,
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

  const [gameBodyRef] = useAutoAnimate<HTMLDivElement>({
    duration: 180,
    easing: "ease-out",
  });
  const [quizStageRef] = useAutoAnimate<HTMLDivElement>({
    duration: 180,
    easing: "ease-out",
  });
  const [gridStageRef] = useAutoAnimate<HTMLDivElement>({
    duration: 180,
    easing: "ease-out",
  });
  const [fillStageRef] = useAutoAnimate<HTMLDivElement>({
    duration: 180,
    easing: "ease-out",
  });
  const [sentenceStageRef] = useAutoAnimate<HTMLDivElement>({
    duration: 180,
    easing: "ease-out",
  });
  const [notebookLinesRef] = useAutoAnimate<HTMLDivElement>({
    duration: 160,
    easing: "ease-out",
  });

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

  // ─── Sentence Builder Mode State (Duolingo-style Notebook Lines) ─────────────
  const [sentenceQuestions, setSentenceQuestions] = useState<
    ReturnType<typeof getSentenceBuilderQuestions>
  >([]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [placedWords, setPlacedWords] = useState<{ id: string; word: string }[]>([]);
  const [isSentenceChecked, setIsSentenceChecked] = useState(false);
  const [isSentenceCorrect, setIsSentenceCorrect] = useState(false);
  const [sentenceScore, setSentenceScore] = useState(0);
  const [isSentenceCompleted, setIsSentenceCompleted] = useState(false);

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

  // Reset sentence lines when sentenceIndex changes
  useEffect(() => {
    if (sentenceQuestions[sentenceIndex]) {
      setPlacedWords([]);
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

  // ─── Sentence Builder Handlers (Duolingo-style Notebook Lines) ───────────────
  function handlePickSentenceWord(item: { id: string; word: string }) {
    if (isSentenceChecked) return;
    setPlacedWords((prev) =>
      prev.some((w) => w.id === item.id) ? prev : [...prev, item]
    );
  }

  function handleReturnSentenceWord(item: { id: string; word: string }) {
    if (isSentenceChecked) return;
    setPlacedWords((prev) => prev.filter((w) => w.id !== item.id));
  }

  function handleHintSentenceWord() {
    if (isSentenceChecked) return;
    const currentSQ = sentenceQuestions[sentenceIndex];
    if (!currentSQ) return;
    const expectedTokens = currentSQ.fullSentence.trim().split(/\s+/);

    // Keep only the leading words that are already in the right order
    const validPrefix: { id: string; word: string }[] = [];
    for (let i = 0; i < placedWords.length; i++) {
      if (
        expectedTokens[i] &&
        placedWords[i].word.toLowerCase() === expectedTokens[i].toLowerCase()
      ) {
        validPrefix.push(placedWords[i]);
      } else {
        break;
      }
    }

    const nextIdx = validPrefix.length;
    if (nextIdx >= expectedTokens.length) return;
    const nextExpectedWord = expectedTokens[nextIdx];

    const usedIds = new Set(validPrefix.map((w) => w.id));
    const matchInBank = currentSQ.scrambledWords.find(
      (w) =>
        !usedIds.has(w.id) &&
        w.word.toLowerCase() === nextExpectedWord.toLowerCase()
    );

    if (matchInBank) {
      setPlacedWords([...validPrefix, matchInBank]);
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
    setPlacedWords([]);
    setIsSentenceChecked(false);
    setIsSentenceCorrect(false);
  }

  function resetSentence() {
    const sQuestions = getSentenceBuilderQuestions(5, topicId);
    setSentenceQuestions(sQuestions);
    setSentenceIndex(0);
    setPlacedWords([]);
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
      shortTitle: "Trắc nghiệm Hình ảnh",
      description:
        "Xem hình ảnh minh họa kèm gợi ý nghĩa tiếng Việt, nghe phát âm và chọn từ tiếng Anh chính xác trong 4 đáp án.",
      xpLabel: "+25 XP / câu đúng",
      xpShortLabel: "+25 XP",
      metaLabel: "5 câu hỏi • Từ vựng & Phát âm",
      shortMeta: "5 câu hỏi",
      icon: Layers,
    },
    {
      id: "grid" as const,
      badge: "Game 2 • Phản xạ",
      title: "Ghép Cặp Từ Vựng & Nghĩa",
      shortTitle: "Ghép Cặp Từ & Nghĩa",
      description:
        "Nối 4 từ tiếng Anh (kèm phát âm & ảnh minh họa) ở cột trái với đúng nghĩa tiếng Việt và giải nghĩa ở cột phải.",
      xpLabel: "+100 XP / màn",
      xpShortLabel: "+100 XP",
      metaLabel: "4 cặp từ • Ghi nhớ nhanh",
      shortMeta: "4 cặp từ",
      icon: Grid,
    },
    {
      id: "fill" as const,
      badge: "Game 3 • Ngữ cảnh",
      title: "Điền Từ Vào Câu Giao Tiếp",
      shortTitle: "Điền Từ Vào Câu",
      description:
        "Đọc câu giao tiếp thực tế tại Homestay và chọn từ vựng phù hợp nhất để điền vào chỗ trống.",
      xpLabel: "+30 XP / câu đúng",
      xpShortLabel: "+30 XP",
      metaLabel: "5 câu giao tiếp • Ứng dụng thực tế",
      shortMeta: "5 câu giao tiếp",
      icon: FileText,
    },
    {
      id: "sentence" as const,
      badge: "Game 4 • Cấu trúc câu",
      title: "Sắp Xếp Câu Hoàn Chỉnh",
      shortTitle: "Sắp Xếp Câu",
      description:
        "Sắp xếp các từ bị xáo trộn thành câu hội thoại hoàn chỉnh đúng ngữ pháp và luyện nghe phát âm cả câu.",
      xpLabel: "+35 XP / câu đúng",
      xpShortLabel: "+35 XP",
      metaLabel: "5 câu hội thoại • Ngữ pháp & Nói",
      shortMeta: "5 câu hội thoại",
      icon: Puzzle,
    },
  ];

  const activeGameMeta = GAME_OPTIONS.find((g) => g.id === mode);

  function maskTargetWord(text: string, word: string) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.replace(new RegExp(`\\b${escaped}\\w*\\b`, "gi"), "[...]");
  }

  return (
    <div
      ref={gameBodyRef}
      className="bg-white border border-[#d8ded2] rounded-sm p-4 sm:p-6 space-y-5"
    >
      
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
        <div className="space-y-3">
          {/* 4 Game Cards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f736d] mb-3">
              Chọn trò chơi bạn muốn luyện tập:
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {GAME_OPTIONS.map((game) => {
                const IconComp = game.icon;
                return (
                  <div
                    key={game.id}
                    onClick={() => setMode(game.id)}
                    className="group bg-white border border-[#d8ded2] hover:border-[#09a86f] rounded-sm p-4 sm:p-5 transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex flex-col justify-between gap-4 sm:gap-0 hover:shadow-xs min-w-0"
                  >
                    <div className="space-y-3 sm:space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center text-[#09a86f] group-hover:bg-[#09a86f] group-hover:text-white transition-colors shrink-0">
                          <IconComp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                        </div>

                        <span className="inline-flex items-center justify-center h-6 px-2 sm:px-2.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] text-[10px] sm:text-[11px] font-bold leading-none whitespace-nowrap">
                          <span className="sm:hidden">{game.xpShortLabel}</span>
                          <span className="hidden sm:inline">{game.xpLabel}</span>
                        </span>
                      </div>

                      <div>
                        <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-[#09a86f]">
                          {game.badge}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-[#0b0c0b] group-hover:text-[#09a86f] transition-colors sm:mt-0.5 leading-snug">
                          <span className="sm:hidden">{game.shortTitle}</span>
                          <span className="hidden sm:inline">{game.title}</span>
                        </h4>
                        <p className="sm:hidden text-[11px] text-[#6f736d] mt-1">
                          {game.shortMeta}
                        </p>
                      </div>

                      <p className="hidden sm:block text-xs text-[#6f736d] leading-relaxed">
                        {game.description}
                      </p>
                    </div>

                    <div className="sm:mt-4 sm:pt-3 sm:border-t sm:border-[#d8ded2]/70 flex items-center justify-between gap-1">
                      <span className="hidden sm:inline text-[11px] font-medium text-[#6f736d]">
                        {game.metaLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#09a86f] group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
                        <span>Vào chơi</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
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
        <div ref={quizStageRef} className="space-y-4">
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
            <div key={`quiz-q-${currentIndex}`} className="space-y-4 animate-in fade-in duration-150">
              
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
                      className="absolute bottom-2.5 left-2.5 sm:left-auto sm:right-2.5 px-2.5 py-1.5 rounded-sm bg-white/95 hover:bg-white text-[#09a86f] border border-[#d8ded2] shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
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
        <div ref={gridStageRef} className="space-y-4">
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
            <div className="space-y-3">
              {/* Compact Instructions & Progress */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-[#6f736d] font-medium">
                  Chạm <strong className="text-[#0b0c0b]">từ tiếng Anh</strong> (trái) và <strong className="text-[#0b0c0b]">nghĩa</strong> (phải) tương ứng:
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {wrongPair && (
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-sm whitespace-nowrap">
                      Chưa khớp!
                    </span>
                  )}
                  <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-sm font-bold text-[11px] text-[#09a86f] bg-[#e9ffe0] border border-[#bbffa6] whitespace-nowrap">
                    {matchedIds.length}/{gridPairs.length} cặp
                  </span>
                </div>
              </div>

              {/* Side-by-Side 2-Column Matching Board (Mobile & Desktop) */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                
                {/* Left Column: 4 English Words */}
                <div className="space-y-2 sm:space-y-2.5 min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#6f736d] px-0.5">
                    1. Tiếng Anh
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
                          "w-full h-[66px] sm:h-[78px] px-2.5 sm:px-3 rounded-sm border transition-all flex items-center justify-between gap-1.5 sm:gap-3 min-w-0 select-none",
                          isMatched
                            ? "bg-[#e9ffe0]/60 border-[#09a86f] opacity-65 cursor-default"
                            : isWrong
                            ? "bg-red-50 border-red-400 ring-2 ring-red-200 cursor-pointer"
                            : isSelected
                            ? "bg-[#e9ffe0] border-[#09a86f] ring-2 ring-[#09a86f]/30 cursor-pointer"
                            : "bg-white border-[#d8ded2] hover:border-[#09a86f] hover:bg-[#f5f9f1]/60 cursor-pointer"
                        )}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <span
                            className={cn(
                              "hidden sm:flex w-6 h-6 rounded-sm text-xs font-bold items-center justify-center shrink-0 border",
                              isMatched || isSelected
                                ? "bg-[#09a86f] text-white border-[#09a86f]"
                                : isWrong
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-[#f5f9f1] text-[#6f736d] border-[#d8ded2]"
                            )}
                          >
                            {idx + 1}
                          </span>

                          <div className="hidden sm:block relative w-11 h-11 rounded-sm overflow-hidden border border-[#d8ded2] shrink-0 bg-[#f5f9f1]">
                            <Image
                              src={item.image}
                              alt={item.word}
                              fill
                              className="object-cover"
                              sizes="44px"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-xs sm:text-base text-[#0b0c0b] truncate">
                                {item.word}
                              </span>
                              <span className="hidden sm:inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded-sm bg-[#f5f9f1] border border-[#d8ded2] text-[#6f736d] shrink-0">
                                {item.pos}
                              </span>
                            </div>
                            <span className="text-[10px] sm:text-xs text-[#6f736d] font-mono block truncate mt-0.5">
                              {item.phonetic}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center shrink-0">
                          {isMatched ? (
                            <CheckCircle2 className="w-4 h-4 text-[#09a86f] shrink-0" />
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playPronunciation(item.word);
                              }}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-[#f5f9f1] hover:bg-[#e9ffe0] text-[#09a86f] border border-[#d8ded2] cursor-pointer transition-colors flex items-center justify-center shrink-0"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: 4 Vietnamese Meanings */}
                <div className="space-y-2 sm:space-y-2.5 min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#6f736d] px-0.5">
                    2. Nghĩa tiếng Việt
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
                          "w-full h-[66px] sm:h-[78px] px-2.5 sm:px-3 rounded-sm border text-left transition-all flex items-center justify-between gap-1.5 sm:gap-3 min-w-0 select-none",
                          isMatched
                            ? "bg-[#e9ffe0]/60 border-[#09a86f] opacity-65 cursor-default"
                            : isWrong
                            ? "bg-red-50 border-red-400 ring-2 ring-red-200 cursor-pointer"
                            : isSelected
                            ? "bg-[#e9ffe0] border-[#09a86f] ring-2 ring-[#09a86f]/30 cursor-pointer"
                            : "bg-white border-[#d8ded2] hover:border-[#09a86f] hover:bg-[#f5f9f1]/60 cursor-pointer"
                        )}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <span
                            className={cn(
                              "hidden sm:flex w-6 h-6 rounded-sm text-xs font-bold items-center justify-center shrink-0 border",
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
                            <span className="font-bold sm:font-extrabold text-xs sm:text-base text-[#0b0c0b] line-clamp-2 sm:line-clamp-1 leading-snug">
                              {item.vi}
                            </span>
                            <p className="hidden sm:line-clamp-1 text-[11px] text-[#6f736d] mt-0.5">
                              {maskTargetWord(item.definition, item.word)}
                            </p>
                          </div>
                        </div>

                        {isMatched && (
                          <CheckCircle2 className="w-4 h-4 text-[#09a86f] shrink-0" />
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
        <div ref={fillStageRef} className="space-y-4">
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
            <div key={`fill-q-${fillIndex}`} className="space-y-4 animate-in fade-in duration-150">
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
                      className="absolute bottom-2.5 left-2.5 sm:left-auto sm:right-2.5 px-2.5 py-1.5 rounded-sm bg-white/95 hover:bg-white text-[#09a86f] border border-[#d8ded2] shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
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
        <div ref={sentenceStageRef} className="space-y-4">
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
            <div key={`sentence-q-${sentenceIndex}`} className="space-y-4 animate-in fade-in duration-150">
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
                      className="absolute bottom-2.5 left-2.5 sm:left-auto sm:right-2.5 px-2.5 py-1.5 rounded-sm bg-white/95 hover:bg-white text-[#09a86f] border border-[#d8ded2] shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
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

                {/* Right (7 cols): Duolingo-Style Notebook Lines Workspace */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <div className="space-y-5">
                    {/* Header + Hint */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#0b0c0b]">
                        Chạm vào các từ để ghép thành câu:
                      </span>
                      <button
                        type="button"
                        onClick={handleHintSentenceWord}
                        disabled={
                          isSentenceChecked ||
                          placedWords.length >=
                            currentSentenceQ.scrambledWords.length
                        }
                        className={cn(
                          "inline-flex items-center gap-1 text-[11px] font-bold h-7 px-2.5 rounded-sm transition-colors whitespace-nowrap shrink-0 border",
                          isSentenceChecked ||
                            placedWords.length >=
                              currentSentenceQ.scrambledWords.length
                            ? "opacity-40 cursor-not-allowed bg-amber-50/50 text-amber-700/60 border-amber-200/60"
                            : "text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200 cursor-pointer"
                        )}
                      >
                        <Lightbulb className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>Gợi ý</span>
                      </button>
                    </div>

                    {/* Duolingo-Style Ruled Notebook Lines (No Outer Box, No Numbers) */}
                    <div
                      ref={notebookLinesRef}
                      className="min-h-[96px] pt-1 bg-[linear-gradient(to_bottom,transparent_47px,#d8ded2_48px)] bg-[size:100%_48px] flex flex-wrap items-start content-start gap-x-2 gap-y-3"
                    >
                      {placedWords.map((item) => (
                        <button
                          key={`placed-${item.id}`}
                          type="button"
                          disabled={isSentenceChecked}
                          onClick={() => handleReturnSentenceWord(item)}
                          className={cn(
                            "h-9 px-3.5 rounded-sm text-xs sm:text-sm font-bold border border-b-2 flex items-center justify-center select-none animate-in fade-in zoom-in-95 slide-in-from-bottom-1 duration-150 ease-out transition-all",
                            !isSentenceChecked &&
                              "cursor-pointer hover:-translate-y-0.5 active:scale-95 active:translate-y-0",
                            isSentenceChecked
                              ? isSentenceCorrect
                                ? "bg-[#e9ffe0] border-[#09a86f] text-[#09a86f]"
                                : "bg-red-50 border-red-300 text-red-700"
                              : "bg-white border-[#d8ded2] text-[#0b0c0b] hover:border-[#09a86f]"
                          )}
                        >
                          <span>{item.word}</span>
                        </button>
                      ))}
                    </div>

                    {/* Clean Floating Word Bank (Solid Muted Slots When Picked = Zero Layout Shift, No Outer Box) */}
                    <div className="flex flex-wrap gap-2 items-center pt-1">
                      {currentSentenceQ.scrambledWords.map((item) => {
                        const isPicked = placedWords.some(
                          (w) => w.id === item.id
                        );

                        if (isPicked) {
                          return (
                            <div
                              key={`slot-${item.id}`}
                              aria-hidden="true"
                              className="h-9 px-3.5 rounded-sm text-xs sm:text-sm font-bold bg-[#e8ede4] border border-transparent text-transparent select-none pointer-events-none flex items-center justify-center transition-all duration-150"
                            >
                              <span>{item.word}</span>
                            </div>
                          );
                        }

                        return (
                          <button
                            key={`bank-${item.id}`}
                            type="button"
                            disabled={isSentenceChecked}
                            onClick={() => handlePickSentenceWord(item)}
                            className="h-9 px-3.5 rounded-sm text-xs sm:text-sm font-bold bg-white border border-[#d8ded2] border-b-2 text-[#0b0c0b] hover:border-[#09a86f] hover:bg-[#f5f9f1] hover:-translate-y-0.5 active:scale-95 active:translate-y-0 animate-in fade-in zoom-in-95 duration-150 ease-out transition-all cursor-pointer flex items-center justify-center select-none"
                          >
                            <span>{item.word}</span>
                          </button>
                        );
                      })}
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
                          "px-4 py-2 rounded-sm text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95",
                          placedWords.length > 0
                            ? "bg-[#09a86f] text-white hover:bg-[#089763]"
                            : "bg-[#d8ded2] text-[#6f736d] cursor-not-allowed"
                        )}
                      >
                        Kiểm tra câu
                      </button>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2 animate-in fade-in duration-150">
                        {isSentenceCorrect ? (
                          <button
                            type="button"
                            onClick={handleNextSentenceQuestion}
                            className="px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] active:scale-95 transition-all duration-150 inline-flex items-center gap-1 cursor-pointer"
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
                            className="px-4 py-2 rounded-sm bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 active:scale-95 transition-all duration-150 inline-flex items-center gap-1 cursor-pointer"
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
                          "text-xs font-bold flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-1 duration-200",
                          isSentenceCorrect ? "text-[#09a86f]" : "text-red-600"
                        )}
                      >
                        {isSentenceCorrect ? (
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 animate-in zoom-in-75 duration-200" />
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
