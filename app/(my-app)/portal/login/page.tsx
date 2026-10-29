import React from "react";
import type { Metadata } from "next";
import { StudentLoginView } from "@/components/portal/StudentLoginView";

export const metadata: Metadata = {
  title: "Đăng nhập Cổng Học Viên",
  description: "Đăng nhập tài khoản học viên English Homestay để tiếp tục hành trình học tập và hoàn thành minigame.",
};

export default function StudentLoginPage() {
  return <StudentLoginView />;
}
