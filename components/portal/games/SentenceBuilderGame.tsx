"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Volume2,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shuffle,
  Mic,
  Undo2,
} from "lucide-react";
import { getSentenceBuilderQuestions } from "@/lib/games-data";

interface SentenceBuilderGameProps {
  onAddXp: (amount: number) => void;
}

export function SentenceBuilderGame({ onAddXp }: SentenceBuilderGameProps) {
  const [questions, setQuestions] = useState<
    ReturnType<typeof getSentenceBuilderQuestions>
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Placed words in the sentence line
  const [placedWords, setPlacedWords] = useState<
    { id: string; word: string }[]
  >([]);
  // Remaining available words in tray
  const [availableWords, setAvailableWords] = useState<
    { id: string; word: string }[]
  >([]);

  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load 5 sentence questions on mount
  useEffect(() => {
    resetGame();
  }, []);

  function resetGame() {
    const qList = getSentenceBuilderQuestions(5);
    setQuestions(qList);
    setCurrentIndex(0);
    setScore(0);
    setIsCompleted(false);
    setIsChecked(false);
    setIsCorrect(false);

    if (qList[0]) {
      setPlacedWords([]);
      setAvailableWords([...qList[0].scrambledWords]);
    }
  }

  // When moving to another question
  useEffect(() => {
    if (questions[currentIndex]) {
      setPlacedWords([]);
      setAvailableWords([...questions[currentIndex].scrambledWords]);
      setIsChecked(false);
      setIsCorrect(false);
    }
  }, [currentIndex, questions]);

  function playAudio(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Move word from tray to sentence line
  function handlePickWord(item: { id: string; word: string }) {
    if (isChecked) return;
    setPlacedWords((prev) => [...prev, item]);
    setAvailableWords((prev) => prev.filter((w) => w.id !== item.id));
  }

  // Return word from sentence line back to tray
  function handleReturnWord(item: { id: string; word: string }) {
    if (isChecked) return;
    setPlacedWords((prev) => prev.filter((w) => w.id !== item.id));
    setAvailableWords((prev) => [...prev, item]);
  }

  function handleCheckSentence() {
    if (placedWords.length === 0) return;
    const currentQ = questions[currentIndex];
    const assembledText = placedWords.map((w) => w.word).join(" ");
    const isMatched =
      assembledText.trim().toLowerCase() ===
      currentQ.fullSentence.trim().toLowerCase();

    setIsChecked(true);
    setIsCorrect(isMatched);

    if (isMatched) {
      setScore((prev) => prev + 1);
      onAddXp(30);
      playAudio(currentQ.fullSentence);
    }
  }

  function handleNextQuestion() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }

  function handleRetryCurrent() {
    if (questions[currentIndex]) {
      setPlacedWords([]);
      setAvailableWords([...questions[currentIndex].scrambledWords]);
      setIsChecked(false);
      setIsCorrect(false);
    }
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="bg-white border border-[#d8ded2] rounded-sm p-5 sm:p-6 flex flex-col justify-between space-y-4">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d8ded2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-sm bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6] text-[10px] font-bold uppercase">
                Game 2
              </span>
              <h3 className="text-base font-bold text-[#0b0c0b]">
                Sentence Builder (Sắp xếp câu & luyện đọc)
              </h3>
            </div>
            <p className="text-xs text-[#6f736d] mt-0.5">
              Ghép các từ thành câu hội thoại hoàn chỉnh và nghe phát âm chuẩn
            </p>
          </div>

          <span className="text-xs font-bold text-[#09a86f] bg-[#e9ffe0] px-2.5 py-1 rounded-sm border border-[#bbffa6] self-start sm:self-auto">
            +30 XP / câu đúng
          </span>
        </div>

        {/* Content */}
        <div className="pt-4">
          {isCompleted ? (
            <div className="py-8 text-center bg-white rounded-sm border border-[#bbffa6]">
              <div className="w-12 h-12 mx-auto rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center mb-3 text-[#09a86f]">
                <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h4 className="text-base font-bold text-[#0b0c0b]">
                Xuất sắc! Bạn đã hoàn thành bài tập ghép câu!
              </h4>
              <p className="text-xs text-[#6f736d] mt-1">
                Điểm đúng: {score}/{questions.length} câu (+{score * 30} XP).
              </p>
              <button
                onClick={resetGame}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Thử sức bộ câu mới
              </button>
            </div>
          ) : currentQ ? (
            <div className="space-y-4">
              {/* Question progress */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#6f736d]">
                  Câu {currentIndex + 1}/{questions.length}
                </span>
                <span className="text-[11px] text-[#6f736d] font-medium">
                  {currentQ.translation}
                </span>
              </div>

              {/* Assembled Sentence Slot */}
              <div className="min-h-[64px] p-3 rounded-sm border-2 border-dashed border-[#d8ded2] bg-[#f5f9f1]/50 flex flex-wrap items-center gap-2">
                {placedWords.length === 0 ? (
                  <span className="text-xs text-[#6f736d] italic">
                    Chạm vào các từ bên dưới theo đúng thứ tự để tạo thành câu...
                  </span>
                ) : (
                  placedWords.map((item) => (
                    <button
                      key={`placed-${item.id}`}
                      disabled={isChecked}
                      onClick={() => handleReturnWord(item)}
                      className={cn(
                        "px-3 py-1.5 rounded-sm text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer",
                        isChecked
                          ? isCorrect
                            ? "bg-[#e9ffe0] border-[#09a86f] text-[#09a86f]"
                            : "bg-red-50 border-red-300 text-red-700"
                          : "bg-white border-[#09a86f] text-[#0b0c0b] hover:bg-red-50 hover:border-red-300"
                      )}
                      title="Bấm để trả từ lại khay"
                    >
                      <span>{item.word}</span>
                      {!isChecked && (
                        <Undo2 className="w-3 h-3 text-[#6f736d]" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Scrambled Word Tray */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#0b0c0b]">
                  Kho từ vựng có sẵn:
                </p>
                <div className="flex flex-wrap gap-2 min-h-[44px]">
                  {availableWords.map((item) => (
                    <button
                      key={`avail-${item.id}`}
                      onClick={() => handlePickWord(item)}
                      className="px-3.5 py-2 rounded-sm text-xs font-bold bg-white border border-[#d8ded2] text-[#0b0c0b] hover:border-[#09a86f] hover:bg-[#e9ffe0]/40 transition-all cursor-pointer active:scale-95"
                    >
                      {item.word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback and Actions */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#d8ded2]">
                <div className="flex items-center gap-2">
                  {!isChecked ? (
                    <button
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playAudio(currentQ.fullSentence)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-white border border-[#d8ded2] hover:bg-[#f5f9f1] text-[#09a86f] text-xs font-bold cursor-pointer"
                        title="Nghe lại câu hoàn chỉnh"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Nghe mẫu</span>
                      </button>

                      {isCorrect ? (
                        <button
                          onClick={handleNextQuestion}
                          className="px-4 py-2 rounded-sm bg-[#09a86f] text-white text-xs font-bold hover:bg-[#089763] transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>
                            {currentIndex + 1 < questions.length
                              ? "Câu tiếp theo"
                              : "Xem kết quả"}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleRetryCurrent}
                          className="px-4 py-2 rounded-sm bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Sắp xếp lại</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Accuracy feedback indicator */}
                {isChecked && (
                  <div
                    className={cn(
                      "text-xs font-bold flex items-center gap-1.5",
                      isCorrect ? "text-[#09a86f]" : "text-red-600"
                    )}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Chính xác! Câu hoàn chỉnh đúng ngữ pháp.</span>
                      </>
                    ) : (
                      <span>Chưa chính xác, thứ tự các từ chưa đúng.</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Footer info */}
      <div className="pt-3 border-t border-[#d8ded2] flex items-center justify-between text-[11px] text-[#6f736d]">
        <span>Thực hành cấu trúc câu giao tiếp thực tế</span>
        <span className="text-[#09a86f] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Tự động cộng XP
        </span>
      </div>
    </div>
  );
}
