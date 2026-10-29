import React from "react";
import type { Metadata } from "next";
import { StudentRegisterView } from "@/components/portal/StudentRegisterView";

export const metadata: Metadata = {
  title: "Tạo tài khoản học viên",
  description: "Đăng ký tài khoản học viên để truy cập minigame, luyện nói mỗi ngày và đồng hành cùng English Homestay Vietnam.",
};

export default function StudentRegisterPage() {
  return <StudentRegisterView />;
}
