"use client"

import { ChevronDown, Flame, GraduationCap } from "lucide-react"
import { LEVELS, type LevelCode } from "@/lib/fluency-data"

interface HeaderProps {
  level: LevelCode
  onLevelChange: (level: LevelCode) => void
  streak: number
}

export function Header({ level, onLevelChange, streak }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight text-foreground">
              Fluency Path
            </h1>
            <p className="text-xs text-muted-foreground">From C1 to Fluent</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium text-muted-foreground">Your Level:</span>
            <span className="relative">
              <select
                value={level}
                onChange={(e) => onLevelChange(e.target.value as LevelCode)}
                className="appearance-none rounded-lg border border-input bg-card py-2 pl-3 pr-9 text-sm font-medium text-foreground shadow-sm outline-none transition-colors hover:border-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
                aria-label="Select your level"
              >
                {LEVELS.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </span>
          </label>

          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Flame className="size-4 text-orange-500" aria-hidden="true" />
            <span>{streak} day streak</span>
          </div>

          <div
            className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            aria-label="User avatar"
          >
            M
          </div>
        </div>
      </div>
    </header>
  )
}
