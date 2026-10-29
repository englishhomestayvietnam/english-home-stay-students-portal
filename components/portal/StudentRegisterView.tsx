"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerStudentAction } from "@/app/actions";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Sparkles,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  PhoneCall,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export function StudentRegisterView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMessage(null);
  };

  const isFormValid =
    formData.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    formData.password.length >= 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage("Vui lòng nhập họ và tên của bạn.");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const fd = new FormData();
    fd.append("name", formData.name.trim());
    fd.append("email", formData.email.trim().toLowerCase());
    fd.append("password", formData.password);

    try {
      const res = await registerStudentAction(fd);
      if (res.success) {
        router.push("/portal");
        router.refresh();
      } else {
        setIsSubmitting(false);
        setErrorMessage(res.error || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Không thể kết nối máy chủ. Vui lòng kiểm tra lại kết nối mạng.");
    }
  }

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
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#0b0c0b]/80 hover:text-[#0b0c0b] border border-[#d8ded2] px-3.5 py-1.5 rounded-sm bg-white hover:bg-black/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#09a86f]" />
              <span>Trang chủ</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Centered Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-[460px]">
          
          <div className="bg-white border border-[#d8ded2] rounded-sm p-6 sm:p-8">
            
            {/* Header Badge & Title */}
            <div className="text-center pb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6]/80 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Cổng Học Viên EHV
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0b0c0b]">
                Tạo tài khoản học tập
              </h1>
              <p className="text-xs sm:text-sm text-[#6f736d] mt-1.5 leading-relaxed">
                Đăng ký để tham gia các minigame, luyện nói mỗi ngày và đồng hành cùng homestay.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                  Họ và tên của bạn <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6f736d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="VD: Nguyễn Phương Thảo"
                    autoFocus
                    className={cn(
                      "w-full border rounded-sm py-2.5 pl-10 pr-3.5 text-sm bg-white text-[#0b0c0b] transition-all",
                      formData.name.length >= 2
                        ? "border-[#09a86f] ring-1 ring-[#09a86f]/20"
                        : "border-[#d8ded2] focus:border-[#09a86f] focus:ring-1 focus:ring-[#09a86f]/20",
                      "focus:outline-none"
                    )}
                  />
                </div>
              </div>

              {/* Field 2: Email */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                  Địa chỉ email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6f736d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className={cn(
                      "w-full border rounded-sm py-2.5 pl-10 pr-3.5 text-sm bg-white text-[#0b0c0b] transition-all",
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                        ? "border-[#09a86f] ring-1 ring-[#09a86f]/20"
                        : "border-[#d8ded2] focus:border-[#09a86f] focus:ring-1 focus:ring-[#09a86f]/20",
                      "focus:outline-none"
                    )}
                  />
                </div>
              </div>

              {/* Field 3: Password */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6f736d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    autoComplete="new-password"
                    className={cn(
                      "w-full border rounded-sm py-2.5 pl-10 pr-10 text-sm bg-white text-[#0b0c0b] transition-all",
                      formData.password.length >= 6
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
                <p className="text-[11px] text-[#6f736d] mt-1">
                  Mật khẩu cần ít nhất 6 ký tự.
                </p>
              </div>

              {/* Security info */}
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#6f736d]">
                <Lock className="w-3 h-3 text-[#09a86f] shrink-0" />
                <span>Bảo mật an toàn, dữ liệu chỉ dùng trong nội bộ Homestay.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={cn(
                    "w-full py-3 px-4 rounded-sm text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                    isFormValid && !isSubmitting
                      ? "bg-[#09a86f] hover:bg-[#089763] text-white active:scale-[0.99] cursor-pointer"
                      : "bg-[#d8ded2] text-[#6f736d] cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang tạo tài khoản...</span>
                    </>
                  ) : (
                    <>
                      <span>Tạo tài khoản học viên</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Footer switch to Login */}
            <div className="mt-6 pt-5 border-t border-[#d8ded2] text-center">
              <p className="text-xs text-[#6f736d]">
                Đã có tài khoản học viên?{" "}
                <Link
                  href="/portal/login"
                  className="font-bold text-[#09a86f] hover:underline hover:text-[#089763] transition-colors"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>

          </div>

          {/* Homestay Community guarantee */}
          <div className="mt-5 text-center text-xs text-[#6f736d] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#09a86f]" />
            <span>Môi trường sống & học tiếng Anh tự nhiên tại Việt Nam</span>
          </div>

        </div>
      </main>
    </div>
  );
}
