import React from 'react';
import Image from 'next/image';
import { FadeIn } from '../ui/FadeIn';

export function Week({ data }: { data?: any }) {
  const activitiesData = data?.activities && data.activities.length > 0 ? data.activities : [
    { title: "Trò chơi cờ bàn", image: { url: "https://picsum.photos/seed/act_board/400/300" } },
    { title: "Cà phê trò chuyện", image: { url: "https://picsum.photos/seed/act_coffee/400/300" } },
    { title: "Đêm điện ảnh", image: { url: "https://picsum.photos/seed/act_movie/400/300" } },
    { title: "Nấu ăn cùng nhau", image: { url: "https://picsum.photos/seed/act_cooking/400/300" } },
    { title: "Tiệc sinh nhật", image: { url: "https://picsum.photos/seed/act_bday/400/300" } },
    { title: "Chuyến đi cuối tuần", image: { url: "https://picsum.photos/seed/act_weekend/400/300" } },
    { title: "Giao lưu văn hóa", image: { url: "https://picsum.photos/seed/act_culture/400/300" } },
    { title: "Thảo luận nhóm", image: { url: "https://picsum.photos/seed/act_group/400/300" } }
  ];

  const mainClassesDesc = data?.main_classes_desc || "Mỗi lớp học kết hợp giảng dạy lý thuyết với thực hành ngay lập tức, vì vậy những gì bạn học được sử dụng ngay trong ngày.";
  const freetalkDesc = data?.freetalk_desc || "Đến bất cứ khi nào phù hợp với lịch trình của bạn. Trợ giảng và tình nguyện viên quốc tế luôn túc trực toàn thời gian.";
  const topicsCount = data?.topics_count || "180+";
  const topicsDesc = data?.topics_desc || "Không biết nói gì là rào cản số 1 của việc thực hành. Chúng tôi đã chuẩn bị sẵn hơn 180 chủ đề, để mỗi buổi học đều có mục đích rõ ràng.";

  return (
    <section id="week" className="py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)]">
            <span className="eyebrow t-label-sm">Một tuần tại English Homestay</span>
            <h2 className="t-lg">Lịch trình thực tế trong tuần của bạn.</h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-[1.2fr_1fr] gap-[var(--space-gutter)] max-[960px]:grid-cols-1">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-[28px]">
              <span className="eyebrow t-label-sm">Hai lớp học chính / tuần</span>
              <h3 className="t-sm">90 phút, được chia với lý do rõ ràng</h3>
              <p className="t-body-md muted" style={{ marginTop: '8px' }}>{mainClassesDesc}</p>
              
              <div className="flex h-[56px] rounded-[var(--radius-md)] overflow-hidden my-[18px] mb-[10px]">
                <div className="flex-[2] bg-[var(--color-surface-strong)] flex items-center justify-center text-[13px] font-semibold text-[var(--color-on-surface)]">60 phút · Giáo viên VN</div>
                <div className="flex-1 bg-[var(--color-primary)] flex items-center justify-center text-[13px] font-semibold text-[var(--color-primary-contrast)]">30 phút · Tình nguyện viên</div>
              </div>
              
              <p className="t-body-sm muted">
                Giáo viên Việt Nam xây dựng nền tảng, sau đó tình nguyện viên quốc tế giúp bạn áp dụng ngay.
              </p>
            </div>

            <div className="bg-[var(--color-tertiary)] text-white border border-[var(--color-tertiary)] rounded-[var(--radius-lg)] p-[28px]">
              <span className="eyebrow t-label-sm opacity-60">Buổi trò chuyện tự do</span>
              <h3 className="t-sm">Thứ 2 - Thứ 7, 18:30–22:00</h3>
              <p className="t-body-md text-[rgba(255,255,255,0.75)] mt-[8px]">{freetalkDesc}</p>
              
              <div className="flex gap-[8px] flex-wrap mt-[16px]">
                <span className="bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.18)] rounded-[var(--radius-full)] px-[12px] py-[4px] text-[12px] font-semibold">Ở lại 30 phút</span>
                <span className="bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.18)] rounded-[var(--radius-full)] px-[12px] py-[4px] text-[12px] font-semibold">Ở lại 1 giờ</span>
                <span className="bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.18)] rounded-[var(--radius-full)] px-[12px] py-[4px] text-[12px] font-semibold">Ở lại 2 giờ</span>
                <span className="bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.18)] rounded-[var(--radius-full)] px-[12px] py-[4px] text-[12px] font-semibold">Cả buổi tối</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-[1.2fr_1fr] gap-[var(--space-gutter)] max-[960px]:grid-cols-1 mt-[var(--space-gutter)]">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-[28px]">
              <span className="eyebrow t-label-sm">Không bao giờ cạn chủ đề</span>
              <div className="text-[56px] font-extrabold tracking-[-0.02em] text-[var(--color-primary)] leading-none">{topicsCount}</div>
              <h3 className="t-sm mt-[6px]">Chủ đề giao tiếp sẵn sàng</h3>
              <p className="t-body-md muted mt-[8px]">{topicsDesc}</p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-[28px]">
              <span className="eyebrow t-label-sm">Ngoài lớp học</span>
              <h3 className="t-sm">Nơi tiếng Anh trở thành một phần của cuộc sống.</h3>
              <div className="grid grid-cols-4 gap-[10px] mt-[var(--space-md)] max-[760px]:grid-cols-2">
                {activitiesData.map((act: any, i: number) => (
                  <div key={i} className="relative rounded-[var(--radius-md)] overflow-hidden h-[140px]">
                    <Image 
                      src={act.image?.url || 'https://picsum.photos/seed/act1/400/300'} 
                      alt={act.title || 'Activity image'} 
                      fill 
                      className="object-cover w-full h-full" 
                    />
                    <span className="absolute left-[8px] bottom-[8px] bg-[rgba(11,12,11,0.65)] text-white text-[11px] font-medium px-[10px] py-[5px] rounded-[var(--radius-full)] backdrop-blur-[4px]">{act.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
