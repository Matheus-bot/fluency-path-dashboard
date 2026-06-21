"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { CALENDAR } from "@/lib/fluency-data"

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

function buildGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  // Convert Sun(0)..Sat(6) to Mon(0)..Sun(6)
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

export function ProgressCard() {
  const cells = buildGrid(CALENDAR.year, CALENDAR.month)
  const monthLabel = `${MONTHS[CALENDAR.month]} ${CALENDAR.year}`

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Your Progress</h3>

      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <span className="text-sm font-medium text-foreground">{monthLabel}</span>
        <button
          type="button"
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
          const isToday = cell.current && cell.day === CALENDAR.today
          const isStudied =
            cell.current && CALENDAR.studiedDays.includes(cell.day)

          let style = "text-muted-foreground/40"
          if (cell.current) style = "text-foreground"
          if (isStudied)
            style = "bg-success/15 text-success font-semibold"
          if (isToday) style = "bg-primary text-primary-foreground font-semibold"

          return (
            <div key={i} className="flex justify-center">
              <span
                className={`flex size-7 items-center justify-center rounded-full text-xs ${style}`}
              >
                {cell.day}
              </span>
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
