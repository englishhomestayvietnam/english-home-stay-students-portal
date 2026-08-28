import React, { Suspense } from "react";
import type { Metadata } from "next";
import { RegisterFormView } from "@/components/pages/RegisterFormView";

export const metadata: Metadata = {
  title: "Đăng ký học thử miễn phí",
  description:
    "Đăng ký tham gia buổi học thử 1-1 miễn phí cùng giáo viên bản ngữ và tình nguyện viên quốc tế tại English Homestay. Kiểm tra trình độ và nhận lộ trình học tập cá nhân hóa ngay hôm nay.",
  openGraph: {
    title: "Đăng ký học thử miễn phí | English Homestay",
    description:
      "Chỉ mất 30 giây để hoàn tất đăng ký học thử và kiểm tra trình độ tiếng Anh miễn phí.",
  },
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f9f1] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#09a86f] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#6f736d]">Đang tải biểu mẫu...</p>
          </div>
        </div>
      }
    >
      <RegisterFormView />
    </Suspense>
  );
}
