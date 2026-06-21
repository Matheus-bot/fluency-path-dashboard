"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { LEVELS, type LevelCode } from "@/lib/fluency-data"
import { Header } from "./header"
import { BeforeWatching } from "./before-watching"
import { WatchVideo } from "./watch-video"
import { AfterWatching } from "./after-watching"
import { AiFeedback } from "./ai-feedback"
import { ProgressCard } from "./progress-card"
import {
  LevelInfoCard,
  StatisticsCard,
  StudyStreakCard,
} from "./sidebar-cards"

export function Dashboard() {
  const [level, setLevel] = useState<LevelCode>("C1")
  const [adapting, setAdapting] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)

  const currentLevel = LEVELS.find((l) => l.code === level) ?? LEVELS[4]

  function handleLevelChange(next: LevelCode) {
    setLevel(next)
    setAdapting(true)
    window.setTimeout(() => setAdapting(false), 2200)
  }

  function handleAnalyze() {
    setAnalyzed(true)
    window.setTimeout(() => {
      document
        .getElementById("ai-feedback")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header level={level} onLevelChange={handleLevelChange} streak={5} />

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
            <BeforeWatching />
            <WatchVideo />
            <AfterWatching onAnalyze={handleAnalyze} />
            <div id="ai-feedback" className="scroll-mt-6">
              {analyzed && (
                <p className="mb-3 rounded-lg bg-success/10 px-3 py-2 text-xs font-medium text-success">
                  Analysis complete! Here is your personalized feedback.
                </p>
              )}
              <AiFeedback />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <ProgressCard />
            <StudyStreakCard />
            <StatisticsCard />
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
