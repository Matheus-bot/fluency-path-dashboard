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
}

export const KEY_VOCABULARY: VocabularyWord[] = [
  { word: "Habit", definition: "a repeated behavior" },
  { word: "Impact", definition: "a strong effect" },
  { word: "Consistent", definition: "always acting in the same way" },
  { word: "Routine", definition: "a regular series of actions" },
  { word: "Result", definition: "the final outcome of something" },
]

export const MINI_SUMMARY =
  "In this video, the speaker explains how small daily habits can have a huge impact on our lives. You'll learn how tiny changes in your routine can lead to big results over time."

export const THINK_QUESTION =
  "What small habit could you start today that might improve your life in the long term?"

export const VIDEO = {
  title: "The magic of tiny habits | BJ Fogg",
  youtubeId: "AdKUJxjn-R8",
}

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
