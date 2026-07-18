"use client";

import React, { useState } from 'react';
import { FadeIn } from '../ui/FadeIn';
import { Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const allFaqs = [
  { category: "The Basics", q: "What makes English Homestay different from other English centers?", a: "We combine structured lessons with real daily conversations. Instead of only studying English, you'll actually live and practice it with international volunteers in a friendly environment." },
  { category: "The Basics", q: "Can complete beginners join?", a: "Absolutely. Our program is designed for everyone, including complete beginners. We help you build confidence step by step." },
  { category: "The Basics", q: "Do I need to speak English from day one?", a: "No. We meet you at your current level and gradually encourage you to speak more every week." },
  { category: "Free Trial", q: "What happens during the free trial?", a: "You'll join a real class, experience our teaching method, meet our teachers and volunteers, and see how everything works before making any decision." },
  { category: "Free Trial", q: "Is the free trial really free?", a: "Yes. There is no cost and no obligation to enroll afterward." },
  { category: "Free Trial", q: "What happens after the free trial?", a: "We'll discuss your goals, recommend the most suitable learning path, and answer any questions. The decision to join is completely yours." },
  { category: "Classes & Curriculum", q: "How are the classes structured?", a: "Each class combines a 60-minute lesson with a qualified Vietnamese teacher followed by 30 minutes of guided speaking practice with international volunteers." },
  { category: "Classes & Curriculum", q: "How many students are in each class?", a: "We keep classes small enough so everyone has opportunities to participate, ask questions, and practice speaking." },
  { category: "Volunteers & Practice", q: "How often can I practice with international volunteers?", a: "You can join Free Talk sessions every evening, Monday to Saturday, from 6:30 PM to 10:00 PM." },
  { category: "Volunteers & Practice", q: "What happens during Free Talk sessions?", a: "You'll join relaxed conversations, games, discussions, and activities with volunteers while teaching assistants help keep conversations flowing." },
  { category: "Fears & Confidence", q: "What if I'm shy or afraid of speaking?", a: "That's completely normal. Most of our students felt the same at first. Our supportive environment helps you become comfortable speaking naturally." },
  { category: "Fears & Confidence", q: "What if I make mistakes?", a: "Making mistakes is part of learning. Our teachers and volunteers encourage you instead of judging you." },
  { category: "Fears & Confidence", q: "How long does it take to become confident?", a: "Everyone learns differently, but students who attend consistently usually notice significant improvements within a few months." },
  { category: "Schedules & Ages", q: "Can I study if I only have time in the evenings?", a: "Yes. Our evening schedule is designed especially for students and working professionals." },
  { category: "Schedules & Ages", q: "Can working professionals join?", a: "Absolutely. Many of our students work full-time and attend after work." },
  { category: "Schedules & Ages", q: "Can university students join?", a: "Yes. Many university students join us to improve communication skills, prepare for interviews, IELTS, study abroad, or future careers." },
  { category: "Classes & Curriculum", q: "How much speaking practice will I get?", a: "A lot. Our learning approach focuses on speaking every class instead of just listening to lectures." },
  { category: "Classes & Curriculum", q: "Do you teach grammar?", a: "Yes. Grammar is taught in practical situations so you can immediately use it in conversations." },
  { category: "Classes & Curriculum", q: "Will I improve my pronunciation?", a: "Yes. We focus heavily on pronunciation from the beginning because clear pronunciation builds speaking confidence." },
  { category: "Classes & Curriculum", q: "Is there homework?", a: "Yes, but it's practical rather than overwhelming. Homework helps reinforce what you've learned in class." },
  { category: "Classes & Curriculum", q: "Do I need to buy textbooks?", a: "No. Learning materials are provided by English Homestay." },
  { category: "Classes & Curriculum", q: "What should I bring to class?", a: "Just yourself, a notebook, and a positive attitude." },
  { category: "Schedules & Ages", q: "Can I change my schedule?", a: "Yes. We'll do our best to help you switch to another suitable class if needed." },
  { category: "Classes & Curriculum", q: "Do I need an English placement test?", a: "We'll simply have a short conversation to understand your current level and recommend the right class." },
  { category: "Volunteers & Practice", q: "Who are the international volunteers?", a: "Our volunteers come from many different countries and enjoy sharing their language and culture while helping students practice English." },
  { category: "Volunteers & Practice", q: "Will I only speak with native English speakers?", a: "Not always. You'll meet volunteers from different countries who communicate in English, helping you understand a variety of real-world accents." },
  { category: "Schedules & Ages", q: "Is there an age requirement?", a: "Our program is mainly designed for teenagers, university students, and adults." },
  { category: "Classes & Curriculum", q: "What if I miss a class?", a: "Please let us know in advance. We'll help you find the best way to stay on track." },
  { category: "Free Trial", q: "How do I enroll after the trial?", a: "Simply speak with our team after your trial class. We'll recommend the best course based on your goals and help you complete your registration." },
  { category: "The Basics", q: "Why do students enjoy English Homestay so much?", a: "Because learning here doesn't feel like traditional studying. You become part of a community where English is used naturally every day through conversations, games, meals, events, and friendships." },
  { category: "Free Trial", q: "Can I visit the homestay before enrolling?", a: "Yes. We encourage you to visit, meet our team, and experience the environment before making a decision." },
  { category: "The Basics", q: "What makes students improve faster here?", a: "Consistent speaking practice, immediate feedback, supportive teachers, and daily exposure to English." },
  { category: "Fears & Confidence", q: "Do you prepare students for IELTS or job interviews?", a: "Yes. Our communication-focused approach builds the confidence needed for interviews, presentations, IELTS speaking, and real-life situations." },
  { category: "Fears & Confidence", q: "Will I be forced to speak in front of everyone?", a: "No. We create a comfortable environment where you can participate at your own pace." },
  { category: "The Basics", q: "Is this better than learning online?", a: "Face-to-face interaction creates far more opportunities for spontaneous conversation, feedback, and real communication." },
  { category: "Fears & Confidence", q: "Can I join even if I've failed English many times before?", a: "Yes. Many of our students had studied English for years without speaking confidently before joining us." },
  { category: "Volunteers & Practice", q: "Why do you use international volunteers?", a: "Because real conversations with people from different countries help students build confidence, improve listening skills, and experience authentic English naturally." },
  { category: "Volunteers & Practice", q: "Will I have opportunities to make international friends?", a: "Yes. Many students build genuine friendships with volunteers from around the world through classes and social activities." },
  { category: "Free Trial", q: "Is there pressure to enroll after the trial?", a: "No. We simply want you to experience our method first. If it's the right fit, we'd love to welcome you. If not, there's absolutely no pressure." },
  { category: "The Basics", q: "What is the goal of English Homestay?", a: "Our goal is simple: to help you use English confidently in real life—not just pass exams." },
];

const categories = [
  "Tất cả",
  "The Basics",
  "Free Trial",
  "Classes & Curriculum",
  "Volunteers & Practice",
  "Fears & Confidence",
  "Schedules & Ages",
];

// Reusable Accordion Item Component
function AccordionItem({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border border-[#d8ded2] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-3 sm:px-6 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 focus:outline-none"
      >
        <span className={cn(
          "text-[14px] sm:text-[16px] font-bold transition-colors duration-200",
          isOpen ? "text-[#09a86f]" : "text-[#0b0c0b]"
        )}>
          {q}
        </span>
        <div className={cn(
          "shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-[#09a86f] border-[#09a86f] text-white rotate-180" : "border-[#d8ded2] text-[#0b0c0b] bg-[#f5f9f1]"
        )}>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-[#0b0c0b]/80 text-[13px] sm:text-[15px] leading-[20px] sm:leading-[26px]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoryAccordion({ category, faqs, isOpen, onClick }: { category: string, faqs: any[], isOpen: boolean, onClick: () => void }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="border border-[#d8ded2] rounded-2xl mb-4 overflow-hidden bg-white shadow-sm transition-shadow duration-300">
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-4 sm:px-6 sm:py-6 flex items-center justify-between gap-3 sm:gap-4 focus:outline-none bg-[#f9fdf5] hover:bg-[#f0f7ea] transition-colors"
      >
        <span className={cn(
          "text-[16px] sm:text-[20px] font-extrabold transition-colors duration-200",
          isOpen ? "text-[#09a86f]" : "text-[#0b0c0b]"
        )}>
          {category}
        </span>
        <div className={cn(
          "shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-[#09a86f] border-[#09a86f] text-white rotate-180" : "border-[#d8ded2] text-[#0b0c0b] bg-white"
        )}>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-3 sm:p-6 bg-[#fcfdfa] flex flex-col gap-2 sm:gap-3 border-t border-[#d8ded2]/50">
             {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  q={faq.q} 
                  a={faq.a} 
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQ({ data }: { data?: any[] }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openCategoryIndex, setOpenCategoryIndex] = React.useState<number | null>(0);

  const actualCategories = categories.filter(c => c !== "Tất cả");
  const isSearchActive = searchQuery.trim().length > 0;

  const faqsSource = React.useMemo(() => {
    return (data && data.length > 0)
      ? data.map(item => ({
          category: item.category || "The Basics",
          q: item.question || item.q,
          a: item.answer || item.a,
        }))
      : allFaqs;
  }, [data]);

  const filteredCategories = React.useMemo(() => {
    return actualCategories.map(cat => {
      const catFaqs = faqsSource.filter(faq => {
        if (faq.category !== cat) return false;
        if (!isSearchActive) return true;
        const qMatch = faq.q.toLowerCase().includes(searchQuery.toLowerCase());
        const aMatch = faq.a.toLowerCase().includes(searchQuery.toLowerCase());
        return qMatch || aMatch;
      });
      return { cat, faqs: catFaqs };
    }).filter(c => c.faqs.length > 0);
  }, [faqsSource, searchQuery, isSearchActive]);

  return (
    <section id="faq" className="py-12 sm:py-20 md:py-28 bg-[#f5f9f1]">
      <div className="max-w-[1180px] mx-auto px-6">
        <FadeIn>
          <div className="max-w-[720px] mb-8 sm:mb-12 mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-[#09a86f]/10 text-[#09a86f] text-sm font-bold tracking-wide uppercase mb-3 sm:mb-4">
              Hỏi đáp
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b0c0b] tracking-tight mb-4 sm:mb-6">
              Những câu hỏi thường gặp.
            </h2>
            <p className="text-lg text-[#0b0c0b]/70">
              Mọi thứ bạn cần biết khi tham gia English Homestay.
            </p>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="max-w-[860px] mx-auto flex flex-col gap-10 items-center">
            
            {/* Search */}
            <div className="w-full max-w-[600px] relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0b0c0b]/40 group-focus-within:text-[#09a86f] transition-colors" />
              <input 
                type="text" 
                placeholder="Tìm kiếm câu hỏi..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenCategoryIndex(null);
                }}
                className="w-full bg-white border border-[#d8ded2] rounded-xl pl-12 pr-4 py-4 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#09a86f]/50 transition-all shadow-sm placeholder:text-[#0b0c0b]/40 text-[#0b0c0b]"
              />
            </div>

            {/* FAQ List */}
            <div className="w-full">
              {filteredCategories.length > 0 ? (
                filteredCategories.map(({ cat, faqs }, index) => (
                  <CategoryAccordion 
                    key={cat}
                    category={cat}
                    faqs={faqs}
                    isOpen={isSearchActive ? true : openCategoryIndex === index}
                    onClick={() => setOpenCategoryIndex(openCategoryIndex === index ? null : index)}
                  />
                ))
              ) : (
                <div className="text-center py-12 px-6 bg-white rounded-2xl border border-[#d8ded2] shadow-sm">
                  <p className="text-[#0b0c0b]/60 text-lg">Không tìm thấy câu hỏi phù hợp.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-[#09a86f] font-bold hover:underline"
                  >
                    Xóa tìm kiếm
                  </button>
                </div>
              )}
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
