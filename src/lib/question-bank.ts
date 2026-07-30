/**
 * IELTS Speaking Question Bank — data model + mock dataset.
 *
 * DB shape this mirrors:
 *   question(id, part, topic, sub_topic, question, frequency, difficulty,
 *            year, source, prediction_level, practice_count)
 *   user(plan, completed_questions[], favorite_questions[], mistake_questions[])
 */

export type PartId = "part1" | "part2" | "part3";
export type PredictionLevel = "high" | "medium" | "low";
export type DifficultyBand = "Band 5-6" | "Band 6-7" | "Band 6-8" | "Band 7-9";

export interface Question {
  id: string;
  part: PartId;
  topicId: string;
  subTopic: string;
  question: string;
  /** 1–5 stars */
  frequency: number;
  difficulty: DifficultyBand;
  /** how many recorded exams it appeared in */
  appearances: number;
  year: number;
  source: string;
  predictionLevel: PredictionLevel;
  practiceCount: number;
  followUps: string[];
}

export interface Topic {
  id: string;
  name: string;
  nameZh: string;
  group: string;
  groupZh: string;
  emoji: string;
  frequency: number;
  difficulty: DifficultyBand;
  recentExam: PredictionLevel;
  studentsPracticed: number;
  updated: string;
  blurb: string;
  blurbZh: string;
}

export interface PartMeta {
  id: PartId;
  label: string;
  name: string;
  nameZh: string;
  tagline: string;
  taglineZh: string;
  duration: string;
  questionCount: number;
  topicCount: number;
}

export interface UserBankState {
  plan: "free" | "pro";
  completedQuestions: string[];
  favoriteQuestions: string[];
  mistakeQuestions: string[];
}

export const PARTS: PartMeta[] = [
  {
    id: "part1",
    label: "Part 1",
    name: "Daily Conversation",
    nameZh: "日常话题问答",
    tagline: "Short personal questions about familiar topics.",
    taglineZh: "关于熟悉话题的简短个人问答。",
    duration: "4–5 minutes",
    questionCount: 1200,
    topicCount: 80,
  },
  {
    id: "part2",
    label: "Part 2",
    name: "Cue Card Speaking",
    nameZh: "话题卡长句陈述",
    tagline: "1 minute preparation · 2 minutes speaking.",
    taglineZh: "1 分钟准备 · 2 分钟陈述。",
    duration: "3–4 minutes",
    questionCount: 850,
    topicCount: 100,
  },
  {
    id: "part3",
    label: "Part 3",
    name: "Deep Discussion",
    nameZh: "深度抽象讨论",
    tagline: "Abstract, opinion-led discussion with the examiner.",
    taglineZh: "与考官展开抽象、观点性的深入讨论。",
    duration: "4–5 minutes",
    questionCount: 810,
    topicCount: 70,
  },
];

export function getPart(id: string): PartMeta | undefined {
  return PARTS.find((p) => p.id === id);
}

interface TopicSeed {
  id: string;
  name: string;
  nameZh: string;
  group: string;
  groupZh: string;
  emoji: string;
  frequency: number;
  difficulty: DifficultyBand;
  recentExam: PredictionLevel;
}

