import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getStudentSession } from "@/app/actions";
import { PendingActivationView } from "@/components/portal/PendingActivationView";
import { ActiveDashboardView } from "@/components/portal/ActiveDashboardView";

export const metadata: Metadata = {
  title: "Cổng Học Viên EHV",
  description: "Cổng học tập, minigames và kết nối sinh hoạt cùng cộng đồng English Homestay Vietnam.",
};

export default async function StudentPortalPage() {
  const user = await getStudentSession();

  if (!user) {
    redirect("/portal/login");
  }

  // If status is 'paused' (waiting for admin to assign batch and activate)
  const isPending = user.status === "paused";

  if (isPending) {
    return <PendingActivationView user={user} />;
  }

  // Active student dashboard
  return <ActiveDashboardView user={user} />;
}
