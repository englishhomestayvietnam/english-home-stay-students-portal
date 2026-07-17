import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    console.log('Starting seed process via API...')
    const payload = await getPayload({ config })

    console.log('Downloading placeholder image...')
    let placeholderMedia: any
    try {
      const response = await fetch('https://picsum.photos/800/600')
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      placeholderMedia = await payload.create({
        collection: 'media',
        data: {
          alt: 'Placeholder Image',
        },
        file: {
          data: buffer,
          mimetype: 'image/jpeg',
          name: 'placeholder.jpg',
          size: buffer.length,
        },
      })
      console.log('Placeholder media created with ID:', placeholderMedia.id)
    } catch (error) {
      console.error('Failed to create media, using empty IDs.', error)
    }

    // 1. FAQs
    console.log('Seeding FAQs...')
    const faqs = [
      { question: "Do I need to be fluent in English to join? / Tôi có cần thông thạo tiếng Anh để tham gia không?", answer: "Not at all! We welcome all levels. Our environment is designed to help you improve comfortably, whether you're a beginner or advanced. / Không hề! Chúng tôi chào đón mọi trình độ. Môi trường này được thiết kế để giúp bạn cải thiện một cách thoải mái, dù bạn là người mới bắt đầu hay đã học nâng cao.", category: "The Basics" },
      { question: "How long is the program? / Chương trình kéo dài bao lâu?", answer: "Most students stay between 1 to 4 weeks. You can choose the duration that best fits your goals. / Hầu hết học viên ở lại từ 1 đến 4 tuần. Bạn có thể chọn thời gian phù hợp nhất với mục tiêu của mình.", category: "Classes & Curriculum" },
      { question: "Will I have my own room? / Tôi có phòng riêng không?", answer: "You can choose between a private room or a shared dormitory depending on your budget and preference. / Bạn có thể chọn giữa phòng riêng hoặc phòng ký túc xá chung tùy thuộc vào ngân sách và sở thích của bạn.", category: "The Basics" },
    ]
    for (const faq of faqs) {
      await payload.create({ collection: 'faqs', data: faq })
    }

    // 2. Volunteers
    console.log('Seeding Volunteers...')
    const volunteers = [
      { name: "James", country_flag: "🇬🇧", role: "Engineer / Kỹ sư", duration: "Volunteer since 2025 / Tình nguyện viên từ 2025", photo: placeholderMedia?.id },
      { name: "Emily", country_flag: "🇺🇸", role: "Teacher / Giáo viên", duration: "Volunteer since 2024 / Tình nguyện viên từ 2024", photo: placeholderMedia?.id },
      { name: "David", country_flag: "🇩🇪", role: "University Student / Sinh viên đại học", duration: "", photo: placeholderMedia?.id },
    ]
    for (const vol of volunteers) {
      await payload.create({ collection: 'volunteers', data: vol as any })
    }

    // 3. Testimonials
    console.log('Seeding Testimonials...')
    const testimonials = [
      { 
        beforeText: "I used to translate everything in my head before speaking. I was terrified of making mistakes. / Trước đây mình hay dịch mọi thứ trong đầu trước khi nói. Mình rất sợ mắc lỗi sai.", 
        afterText: "The environment here forced me to stop doing that. I just speak now and can hold a 20-minute conversation. / Môi trường ở đây buộc mình phải bỏ thói quen đó. Giờ mình có thể phản xạ tự nhiên và trò chuyện liên tục 20 phút.",
        tag: "Noticeable progress / Tiến bộ rõ rệt", 
        student_name: "Linh Nguyen", 
        role_or_background: "University Student / Sinh viên", 
        photo: placeholderMedia?.id 
      },
      { 
        beforeText: "I knew grammar, but I couldn't understand native speakers in real life. / Mình nắm chắc ngữ pháp, nhưng lại không thể nghe hiểu người bản xứ ngoài đời thực.", 
        afterText: "Living with volunteers from different countries taught me real accents and slang. / Sống cùng các tình nguyện viên từ nhiều quốc gia đã giúp mình làm quen với các ngữ điệu và tiếng lóng thực tế.",
        tag: "Listening Skills / Kỹ năng nghe", 
        student_name: "Minh Tran", 
        role_or_background: "IT Professional / Kỹ sư IT", 
        photo: placeholderMedia?.id 
      }
    ]
    for (const t of testimonials) {
      await payload.create({ collection: 'testimonials', data: t as any })
    }

    // 4. Gallery Items
    console.log('Seeding Gallery Items...')
    const galleryItems = [
      { caption: "Board Games with friends / Chơi board game cùng bạn bè", layout: "normal", mediaType: "image", image: placeholderMedia?.id },
      { caption: "Coffee Chats / Cà phê trò chuyện", layout: "wide", mediaType: "image", image: placeholderMedia?.id },
      { caption: "Group Discussions / Thảo luận nhóm", layout: "tall", mediaType: "image", image: placeholderMedia?.id },
      { caption: "Cooking Together / Nấu ăn cùng nhau", layout: "normal", mediaType: "image", image: placeholderMedia?.id },
    ]
    for (const g of galleryItems) {
      await payload.create({ collection: 'gallery-items', data: g as any })
    }

    // 5. Week Global
    console.log('Updating Week Global...')
    await payload.updateGlobal({
      slug: 'week',
      data: {
        main_classes_desc: "Every class pairs structured teaching with immediate practice. / Mỗi lớp học đều kết hợp giữa giảng dạy bài bản và thực hành ngay lập tức.",
        freetalk_desc: "Grab a coffee and join a group. No textbooks, just authentic conversation. / Lấy một tách cà phê và tham gia nhóm. Không cần sách vở, chỉ có những cuộc trò chuyện thực tế.",
        topics_count: "180+",
        topics_desc: "We discuss real-world topics—from global culture to daily life. / Chúng tôi thảo luận về các chủ đề thực tế — từ văn hóa toàn cầu đến cuộc sống hàng ngày.",
        activities: [
          { title: "Board Games / Chơi Board Game", image: placeholderMedia?.id },
          { title: "Coffee Chats / Cà phê trò chuyện", image: placeholderMedia?.id },
          { title: "Movie Nights / Xem phim đêm", image: placeholderMedia?.id },
          { title: "Cooking Together / Nấu ăn cùng nhau", image: placeholderMedia?.id },
        ]
      } as any
    })

    // 6. Hero Global
    console.log('Updating Hero Global...')
    await payload.updateGlobal({
      slug: 'hero',
      data: {
        poster: placeholderMedia?.id,
        headline: "English Homestay<br/>Da Nang",
        subheadline: "Practice English every day. / Luyện tiếng Anh mỗi ngày.",
        primary_cta_label: "Get Started / Bắt đầu ngay",
        secondary_cta_label: "Take a Free Placement Test / Kiểm tra trình độ miễn phí",
      } as any
    })

    // 7. Method Global
    console.log('Updating Method Global...')
    await payload.updateGlobal({
      slug: 'method',
      data: {
        headline: "Less studying about English. More speaking it. / Học lý thuyết ít hơn. Nói nhiều hơn.",
        body: "Students learn the fundamentals first — pronunciation, structure, the essentials — then immediately put them to use in real conversation. / Học viên học các nền tảng trước — phát âm, cấu trúc, những điều cần thiết — sau đó lập tức áp dụng vào giao tiếp thực tế.",
        learn_pct: 30,
        practice_pct: 70,
      } as any
    })

    // 8. Story Global
    console.log('Updating Story Global...')
    const generateLexical = (text: string) => ({
      root: {
        type: "root", format: "", indent: 0, version: 1,
        children: [{
          type: "paragraph", format: "", indent: 0, version: 1,
          children: [{ detail: 0, format: 0, mode: "normal", style: "", text, type: "text", version: 1 }]
        }]
      }
    })
    
    await payload.updateGlobal({
      slug: 'story',
      data: {
        problem_title: "You've studied English for 7 years, but when a foreigner asks for directions, you freeze. / Bạn đã học tiếng Anh 7 năm, nhưng lại đứng hình khi bị người nước ngoài hỏi đường.",
        problem_eyebrow: "The Problem / Vấn đề",
        problem_body: generateLexical("Many students struggle with real-world application."),
        problem_image: placeholderMedia?.id,
        solution_title: "We created a space where speaking English is unavoidable. / Chúng tôi tạo ra một không gian nơi việc nói tiếng Anh là điều tự nhiên.",
        solution_eyebrow: "The Solution / Giải pháp",
        solution_body: generateLexical("Our homestay forces you to use English naturally."),
        solution_image: placeholderMedia?.id,
      } as any
    })

    // 9. CTA Global
    console.log('Updating CTA Global...')
    await payload.updateGlobal({
      slug: 'cta',
      data: {
        headline: "Ready to stop translating in your head? / Bạn đã sẵn sàng ngừng dịch trong đầu?",
        body: "Book a free trial class and experience the homestay method yourself. / Đăng ký lớp học thử miễn phí và tự mình trải nghiệm phương pháp homestay.",
        primary_cta_label: "Book Free Trial / Đăng ký học thử",
        secondary_cta_label: "Learn More / Tìm hiểu thêm",
      } as any
    })

    // 10. Learning Reasons
    console.log('Seeding Learning Reasons...')
    const learningReasons = [
      { title: "Career Growth / Thăng tiến sự nghiệp", description: "Unlock better job opportunities and earn a higher salary. / Mở ra cơ hội việc làm tốt hơn và nhận mức lương cao hơn.", image: placeholderMedia?.id },
      { title: "Traveling / Du lịch", description: "Travel the world with confidence. / Tự tin đi du lịch vòng quanh thế giới.", image: placeholderMedia?.id },
      { title: "Study Abroad / Du học", description: "Prepare for university life abroad. / Chuẩn bị cho cuộc sống đại học ở nước ngoài.", image: placeholderMedia?.id },
      { title: "Personal Confidence / Tự tin cá nhân", description: "Start speaking naturally. / Bắt đầu nói tiếng Anh một cách tự nhiên.", image: placeholderMedia?.id },
    ]
    for (const lr of learningReasons) {
      await payload.create({ collection: 'learning-reasons', data: lr as any })
    }

    // 11. Journey Phases
    console.log('Seeding Journey Phases...')
    const journeyPhases = [
      { 
        phase_tag: "Lessons 1–5 / Bài học 1-5", 
        title: "Building the foundation / Xây dựng nền tảng", 
        points: [
          { point: "Master English pronunciation rules / Nắm vững quy tắc phát âm" },
          { point: "Read new words out loud with confidence / Tự tin đọc to từ mới" },
          { point: "Build the habit of speaking from lesson one / Xây dựng thói quen nói từ bài học đầu tiên" }
        ]
      },
      { 
        phase_tag: "From here on / Từ đây trở đi", 
        title: "Learning to communicate / Học cách giao tiếp", 
        points: [
          { point: "Listening and understanding natural speech / Nghe và hiểu lời nói tự nhiên" },
          { point: "Asking questions, not just answering them / Biết cách đặt câu hỏi, không chỉ trả lời" },
          { point: "Speaking naturally, without translating / Nói một cách tự nhiên, không cần dịch trong đầu" }
        ]
      }
    ]
    for (const jp of journeyPhases) {
      await payload.create({ collection: 'journey-phases', data: jp as any })
    }

    return NextResponse.json({ success: true, message: 'Database successfully seeded!' })
  } catch (error: any) {
    console.error('Error seeding data:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
