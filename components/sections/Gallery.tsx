import React from 'react';
import Image from 'next/image';
import { FadeIn } from '../ui/FadeIn';

export function Gallery({ data }: { data?: any[] }) {
  const galleryItemsData = data && data.length > 0 ? data : [
    { image: { url: "https://picsum.photos/seed/boardgames/600/600" }, caption: "Chơi board game", layout: "normal", mediaType: "image" },
    { image: { url: "https://picsum.photos/seed/coffee/1200/600" }, caption: "Cà phê trò chuyện", layout: "wide", mediaType: "image" },
    { image: { url: "https://picsum.photos/seed/group/600/1200" }, caption: "Thảo luận nhóm", layout: "tall", mediaType: "image" },
    { image: { url: "https://picsum.photos/seed/cooking/600/600" }, caption: "Nấu ăn cùng nhau", layout: "normal", mediaType: "image" },
    { image: { url: "https://picsum.photos/seed/weekend/1200/600" }, caption: "Chuyến đi cuối tuần", layout: "wide", mediaType: "image" },
    { image: { url: "https://picsum.photos/seed/movie/600/600" }, caption: "Xem phim đêm", layout: "normal", mediaType: "image" },
  ];

  return (
    <section id="gallery" className="bg-[var(--color-surface-strong)] py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)]">
            <span className="eyebrow t-label-sm text-[#09a86f]">Cuộc sống tại English Homestay</span>
            <h2 className="t-lg text-[#0b0c0b]">Thực hành thực tế là như thế này.</h2>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-4 auto-rows-[160px] gap-[10px] max-[860px]:grid-cols-2">
          {galleryItemsData.map((g: any, i: number) => (
            <FadeIn key={i} delay={i * 100} className={`relative rounded-[var(--radius-md)] overflow-hidden transition-all duration-250 ease-out group ${g.layout === 'wide' ? 'col-span-2' : g.layout === 'tall' ? 'row-span-2' : 'col-span-1 row-span-1'}`}>
              
              {g.mediaType === 'video' ? (
                <video
                  src={g.image?.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full transition-transform duration-[400ms] ease-[ease] group-hover:scale-[1.06]"
                />
              ) : (
                <Image 
                  src={g.image?.url || `https://picsum.photos/seed/gal${i}/600/600`} 
                  alt={g.caption || 'Gallery image'} 
                  fill 
                  className="object-cover w-full h-full transition-transform duration-[400ms] ease-[ease] group-hover:scale-[1.06]" 
                  sizes="(max-width: 860px) 50vw, 25vw"
                />
              )}
              
              <span className="absolute left-[8px] bottom-[8px] bg-[rgba(11,12,11,0.65)] text-white text-[11px] font-medium px-[10px] py-[5px] rounded-[var(--radius-full)] backdrop-blur-[4px]">{g.caption}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
