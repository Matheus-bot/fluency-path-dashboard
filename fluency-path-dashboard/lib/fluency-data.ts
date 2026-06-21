export type LevelCode = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"

export interface LevelInfo {
  code: LevelCode
  name: string
  description: string
}

export const LEVELS: LevelInfo[] = [
  {
    code: "A1",
    name: "A1 - Beginner",
    description:
      "You can understand and use very basic everyday expressions and simple phrases to meet concrete needs.",
  },
  {
    code: "A2",
    name: "A2 - Elementary",
    description:
      "You can communicate in simple, routine tasks and describe aspects of your background and immediate environment.",
  },
  {
    code: "B1",
    name: "B1 - Intermediate",
    description:
      "You can deal with most situations while traveling and produce simple connected text on familiar topics.",
  },
  {
    code: "B2",
    name: "B2 - Upper Intermediate",
    description:
      "You can interact with fluency and spontaneity, and produce clear, detailed text on a wide range of subjects.",
  },
  {
    code: "C1",
    name: "C1 - Advanced",
    description:
      "You understand a wide range of demanding, longer texts and recognize implicit meaning. Keep challenging yourself!",
  },
  {
    code: "C2",
    name: "C2 - Proficient",
    description:
      "You can understand virtually everything heard or read and express yourself spontaneously, very fluently and precisely.",
  },
]

export interface VocabularyWord {
  word: string
  definition: string
  translation: string
}

export const KEY_VOCABULARY: VocabularyWord[] = [
  { word: "Habit", definition: "a repeated behavior", translation: "hábito" },
  { word: "Impact", definition: "a strong effect", translation: "impacto" },
  {
    word: "Consistent",
    definition: "always acting in the same way",
    translation: "consistente",
  },
  {
    word: "Routine",
    definition: "a regular series of actions",
    translation: "rotina",
  },
  {
    word: "Result",
    definition: "the final outcome of something",
    translation: "resultado",
  },
]

export const MINI_SUMMARY =
  "In this video, the speaker explains how small daily habits can have a huge impact on our lives. You'll learn how tiny changes in your routine can lead to big results over time."

export const MINI_SUMMARY_PT =
  "Neste vídeo, o palestrante explica como pequenos hábitos diários podem ter um enorme impacto em nossas vidas. Você vai aprender como pequenas mudanças na sua rotina podem levar a grandes resultados ao longo do tempo."

export const THINK_QUESTION =
  "What small habit could you start today that might improve your life in the long term?"

export const THINK_QUESTION_PT =
  "Que pequeno hábito você poderia começar hoje que talvez melhore sua vida a longo prazo?"

export interface VideoEntry {
  /** YYYY-MM-DD. Leave empty ("") to fill in sequence automatically. */
  date: string
  title: string
  /** The part after ?v= in the YouTube URL */
  youtubeId: string
}

/**
 * ─────────────────────────────────────────────────
 *  ADD YOUR VIDEOS HERE
 *  Just copy the ID from the YouTube URL:
 *  https://www.youtube.com/watch?v=AdKUJxjn-R8
 *                                   ^^^^^^^^^^^^  ← this part
 * ─────────────────────────────────────────────────
 */
export const VIDEO_PLAYLIST: VideoEntry[] = [
  {
    date: "2026-06-21",
    title: "The magic of tiny habits | BJ Fogg",
    youtubeId: "AdKUJxjn-R8",
  },
  {
    date: "2026-06-22",
    title: "The power of believing that you can improve | Carol Dweck",
    youtubeId: "_X0mgOHm1Rw",
  },
  {
    date: "2026-06-23",
    title: "Inside the mind of a master procrastinator | Tim Urban",
    youtubeId: "arj7oStGLkU",
  },
  {
    date: "2026-06-24",
    title: "How to speak so that people want to listen | Julian Treasure",
    youtubeId: "eIho2S0ZahI",
  },
  {
    date: "2026-06-25",
    title: "The skill of self confidence | Dr. Ivan Joseph",
    youtubeId: "w-HYZv6HzAs",
  },
  // ─── Add more videos below ───────────────────────
  // {
  //   date: "2026-06-26",
  //   title: "Your video title here",
  //   youtubeId: "xxxxxxxxxxx",
  // },
]

/** Returns the video scheduled for today, or cycles through the list if no exact date is found. */
export function getTodayVideo(): VideoEntry {
  const today = new Date()
  const iso =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0")

  const exact = VIDEO_PLAYLIST.find((v) => v.date === iso)
  if (exact) return exact

  // Fallback: cycle through the list by day-of-year so it never shows nothing
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000,
  )
  return VIDEO_PLAYLIST[dayOfYear % VIDEO_PLAYLIST.length]
}

// Legacy single-video export kept for backward compatibility
export const VIDEO = VIDEO_PLAYLIST[0]

export interface StatItem {
  label: string
  value: string
}

export const STATISTICS: StatItem[] = [
  { label: "Videos watched", value: "7" },
  { label: "Summaries written", value: "7" },
  { label: "Words learned", value: "32" },
  { label: "Hours studied", value: "3.5h" },
]

export const STREAK = {
  current: 5,
  best: 12,
}

// Calendar config for June 2025 (month index 5).
export const CALENDAR = {
  year: 2025,
  month: 5, // June (0-indexed)
  today: 22,
  studiedDays: [17, 18, 20, 21],
}

export interface FeedbackTab {
  id: string
  label: string
}

export const FEEDBACK_TABS: FeedbackTab[] = [
  { id: "overall", label: "Overall Feedback" },
  { id: "grammar", label: "Grammar" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "suggestions", label: "Suggestions" },
]
