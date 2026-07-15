import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f5f9f1", // From --color-neutral
};

export const metadata: Metadata = {
  metadataBase: new URL('https://englishhomestay.vn'), // Replace with actual domain when ready
  title: {
    default: "English Homestay | Practice english every day",
    template: "%s | English Homestay",
  },
  description: "English is not just a subject, it's a bridge that connects you to the world. Learn English through real conversations, coffee chats, and a dynamic homestay environment.",
  keywords: ["Học tiếng Anh giao tiếp", "Tiếng Anh người đi làm", "English Homestay", "Thực hành tiếng Anh", "Learn English Vietnam"],
  openGraph: {
    type: "website",
    locale: "en_VN",
    url: "https://englishhomestay.vn",
    siteName: "English Homestay",
    title: "English Homestay | Practice english every day",
    description: "English is not just a subject, it's a bridge that connects you to the world. Join our English Homestay community.",
    images: [
      {
        url: "/og-image.jpg", // This should be replaced with an actual image in public folder
        width: 1200,
        height: 630,
        alt: "English Homestay community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "English Homestay | Practice english every day",
    description: "English is not just a subject, it's a bridge that connects you to the world. Join our English Homestay community.",
    images: ["/og-image.jpg"],
  },
};

import { FloatingContact } from "@/components/ui/FloatingContact";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
