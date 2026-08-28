import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ConsultationFormView } from "@/components/pages/ConsultationFormView";

export const metadata: Metadata = {
  title: "Đăng ký tư vấn 1-1 | English Homestay",
  description:
    "Đăng ký nhận tư vấn lộ trình học tiếng Anh 1-1 miễn phí từ chuyên viên đào tạo English Homestay. Phân tích mục tiêu, xác định thời gian và học phí phù hợp nhất.",
  openGraph: {
    title: "Đăng ký tư vấn 1-1 | English Homestay",
    description:
      "Nhận tư vấn lộ trình học tiếng Anh giao tiếp cá nhân hóa 1-1 hoàn toàn miễn phí.",
  },
};

export default function ConsultationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f9f1] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#09a86f] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#6f736d]">Đang tải biểu mẫu tư vấn...</p>
          </div>
        </div>
      }
    >
      <ConsultationFormView />
    </Suspense>
  );
}
