"use client"

import { useState, useTransition } from "react"
import { Info } from "lucide-react"
import { LEVELS, type LevelCode } from "@/lib/fluency-data"
import { analyzeSummary, type AnalysisResult } from "@/app/actions/ai"
import { useProgress } from "@/lib/use-progress"
import { Header } from "./header"
import { BeforeWatching } from "./before-watching"
import { WatchVideo } from "./watch-video"
import { AfterWatching } from "./after-watching"
import { AiFeedback } from "./ai-feedback"
import { PracticeChallenge } from "./practice-challenge"
import { ProgressCard } from "./progress-card"
import {
  LevelInfoCard,
  StatisticsCard,
  StudyStreakCard,
} from "./sidebar-cards"

export function Dashboard() {
  const [level, setLevel] = useState<LevelCode>("C1")
  const [adapting, setAdapting] = useState(false)

  const [summary, setSummary] = useState("")
  const [words, setWords] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [isAnalyzing, startAnalysis] = useTransition()

  const progress = useProgress()

  const currentLevel = LEVELS.find((l) => l.code === level) ?? LEVELS[4]

  const unknownWords = words
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean)

  function handleLevelChange(next: LevelCode) {
    setLevel(next)
    setAdapting(true)
    window.setTimeout(() => setAdapting(false), 2200)
  }

  function handleAnalyze() {
    setAnalysisError(null)
    setAnalysis(null)
    setTimeout(() => {
      document
        .getElementById("ai-feedback")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)

    startAnalysis(async () => {
      const result = await analyzeSummary({
        summary,
        unknownWords: words,
        level,
      })
      if (result.ok) {
        setAnalysis(result.data)
        progress.recordActivity({
          summariesWritten: 1,
          wordsLearned: unknownWords.length,
          minutesStudied: 15,
        })
      } else {
        setAnalysisError(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        level={level}
        onLevelChange={handleLevelChange}
        streak={progress.streaks.current}
      />

      <div className="border-b border-border bg-accent">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2.5 sm:px-6">
          <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm text-foreground">
            {adapting
              ? `Adapting all content to level ${currentLevel.name}...`
              : "All content is adapted to your level. Change your level anytime."}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <BeforeWatching
              level={level}
              onWatch={() => progress.recordActivity({ videosWatched: 1 })}
            />
            <WatchVideo
              onPlay={() =>
                progress.recordActivity({ videosWatched: 1, minutesStudied: 10 })
              }
            />
            <AfterWatching
              summary={summary}
              words={words}
              onSummaryChange={setSummary}
              onWordsChange={setWords}
              onAnalyze={handleAnalyze}
              analyzing={isAnalyzing}
            />
            <div id="ai-feedback" className="scroll-mt-6">
              <AiFeedback
                analysis={analysis}
                analyzing={isAnalyzing}
                error={analysisError}
              />
            </div>
            <PracticeChallenge
              level={level}
              unknownWords={unknownWords}
              onComplete={() =>
                progress.recordActivity({ minutesStudied: 10, wordsLearned: 3 })
              }
            />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <ProgressCard
              studiedDays={progress.state.studiedDays}
              onToggleDay={progress.toggleDay}
            />
            <StudyStreakCard
              current={progress.streaks.current}
              best={progress.streaks.best}
            />
            <StatisticsCard
              stats={progress.state}
              onReset={progress.resetProgress}
            />
            <LevelInfoCard level={currentLevel} />
          </aside>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <p className="text-center text-xs text-muted-foreground">
          © 2025 Fluency Path. Keep learning, keep growing.
        </p>
      </footer>
    </div>
  )
}