const TOPIC_SEEDS: TopicSeed[] = [
  { id: "travel", name: "Travel", nameZh: "旅行", group: "Lifestyle", groupZh: "生活方式", emoji: "✈️", frequency: 5, difficulty: "Band 6-8", recentExam: "high" },
  { id: "technology", name: "Technology", nameZh: "科技", group: "Society", groupZh: "社会", emoji: "💻", frequency: 5, difficulty: "Band 6-8", recentExam: "high" },
  { id: "education", name: "Education", nameZh: "教育", group: "Society", groupZh: "社会", emoji: "🎓", frequency: 4, difficulty: "Band 6-8", recentExam: "high" },
  { id: "work", name: "Work", nameZh: "工作", group: "Society", groupZh: "社会", emoji: "💼", frequency: 5, difficulty: "Band 6-7", recentExam: "high" },
  { id: "environment", name: "Environment", nameZh: "环境", group: "Society", groupZh: "社会", emoji: "🌱", frequency: 4, difficulty: "Band 7-9", recentExam: "medium" },
  { id: "health", name: "Health", nameZh: "健康", group: "Lifestyle", groupZh: "生活方式", emoji: "🏃", frequency: 4, difficulty: "Band 6-7", recentExam: "medium" },
  { id: "food", name: "Food", nameZh: "饮食", group: "Lifestyle", groupZh: "生活方式", emoji: "🍜", frequency: 5, difficulty: "Band 5-6", recentExam: "high" },
  { id: "media", name: "Media", nameZh: "媒体", group: "Culture", groupZh: "文化", emoji: "🎬", frequency: 3, difficulty: "Band 6-7", recentExam: "medium" },
  { id: "transportation", name: "Transportation", nameZh: "交通", group: "Society", groupZh: "社会", emoji: "🚇", frequency: 4, difficulty: "Band 6-7", recentExam: "medium" },
  { id: "hometown", name: "Hometown", nameZh: "家乡", group: "Personal", groupZh: "个人", emoji: "🏙️", frequency: 5, difficulty: "Band 5-6", recentExam: "high" },
  { id: "accommodation", name: "Accommodation", nameZh: "住所", group: "Personal", groupZh: "个人", emoji: "🏡", frequency: 5, difficulty: "Band 5-6", recentExam: "high" },
  { id: "shopping", name: "Shopping", nameZh: "购物", group: "Lifestyle", groupZh: "生活方式", emoji: "🛍️", frequency: 3, difficulty: "Band 6-7", recentExam: "low" },
  { id: "friends", name: "Friends", nameZh: "朋友", group: "Personal", groupZh: "个人", emoji: "🫂", frequency: 4, difficulty: "Band 6-7", recentExam: "medium" },
  { id: "family", name: "Family", nameZh: "家庭", group: "Personal", groupZh: "个人", emoji: "👨‍👩‍👧", frequency: 4, difficulty: "Band 5-6", recentExam: "medium" },
];

const BLURBS: Record<string, [string, string]> = {
  travel: ["Journeys, holidays, transport choices and dream destinations.", "旅程、假期、出行方式与梦想目的地。"],
  technology: ["Devices, AI, social apps and how they reshape daily life.", "设备、AI、社交软件及其对生活的改变。"],
  education: ["Schools, subjects, learning habits and lifelong study.", "学校、学科、学习习惯与终身学习。"],
  work: ["Jobs, career paths, workplaces and work-life balance.", "职业、发展路径、工作场所与工作生活平衡。"],
  environment: ["Climate, pollution, recycling and personal responsibility.", "气候、污染、回收与个人责任。"],
  health: ["Exercise, sleep, stress and modern lifestyle habits.", "运动、睡眠、压力与现代生活习惯。"],
  food: ["Cooking, eating out, traditional dishes and food culture.", "烹饪、外食、传统菜肴与饮食文化。"],
  media: ["Films, news, streaming and how we consume stories.", "电影、新闻、流媒体与故事消费方式。"],
  transportation: ["Commuting, public transport, traffic and cities.", "通勤、公共交通、拥堵与城市。"],
  hometown: ["Where you grew up, changes over time and local life.", "成长的地方、变迁与本地生活。"],
  accommodation: ["Flats, houses, rooms and the idea of an ideal home.", "公寓、房屋、房间与理想住所。"],
  shopping: ["Markets, online orders, spending habits and gifts.", "市场、网购、消费习惯与礼物。"],
  friends: ["Friendship, socialising and keeping in touch.", "友谊、社交与保持联系。"],
  family: ["Relatives, family time and generational differences.", "亲人、家庭时光与代际差异。"],
};

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function topicsForPart(part: PartId): Topic[] {
  return TOPIC_SEEDS.map((s) => {
    const h = hash(part + s.id);
    return {
      ...s,
      blurb: BLURBS[s.id][0],
      blurbZh: BLURBS[s.id][1],
      studentsPracticed: 400 + (h % 1400),
      updated: "July 2026",
    } satisfies Topic;
  });
}

export function getTopic(part: PartId, topicId: string): Topic | undefined {
  return topicsForPart(part).find((t) => t.id === topicId);
}

/* ---------------- Question generation (deterministic mock data) --------------- */

const P1_TEMPLATES: [string, string][] = [
  ["Do you like {t}?", "General"],
  ["How often do you think about {t}?", "Frequency"],
  ["Did you care about {t} when you were a child?", "Past"],
  ["Would you like to spend more time on {t} in the future?", "Future"],
  ["Is {t} popular among young people in your country?", "Society"],
  ["What do your friends say about {t}?", "People"],
  ["Has your attitude to {t} changed recently?", "Change"],
  ["Which part of {t} do you enjoy the most?", "Preference"],
  ["Is {t} important in your daily routine?", "Routine"],
  ["Would you recommend {t} to a visitor from abroad?", "Advice"],
];

