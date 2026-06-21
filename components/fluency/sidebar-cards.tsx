"use client"

import { ArrowRight, Flame, RotateCcw, Star } from "lucide-react"
import type { LevelInfo } from "@/lib/fluency-data"
import type { ProgressState } from "@/lib/use-progress"

export function StudyStreakCard({
  current,
  best,
}: {
  current: number
  best: number
}) {
  const progress = best > 0 ? Math.min((current / best) * 100, 100) : 0

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Flame className="size-4 text-orange-500" aria-hidden="true" />
        Study Streak
      </h3>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-foreground">
          {current} {current === 1 ? "day" : "days"}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          Keep it up!
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={Math.max(best, 1)}
      >
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Best streak: {best} {best === 1 ? "day" : "days"}
      </p>
    </div>
  )
}

export function StatisticsCard({
  stats,
  onReset,
}: {
  stats: ProgressState
  onReset: () => void
}) {
  const hours = (stats.minutesStudied / 60).toFixed(1)
  const items = [
    { label: "Videos watched", value: String(stats.videosWatched) },
    { label: "Summaries written", value: String(stats.summariesWritten) },
    { label: "Words learned", value: String(stats.wordsLearned) },
    { label: "Hours studied", value: `${hours}h` },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Statistics</h3>
      <ul className="space-y-3">
        {items.map((stat) => (
          <li
            key={stat.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">{stat.label}</span>
            <span className="font-semibold text-foreground">{stat.value}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
      >
        <RotateCcw className="size-3.5" aria-hidden="true" />
        Reset progress
      </button>
    </div>
  )
}

export function LevelInfoCard({ level }: { level: LevelInfo }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Level Info</h3>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-base font-semibold text-foreground">
          {level.name}
        </span>
        <Star className="size-4 text-primary" aria-hidden="true" />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {level.description}
      </p>
      <button
        type="button"
        className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        About levels
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}
