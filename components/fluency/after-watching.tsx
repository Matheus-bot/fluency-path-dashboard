"use client"

import { Loader2, Sparkles } from "lucide-react"
import { Card, Section } from "./section"

interface AfterWatchingProps {
  summary: string
  words: string
  onSummaryChange: (value: string) => void
  onWordsChange: (value: string) => void
  onAnalyze: () => void
  analyzing: boolean
}

const SUMMARY_MAX = 2000
const WORDS_MAX = 20

export function AfterWatching({
  summary,
  words,
  onSummaryChange,
  onWordsChange,
  onAnalyze,
  analyzing,
}: AfterWatchingProps) {
  const wordCount = words
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean).length

  return (
    <Section step={3} title="After Watching">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-sm font-semibold text-foreground">
            Write a summary
          </h3>
          <p className="mb-3 text-xs text-muted-foreground">
            Write a summary in English about the video.
          </p>
          <textarea
            value={summary}
            onChange={(e) => onSummaryChange(e.target.value.slice(0, SUMMARY_MAX))}
            placeholder="Type your summary here..."
            rows={5}
            className="w-full resize-none rounded-lg border border-input bg-card p-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {summary.length} / {SUMMARY_MAX}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Tip: Write with your own words. Don&apos;t worry about making
            mistakes!
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-foreground">
            Words you didn&apos;t understand
          </h3>
          <p className="mb-3 text-xs text-muted-foreground">
            List the words or expressions you didn&apos;t understand.
          </p>
          <textarea
            value={words}
            onChange={(e) => onWordsChange(e.target.value)}
            placeholder="Type the words here..."
            rows={5}
            className="w-full resize-none rounded-lg border border-input bg-card p-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {wordCount} / {WORDS_MAX}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Tip: Separate the words with commas.
          </p>
        </Card>
      </div>

      <button
        type="button"
        onClick={onAnalyze}
        disabled={analyzing || !summary.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {analyzing ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="size-4" aria-hidden="true" />
            Analyze My Answer
          </>
        )}
      </button>
    </Section>
  )
}
