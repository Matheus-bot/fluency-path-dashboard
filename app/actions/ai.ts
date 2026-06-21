"use server"

import { generateText, Output } from "ai"
import { z } from "zod"
import type { LevelCode } from "@/lib/fluency-data"
import { levelInstructions } from "@/lib/levels"
import { VIDEO, MINI_SUMMARY } from "@/lib/fluency-data"

const MODEL = "openai/gpt-5.4-mini"

const feedbackSchema = z.object({
  overall: z.object({
    headline: z.string().describe("A short encouraging headline."),
    message: z.string().describe("2-3 sentences of overall feedback."),
    betterVersion: z
      .string()
      .describe("A more natural, improved version of the student's summary."),
  }),
  scores: z.object({
    grammar: z.number().min(0).max(10),
    vocabulary: z.number().min(0).max(10),
    coherence: z.number().min(0).max(10),
    fluency: z.number().min(0).max(10),
    overall: z.number().min(0).max(10),
  }),
  grammar: z
    .array(
      z.object({
        error: z.string().describe("The incorrect text or issue found."),
        correction: z.string().describe("The corrected version."),
        explanation: z.string().describe("Why it should be corrected."),
      }),
    )
    .describe("Grammar errors found, corrections and explanations."),
  vocabulary: z
    .array(
      z.object({
        word: z.string(),
        meaning: z.string(),
        synonyms: z.array(z.string()),
        example: z.string().describe("An example sentence using the word."),
      }),
    )
    .describe("Useful vocabulary with meaning, synonyms and examples."),
  suggestions: z
    .array(z.string())
    .describe("Actionable suggestions to improve future summaries."),
})

export type AnalysisResult = z.infer<typeof feedbackSchema>

export async function analyzeSummary(input: {
  summary: string
  unknownWords: string
  level: LevelCode
}): Promise<{ ok: true; data: AnalysisResult } | { ok: false; error: string }> {
  const { summary, unknownWords, level } = input

  if (!summary.trim()) {
    return { ok: false, error: "Please write a summary first." }
  }

  try {
    const { experimental_output } = await generateText({
      model: MODEL,
      experimental_output: Output.object({ schema: feedbackSchema }),
      system: `You are an expert English teacher and language coach for the "Fluency Path" platform.
${levelInstructions(level)}
The student watched the video "${VIDEO.title}". Context: ${MINI_SUMMARY}
Always be constructive and motivating. Score honestly from 0 to 10.
If there are no grammar errors, return an empty grammar array and praise the student in the suggestions.`,
      prompt: `Here is the student's summary of the video:
"""
${summary}
"""

Words the student said they did not understand: ${unknownWords || "none"}

Analyze the summary and produce structured feedback following the schema.`,
    })

    return { ok: true, data: experimental_output }
  } catch (err) {
    console.log("[v0] analyzeSummary error:", (err as Error).message)
    return {
      ok: false,
      error: "We couldn't analyze your answer right now. Please try again.",
    }
  }
}

const practiceSchema = z.object({
  vocabularyPractice: z.object({
    instructions: z
      .string()
      .describe("Short instructions for the writing exercise."),
    words: z
      .array(z.string())
      .describe("3 target words the student should use in sentences."),
  }),
  reflection: z.object({
    question: z
      .string()
      .describe("One open discussion question about the video's topic."),
  }),
})

export type PracticeResult = z.infer<typeof practiceSchema>

export async function generatePractice(input: {
  level: LevelCode
  words: string[]
}): Promise<{ ok: true; data: PracticeResult } | { ok: false; error: string }> {
  const { level, words } = input

  try {
    const { experimental_output } = await generateText({
      model: MODEL,
      experimental_output: Output.object({ schema: practiceSchema }),
      system: `You are an English teacher creating practice exercises for the "Fluency Path" platform.
${levelInstructions(level)}
The video topic is tiny habits and how small changes lead to big results.`,
      prompt: `Create a short practice challenge. Pick 3 useful words (you may use these if relevant: ${
        words.join(", ") || "habit, impact, consistent, routine, result"
      }) for a sentence-writing exercise, and write one reflection/discussion question about the video topic.`,
    })

    return { ok: true, data: experimental_output }
  } catch (err) {
    console.log("[v0] generatePractice error:", (err as Error).message)
    return {
      ok: false,
      error: "We couldn't generate exercises right now. Please try again.",
    }
  }
}
