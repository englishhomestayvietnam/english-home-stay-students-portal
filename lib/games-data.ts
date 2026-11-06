import rawWords from "./data/ehv-words.json";

export interface VocabWord {
  id: number;
  unit: number;
  topic: string;
  word: string;
  phonetic: string;
  pos: string;
  definition: string;
  example: string;
  vi: string;
  image: string;
}

export const VOCAB_WORDS: VocabWord[] = rawWords as VocabWord[];

export type CEFRLevel = "A1" | "A2" | "B1" | "B2";

export interface LevelInfo {
  id: CEFRLevel;
  name: string;
  nameVi: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  emoji: string;
  description: string;
}

export const CEFR_LEVELS: LevelInfo[] = [
  {
    id: "A1",
    name: "A1 Beginner",
    nameVi: "Căn bản",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    emoji: "🌱",
    description: "Từ vựng thiết yếu cho người mới bắt đầu (sinh hoạt, gia đình, ăn uống)",
  },
  {
    id: "A2",
    name: "A2 Elementary",
    nameVi: "Sơ cấp",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    badgeBorder: "border-sky-200",
    emoji: "📚",
    description: "Giao tiếp hàng ngày, mua sắm, sở thích và phương tiện đi lại",
  },
  {
    id: "B1",
    name: "B1 Intermediate",
    nameVi: "Trung cấp",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    badgeBorder: "border-purple-200",
    emoji: "🚀",
    description: "Thảo luận tự nhiên về du lịch, cảm xúc, bạn bè và công việc",
  },
  {
    id: "B2",
    name: "B2 Upper-Int",
    nameVi: "Phản xạ nâng cao",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-200",
    emoji: "⚡",
    description: "Xử lý tình huống đời thực, kế hoạch tương lai và đối thoại chuyên sâu",
  },
];

export interface TopicMeta {
  id: string;
  nameEn: string;
  nameVi: string;
  description: string;
  category: "homestay" | "social" | "travel" | "study";
  level: CEFRLevel;
  iconName: string;
  wordCount: number;
  previewWords: string[];
}

export const TOPIC_CATEGORIES = [
  { id: "all", label: "Tất cả chủ đề (30)" },
  { id: "homestay", label: "Đời sống Homestay" },
  { id: "social", label: "Giao tiếp & Bạn bè" },
  { id: "travel", label: "Du lịch & Khám phá" },
  { id: "study", label: "Học tập & Kỹ năng" },
] as const;

