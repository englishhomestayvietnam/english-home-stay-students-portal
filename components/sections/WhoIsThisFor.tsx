import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { CheckCircle2 } from 'lucide-react';

export function WhoIsThisFor() {
  const audiences = [
    "Sinh viên đại học",
    "Người đi làm",
    "Luyện phỏng vấn xin việc",
    "Người học IELTS",
    "Du học sinh",
    "Người thích du lịch",
    "Chủ doanh nghiệp",
    "Phụ huynh",
    "Người mới bắt đầu",
    "Bất kỳ ai muốn nói tiếng Anh tự tin"
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#f9fdf5]">
      <div className="max-w-[1180px] mx-auto px-6">
        <FadeIn>
          <div className="max-w-[720px] mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-[#09a86f]/10 text-[#09a86f] text-sm font-bold tracking-wide uppercase mb-4">
              Dành cho ai?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b0c0b] tracking-tight mb-6">
              English Homestay dành cho ai?
            </h2>
            <p className="text-lg text-[#0b0c0b]/70">
              Nếu bạn thấy mình trong danh sách này, cộng đồng của chúng tôi chính là nơi thuộc về bạn.
            </p>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="max-w-[860px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {audiences.map((audience, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#d8ded2] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#09a86f] shrink-0" />
                  <span className="text-[17px] font-bold text-[#0b0c0b]">{audience}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
