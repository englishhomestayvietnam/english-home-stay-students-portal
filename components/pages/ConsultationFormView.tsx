"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

export function ConsultationFormView() {
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
    fd.append("type", "consultation");

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
    <div className="min-h-screen bg-[#f5f9f1] text-[#0b0c0b] flex flex-col">
      {/* Top Header */}
      <header className="bg-[#f5f9f1] border-b border-[#d8ded2]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#0b0c0b]/70 hover:text-[#0b0c0b] border border-[#d8ded2] px-3 py-1.5 rounded-md bg-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#09a86f]" />
              <span>Hotline: 096 819 99 00</span>
            </a>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#0b0c0b]/80 hover:text-[#0b0c0b] border border-[#d8ded2] px-3.5 py-1.5 rounded-md bg-white hover:bg-black/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#09a86f]" />
              <span>Quay lại trang chủ</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container - Centered focused form card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-[500px]">
          
          <div className="bg-white border border-[#d8ded2] rounded-lg p-6 sm:p-8">
            
            {status === "success" ? (
              /* Success State Screen */
              <div className="text-center py-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#f5f9f1] border border-[#d8ded2] text-[#09a86f] flex items-center justify-center text-2xl mb-3">
                  💬
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0b0c0b]">
                  Đăng ký tư vấn thành công!
                </h2>
                <p className="text-sm text-[#6f736d] max-w-sm mx-auto mt-2 leading-relaxed">
                  Cảm ơn <strong className="text-[#0b0c0b]">{formData.name}</strong>! Chuyên viên đào tạo của English Homestay sẽ liên hệ qua SĐT/Zalo <strong className="text-[#0b0c0b]">{formData.phone}</strong> trong vòng 24 giờ để tư vấn chi tiết lộ trình học và học phí.
                </p>

                <div className="mt-5 p-4 bg-[#f5f9f1] border border-[#d8ded2] rounded-md text-left space-y-2">
                  <p className="text-xs font-bold text-[#0b0c0b]">Nội dung buổi tư vấn 1-1:</p>
                  <ul className="text-xs text-[#6f736d] space-y-1.5">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
                      <span>Đánh giá chi tiết mục tiêu học tập (giao tiếp, đi làm, du học)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
                      <span>Tư vấn lộ trình cá nhân hóa và thời gian biểu phù hợp</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#09a86f] shrink-0" />
                      <span>Thông tin các gói học phí và ưu đãi hiện hành</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#09a86f] hover:bg-[#089763] text-white font-medium px-5 py-2.5 rounded-md text-sm transition-colors"
                  >
                    <HomeIcon className="w-4 h-4" /> Về trang chủ
                  </Link>
                  <a
                    href="https://zalo.me/0968199900"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white hover:bg-black/5 text-[#0b0c0b] border border-[#d8ded2] font-medium px-5 py-2.5 rounded-md text-sm transition-colors"
                  >
                    <span>Nhắn Zalo trực tiếp</span>
                  </a>
                </div>
              </div>
            ) : (
              /* 4-Field Consultation Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Form Header */}
                <div className="text-center pb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#09a86f]/10 text-[#09a86f] border border-[#09a86f]/20 mb-2">
                    Tư vấn lộ trình 1-1
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#0b0c0b]">
                    💬 Đăng ký nhận tư vấn 1-1
                  </h1>
                  <p className="text-xs text-[#6f736d] mt-1">
                    Chuyên viên đào tạo sẽ phân tích mục tiêu & tư vấn lộ trình học phù hợp nhất cho bạn!
                  </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
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
                      "w-full border rounded-md py-2.5 px-3.5 text-sm transition-colors bg-white text-[#0b0c0b]",
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
                      "w-full border rounded-md py-2.5 px-3.5 text-sm transition-colors bg-white text-[#0b0c0b]",
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
                      "w-full border rounded-md py-2.5 px-3.5 text-sm transition-colors bg-white text-[#0b0c0b]",
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
                      "w-full border rounded-md py-2.5 px-3.5 text-sm transition-colors bg-white text-[#0b0c0b]",
                      formData.address.length >= 2
                        ? "border-[#09a86f] focus:border-[#09a86f]"
                        : "border-[#d8ded2] focus:border-[#09a86f]",
                      "focus:outline-none"
                    )}
                  />
                </div>

                <p className="text-[11px] text-[#6f736d] pt-1 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#6f736d] shrink-0" />
                  Thông tin của bạn được bảo mật tuyệt đối, không chia sẻ với bên thứ 3.
                </p>

                {/* Submit Action */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!isFormValid() || status === "submitting"}
                    className={cn(
                      "w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md text-sm font-bold transition-colors cursor-pointer",
                      isFormValid() && status !== "submitting"
                        ? "bg-[#09a86f] hover:bg-[#089763] text-white"
                        : "bg-[#e8ede4] text-[#6f736d]/70 cursor-not-allowed"
                    )}
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <span>Đang gửi thông tin...</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        <span>Nhận tư vấn ngay</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-[#6f736d]">
              Cần hỗ trợ trực tiếp? Gọi hotline{" "}
              <a href="tel:0968199900" className="text-[#09a86f] font-semibold hover:underline">
                096 819 99 00
              </a>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
