"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  requestPasswordResetCodeAction,
  verifyPasswordResetCodeAction,
  resetStudentPasswordAction,
} from "@/app/actions";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  PhoneCall,
  Loader2,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react";

type Step = "email" | "code" | "reset" | "done";

export function StudentForgotPasswordView() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const digitRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Pre-fill email (and optional 6-digit code from email button) if passed via URL query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const initialEmail = params.get("email");
      const initialCode = params.get("code")?.replace(/\D/g, "").slice(0, 6);
      if (initialEmail) {
        setEmail(initialEmail.trim().toLowerCase());
      }
      if (initialEmail && initialCode && initialCode.length === 6) {
        setDigits(initialCode.split(""));
        setStep("code");
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(initialCode).catch(() => {});
        }
        setInfoMessage(
          "Đã sao chép và tự động điền mã xác nhận 6 chữ số từ email của bạn!"
        );
      }
    }
  }, []);

  // Resend cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const code = digits.join("");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isCodeValid = /^\d{6}$/.test(code);
  const isResetValid =
    password.length >= 6 && confirmPassword === password;

  // Step 1: Request 6-digit verification code via email
  async function handleRequestCode(e?: React.FormEvent) {
    if (e) e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!isEmailValid) {
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setInfoMessage(null);

    const fd = new FormData();
    fd.append("email", normalizedEmail);

    try {
      const res = await requestPasswordResetCodeAction(fd);
      setIsSubmitting(false);

      if ("success" in res && res.success) {
        setStep("code");
        setDigits(["", "", "", "", "", ""]);
        setCooldown(60);
        setInfoMessage(
          `Mã xác nhận 6 chữ số đã được gửi tới ${normalizedEmail}. Vui lòng kiểm tra hộp thư (và mục Spam/Quảng cáo).`
        );
        setTimeout(() => {
          digitRefs.current[0]?.focus();
        }, 50);
      } else {
        setErrorMessage(res.error || "Không thể gửi mã xác nhận. Vui lòng thử lại.");
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Không thể kết nối máy chủ. Vui lòng kiểm tra lại kết nối mạng.");
    }
  }

  // Step 2: Verify 6-digit OTP code
  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();

    if (!isCodeValid) {
      setErrorMessage("Vui lòng nhập đủ 6 chữ số xác nhận.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const fd = new FormData();
    fd.append("email", email.trim().toLowerCase());
    fd.append("code", code);

    try {
      const res = await verifyPasswordResetCodeAction(fd);
      setIsSubmitting(false);

      if (res.success) {
        setInfoMessage(null);
        setStep("reset");
      } else {
        setErrorMessage(res.error || "Mã xác nhận không chính xác.");
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Không thể kết nối máy chủ. Vui lòng thử lại.");
    }
  }

  // Step 3: Set new password & log in
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMessage("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu nhập lại không khớp.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const fd = new FormData();
    fd.append("email", email.trim().toLowerCase());
    fd.append("code", code);
    fd.append("password", password);

    try {
      const res = await resetStudentPasswordAction(fd);
      if (res.success) {
        setStep("done");
        setTimeout(() => {
          router.push("/portal");
          router.refresh();
        }, 1200);
      } else {
        setIsSubmitting(false);
        setErrorMessage(res.error || "Không thể đặt lại mật khẩu. Vui lòng thử lại.");
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Không thể kết nối máy chủ. Vui lòng kiểm tra lại kết nối mạng.");
    }
  }

  function handleDigitChange(index: number, rawValue: string) {
    setErrorMessage(null);
    const numeric = rawValue.replace(/\D/g, "");

    if (!numeric) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    // Handle multi-digit input (e.g. mobile autocomplete)
    if (numeric.length > 1) {
      const chars = numeric.slice(0, 6).split("");
      const next = [...digits];
      chars.forEach((ch, idx) => {
        if (index + idx < 6) {
          next[index + idx] = ch;
        }
      });
      setDigits(next);
      const focusIdx = Math.min(index + chars.length, 5);
      digitRefs.current[focusIdx]?.focus();
      return;
    }

    const next = [...digits];
    next[index] = numeric;
    setDigits(next);

    if (index < 5) {
      digitRefs.current[index + 1]?.focus();
    }
  }

  function handleDigitKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      digitRefs.current[index - 1]?.focus();
    }
  }

  function handleDigitPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    setErrorMessage(null);
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((ch, idx) => {
      next[idx] = ch;
    });
    setDigits(next);
    const focusIdx = Math.min(pasted.length, 5);
    digitRefs.current[focusIdx]?.focus();
  }

  const stepTitle =
    step === "email"
      ? "Quên mật khẩu?"
      : step === "code"
      ? "Nhập mã xác nhận"
      : step === "reset"
      ? "Tạo mật khẩu mới"
      : "Đặt lại thành công!";

  const stepDescription =
    step === "email"
      ? "Nhập email tài khoản học viên để nhận mã xác nhận 6 chữ số."
      : step === "code"
      ? `Chúng tôi đã gửi mã 6 chữ số đến ${email}.`
      : step === "reset"
      ? "Thiết lập mật khẩu mới để tiếp tục học tập trên Cổng Học Viên."
      : "Mật khẩu đã được cập nhật. Đang chuyển bạn vào Cổng Học Viên...";

  return (
    <div className="min-h-screen bg-white text-[#0b0c0b] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-[#d8ded2]">
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

          <div className="flex items-center gap-3">
            <a
              href="tel:0968199900"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#0b0c0b]/70 hover:text-[#0b0c0b] border border-[#d8ded2] px-3 py-1.5 rounded-sm bg-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#09a86f]" />
              <span>Hotline: 096 819 99 00</span>
            </a>

            <Link
              href="/portal/login"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#0b0c0b]/80 hover:text-[#0b0c0b] border border-[#d8ded2] px-3.5 py-1.5 rounded-sm bg-white hover:bg-black/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#09a86f]" />
              <span>Đăng nhập</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Centered Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-[440px]">
          <div className="bg-white border border-[#d8ded2] rounded-sm p-6 sm:p-8">
            {/* Header Badge & Title */}
            <div className="text-center pb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6]/80 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Khôi Phục Mật Khẩu</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0b0c0b]">
                <span key={`title-${step}`}>{stepTitle}</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#6f736d] mt-1.5 leading-relaxed">
                <span key={`desc-${step}`}>{stepDescription}</span>
              </p>
            </div>

            {/* Step Progress Indicator */}
            {step !== "done" && (
              <div className="flex items-center justify-center gap-2 pb-5">
                {[
                  { id: "email", label: "1. Email" },
                  { id: "code", label: "2. Mã 6 số" },
                  { id: "reset", label: "3. Mật khẩu mới" },
                ].map((item, idx) => {
                  const stepOrder = ["email", "code", "reset"];
                  const currentIdx = stepOrder.indexOf(step);
                  const isActive = idx === currentIdx;
                  const isDone = idx < currentIdx;
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "flex-1 text-center py-1 px-2 rounded-sm text-[11px] font-bold border transition-colors",
                        isActive
                          ? "bg-[#e9ffe0] text-[#09a86f] border-[#09a86f]"
                          : isDone
                          ? "bg-[#f5f9f1] text-[#09a86f] border-[#bbffa6]"
                          : "bg-white text-[#6f736d] border-[#d8ded2]"
                      )}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Info Banner */}
            {infoMessage && (
              <div className="mb-4 p-3 bg-[#e9ffe0]/70 border border-[#bbffa6] text-[#0b0c0b] text-xs rounded-sm flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#09a86f] mt-0.5" />
                <span>{infoMessage}</span>
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: Enter Email */}
            {step === "email" && (
              <form key="step-email-form" onSubmit={handleRequestCode} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                    Địa chỉ email đã đăng ký <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6f736d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="name@example.com"
                      autoComplete="email"
                      className={cn(
                        "w-full border rounded-sm py-2.5 pl-10 pr-3.5 text-sm bg-white text-[#0b0c0b] transition-all",
                        isEmailValid
                          ? "border-[#09a86f] ring-1 ring-[#09a86f]/20"
                          : "border-[#d8ded2] focus:border-[#09a86f] focus:ring-1 focus:ring-[#09a86f]/20",
                        "focus:outline-none"
                      )}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isEmailValid || isSubmitting}
                    className={cn(
                      "w-full py-3 px-4 rounded-sm text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                      isEmailValid && !isSubmitting
                        ? "bg-[#09a86f] hover:bg-[#089763] text-white active:scale-[0.99] cursor-pointer"
                        : "bg-[#d8ded2] text-[#6f736d] cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <span key="email-submitting" className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang gửi mã...</span>
                      </span>
                    ) : (
                      <span key="email-idle" className="inline-flex items-center gap-2">
                        <span>Gửi mã xác nhận qua Email</span>
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Enter 6-Digit Code */}
            {step === "code" && (
              <form key="step-code-form" onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#0b0c0b]">
                      Mã xác nhận (6 chữ số) <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setStep("email");
                        setErrorMessage(null);
                        setInfoMessage(null);
                      }}
                      className="text-[11px] font-semibold text-[#09a86f] hover:underline cursor-pointer"
                    >
                      Đổi email khác
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-2" translate="no">
                    {digits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          digitRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={digit}
                        onChange={(e) => handleDigitChange(index, e.target.value)}
                        onKeyDown={(e) => handleDigitKeyDown(index, e)}
                        onPaste={handleDigitPaste}
                        aria-label={`Chữ số thứ ${index + 1}`}
                        className={cn(
                          "w-full h-12 text-center text-lg font-extrabold font-mono border rounded-sm bg-white text-[#0b0c0b] transition-all focus:outline-none",
                          digit
                            ? "border-[#09a86f] ring-1 ring-[#09a86f]/20 bg-[#e9ffe0]/20"
                            : "border-[#d8ded2] focus:border-[#09a86f] focus:ring-1 focus:ring-[#09a86f]/20"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6f736d] pt-1">
                  <span>Chưa nhận được email?</span>
                  <button
                    type="button"
                    disabled={cooldown > 0 || isSubmitting}
                    onClick={() => handleRequestCode()}
                    className={cn(
                      "inline-flex items-center gap-1 font-semibold transition-colors",
                      cooldown > 0 || isSubmitting
                        ? "text-[#6f736d] cursor-not-allowed"
                        : "text-[#09a86f] hover:underline cursor-pointer"
                    )}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>
                      {cooldown > 0 ? `Gửi lại sau ${cooldown}s` : "Gửi lại mã mới"}
                    </span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isCodeValid || isSubmitting}
                    className={cn(
                      "w-full py-3 px-4 rounded-sm text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                      isCodeValid && !isSubmitting
                        ? "bg-[#09a86f] hover:bg-[#089763] text-white active:scale-[0.99] cursor-pointer"
                        : "bg-[#d8ded2] text-[#6f736d] cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <span key="code-submitting" className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang kiểm tra mã...</span>
                      </span>
                    ) : (
                      <span key="code-idle" className="inline-flex items-center gap-2">
                        <span>Xác nhận mã</span>
                        <KeyRound className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Enter New Password */}
            {step === "reset" && (
              <form key="step-reset-form" onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#6f736d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="Tối thiểu 6 ký tự"
                      autoComplete="new-password"
                      className={cn(
                        "w-full border rounded-sm py-2.5 pl-10 pr-10 text-sm bg-white text-[#0b0c0b] transition-all",
                        password.length >= 6
                          ? "border-[#09a86f] ring-1 ring-[#09a86f]/20"
                          : "border-[#d8ded2] focus:border-[#09a86f] focus:ring-1 focus:ring-[#09a86f]/20",
                        "focus:outline-none"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6f736d] hover:text-[#0b0c0b] p-0.5 cursor-pointer"
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                    Nhập lại mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#6f736d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="Nhập lại mật khẩu mới"
                      autoComplete="new-password"
                      className={cn(
                        "w-full border rounded-sm py-2.5 pl-10 pr-10 text-sm bg-white text-[#0b0c0b] transition-all",
                        confirmPassword.length >= 6 && confirmPassword === password
                          ? "border-[#09a86f] ring-1 ring-[#09a86f]/20"
                          : "border-[#d8ded2] focus:border-[#09a86f] focus:ring-1 focus:ring-[#09a86f]/20",
                        "focus:outline-none"
                      )}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isResetValid || isSubmitting}
                    className={cn(
                      "w-full py-3 px-4 rounded-sm text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                      isResetValid && !isSubmitting
                        ? "bg-[#09a86f] hover:bg-[#089763] text-white active:scale-[0.99] cursor-pointer"
                        : "bg-[#d8ded2] text-[#6f736d] cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <span key="reset-submitting" className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang lưu mật khẩu...</span>
                      </span>
                    ) : (
                      <span key="reset-idle" className="inline-flex items-center gap-2">
                        <span>Lưu mật khẩu & Đăng nhập</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Done */}
            {step === "done" && (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-sm bg-[#e9ffe0] border border-[#bbffa6] flex items-center justify-center mx-auto text-[#09a86f]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-[#0b0c0b]">
                  Đặt lại mật khẩu thành công!
                </p>
                <p className="text-xs text-[#6f736d]">
                  Đang tự động đăng nhập vào Cổng Học Viên...
                </p>
              </div>
            )}

            {/* Footer switch back to Login */}
            <div className="mt-6 pt-5 border-t border-[#d8ded2] text-center">
              <p className="text-xs text-[#6f736d]">
                Đã nhớ mật khẩu của bạn?{" "}
                <Link
                  href="/portal/login"
                  className="font-bold text-[#09a86f] hover:underline hover:text-[#089763] transition-colors"
                >
                  Quay lại đăng nhập
                </Link>
              </p>
            </div>
          </div>

          {/* Quick Help */}
          <div className="mt-5 text-center text-xs text-[#6f736d]">
            <span>Không nhận được mã xác nhận? </span>
            <a
              href="https://zalo.me/0866081995"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0b0c0b] hover:text-[#09a86f] underline"
            >
              Liên hệ Zalo hỗ trợ
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

