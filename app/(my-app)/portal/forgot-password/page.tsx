import React from "react";
import type { Metadata } from "next";
import { StudentForgotPasswordView } from "@/components/portal/StudentForgotPasswordView";

export const metadata: Metadata = {
  title: "Quên mật khẩu Cổng Học Viên",
  description:
    "Khôi phục mật khẩu tài khoản học viên English Homestay qua mã xác nhận gửi về email.",
};

export default function StudentForgotPasswordPage() {
  return <StudentForgotPasswordView />;
}

