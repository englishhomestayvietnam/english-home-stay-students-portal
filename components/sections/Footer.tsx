import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#d8ded2] pt-20 pb-8">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Intro */}
          <div className="flex flex-col">
            <Link href="#top" className="text-[24px] font-extrabold tracking-[-0.02em] text-[#0b0c0b] mb-4">
              English<span className="text-[#09a86f]">Homestay</span>
            </Link>
            <p className="text-[15px] leading-relaxed text-[#0b0c0b]/70 mb-6">
              Một cộng đồng nơi bạn học tiếng Anh bằng cách thực sự sống và giao tiếp mỗi ngày cùng tình nguyện viên quốc tế.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#f5f9f1] flex items-center justify-center text-[#09a86f] hover:bg-[#09a86f] hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#f5f9f1] flex items-center justify-center text-[#09a86f] hover:bg-[#09a86f] hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H15v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V16H9.5V8.5H11v1.1c.5-.7 1.2-1.1 2-1.1 1.9 0 3.5 1.6 3.5 3.5V16z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#f5f9f1] flex items-center justify-center text-[#09a86f] hover:bg-[#09a86f] hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#f5f9f1] flex items-center justify-center text-[#09a86f] hover:bg-[#09a86f] hover:text-white transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02V8.48L15.5 11.75l-5.75 3.27z"></path></svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h4 className="text-[14px] font-bold uppercase tracking-wider text-[#0b0c0b] mb-6">Liên hệ</h4>
            <div className="flex flex-col gap-4 text-[15px] text-[#0b0c0b]/70">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#09a86f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>+84 90 123 4567</span>
              </p>
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#09a86f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>hello@englishhomestay.vn</span>
              </p>
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#09a86f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>T2 - T7: 8:00 - 22:00</span>
              </p>
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#09a86f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>123 Homestay, Đà Nẵng, Việt Nam</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-[14px] font-bold uppercase tracking-wider text-[#0b0c0b] mb-6">Liên kết</h4>
            <div className="flex flex-col gap-3">
              <Link href="#why" className="text-[15px] text-[#0b0c0b]/70 hover:text-[#09a86f] transition-colors">Tại sao chọn chúng tôi</Link>
              <Link href="#method" className="text-[15px] text-[#0b0c0b]/70 hover:text-[#09a86f] transition-colors">Phương pháp</Link>
              <Link href="#gallery" className="text-[15px] text-[#0b0c0b]/70 hover:text-[#09a86f] transition-colors">Hình ảnh</Link>
              <Link href="#faq" className="text-[15px] text-[#0b0c0b]/70 hover:text-[#09a86f] transition-colors">Hỏi đáp</Link>
              <Link href="#contact" className="text-[15px] font-semibold text-[#09a86f] hover:underline mt-2">Học thử miễn phí</Link>
            </div>
          </div>

          {/* Map */}
          <div className="flex flex-col">
            <h4 className="text-[14px] font-bold uppercase tracking-wider text-[#0b0c0b] mb-6">Địa chỉ</h4>
            <div className="w-full h-[180px] rounded-xl overflow-hidden bg-[#f5f9f1]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15336.878939767858!2d108.23847955!3d16.0543666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177f2ced6d8b%3A0xeac35f2960ca74a4!2sMy%20Khe%20Beach!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#d8ded2] text-[13px] text-[#0b0c0b]/50 gap-4">
          <span>© {new Date().getFullYear()} English Homestay. Tất cả quyền được bảo lưu.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#0b0c0b] transition-colors">Bảo mật</Link>
            <Link href="#" className="hover:text-[#0b0c0b] transition-colors">Điều khoản</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
