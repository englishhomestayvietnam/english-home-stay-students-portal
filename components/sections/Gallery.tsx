import React from 'react';
import Image from 'next/image';

export function Gallery() {
  const galleryItemsData = [
    { image: "https://picsum.photos/seed/gal1/600/600", caption: "Group discussion", layout: "normal" },
    { image: "https://picsum.photos/seed/gal2/1200/600", caption: "Presentations", layout: "wide" },
    { image: "https://picsum.photos/seed/gal3/600/1200", caption: "Cooking together", layout: "tall" },
    { image: "https://picsum.photos/seed/gal4/600/600", caption: "Cultural exchange", layout: "normal" },
    { image: "https://picsum.photos/seed/gal5/600/600", caption: "Weekend trip", layout: "normal" }
  ];

  return (
    <section id="gallery" className="bg-[var(--color-surface-strong)] py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <div className="max-w-[640px] mb-[var(--space-lg)]">
          <span className="eyebrow t-label-sm">Life at English Homestay</span>
          <h2 className="t-lg">This is what practice actually looks like.</h2>
        </div>
        
        <div className="grid grid-cols-4 auto-rows-[160px] gap-[10px] max-[860px]:grid-cols-2">
          {galleryItemsData.map((g: any, i: number) => (
            <div key={i} className={`relative rounded-[var(--radius-md)] overflow-hidden transition-all duration-250 ease-out group ${g.layout === 'wide' ? 'col-span-2' : g.layout === 'tall' ? 'row-span-2' : 'col-span-1 row-span-1'}`}>
              <Image 
                src={g.image} 
                alt={g.caption || 'Gallery image'} 
                fill 
                className="object-cover w-full h-full transition-transform duration-[400ms] ease-[ease] group-hover:scale-[1.06]" 
                sizes="(max-width: 860px) 50vw, 25vw"
              />
              <span className="absolute left-[8px] bottom-[8px] bg-[rgba(11,12,11,0.65)] text-white text-[11px] font-medium px-[10px] py-[5px] rounded-[var(--radius-full)] backdrop-blur-[4px]">{g.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