export const TOPICS_LIST: TopicMeta[] = [
  {
    id: "PEOPLE",
    nameEn: "People & Family",
    nameVi: "Con người & Gia đình",
    description: "Thành viên gia đình, bạn bè và các mối quan hệ quanh homestay",
    category: "social",
    level: "A1",
    iconName: "Users",
    wordCount: 20,
    previewWords: ["afraid", "agree", "angry", "baby"],
  },
  {
    id: "HOME",
    nameEn: "Home & Living",
    nameVi: "Nhà cửa & Đời sống",
    description: "Phòng ốc, đồ dùng sinh hoạt và không gian sống homestay",
    category: "homestay",
    level: "A1",
    iconName: "Home",
    wordCount: 20,
    previewWords: ["apartment", "bathroom", "bedroom", "chair"],
  },
  {
    id: "DAILY ROUTINE",
    nameEn: "Daily Routine",
    nameVi: "Thói quen hàng ngày",
    description: "Các hoạt động thường nhật từ thức dậy, vệ sinh đến nghỉ ngơi",
    category: "homestay",
    level: "A1",
    iconName: "Clock",
    wordCount: 20,
    previewWords: ["get up", "wash", "brush", "shower"],
  },
  {
    id: "FOOD",
    nameEn: "Food & Meals",
    nameVi: "Ẩm thực & Món ăn",
    description: "Nguyên liệu, bữa cơm và các món ăn đặc trưng giao lưu cùng khách",
    category: "homestay",
    level: "A1",
    iconName: "Utensils",
    wordCount: 20,
    previewWords: ["food", "rice", "bread", "meat"],
  },
  {
    id: "DRINKS",
    nameEn: "Drinks & Coffee",
    nameVi: "Đồ uống & Cà phê",
    description: "Trà, cà phê, nước giải khát trong các buổi trò chuyện",
    category: "homestay",
    level: "A1",
    iconName: "Coffee",
    wordCount: 20,
    previewWords: ["water", "tea", "coffee", "milk"],
  },
  {
    id: "SHOPPING",
    nameEn: "Shopping & Market",
    nameVi: "Mua sắm & Đi chợ",
    description: "Đi chợ truyền thống, siêu thị, giá cả và mua sắm",
    category: "travel",
    level: "A2",
    iconName: "ShoppingBag",
    wordCount: 20,
    previewWords: ["shop", "buy", "sell", "price"],
  },
  {
    id: "CLOTHES",
    nameEn: "Clothes & Style",
    nameVi: "Trang phục & Quần áo",
    description: "Quần áo, phụ kiện thường ngày và giặt giũ tại homestay",
    category: "homestay",
    level: "A1",
    iconName: "Shirt",
    wordCount: 20,
    previewWords: ["clothes", "shirt", "T-shirt", "pants"],
  },
  {
    id: "WORK",
    nameEn: "Work & Jobs",
    nameVi: "Công việc & Nghề nghiệp",
    description: "Nghề nghiệp, nơi làm việc và môi trường công sở",
    category: "study",
    level: "B1",
    iconName: "Briefcase",
    wordCount: 20,
    previewWords: ["work", "job", "office", "boss"],
  },
  {
    id: "SCHOOL",
    nameEn: "School & Study",
    nameVi: "Trường học & Học tập",
    description: "Lớp học, bài giảng, thầy cô và trường đại học",
    category: "study",
    level: "B1",
    iconName: "GraduationCap",
    wordCount: 20,
    previewWords: ["school", "student", "teacher", "class"],
  },
  {
    id: "ENGLISH",
    nameEn: "English Skills",
    nameVi: "Tiếng Anh giao tiếp",
    description: "Kỹ năng phản xạ ngôn ngữ, từ vựng và câu đàm thoại chuẩn",
    category: "study",
    level: "B1",
    iconName: "Languages",
    wordCount: 20,
    previewWords: ["English", "language", "word", "sentence"],
  },
  {
    id: "TIME",
    nameEn: "Time & Schedule",
    nameVi: "Thời gian & Lịch trình",
    description: "Giờ giấc, các mốc thời gian và sắp xếp lịch hẹn",
    category: "study",
    level: "A2",
    iconName: "Calendar",
    wordCount: 20,
    previewWords: ["time", "hour", "minute", "second"],
  },
  {
    id: "PLACES",
    nameEn: "Places & Locations",
    nameVi: "Địa điểm & Nơi chốn",
    description: "Các địa điểm tham quan, công viên, phố phường xung quanh",
    category: "travel",
    level: "A2",
    iconName: "MapPin",
    wordCount: 20,
    previewWords: ["place", "city", "street", "road"],
  },
  {
    id: "TRAVEL",
    nameEn: "Travel & Trip",
    nameVi: "Du lịch & Khám phá",
    description: "Chuyến đi, kỳ nghỉ, trải nghiệm văn hóa bản địa",
    category: "travel",
    level: "B1",
    iconName: "Compass",
    wordCount: 20,
    previewWords: ["travel", "trip", "holiday", "journey"],
  },
  {
    id: "TRANSPORTATION",
    nameEn: "Transportation",
    nameVi: "Phương tiện đi lại",
    description: "Xe máy, ô tô, taxi, xe đạp và di chuyển giao thông",
    category: "travel",
    level: "A2",
    iconName: "Car",
    wordCount: 20,
    previewWords: ["transportation", "car", "bicycle", "motorcycle"],
  },
  {
    id: "WEATHER",
    nameEn: "Weather & Seasons",
    nameVi: "Thời tiết & Mùa",
    description: "Nắng, mưa, thời tiết và dự báo cho các chuyến đi",
    category: "travel",
    level: "A2",
    iconName: "CloudSun",
    wordCount: 20,
    previewWords: ["weather", "sunny", "rainy", "cloudy"],
  },
  {
    id: "BODY",
    nameEn: "Body Parts",
    nameVi: "Bộ phận cơ thể",
    description: "Từ vựng về khuôn mặt, cơ thể và các giác quan",
    category: "study",
    level: "A1",
    iconName: "Smile",
    wordCount: 20,
    previewWords: ["body", "head", "face", "eye"],
  },
  {
    id: "HEALTH",
    nameEn: "Health & Care",
    nameVi: "Sức khỏe & Y tế",
    description: "Chăm sóc sức khỏe, thể trạng và nghỉ ngơi khi ốm",
    category: "study",
    level: "A2",
    iconName: "HeartPulse",
    wordCount: 20,
    previewWords: ["health", "healthy", "sick", "ill"],
  },
  {
    id: "FEELINGS",
    nameEn: "Feelings & Mood",
    nameVi: "Cảm xúc & Tâm trạng",
    description: "Bày tỏ cảm xúc vui vẻ, yêu thích, lo lắng trong giao tiếp",
    category: "social",
    level: "B1",
    iconName: "Heart",
    wordCount: 20,
    previewWords: ["feeling", "love", "like", "hate"],
  },
  {
    id: "PERSONALITY",
    nameEn: "Personality",
    nameVi: "Tính cách con người",
    description: "Miêu tả tính cách thân thiện, vui vẻ, cởi mở của bạn bè",
    category: "social",
    level: "B1",
    iconName: "Sparkles",
    wordCount: 20,
    previewWords: ["personality", "friendly", "funny", "quiet"],
  },
  {
    id: "COMMUNICATION",
    nameEn: "Communication",
    nameVi: "Giao tiếp & Kết nối",
    description: "Gọi điện, gửi tin nhắn, đàm thoại và kết nối trực tiếp",
    category: "social",
    level: "B1",
    iconName: "MessageSquare",
    wordCount: 20,
    previewWords: ["communication", "message", "call", "text"],
  },
  {
    id: "FRIENDS & SOCIAL LIFE",
    nameEn: "Friends & Social Life",
    nameVi: "Bạn bè & Đời sống xã hội",
    description: "Tình bạn, hàng xóm, sinh hoạt nhóm và cộng đồng homestay",
    category: "social",
    level: "B1",
    iconName: "Users",
    wordCount: 20,
    previewWords: ["friendship", "neighbor", "group", "together"],
  },
  {
    id: "FREE TIME",
    nameEn: "Free Time & Hobbies",
    nameVi: "Thời gian rảnh & Giải trí",
    description: "Sở thích nghe nhạc, xem phim, đọc sách và thư giãn",
    category: "social",
    level: "A2",
    iconName: "Music",
    wordCount: 20,
    previewWords: ["free", "hobby", "music", "movie"],
  },
  {
    id: "SPORTS",
    nameEn: "Sports & Fitness",
    nameVi: "Thể thao & Rèn luyện",
    description: "Bóng đá, bơi lội, chạy bộ và rèn luyện thể thao cùng Tây",
    category: "social",
    level: "A2",
    iconName: "Trophy",
    wordCount: 20,
    previewWords: ["sport", "football", "basketball", "tennis"],
  },
  {
    id: "MORNING TO NIGHT",
    nameEn: "Morning to Night",
    nameVi: "Từ sáng tới đêm",
    description: "Nhịp sinh hoạt 24 giờ liên tục tại ngôi nhà homestay",
    category: "homestay",
    level: "A1",
    iconName: "Sun",
    wordCount: 20,
    previewWords: ["wake", "breakfast", "start", "finish"],
  },
  {
    id: "MONEY",
    nameEn: "Money & Spending",
    nameVi: "Tiền bạc & Chi tiêu",
    description: "Chi phí sinh hoạt, tiền tệ và thanh toán khi ra ngoài",
    category: "travel",
    level: "B1",
    iconName: "Coins",
    wordCount: 20,
    previewWords: ["money", "dollar", "coin", "note"],
  },
  {
    id: "THE CITY",
    nameEn: "The City & Street",
    nameVi: "Thành phố & Đường phố",
    description: "Tòa nhà, cầu cống, phố cổ và nhịp sống đô thị",
    category: "travel",
    level: "B2",
    iconName: "Building2",
    wordCount: 20,
    previewWords: ["city", "town", "building", "road"],
  },
  {
    id: "PROBLEMS",
    nameEn: "Problems & Solutions",
    nameVi: "Xử lý vấn đề",
    description: "Cách nói về khó khăn, nhầm lẫn và giải quyết hiểu lầm",
    category: "study",
    level: "B2",
    iconName: "AlertCircle",
    wordCount: 20,
    previewWords: ["problem", "trouble", "mistake", "wrong"],
  },
  {
    id: "HELP",
    nameEn: "Help & Support",
    nameVi: "Giúp đỡ & Hỗ trợ",
    description: "Nhờ vả lịch sự, tương trợ bạn bè và tình nguyện viên",
    category: "social",
    level: "B2",
    iconName: "LifeBuoy",
    wordCount: 20,
    previewWords: ["help", "need", "problem", "support"],
  },
  {
    id: "PLANS",
    nameEn: "Plans & Goals",
    nameVi: "Kế hoạch & Mục tiêu",
    description: "Dự định tương lai, ước mơ và kế hoạch học tiếng Anh",
    category: "study",
    level: "B2",
    iconName: "Target",
    wordCount: 20,
    previewWords: ["plan", "future", "goal", "dream"],
  },
  {
    id: "REAL LIFE",
    nameEn: "Real Life Experience",
    nameVi: "Trải nghiệm đời thực",
    description: "Vốn từ cốt lõi cho trải nghiệm sống và hòa nhập văn hóa",
    category: "homestay",
    level: "B2",
    iconName: "Globe",
    wordCount: 20,
    previewWords: ["life", "thing", "people", "world"],
  },
];

