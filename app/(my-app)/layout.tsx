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
    default: "English Homestay | Luyện tiếng Anh mỗi ngày",
    template: "%s | English Homestay",
  },
  description: "Tiếng Anh không chỉ là một môn học, nó là cây cầu kết nối bạn với thế giới. Học tiếng Anh qua những cuộc trò chuyện thực tế, những buổi cà phê và môi trường homestay năng động.",
  keywords: ["Học tiếng Anh giao tiếp", "Tiếng Anh người đi làm", "English Homestay", "Thực hành tiếng Anh", "Learn English Vietnam"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://englishhomestay.vn",
    siteName: "English Homestay",
    title: "English Homestay | Luyện tiếng Anh mỗi ngày",
    description: "Tiếng Anh không chỉ là một môn học, nó là cây cầu kết nối bạn với thế giới. Tham gia cộng đồng English Homestay của chúng tôi.",
    images: [
      {
        url: "/og-image.jpg", // This should be replaced with an actual image in public folder
        width: 1200,
        height: 630,
        alt: "Cộng đồng English Homestay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "English Homestay | Luyện tiếng Anh mỗi ngày",
    description: "Tiếng Anh không chỉ là một môn học, nó là cây cầu kết nối bạn với thế giới. Tham gia cộng đồng English Homestay của chúng tôi.",
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
    <html lang="vi" className={cn("font-sans", geist.variable)}>
      <body>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
