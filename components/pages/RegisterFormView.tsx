"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { submitContactForm } from "@/app/actions";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Sparkles,
  Check,
  Lock,
  PhoneCall,
  MessageSquare,
  Home as HomeIcon,
} from "lucide-react";

export function RegisterFormView() {
  const searchParams = useSearchParams();
  const formType = searchParams.get("type"); // "consultation" | "trial" | null
  const isConsultation = formType === "consultation";

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    yearOfBirth: "",
    address: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMessage(null);
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      formData.phone.trim().replace(/\s/g, "").length >= 8 &&
      formData.yearOfBirth.trim().length >= 2 &&
      formData.address.trim().length >= 2
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage("Vui lòng nhập họ và tên của bạn.");
      return;
    }
    if (formData.phone.trim().replace(/\s/g, "").length < 8) {
      setErrorMessage("Vui lòng nhập số điện thoại / Zalo hợp lệ.");
      return;
    }
    if (!formData.yearOfBirth.trim()) {
      setErrorMessage("Vui lòng nhập năm sinh của bạn.");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMessage("Vui lòng nhập địa chỉ / khu vực bạn đang sinh sống.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const fd = new FormData();
    fd.append("name", formData.name.trim());
    fd.append("phone", formData.phone.trim());
    fd.append("yearOfBirth", formData.yearOfBirth.trim());
    fd.append("address", formData.address.trim());

    try {
      const res = await submitContactForm(fd);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("idle");
        setErrorMessage(res.error || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch {
      setStatus("idle");
      setErrorMessage("Không thể kết nối máy chủ. Vui lòng kiểm tra lại kết nối mạng.");
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0b0c0b] flex flex-col font-sans overflow-x-hidden">
      {/* Top Header */}
      <header className="bg-white border-b border-[#d8ded2]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Image
              src="/logo.svg"
              alt="English Homestay Logo"
              width={36}
              height={36}
              className="w-7 h-7 sm:w-9 sm:h-9 object-contain shrink-0"
              priority
            />
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#0b0c0b] truncate">
              English<span className="text-[#09a86f]">Homestay</span>
            </span>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href="tel:0968199900"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#0b0c0b]/70 hover:text-[#0b0c0b] border border-[#d8ded2] px-3 py-1.5 rounded-sm bg-white transition-colors whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#09a86f]" />
              <span>Hotline: 096 819 99 00</span>
            </a>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#0b0c0b]/80 hover:text-[#0b0c0b] border border-[#d8ded2] px-3 sm:px-3.5 py-1.5 rounded-sm bg-white hover:bg-black/5 transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#09a86f] shrink-0" />
              <span className="sm:hidden">Trang chủ</span>
              <span className="hidden sm:inline">Quay lại trang chủ</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container - Centered focused form card */}
      <main className="flex-1 flex items-center justify-center p-4 pb-20 sm:p-6 lg:p-10">
        <div className="w-full max-w-[460px] mx-auto">
          
          <div className="bg-white border border-[#d8ded2] rounded-sm p-5 sm:p-8">
            
            {status === "success" ? (
              /* Success State Screen */
              <div className="text-center py-4">
                <div className="w-12 h-12 mx-auto rounded-sm bg-[#e9ffe0] border border-[#bbffa6] text-[#09a86f] flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0b0c0b]">
                  Đăng ký thành công!
                </h2>
                <p className="text-sm text-[#6f736d] max-w-sm mx-auto mt-2 leading-relaxed">
                  Cảm ơn <strong className="text-[#0b0c0b]">{formData.name}</strong>! Đội ngũ của English Homestay sẽ liên hệ qua SĐT/Zalo <strong className="text-[#0b0c0b]">{formData.phone}</strong> trong vòng 24 giờ để xếp lịch học thử và đánh giá trình độ miễn phí.
                </p>

                <div className="mt-5 p-4 bg-[#f5f9f1] border border-[#d8ded2] rounded-sm text-left space-y-2">
                  <p className="text-xs font-bold text-[#0b0c0b]">Chúng tôi sẽ gửi cho bạn:</p>
                  <ul className="text-xs text-[#6f736d] space-y-1.5">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
                      <span>Lịch học thử phù hợp với thời gian của bạn</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
                      <span>Bài đánh giá trình độ và tư vấn lộ trình</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
                      <span>Thông tin giáo viên và tình nguyện viên quốc tế</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <Link
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#09a86f] hover:bg-[#089763] text-white font-bold px-5 py-2.5 rounded-sm text-xs sm:text-sm transition-colors"
                  >
                    <HomeIcon className="w-4 h-4" />
                    <span>Về trang chủ</span>
                  </Link>
                  <a
                    href="https://zalo.me/0968199900"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white hover:bg-black/5 text-[#0b0c0b] border border-[#d8ded2] font-bold px-5 py-2.5 rounded-sm text-xs sm:text-sm transition-colors"
                  >
                    <span>Nhắn Zalo hỗ trợ</span>
                  </a>
                </div>
              </div>
            ) : (
              /* 4-Field Registration Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Form Header */}
                <div className="text-center pb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold bg-[#e9ffe0] text-[#09a86f] border border-[#bbffa6]/80 mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isConsultation ? "Đăng ký tư vấn 1-1" : "Đăng ký học thử"}</span>
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0b0c0b]">
                    {isConsultation ? "Đăng ký nhận tư vấn 1-1" : "Đăng ký học thử miễn phí"}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#6f736d] mt-1.5 leading-relaxed">
                    {isConsultation
                      ? "Chuyên viên sẽ liên hệ và tư vấn chi tiết lộ trình học phù hợp nhất với bạn!"
                      : "Chỉ mất 30 giây để hoàn tất — Nhận lịch học ngay hôm nay!"}
                  </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Field 1: Full Name */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                    Họ và tên của bạn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="VD: Nguyễn Văn A"
                    className={cn(
                      "w-full border rounded-sm py-2.5 px-3.5 text-sm transition-colors bg-white text-[#0b0c0b]",
                      formData.name.length >= 2
                        ? "border-[#09a86f] focus:border-[#09a86f]"
                        : "border-[#d8ded2] focus:border-[#09a86f]",
                      "focus:outline-none"
                    )}
                    autoFocus
                  />
                </div>

                {/* Field 2: Phone Number */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                    Số điện thoại (Zalo cũng được) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="VD: 090 123 4567"
                    className={cn(
                      "w-full border rounded-sm py-2.5 px-3.5 text-sm transition-colors bg-white text-[#0b0c0b]",
                      formData.phone.length >= 8
                        ? "border-[#09a86f] focus:border-[#09a86f]"
                        : "border-[#d8ded2] focus:border-[#09a86f]",
                      "focus:outline-none"
                    )}
                  />
                </div>

                {/* Field 3: Year of Birth */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                    Năm sinh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.yearOfBirth}
                    onChange={(e) => updateField("yearOfBirth", e.target.value)}
                    placeholder="VD: 2000"
                    maxLength={4}
                    className={cn(
                      "w-full border rounded-sm py-2.5 px-3.5 text-sm transition-colors bg-white text-[#0b0c0b]",
                      formData.yearOfBirth.length >= 2
                        ? "border-[#09a86f] focus:border-[#09a86f]"
                        : "border-[#d8ded2] focus:border-[#09a86f]",
                      "focus:outline-none"
                    )}
                  />
                </div>

                {/* Field 4: Address */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-[#0b0c0b]">
                    Địa chỉ / Khu vực sinh sống <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="VD: Gia Lâm, Hà Nội hoặc Ocean Park"
                    className={cn(
                      "w-full border rounded-sm py-2.5 px-3.5 text-sm transition-colors bg-white text-[#0b0c0b]",
                      formData.address.length >= 2
                        ? "border-[#09a86f] focus:border-[#09a86f]"
                        : "border-[#d8ded2] focus:border-[#09a86f]",
                      "focus:outline-none"
                    )}
                  />
                </div>

                <p className="text-[11px] text-[#6f736d] pt-1 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#6f736d] shrink-0" />
                  <span>Thông tin của bạn được bảo mật tuyệt đối, không chia sẻ với bên thứ 3.</span>
                </p>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isFormValid() || status === "submitting"}
                    className={cn(
                      "w-full flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-sm font-bold transition-colors cursor-pointer",
                      isFormValid() && status !== "submitting"
                        ? "bg-[#09a86f] hover:bg-[#089763] text-white"
                        : "bg-[#f5f9f1] border border-[#d8ded2] text-[#6f736d]/70 cursor-not-allowed"
                    )}
                  >
                    {status === "submitting" ? (
                      <span key="submitting" className="inline-flex items-center gap-1.5">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <span>Đang gửi thông tin...</span>
                      </span>
                    ) : (
                      <span key="idle" className="inline-flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Hoàn tất đăng ký</span>
                      </span>
                    )}
                  </button>
                </div>

                <div className="pt-3 border-t border-[#d8ded2] text-center">
                  <p className="text-xs text-[#6f736d]">
                    Cần hỗ trợ trực tiếp? Gọi hotline{" "}
                    <a href="tel:0968199900" className="text-[#09a86f] font-bold hover:underline whitespace-nowrap">
                      096 819 99 00
                    </a>
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}
