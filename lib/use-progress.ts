"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "fluency-path-progress"

export interface ProgressState {
  /** ISO date strings (YYYY-MM-DD) the student marked as studied. */
  studiedDays: string[]
  videosWatched: number
  summariesWritten: number
  wordsLearned: number
  minutesStudied: number
}

const DEFAULT_STATE: ProgressState = {
  studiedDays: [],
  videosWatched: 0,
  summariesWritten: 0,
  wordsLearned: 0,
  minutesStudied: 0,
}

export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function computeStreaks(days: string[]): { current: number; best: number } {
  if (days.length === 0) return { current: 0, best: 0 }
  const set = new Set(days)
  const sorted = [...days].sort()

  // Best streak: longest run of consecutive calendar days.
  let best = 1
  let run = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const cur = new Date(sorted[i])
    const diff = Math.round((cur.getTime() - prev.getTime()) / 86400000)
    if (diff === 1) {
      run += 1
      best = Math.max(best, run)
    } else if (diff > 1) {
      run = 1
    }
  }

  // Current streak: consecutive days ending today (or yesterday).
  let current = 0
  const cursor = new Date()
  if (!set.has(toISODate(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
    if (!set.has(toISODate(cursor))) return { current: 0, best }
  }
  while (set.has(toISODate(cursor))) {
    current += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return { current, best }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) })
    } catch {
      /* ignore corrupted storage */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore quota errors */
    }
  }, [state, loaded])

  const toggleDay = useCallback((iso: string) => {
    setState((prev) => {
      const has = prev.studiedDays.includes(iso)
      return {
        ...prev,
        studiedDays: has
          ? prev.studiedDays.filter((d) => d !== iso)
          : [...prev.studiedDays, iso],
      }
    })
  }, [])

  const markStudiedToday = useCallback(() => {
    const iso = toISODate(new Date())
    setState((prev) =>
      prev.studiedDays.includes(iso)
        ? prev
        : { ...prev, studiedDays: [...prev.studiedDays, iso] },
    )
  }, [])

  const recordActivity = useCallback(
    (delta: Partial<Omit<ProgressState, "studiedDays">>) => {
      const iso = toISODate(new Date())
      setState((prev) => ({
        ...prev,
        videosWatched: prev.videosWatched + (delta.videosWatched ?? 0),
        summariesWritten: prev.summariesWritten + (delta.summariesWritten ?? 0),
        wordsLearned: prev.wordsLearned + (delta.wordsLearned ?? 0),
        minutesStudied: prev.minutesStudied + (delta.minutesStudied ?? 0),
        studiedDays: prev.studiedDays.includes(iso)
          ? prev.studiedDays
          : [...prev.studiedDays, iso],
      }))
    },
    [],
  )

  const resetProgress = useCallback(() => setState(DEFAULT_STATE), [])

  const streaks = computeStreaks(state.studiedDays)

  return {
    state,
    loaded,
    streaks,
    toggleDay,
    markStudiedToday,
    recordActivity,
    resetProgress,
  }
}
