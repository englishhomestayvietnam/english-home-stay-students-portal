"use client";

import React, { useState } from 'react';
import { FadeIn } from '../ui/FadeIn';
import { Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryTitles: Record<string, string> = {
  "The Basics": "Thông tin cơ bản",
  "Free Trial": "Học thử miễn phí",
  "Classes & Curriculum": "Lớp học & Giáo trình",
  "Volunteers & Practice": "Tình nguyện viên & Luyện nói",
  "Fears & Confidence": "Vượt qua rào cản & Tự tin",
  "Schedules & Ages": "Lịch học & Độ tuổi",
  "Thông tin cơ bản": "Thông tin cơ bản",
  "Học thử miễn phí": "Học thử miễn phí",
  "Lớp học & Giáo trình": "Lớp học & Giáo trình",
  "Tình nguyện viên & Luyện nói": "Tình nguyện viên & Luyện nói",
  "Vượt qua rào cản & Tự tin": "Vượt qua rào cản & Tự tin",
  "Lịch học & Độ tuổi": "Lịch học & Độ tuổi",
};

const allFaqs = [
  { category: "The Basics", q: "English Homestay có gì khác biệt so với các trung tâm tiếng Anh truyền thống?", a: "Chúng mình kết hợp bài học trên lớp với giao tiếp thực tế hàng ngày. Thay vì chỉ học ngữ pháp và lý thuyết, bạn sẽ thực sự sinh hoạt và thực hành tiếng Anh cùng các tình nguyện viên quốc tế trong một môi trường thân thiện và tự nhiên." },
  { category: "The Basics", q: "Mất gốc hoặc người mới bắt đầu có tham gia được không?", a: "Hoàn toàn được. Chương trình được thiết kế cho mọi trình độ, kể cả người bắt đầu từ con số 0. Thầy cô và trợ giảng sẽ đồng hành giúp bạn tự tin từng bước một." },
  { category: "The Basics", q: "Tôi có bắt buộc phải nói tiếng Anh ngay từ ngày đầu tiên không?", a: "Không áp lực. Chúng mình xuất phát từ trình độ hiện tại của bạn và dần dần khuyến khích bạn tự tin nói nhiều hơn qua từng tuần." },
  { category: "Free Trial", q: "Buổi học thử miễn phí sẽ diễn ra như thế nào?", a: "Bạn sẽ tham gia vào một buổi học thực tế, trải nghiệm phương pháp giảng dạy, giao lưu cùng giáo viên và tình nguyện viên quốc tế trước khi đưa ra quyết định." },
  { category: "Free Trial", q: "Buổi học thử có thực sự miễn phí 100% không?", a: "Có. Buổi học thử hoàn toàn miễn phí và bạn không phải chịu bất kỳ ràng buộc nào sau buổi học." },
  { category: "Free Trial", q: "Sau buổi học thử thì thế nào?", a: "Đội ngũ sẽ cùng bạn đánh giá mục tiêu, tư vấn lộ trình học phù hợp nhất và giải đáp mọi thắc mắc. Quyết định đăng ký hoàn toàn thuộc về bạn." },
  { category: "Classes & Curriculum", q: "Cấu trúc một buổi học diễn ra như thế nào?", a: "Mỗi buổi học kết hợp 60 phút học kiến thức với giáo viên Việt Nam giàu kinh nghiệm, tiếp nối bằng 30 phút thực hành giao tiếp trực tiếp cùng tình nguyện viên quốc tế." },
  { category: "Classes & Curriculum", q: "Mỗi lớp học có bao nhiêu học viên?", a: "Các lớp học có sĩ số giới hạn (8-12 bạn) để đảm bảo mỗi học viên đều có cơ hội phát biểu, đặt câu hỏi và luyện nói tối đa." },
  { category: "Volunteers & Practice", q: "Tôi có thể luyện nói với tình nguyện viên quốc tế thường xuyên không?", a: "Bạn có thể tham gia các buổi Free Talk mỗi tối từ Thứ Hai đến Thứ Bảy, trong khung giờ từ 18:30 đến 22:00." },
  { category: "Volunteers & Practice", q: "Các buổi Free Talk diễn ra những hoạt động gì?", a: "Bạn sẽ cùng trò chuyện tự nhiên, chơi board games, thảo luận chủ đề đa dạng và tham gia các hoạt động thú vị với tình nguyện viên quốc tế dưới sự hỗ trợ của trợ giảng." },
  { category: "Fears & Confidence", q: "Nếu tôi nhút nhát hoặc sợ nói tiếng Anh thì sao?", a: "Điều đó hoàn toàn bình thường. Hầu hết học viên ban đầu đều có cảm giác như vậy. Môi trường ấm áp và cởi mở tại đây sẽ giúp bạn cảm thấy thoải mái và tự tin mở lời một cách tự nhiên." },
  { category: "Fears & Confidence", q: "Nếu tôi nói sai hoặc phát âm chưa chuẩn thì sao?", a: "Sai lầm là một phần tất yếu của quá trình học. Thầy cô và tình nguyện viên luôn kiên nhẫn khích lệ và hướng dẫn bạn, hoàn toàn không có sự phán xét." },
  { category: "Fears & Confidence", q: "Mất bao lâu để tôi có thể tự tin giao tiếp?", a: "Thời gian tùy thuộc vào sự chăm chỉ của mỗi người, nhưng các bạn tham gia đều đặn thường nhận thấy sự tiến bộ và phản xạ tự tin rõ rệt chỉ sau 1 đến 2 tháng." },
  { category: "Schedules & Ages", q: "Tôi chỉ rảnh vào buổi tối thì có học được không?", a: "Hoàn toàn được. Lịch học các lớp và ca Free Talk buổi tối được thiết kế chuyên biệt cho sinh viên và người đi làm bận rộn." },
  { category: "Schedules & Ages", q: "Người đã đi làm có phù hợp tham gia không?", a: "Rất phù hợp. Rất nhiều học viên tại English Homestay là nhân viên văn phòng và người đi làm tham gia học sau giờ làm việc." },
  { category: "Schedules & Ages", q: "Sinh viên các trường đại học có thể tham gia không?", a: "Có. Rất đông sinh viên tham gia để rèn luyện phản xạ giao tiếp thực tế, chuẩn bị phỏng vấn xin việc, thi chứng chỉ IELTS hoặc chuẩn bị đi du học." },
  { category: "Classes & Curriculum", q: "Tôi sẽ có bao nhiêu thời gian để luyện nói?", a: "Rất nhiều. Phương pháp học tại English Homestay tập trung tối đa vào việc luyện nói và phản xạ trong mỗi buổi học, thay vì chỉ ngồi nghe giảng lý thuyết." },
  { category: "Classes & Curriculum", q: "Trung tâm có dạy ngữ pháp không?", a: "Có. Ngữ pháp được lồng ghép trong các ngữ cảnh thực tế hàng ngày để bạn có thể áp dụng nói ngay lập tức, không học vẹt công thức." },
  { category: "Classes & Curriculum", q: "Khóa học có giúp cải thiện phát âm không?", a: "Chắc chắn có. Chúng mình chú trọng chỉnh phát âm chuẩn và ngữ điệu ngay từ đầu vì phát âm rõ ràng là nền tảng giúp bạn tự tin nói chuyện." },
  { category: "Classes & Curriculum", q: "Có bài tập về nhà không?", a: "Có, nhưng là các bài tập thực hành ngắn gọn và thú vị, giúp củng cố kiến thức đã học trên lớp mà không gây áp lực." },
  { category: "Classes & Curriculum", q: "Tôi có cần mua thêm giáo trình hay sách vở không?", a: "Không cần. Toàn bộ tài liệu học tập và học liệu tương tác đều được English Homestay cung cấp đầy đủ." },
  { category: "Classes & Curriculum", q: "Tôi cần chuẩn bị gì khi đến lớp?", a: "Chỉ cần mang theo sổ tay, bút viết và một tinh thần cởi mở, sẵn sàng trải nghiệm!" },
  { category: "Schedules & Ages", q: "Tôi có thể đổi lịch học nếu có việc bận không?", a: "Có. Chúng mình luôn hỗ trợ bạn chuyển đổi hoặc học bù sang lớp phù hợp nếu có nhu cầu." },
  { category: "Classes & Curriculum", q: "Có phải làm bài kiểm tra xếp lớp trước không?", a: "Chúng mình chỉ có một buổi trò chuyện ngắn và thoải mái để nắm bắt trình độ hiện tại của bạn và tư vấn lớp học phù hợp nhất." },
  { category: "Volunteers & Practice", q: "Các tình nguyện viên quốc tế là ai?", a: "Họ là những bạn trẻ đến từ nhiều quốc gia trên thế giới, yêu thích giao lưu văn hóa và đam mê đồng hành, giúp đỡ học viên Việt Nam luyện nói tiếng Anh." },
  { category: "Volunteers & Practice", q: "Tôi sẽ chỉ nói chuyện với người bản xứ thôi hay cả các nước khác?", a: "Bạn sẽ được giao lưu với tình nguyện viên từ nhiều nước khác nhau giao tiếp bằng tiếng Anh, giúp bạn quen dần với nhiều ngữ điệu thực tế trên toàn cầu." },
  { category: "Schedules & Ages", q: "Độ tuổi tham gia chương trình là bao nhiêu?", a: "Chương trình dành cho học sinh cấp 3, sinh viên đại học và người lớn/người đi làm." },
  { category: "Classes & Curriculum", q: "Nếu tôi lỡ nghỉ một buổi học thì phải làm sao?", a: "Bạn hãy báo trước cho trợ giảng. Chúng mình sẽ gửi bài học và sắp xếp lịch học bù thích hợp để bạn không bị gián đoạn kiến thức." },
  { category: "Free Trial", q: "Sau buổi học thử, làm thế nào để chính thức đăng ký?", a: "Bạn chỉ cần trao đổi trực tiếp với đội ngũ hỗ trợ tại homestay. Chúng mình sẽ tư vấn khóa học phù hợp với mục tiêu của bạn và hoàn tất thủ tục đăng ký nhanh chóng." },
  { category: "The Basics", q: "Tại sao các bạn học viên lại yêu thích English Homestay đến vậy?", a: "Bởi vì học ở đây không giống cách học truyền thống gò bó. Bạn trở thành một phần của một cộng đồng ấm áp, nơi tiếng Anh được sử dụng tự nhiên mỗi ngày qua trò chuyện, ăn uống, board games và những tình bạn đẹp." },
  { category: "Free Trial", q: "Tôi có thể đến tham quan homestay trước khi đăng ký không?", a: "Hoàn toàn được. Chúng mình luôn chào đón bạn ghé thăm, gặp gỡ mọi người và cảm nhận không gian trước khi quyết định." },
  { category: "The Basics", q: "Yếu tố nào giúp học viên tiến bộ vượt bậc tại đây?", a: "Môi trường phản xạ nói liên tục mỗi ngày, được sửa lỗi tức thì, thầy cô tận tâm và sự hòa nhập tự nhiên cùng bạn bè quốc tế." },
  { category: "Fears & Confidence", q: "Chương trình có hỗ trợ luyện thi IELTS hoặc phỏng vấn xin việc không?", a: "Có. Nền tảng giao tiếp tự nhiên và phản xạ nhanh sẽ bổ trợ trực tiếp cho phần thi Speaking IELTS, thuyết trình và phỏng vấn việc làm." },
  { category: "Fears & Confidence", q: "Tôi có bị ép buộc phải nói trước đám đông không?", a: "Không bao giờ. Mọi hoạt động đều diễn ra trong không khí thoải mái, khích lệ và tôn trọng nhịp độ tự tin của từng bạn." },
  { category: "The Basics", q: "Học trực tiếp tại homestay có ưu điểm gì hơn so với học online?", a: "Tương tác trực tiếp tạo ra nhiều cơ hội trò chuyện ngẫu hứng, kết nối cảm xúc chân thực, phản xạ sống động và năng lượng học tập tích cực hơn rất nhiều." },
  { category: "Fears & Confidence", q: "Tôi đã thử học tiếng Anh nhiều lần nhưng bỏ dở, liệu có học được không?", a: "Chắc chắn được. Rất nhiều học viên của chúng mình từng mất phương hướng trước khi tìm lại niềm yêu thích và tự tin nói tiếng Anh tại English Homestay." },
  { category: "Volunteers & Practice", q: "Tại sao lại kết hợp mô hình tình nguyện viên quốc tế?", a: "Vì trò chuyện với người nước ngoài giúp bạn xóa bỏ nỗi sợ tâm lý, tăng khả năng nghe hiểu thực tế và ứng dụng tiếng Anh một cách tự nhiên nhất." },
  { category: "Volunteers & Practice", q: "Tôi có cơ hội kết bạn với bạn bè quốc tế không?", a: "Rất nhiều! Qua các lớp học, bữa ăn chung và hoạt động ngoại khóa, bạn sẽ có thêm những người bạn quốc tế thân thiết và cùng chia sẻ văn hóa." },
  { category: "Free Trial", q: "Có bị chèo kéo đăng ký sau buổi học thử không?", a: "Hoàn toàn không. Chúng mình chỉ muốn bạn trải nghiệm thực tế môi trường học trước. Nếu bạn thấy phù hợp, homestay luôn sẵn lòng chào đón bạn." },
  { category: "The Basics", q: "Mục tiêu lớn nhất của English Homestay là gì?", a: "Mục tiêu của chúng mình rất giản dị: giúp bạn sử dụng tiếng Anh tự tin, trôi chảy trong cuộc sống thực tế — không chỉ để đi thi." },
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
  const displayTitle = categoryTitles[category] || category;

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
          {displayTitle}
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
      const mappedTarget = categoryTitles[cat] || cat;
      const catFaqs = faqsSource.filter(faq => {
        const mappedCat = categoryTitles[faq.category] || faq.category;
        if (faq.category !== cat && mappedCat !== mappedTarget) return false;
        if (!isSearchActive) return true;
        const qMatch = faq.q.toLowerCase().includes(searchQuery.toLowerCase());
        const aMatch = faq.a.toLowerCase().includes(searchQuery.toLowerCase());
        const catMatch = mappedCat.toLowerCase().includes(searchQuery.toLowerCase());
        return qMatch || aMatch || catMatch;
      });
      return { cat: mappedTarget, faqs: catFaqs };
    }).filter(c => c.faqs.length > 0);
  }, [faqsSource, searchQuery, isSearchActive, actualCategories]);

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
