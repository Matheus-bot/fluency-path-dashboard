"use client"

import { useState, useTransition } from "react"
import { Loader2, RefreshCw, Wand2 } from "lucide-react"
import { generatePractice, type PracticeResult } from "@/app/actions/ai"
import type { LevelCode } from "@/lib/fluency-data"
import { Card, Section } from "./section"

interface PracticeChallengeProps {
  level: LevelCode
  unknownWords: string[]
  onComplete: () => void
}

export function PracticeChallenge({
  level,
  unknownWords,
  onComplete,
}: PracticeChallengeProps) {
  const [practice, setPractice] = useState<PracticeResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>(["", "", ""])
  const [reflection, setReflection] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  function loadPractice() {
    setError(null)
    setSubmitted(false)
    startTransition(async () => {
      const result = await generatePractice({ level, words: unknownWords })
      if (result.ok) {
        setPractice(result.data)
        setSentences(["", "", ""])
        setReflection("")
      } else {
        setError(result.error)
      }
    })
  }

  function handleSubmit() {
    setSubmitted(true)
    onComplete()
  }

  return (
    <Section step={5} title="Practice Challenge">
      <Card>
        {!practice && !isPending && (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
            <Wand2 className="size-6 text-primary" aria-hidden="true" />
            <p className="max-w-md text-sm text-muted-foreground">
              Generate a personalized set of exercises adapted to your level to
              practice the new vocabulary and reflect on the video.
            </p>
            <button
              type="button"
              onClick={loadPractice}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Wand2 className="size-4" aria-hidden="true" />
              Generate Exercises
            </button>
          </div>
        )}

        {isPending && (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <Loader2 className="size-6 animate-spin text-primary" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              Creating your exercises...
            </p>
          </div>
        )}

        {error && !isPending && (
          <p className="rounded-lg bg-destructive/10 p-4 text-center text-sm text-destructive">
            {error}
          </p>
        )}

        {practice && !isPending && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Vocabulary Practice
              </h3>
              <p className="mb-3 mt-1 text-xs text-muted-foreground">
                {practice.vocabularyPractice.instructions}
              </p>
              <div className="space-y-3">
                {practice.vocabularyPractice.words.map((word, i) => (
                  <div key={`${word}-${i}`}>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      {i + 1}. {word}
                    </label>
                    <input
                      value={sentences[i] ?? ""}
                      onChange={(e) => {
                        const next = [...sentences]
                        next[i] = e.target.value
                        setSentences(next)
                      }}
                      placeholder={`Write a sentence with "${word}"...`}
                      className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Reflection Practice
              </h3>
              <p className="mb-3 mt-1 text-sm leading-relaxed text-foreground">
                {practice.reflection.question}
              </p>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your reflection here..."
                rows={4}
                className="w-full resize-none rounded-lg border border-input bg-card p-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Mark as Done
              </button>
              <button
                type="button"
                onClick={loadPractice}
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                New Exercises
              </button>
              {submitted && (
                <span className="text-sm font-medium text-success">
                  Nice work! Practice completed.
                </span>
              )}
            </div>
          </div>
        )}
      </Card>
    </Section>
  )
}
