import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Languages } from "lucide-react";

export type Lang = "en" | "zh";

const dict = {
  en: {
    // shell
    "nav.home": "Home",
    "nav.mock": "Mock Test",
    "nav.practice": "Speaking Practice",
    "nav.review": "Review",
    "shell.workspace": "Workspace",
    "shell.reviewCenter": "Review Center",
    "shell.mistakes": "Mistakes",
    "shell.vocabulary": "Vocabulary",
    "shell.flashcards": "Flashcards",
    "shell.search": "Search",
    "shell.freePlan": "Free plan",
    "shell.freePlanDesc": "2 of 3 mock tests used this month.",
    "shell.upgrade": "Upgrade",
    "shell.settings": "Settings",
    "shell.streak": "12-day streak",
    // home
    "home.greeting": "Good morning, Lin",
    "home.headlineA": "Let's close the gap to",
    "home.headlineB": "Band 8",
    "home.crumb": "Home",
    "hero.targetBand": "Target band",
    "hero.editTarget": "Edit target",
    "hero.saveTarget": "Save",
    "hero.currentBand": "Current",
    "hero.copy": "Keep 45 minutes a day and you'll hit your target by Mar 14.",
    "hero.startPlan": "Start today's plan",
    "hero.quickPractice": "Quick practice",
    "hero.progressToTarget": "Progress to target",
    "hero.fluency": "Fluency",
    "hero.lexical": "Lexical",
    "hero.grammar": "Grammar",
    "hero.pron": "Pronun.",
    // quick actions (plan)
    "plan.title": "Today's practice",
    "plan.sub": "Pick something and go.",
    "plan.quick.title": "Quick speaking practice",
    "plan.quick.desc": "3-minute Part 1 warm-up with instant feedback.",
    "plan.vocab.title": "Vocabulary flashcards",
    "plan.vocab.desc": "24 cards due today. About 6 minutes.",
    "plan.mistakes.title": "Fix yesterday's mistakes",
    "plan.mistakes.desc": "3 items to correct from your last session.",
    "plan.mock.title": "Full mock test",
    "plan.mock.desc": "14-minute AI examiner simulation.",
    "plan.cta": "Start",
    // progress
    "progress.thisWeek": "This week",
    "progress.title": "Progress",
    "progress.minutes": "Minutes",
    "progress.sessions": "Sessions",
    "progress.streak": "Streak",
    "progress.days": "days",
    "progress.minutesSub": "this week",
    "progress.sessionsSub": "4 mock · 5 drill",
    // review snapshot
    "review.mistakesTitle": "Mistakes notebook",
    "review.mistakesSub": "Fix these next",
    "review.vocabTitle": "Vocabulary notebook",
    "review.vocabSub": "New this week",
    "review.all": "All",
    "review.flashcards": "Flashcards",
    // mock
    "mock.crumb": "Mock Test",
    "mock.eyebrow": "Simulation",
    "mock.headline": "Full 14-minute mock test.",
    "mock.aiExaminer": "AI Examiner",
    "mock.ready": "Ready when you are.",
    "mock.copy": "Three parts, back-to-back. Band scores for fluency, lexical resource, grammar, and pronunciation.",
    "mock.selected": "Selected topic",
    "mock.noneSelected": "Pick a topic or go random",
    "mock.start": "Start mock test",
    "mock.random": "Random topic",
    "mock.stop": "Stop test",
    "mock.recording": "Recording · Part 1",
    "mock.topics": "Choose a theme",
    "mock.topicsSub": "Each theme covers Part 1, 2, and 3 questions.",
    "mock.lastBand": "Last band",
    "mock.testsDone": "Tests done",
    "mock.recent": "Recent attempts",
    "mock.allHistory": "All history",
    // review page
    "reviewPage.crumb": "Review",
    "reviewPage.eyebrow": "Review Center",
    "reviewPage.headline": "What to fix next.",
    "reviewPage.tab.mistakes": "Mistakes",
    "reviewPage.tab.vocab": "Vocabulary",
    "reviewPage.tab.cards": "Flashcards",
    "reviewPage.mistakesTitle": "Mistakes notebook",
    "reviewPage.mistakesSub": "Corrections from recent sessions",
    "reviewPage.vocabTitle": "Vocabulary notebook",
    "reviewPage.vocabSub": "Words you've saved",
    "reviewPage.cardsTitle": "Flashcards",
    "reviewPage.cardsSub": "Tap the card to flip. Rate to schedule.",
    "reviewPage.flip": "Tap to flip",
    "reviewPage.again": "Again",
    "reviewPage.good": "Good",
    "reviewPage.easy": "Easy",
    "reviewPage.next": "Next",
    "reviewPage.prev": "Previous",
    "reviewPage.of": "of",
    // practice
    "practice.crumb": "Speaking Practice",
    "practice.eyebrow": "Drill by part & topic",
    "practice.headline": "Practice with live feedback.",
    "practice.quickDrill": "Quick 3-minute drill",
    "practice.quickDrillDesc": "A random Part 1 set to warm up.",
    "practice.start": "Start",
    "practice.prompts": "prompts",
  },
  zh: {
    "nav.home": "首页",
    "nav.mock": "模拟考试",
    "nav.practice": "口语练习",
    "nav.review": "复习中心",
    "shell.workspace": "工作台",
    "shell.reviewCenter": "复习中心",
    "shell.mistakes": "错题本",
    "shell.vocabulary": "词汇本",
    "shell.flashcards": "单词卡",
    "shell.search": "搜索",
    "shell.freePlan": "免费版",
    "shell.freePlanDesc": "本月已使用 2/3 次模拟考试。",
    "shell.upgrade": "升级",
    "shell.settings": "设置",
    "shell.streak": "连续 12 天",
    "home.greeting": "早上好，Lin",
    "home.headlineA": "一起冲向",
    "home.headlineB": "Band 8",
    "home.crumb": "首页",
    "hero.targetBand": "目标分数",
    "hero.editTarget": "修改目标",
    "hero.saveTarget": "保存",
    "hero.currentBand": "当前",
    "hero.copy": "每天保持 45 分钟练习，预计 3 月 14 日达成目标。",
    "hero.startPlan": "开始今日计划",
    "hero.quickPractice": "快速练习",
    "hero.progressToTarget": "目标进度",
    "hero.fluency": "流利度",
    "hero.lexical": "词汇",
    "hero.grammar": "语法",
    "hero.pron": "发音",
    "plan.title": "今日练习",
    "plan.sub": "选一项，立即开始。",
    "plan.quick.title": "快速口语练习",
    "plan.quick.desc": "3 分钟 Part 1 热身，即时反馈。",
    "plan.vocab.title": "词汇闪卡",
    "plan.vocab.desc": "今日待复习 24 张，约 6 分钟。",
    "plan.mistakes.title": "巩固昨日错题",
    "plan.mistakes.desc": "上一节课的 3 处待修正。",
    "plan.mock.title": "完整模拟考试",
    "plan.mock.desc": "14 分钟 AI 考官全真模拟。",
    "plan.cta": "开始",
    "progress.thisWeek": "本周",
    "progress.title": "学习进度",
    "progress.minutes": "分钟",
    "progress.sessions": "训练次数",
    "progress.streak": "连续",
    "progress.days": "天",
    "progress.minutesSub": "本周",
    "progress.sessionsSub": "4 次模考 · 5 次练习",
    "review.mistakesTitle": "错题本",
    "review.mistakesSub": "优先修正这些",
    "review.vocabTitle": "词汇本",
    "review.vocabSub": "本周新增",
    "review.all": "全部",
    "review.flashcards": "闪卡",
    "mock.crumb": "模拟考试",
    "mock.eyebrow": "全真模拟",
    "mock.headline": "14 分钟完整模拟考试。",
    "mock.aiExaminer": "AI 考官",
    "mock.ready": "准备好就开始。",
    "mock.copy": "三部分连续进行，覆盖流利度、词汇、语法与发音四项评分。",
    "mock.selected": "已选主题",
    "mock.noneSelected": "选择主题或随机抽取",
    "mock.start": "开始模拟",
    "mock.random": "随机主题",
    "mock.stop": "结束考试",
    "mock.recording": "录音中 · Part 1",
    "mock.topics": "选择主题",
    "mock.topicsSub": "每个主题包含 Part 1、2、3 的完整问题。",
    "mock.lastBand": "上次分数",
    "mock.testsDone": "考试次数",
    "mock.recent": "最近记录",
    "mock.allHistory": "全部记录",
    "reviewPage.crumb": "复习",
    "reviewPage.eyebrow": "复习中心",
    "reviewPage.headline": "接下来要修正什么。",
    "reviewPage.tab.mistakes": "错题本",
    "reviewPage.tab.vocab": "词汇本",
    "reviewPage.tab.cards": "闪卡",
    "reviewPage.mistakesTitle": "错题本",
    "reviewPage.mistakesSub": "近期练习中的修正",
    "reviewPage.vocabTitle": "词汇本",
    "reviewPage.vocabSub": "你收藏的词汇",
    "reviewPage.cardsTitle": "闪卡",
    "reviewPage.cardsSub": "点击卡片翻面，选择熟练度。",
    "reviewPage.flip": "点击翻面",
    "reviewPage.again": "重来",
    "reviewPage.good": "熟练",
    "reviewPage.easy": "轻松",
    "reviewPage.next": "下一张",
    "reviewPage.prev": "上一张",
    "reviewPage.of": "/",
    "practice.crumb": "口语练习",
    "practice.eyebrow": "按 Part 与主题练习",
    "practice.headline": "边练边得反馈。",
    "practice.quickDrill": "3 分钟快速练习",
    "practice.quickDrillDesc": "随机 Part 1 热身。",
    "practice.start": "开始",
    "practice.prompts": "个题目",
  },
} as const;

type Key = keyof typeof dict["en"];

const Ctx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (window.localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "en" || saved === "zh") setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("lang", lang);
  }, [lang]);
  const t = (k: Key) => (dict[lang][k] as string) ?? (dict.en[k] as string) ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`inline-flex items-center gap-1 h-7 p-0.5 rounded-full border border-border bg-background text-xs ${className}`}>
      <Languages className="w-3 h-3 ml-1.5 text-muted-foreground" />
      <button
        onClick={() => setLang("en")}
        className={`h-6 px-2 rounded-full transition ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("zh")}
        className={`h-6 px-2 rounded-full transition ${lang === "zh" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
      >
        中文
      </button>
    </div>
  );
}
