"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/app/actions";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Check } from "lucide-react";

type SignupModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerSource?: string;
  initialStep?: number;
};

const STEPS = [
  { id: 1, name: "Thông tin", desc: "Họ tên & Số điện thoại" },
  { id: 2, name: "Trình độ", desc: "Đánh giá trình độ hiện tại" },
  { id: 3, name: "Mục tiêu", desc: "Mục tiêu bạn muốn đạt" },
];

export function SignupModal({
  open,
  onOpenChange,
  triggerSource = "default",
  initialStep = 1,
}: SignupModalProps) {
  const [step, setStep] = useState<number>(initialStep);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    level: "",
    goal: "",
  });

  useEffect(() => {
    if (open) {
      setStep(initialStep);
      setStatus("idle");
    }
  }, [open, initialStep]);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canNextStep = () => {
    if (step === 1) return formData.name.trim().length >= 2 && formData.phone.trim().length >= 8;
    if (step === 2) return formData.level !== "";
    if (step === 3) return formData.goal !== "";
    return false;
  };

  const goNext = () => {
    if (step < 3 && canNextStep()) {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  async function handleFinalSubmit() {
    if (!canNextStep()) return;
    setStatus("submitting");
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    const res = await submitContactForm(fd);
    setStatus(res.success ? "success" : "idle");
    if (!res.success) {
      alert(res.error || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  }

  const renderStep = () => {
    if (status === "success") {
      return (
        <div className="flex flex-col items-center justify-center py-5 text-center animate-[fadeIn_0.35s_ease-out_both]">
          <span className="text-4xl mb-3 block animate-[scaleIn_0.35s_ease-out_both]">
            🎉
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0b0c0b] mb-2">
            Đăng ký thành công!
          </h3>
          <p className="text-[#6f736d] max-w-[320px] mb-5 leading-relaxed text-sm">
            Cảm ơn <span className="font-bold text-[#0b0c0b]">{formData.name}</span>! Đội ngũ của chúng tôi sẽ liên hệ trong 24 giờ làm việc để xếp lịch học thử miễn phí.
          </p>
          <div className="px-5 py-4 w-full max-w-xs bg-[#f5f9f1] border border-[#d8ded2] rounded-lg text-left">
            <p className="text-[13px] font-bold text-[#0b0c0b] mb-2">Chúng tôi sẽ gửi cho bạn:</p>
            <ul className="text-[12px] text-[#6f736d] space-y-2">
              <li className="flex items-center gap-2"><span className="text-[#09a86f] font-bold">✓</span> Lịch học thử phù hợp</li>
              <li className="flex items-center gap-2"><span className="text-[#09a86f] font-bold">✓</span> Đề thi đánh giá trình độ</li>
              <li className="flex items-center gap-2"><span className="text-[#09a86f] font-bold">✓</span> Giới thiệu về giáo viên</li>
            </ul>
          </div>
          <DialogClose
            render={
              <Button
                type="button"
                className="mt-6 rounded-lg !bg-[#09a86f] hover:!bg-[#089763] text-white !px-7 !h-10 text-sm font-bold !shadow-none transition-all cursor-pointer"
              />
            }
          >
            Hoàn tất
          </DialogClose>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="space-y-4 animate-[slideInRight_0.3s_ease-out_both]">
          <div>
            <label className="block text-[13px] font-bold mb-1.5 text-[#0b0c0b]">
              👋 Họ và tên của bạn
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="VD: Nguyễn Văn A"
              className={cn(
                "w-full border rounded-lg py-2.5 px-3.5 text-[14px] transition-all duration-200",
                "bg-white text-[#0b0c0b]",
                formData.name.length >= 2
                  ? "border-[#09a86f] focus:border-[#09a86f] focus:ring-2 focus:ring-[#09a86f]/15"
                  : "border-[#d8ded2] focus:border-[#09a86f] focus:ring-2 focus:ring-[#09a86f]/15",
                "focus:outline-none"
              )}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold mb-1.5 text-[#0b0c0b]">
              📞 Số điện thoại (Zalo cũng được)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="VD: 090 123 4567"
              className={cn(
                "w-full border rounded-lg py-2.5 px-3.5 text-[14px] transition-all duration-200",
                "bg-white text-[#0b0c0b]",
                formData.phone.length >= 8
                  ? "border-[#09a86f] focus:border-[#09a86f] focus:ring-2 focus:ring-[#09a86f]/15"
                  : "border-[#d8ded2] focus:border-[#09a86f] focus:ring-2 focus:ring-[#09a86f]/15",
                "focus:outline-none"
              )}
            />
            <p className="text-[11px] text-[#6f736d] mt-2 flex items-center gap-1.5">
              🔒 Thông tin của bạn được bảo mật, không chia sẻ với bên thứ 3.
            </p>
          </div>
        </div>
      );
    }

    if (step === 2) {
      const levels = [
        { value: "beginner", label: "Mới bắt đầu", desc: "Biết chút ít từ vựng, chưa tự tin nói", emoji: "🌱" },
        { value: "elementary", label: "Cơ bản", desc: "Có thể nói những câu đơn giản", emoji: "📚" },
        { value: "intermediate", label: "Trung bình", desc: "Nói được nhưng còn ngập ngừng", emoji: "🚀" },
        { value: "advanced", label: "Khá", desc: "Giao tiếp được, muốn giỏi hơn", emoji: "💪" },
      ];
      return (
        <div className="space-y-2 animate-[slideInRight_0.3s_ease-out_both]">
          <label className="block text-[13px] font-bold mb-1 text-[#0b0c0b]">
            🎯 Trình độ tiếng Anh của bạn hiện tại?
          </label>
          {levels.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => updateField("level", l.value)}
              className={cn(
                "w-full text-left p-3 rounded-lg border transition-all duration-150 cursor-pointer",
                "flex items-start gap-3",
                formData.level === l.value
                  ? "border-[#09a86f] bg-[#f5f9f1] ring-1 ring-[#09a86f]"
                  : "border-[#d8ded2] bg-white hover:border-[#09a86f]/50 hover:bg-[#f5f9f1]/40"
              )}
            >
              <span className="text-xl shrink-0 mt-0.5">{l.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#0b0c0b] text-[13.5px] leading-tight">{l.label}</p>
                <p className="text-[11.5px] text-[#6f736d] mt-0.5">{l.desc}</p>
              </div>
              <div
                className={cn(
                  "w-4.5 h-4.5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-all",
                  formData.level === l.value
                    ? "border-[#09a86f] bg-[#09a86f] text-white"
                    : "border-[#d8ded2]"
                )}
              >
                {formData.level === l.value && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          ))}
        </div>
      );
    }

    const goals = [
      { value: "work", label: "Công việc & Sự nghiệp", emoji: "💼" },
      { value: "study", label: "Du học & Học tập", emoji: "🎓" },
      { value: "travel", label: "Du lịch & Gặp gỡ", emoji: "✈️" },
      { value: "exam", label: "Thi IELTS / TOEIC", emoji: "📝" },
      { value: "confidence", label: "Tự tin giao tiếp", emoji: "🎤" },
      { value: "other", label: "Mục tiêu khác", emoji: "🌟" },
    ];
    return (
      <div className="space-y-2 animate-[slideInRight_0.3s_ease-out_both]">
        <label className="block text-[13px] font-bold mb-1 text-[#0b0c0b]">
          🏆 Mục tiêu lớn nhất của bạn khi học tiếng Anh?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {goals.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => updateField("goal", g.value)}
              className={cn(
                "p-2.5 rounded-lg border transition-all duration-150 text-left cursor-pointer",
                formData.goal === g.value
                  ? "border-[#09a86f] bg-[#f5f9f1] ring-1 ring-[#09a86f]"
                  : "border-[#d8ded2] bg-white hover:border-[#09a86f]/50 hover:bg-[#f5f9f1]/40"
              )}
            >
              <span className="text-lg block mb-1">{g.emoji}</span>
              <p className="font-bold text-[12.5px] text-[#0b0c0b] leading-tight">{g.label}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={status !== "submitting"}>
        {status !== "success" && (
          <DialogHeader className="pb-3 border-b border-[#d8ded2]">
            <div className="flex flex-col items-center">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#09a86f]/10 text-[#09a86f] border border-[#09a86f]/20 mb-2">
                Bước {step} / 3
              </span>
              <DialogTitle>
                🎉 Đăng ký học thử miễn phí
              </DialogTitle>
              <DialogDescription className="mt-1">
                Chỉ mất 30 giây để hoàn tất — Nhận lịch học ngay hôm nay!
              </DialogDescription>
            </div>

            {/* Segmented Step Progress Bar */}
            <div className="mt-3 space-y-1.5">
              <div className="flex gap-2">
                {STEPS.map((s) => (
                  <div
                    key={s.id}
                    className={cn(
                      "h-1 flex-1 rounded-sm transition-all duration-300",
                      step >= s.id ? "bg-[#09a86f]" : "bg-[#d8ded2]"
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-[#6f736d] px-0.5">
                {STEPS.map((s) => (
                  <span
                    key={s.id}
                    className={cn(
                      "transition-colors",
                      step === s.id ? "text-[#09a86f] font-bold" : step > s.id ? "text-[#0b0c0b]" : "text-[#6f736d]/70"
                    )}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </DialogHeader>
        )}

        <div className={cn(
          "flex-1 overflow-y-auto px-1.5 py-3",
          status === "success" ? "px-1 py-1" : ""
        )}>
          {renderStep()}
        </div>

        {status !== "success" && (
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={step === 1}
              className={cn(
                "!h-9 !rounded-lg !px-3.5 text-[#6f736d] hover:text-[#0b0c0b] hover:bg-black/5 text-xs font-semibold transition-all cursor-pointer",
                step === 1 ? "opacity-0 pointer-events-none" : ""
              )}
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Quay lại
            </Button>
            <div className="flex-1" />
            {step < 3 ? (
              <Button
                type="button"
                onClick={goNext}
                disabled={!canNextStep()}
                className={cn(
                  "!h-9 !rounded-lg !px-5 text-xs font-bold transition-all duration-200 cursor-pointer !shadow-none",
                  canNextStep()
                    ? "!bg-[#09a86f] hover:!bg-[#089763] !text-white"
                    : "!bg-[#d8ded2] !text-[#6f736d]/70 !cursor-not-allowed"
                )}
              >
                Tiếp theo <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleFinalSubmit}
                disabled={!canNextStep() || status === "submitting"}
                className={cn(
                  "!h-9 !rounded-lg !px-5 text-xs font-bold transition-all duration-200 relative overflow-hidden cursor-pointer !shadow-none",
                  canNextStep()
                    ? "!bg-[#09a86f] hover:!bg-[#089763] !text-white"
                    : "!bg-[#d8ded2] !text-[#6f736d]/70 !cursor-not-allowed"
                )}
              >
                {status === "submitting" ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    Hoàn tất đăng ký
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