export function getTopicMeta(topicId?: string | null): TopicMeta {
  if (!topicId || topicId === "ALL") {
    return {
      id: "ALL",
      nameEn: "All Topics (600 Words)",
      nameVi: "Tất cả chủ đề (Tổng hợp)",
      description: "Luyện tập ngẫu nhiên toàn bộ 600 từ vựng và hình ảnh EHV",
      category: "homestay",
      level: "A1",
      iconName: "Sparkles",
      wordCount: VOCAB_WORDS.length,
      previewWords: ["afraid", "apartment", "rice", "travel"],
    };
  }
  const found = TOPICS_LIST.find((t) => t.id.toUpperCase() === topicId.toUpperCase());
  return (
    found || {
      id: topicId,
      nameEn: topicId,
      nameVi: topicId,
      description: "Chủ đề từ vựng giao tiếp English Homestay Vietnam",
      category: "homestay",
      level: "A1",
      iconName: "Sparkles",
      wordCount:
        VOCAB_WORDS.filter((w) => w.topic.toUpperCase() === topicId.toUpperCase()).length || 20,
      previewWords: [],
    }
  );
}

/**
 * Get random questions for Game 1 (Picture Match Quiz) filtered by topic
 */
export function getPictureMatchQuestions(
  count = 5,
  topicId?: string | null
): {
  target: VocabWord;
  options: { word: string; vi: string; phonetic: string; isCorrect: boolean }[];
}[] {
  const isAll = !topicId || topicId === "ALL";
  const pool = !isAll
    ? VOCAB_WORDS.filter((w) => w.topic.toUpperCase() === topicId.toUpperCase())
    : VOCAB_WORDS;

  const effectivePool = pool.length >= count ? pool : VOCAB_WORDS;
  const shuffled = [...effectivePool].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map((target) => {
    // Pick 3 distractors: first prefer same topic pool, fallback to all words if not enough
    const samePoolDistractors = effectivePool.filter((w) => w.word !== target.word);
    const distractorCandidates =
      samePoolDistractors.length >= 3
        ? samePoolDistractors
        : VOCAB_WORDS.filter((w) => w.word !== target.word);

    const distractors = distractorCandidates
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [
      {
        word: target.word,
        vi: target.vi,
        phonetic: target.phonetic,
        isCorrect: true,
      },
      ...distractors.map((d) => ({
        word: d.word,
        vi: d.vi,
        phonetic: d.phonetic,
        isCorrect: false,
      })),
    ].sort(() => 0.5 - Math.random());

    return { target, options };
  });
}

