"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { toISODate } from "@/lib/use-progress"

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

interface ProgressCardProps {
  studiedDays: string[]
  onToggleDay: (iso: string) => void
}

function buildGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: { day: number; current: boolean }[] = []
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true })
  }
  let nextDay = 1
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, current: false })
  }
  return cells
}

export function ProgressCard({ studiedDays, onToggleDay }: ProgressCardProps) {
  const now = new Date()
  const [view, setView] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  })

  const studiedSet = new Set(studiedDays)
  const todayIso = toISODate(now)
  const cells = buildGrid(view.year, view.month)
  const monthLabel = `${MONTHS[view.month]} ${view.year}`

  function shiftMonth(delta: number) {
    setView((prev) => {
      const d = new Date(prev.year, prev.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-foreground">Your Progress</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        Click a day to mark it as studied.
      </p>

      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <span className="text-sm font-medium text-foreground">{monthLabel}</span>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Next month"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="text-[11px] font-medium text-muted-foreground">
            {w}
          </span>
        ))}

        {cells.map((cell, i) => {
          if (!cell.current) {
            return (
              <div key={i} className="flex justify-center">
                <span className="flex size-7 items-center justify-center rounded-full text-xs text-muted-foreground/40">
                  {cell.day}
                </span>
              </div>
            )
          }

          const iso = toISODate(new Date(view.year, view.month, cell.day))
          const isToday = iso === todayIso
          const isStudied = studiedSet.has(iso)

          let style = "text-foreground hover:bg-accent"
          if (isStudied) style = "bg-success text-success-foreground font-semibold"
          if (isToday && !isStudied)
            style = "bg-primary text-primary-foreground font-semibold"
          if (isToday && isStudied)
            style = "bg-primary text-primary-foreground font-semibold ring-2 ring-success ring-offset-1 ring-offset-card"

          return (
            <div key={i} className="flex justify-center">
              <button
                type="button"
                onClick={() => onToggleDay(iso)}
                aria-label={`Toggle studied on ${iso}`}
                aria-pressed={isStudied}
                className={`flex size-7 items-center justify-center rounded-full text-xs transition-colors ${style}`}
              >
                {cell.day}
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-success" />
          Studied
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-primary" />
          Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full border border-border bg-card" />
          Not studied
        </span>
      </div>
    </div>
  )
}
