"use client"

import { useState } from "react"
import { Loader2, Sparkles } from "lucide-react"
import { FEEDBACK_TABS } from "@/lib/fluency-data"
import type { AnalysisResult } from "@/app/actions/ai"
import { Card, Section } from "./section"

interface AiFeedbackProps {
  analysis: AnalysisResult | null
  analyzing: boolean
  error: string | null
}

function scoreColor(score: number) {
  if (score >= 8) return "text-success"
  if (score >= 6) return "text-primary"
  return "text-destructive"
}

function ScoreRing({ score }: { score: number }) {
  return (
    <div
      className={`flex size-16 shrink-0 flex-col items-center justify-center rounded-full border-2 ${
        score >= 8
          ? "border-success/30 bg-success/10"
          : score >= 6
            ? "border-primary/30 bg-primary/10"
            : "border-destructive/30 bg-destructive/10"
      }`}
    >
      <span className={`text-lg font-bold leading-none ${scoreColor(score)}`}>
        {score.toFixed(1)}
      </span>
      <span className="text-[10px] text-muted-foreground">/10</span>
    </div>
  )
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-semibold ${scoreColor(value)}`}>
          {value.toFixed(1)}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full ${
            value >= 8
              ? "bg-success"
              : value >= 6
                ? "bg-primary"
                : "bg-destructive"
          }`}
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
    </div>
  )
}

function OverallFeedback({ data }: { data: AnalysisResult }) {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <ScoreRing score={data.scores.overall} />
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            {data.overall.headline}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {data.overall.message}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-secondary/50 p-4">
        <h5 className="mb-3 text-xs font-semibold text-foreground">
          Fluency Score
        </h5>
        <div className="grid gap-3 sm:grid-cols-2">
          <ScoreBar label="Grammar" value={data.scores.grammar} />
          <ScoreBar label="Vocabulary" value={data.scores.vocabulary} />
          <ScoreBar label="Coherence" value={data.scores.coherence} />
          <ScoreBar label="Fluency" value={data.scores.fluency} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-secondary/50 p-4">
        <h5 className="mb-2 text-xs font-semibold text-foreground">
          Better Version (Example)
        </h5>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {data.overall.betterVersion}
        </p>
      </div>
    </div>
  )
}

function GrammarFeedback({ data }: { data: AnalysisResult }) {
  if (data.grammar.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-secondary/50 p-3 text-sm text-success">
        No grammar errors found. Excellent work!
      </p>
    )
  }
  return (
    <ul className="space-y-3 text-sm text-muted-foreground">
      {data.grammar.map((item, i) => (
        <li key={i} className="rounded-lg border border-border bg-secondary/50 p-3">
          <span className="font-semibold text-destructive line-through">
            {item.error}
          </span>{" "}
          → <span className="font-semibold text-success">{item.correction}</span>
          <p className="mt-1 text-xs leading-relaxed">{item.explanation}</p>
        </li>
      ))}
    </ul>
  )
}

function VocabularyFeedback({ data }: { data: AnalysisResult }) {
  return (
    <ul className="space-y-3 text-sm text-muted-foreground">
      {data.vocabulary.map((item, i) => (
        <li key={i} className="rounded-lg border border-border bg-secondary/50 p-3">
          <span className="font-semibold text-foreground">{item.word}</span> —{" "}
          {item.meaning}
          {item.synonyms.length > 0 && (
            <p className="mt-1 text-xs">
              <span className="font-medium text-foreground">Synonyms:</span>{" "}
              {item.synonyms.join(", ")}
            </p>
          )}
          <p className="mt-1 text-xs italic">Example: {item.example}</p>
        </li>
      ))}
    </ul>
  )
}

function SuggestionsFeedback({ data }: { data: AnalysisResult }) {
  return (
    <ul className="space-y-3 text-sm text-muted-foreground">
      {data.suggestions.map((item, i) => (
        <li key={i} className="rounded-lg border border-border bg-secondary/50 p-3">
          {item}
        </li>
      ))}
    </ul>
  )
}

export function AiFeedback({ analysis, analyzing, error }: AiFeedbackProps) {
  const [active, setActive] = useState("overall")

  return (
    <Section step={4} title="AI Feedback">
      <Card>
        {analyzing && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <Loader2 className="size-6 animate-spin text-primary" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              Your AI coach is reading your summary...
            </p>
          </div>
        )}

        {!analyzing && error && (
          <p className="rounded-lg bg-destructive/10 p-4 text-center text-sm text-destructive">
            {error}
          </p>
        )}

        {!analyzing && !error && !analysis && (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <Sparkles className="size-6 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              Write your summary and click{" "}
              <span className="font-medium text-foreground">
                Analyze My Answer
              </span>{" "}
              to get personalized AI feedback.
            </p>
          </div>
        )}

        {!analyzing && !error && analysis && (
          <>
            <div
              role="tablist"
              aria-label="AI feedback categories"
              className="mb-5 flex flex-wrap gap-1 rounded-lg border border-border bg-secondary/60 p-1"
            >
              {FEEDBACK_TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active === tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    active === tab.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {active === "overall" && <OverallFeedback data={analysis} />}
            {active === "grammar" && <GrammarFeedback data={analysis} />}
            {active === "vocabulary" && <VocabularyFeedback data={analysis} />}
            {active === "suggestions" && <SuggestionsFeedback data={analysis} />}
          </>
        )}
      </Card>
    </Section>
  )
}
