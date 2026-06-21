"use client"

import { Volume2 } from "lucide-react"
import {
  KEY_VOCABULARY,
  MINI_SUMMARY,
  THINK_QUESTION,
} from "@/lib/fluency-data"
import { Card, Section } from "./section"

export function BeforeWatching() {
  function speak(word: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = "en-US"
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <Section step={1} title="Before Watching">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Mini Summary
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {MINI_SUMMARY}
          </p>
          <div className="mt-4 rounded-lg border border-primary/15 bg-accent p-4">
            <p className="mb-1 text-xs font-semibold text-primary">
              Question to think about
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {THINK_QUESTION}
            </p>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-foreground">Key Vocabulary</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Pay attention to these words:
          </p>
          <ol className="space-y-3">
            {KEY_VOCABULARY.map((item, index) => (
              <li key={item.word} className="flex items-start gap-2 text-sm">
                <span className="w-4 shrink-0 text-muted-foreground">
                  {index + 1}.
                </span>
                <span className="font-medium text-foreground">{item.word}</span>
                <button
                  type="button"
                  onClick={() => speak(item.word)}
                  className="shrink-0 rounded-md p-0.5 text-primary transition-colors hover:bg-accent"
                  aria-label={`Listen to the pronunciation of ${item.word}`}
                >
                  <Volume2 className="size-3.5" aria-hidden="true" />
                </button>
                <span className="ml-auto max-w-[55%] text-right text-muted-foreground">
                  {item.definition}
                </span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </Section>
  )
}
