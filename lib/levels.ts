import type { LevelCode } from "./fluency-data"

export interface LevelConfig {
  code: LevelCode
  /** Instructions injected into the AI prompt to control language + tone. */
  aiInstructions: string
  /** Whether the UI should show Portuguese translations for vocabulary. */
  showTranslations: boolean
}

export const LEVEL_CONFIG: Record<LevelCode, LevelConfig> = {
  A1: {
    code: "A1",
    showTranslations: true,
    aiInstructions:
      "The student is A1 (beginner). Write almost everything in Portuguese. Always provide Portuguese translations next to any English word. Use very simple explanations and short sentences. Be extremely encouraging.",
  },
  A2: {
    code: "A2",
    showTranslations: true,
    aiInstructions:
      "The student is A2 (elementary). Write mostly in Portuguese but introduce more English words with translations. Keep explanations simple and supportive.",
  },
  B1: {
    code: "B1",
    showTranslations: true,
    aiInstructions:
      "The student is B1 (intermediate). Mix Portuguese and English. Encourage the student to write in English. Explain new vocabulary in simple English, adding a short Portuguese note when helpful.",
  },
  B2: {
    code: "B2",
    showTranslations: false,
    aiInstructions:
      "The student is B2 (upper intermediate). Write mostly in English. Use Portuguese only for occasional clarifications. Give detailed feedback.",
  },
  C1: {
    code: "C1",
    showTranslations: false,
    aiInstructions:
      "The student is C1 (advanced). Write 100% in English with no translations. Give advanced, nuanced feedback and push for richer vocabulary and natural phrasing.",
  },
  C2: {
    code: "C2",
    showTranslations: false,
    aiInstructions:
      "The student is C2 (proficient). Write 100% in English. Focus on fluency, nuance, idiomatic and natural language. Do not include any beginner-level explanations.",
  },
}

export function levelInstructions(level: LevelCode): string {
  return LEVEL_CONFIG[level].aiInstructions
}