/**
 * Get random pairs for Game 1 (Picture Match Grid Mode) filtered by topic
 */
export function getPictureMatchPairs(count = 4, topicId?: string | null): VocabWord[] {
  const isAll = !topicId || topicId === "ALL";
  const pool = !isAll
    ? VOCAB_WORDS.filter((w) => w.topic.toUpperCase() === topicId.toUpperCase())
    : VOCAB_WORDS;

  const effectivePool = pool.length >= count ? pool : VOCAB_WORDS;
  return [...effectivePool].sort(() => 0.5 - Math.random()).slice(0, count);
}

/**
 * Get random questions for Game 3 (Fill in the Blank in Context Sentence) filtered by topic
 */
export function getFillInBlankQuestions(
  count = 5,
  topicId?: string | null
): {
  target: VocabWord;
  sentenceBefore: string;
  sentenceAfter: string;
  missingWordInSentence: string;
  options: { word: string; vi: string; phonetic: string; isCorrect: boolean }[];
}[] {
  const isAll = !topicId || topicId === "ALL";
  const pool = !isAll
    ? VOCAB_WORDS.filter((w) => w.topic.toUpperCase() === topicId.toUpperCase())
    : VOCAB_WORDS;

  const effectivePool = pool.length >= count ? pool : VOCAB_WORDS;
  const shuffled = [...effectivePool].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map((target) => {
    const example = target.example.trim();
    const escaped = target.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b(${escaped}\\w*)\\b`, "i");
    const match = example.match(regex);

    let sentenceBefore = example;
    let sentenceAfter = "";
    let missingWordInSentence = target.word;

    if (match && match.index !== undefined) {
      sentenceBefore = example.slice(0, match.index);
      missingWordInSentence = match[1];
      sentenceAfter = example.slice(match.index + match[1].length);
    }

    const samePoolDistractors = effectivePool.filter((w) => w.word !== target.word);
    const distractorCandidates =
      samePoolDistractors.length >= 3
        ? samePoolDistractors
        : VOCAB_WORDS.filter((w) => w.word !== target.word);

    const distractors = distractorCandidates
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [
      {
        word: target.word,
        vi: target.vi,
        phonetic: target.phonetic,
        isCorrect: true,
      },
      ...distractors.map((d) => ({
        word: d.word,
        vi: d.vi,
        phonetic: d.phonetic,
        isCorrect: false,
      })),
    ].sort(() => 0.5 - Math.random());

    return {
      target,
      sentenceBefore,
      sentenceAfter,
      missingWordInSentence,
      options,
    };
  });
}

/**
 * Get random sentences for Game 4 (Sentence Builder) filtered by topic
 */
export function getSentenceBuilderQuestions(
  count = 5,
  topicId?: string | null
): {
  id: number;
  target: VocabWord;
  fullSentence: string;
  translation: string;
  scrambledWords: { id: string; word: string }[];
  keyWord: string;
}[] {
  const isAll = !topicId || topicId === "ALL";
  const topicPool = !isAll
    ? VOCAB_WORDS.filter((w) => w.topic.toUpperCase() === topicId.toUpperCase())
    : VOCAB_WORDS;

  const eligibleInTopic = topicPool.filter((w) => {
    if (!w.example) return false;
    const words = w.example.trim().split(/\s+/);
    return words.length >= 3 && words.length <= 12;
  });

  const pool = eligibleInTopic.length >= count ? eligibleInTopic : topicPool;
  const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, count);

  return shuffled.map((item, idx) => {
    const rawTokens = item.example.trim().split(/\s+/);
    const scrambled = rawTokens
      .map((word, i) => ({ id: `${item.id}-${idx}-${i}`, word }))
      .sort(() => 0.5 - Math.random());

    return {
      id: item.id,
      target: item,
      fullSentence: item.example.trim(),
      translation: `Từ khóa: "${item.word}" (${item.vi}) — ${item.definition}`,
      scrambledWords: scrambled,
      keyWord: item.word,
    };
  });
}