const P2_TEMPLATES: [string, string][] = [
  ["Describe an experience connected with {t} that you remember well.", "Experience"],
  ["Describe a person who changed the way you think about {t}.", "Person"],
  ["Describe a place that made you interested in {t}.", "Place"],
  ["Describe a time you made a difficult decision about {t}.", "Event"],
  ["Describe something related to {t} that you would like to try.", "Object"],
  ["Describe a moment when {t} did not go as planned.", "Event"],
  ["Describe a piece of advice about {t} that you were given.", "Advice"],
  ["Describe how {t} is different now compared with ten years ago.", "Change"],
  ["Describe a goal you have set involving {t}.", "Goal"],
  ["Describe a story about {t} you heard from someone else.", "Story"],
];

const P3_TEMPLATES: [string, string][] = [
  ["Why do some people care more about {t} than others?", "Opinion"],
  ["How has {t} changed over the last generation?", "Change"],
  ["Should governments invest more in {t}? Why?", "Policy"],
  ["What are the disadvantages of focusing too much on {t}?", "Balance"],
  ["Do you think {t} will look completely different in fifty years?", "Future"],
  ["How does {t} affect the way communities work together?", "Society"],
  ["Is {t} treated differently in cities and in the countryside?", "Comparison"],
  ["Who should be responsible for improving {t}?", "Responsibility"],
  ["Can technology solve the main problems around {t}?", "Technology"],
  ["How does the media influence public opinion about {t}?", "Media"],
];

const SOURCES = ["Jan 2026 · Mainland China", "Mar 2026 · UK", "May 2026 · India", "Jun 2026 · Australia", "Jul 2026 · Prediction Pack"];

const DIFFS: DifficultyBand[] = ["Band 5-6", "Band 6-7", "Band 6-8", "Band 7-9"];

export function questionsFor(part: PartId, topicId: string): Question[] {
  const topic = TOPIC_SEEDS.find((t) => t.id === topicId);
  if (!topic) return [];
  const templates = part === "part1" ? P1_TEMPLATES : part === "part2" ? P2_TEMPLATES : P3_TEMPLATES;
  const base = hash(part + topicId);
  const count = 24 + (base % 15);
  const noun = topic.name.toLowerCase();

  return Array.from({ length: count }, (_, i) => {
    const tpl = templates[i % templates.length];
    const h = hash(`${part}-${topicId}-${i}`);
    const variantSuffix = i >= templates.length ? ` (${["at work", "with friends", "as a student", "in your city"][Math.floor(i / templates.length) % 4]})` : "";
    return {
      id: `${part}-${topicId}-${String(i + 1).padStart(2, "0")}`,
      part,
      topicId,
      subTopic: tpl[1],
      question: tpl[0].replace("{t}", noun).replace(/\?$/, variantSuffix ? `${variantSuffix}?` : "?"),
      frequency: 1 + ((h >> 3) % 5),
      difficulty: DIFFS[h % DIFFS.length],
      appearances: 2 + (h % 18),
      year: 2024 + (h % 3),
      source: SOURCES[h % SOURCES.length],
      predictionLevel: (["high", "medium", "low"] as PredictionLevel[])[(h >> 5) % 3],
      practiceCount: 120 + (h % 2400),
      followUps: [
        `Where do you usually experience ${noun}?`,
        `Who do you talk to about ${noun}?`,
        `How could ${noun} be improved in your country?`,
      ],
    } satisfies Question;
  }).sort((a, b) => b.frequency - a.frequency);
}

export function getQuestion(part: PartId, topicId: string, id: string): Question | undefined {
  return questionsFor(part, topicId).find((q) => q.id === id);
}

/* ---------------- Mock user progress ---------------- */

export const BANK_TOTALS = {
  questions: 2800,
  topics: 120,
  coverage: 95,
  completed: 235,
  topicsMastered: 12,
};

export const FREE_LIMIT = 5;

export const WEAK_AREAS = [
  { topicId: "technology", part: "part3" as PartId, name: "Technology", accuracy: 54 },
  { topicId: "environment", part: "part3" as PartId, name: "Environment", accuracy: 61 },
];

/** Deterministic "already practised" set so the UI shows real states. */
export function isCompleted(questionId: string): boolean {
  return hash(questionId) % 4 === 0;
}
