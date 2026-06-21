"use client"

import { useState } from "react"
import { FEEDBACK_TABS } from "@/lib/fluency-data"
import { Card, Section } from "./section"

function OverallFeedback() {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-full border-2 border-success/30 bg-success/10">
          <span className="text-lg font-bold leading-none text-success">8.5</span>
          <span className="text-[10px] text-muted-foreground">/10</span>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Great job!</h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            You demonstrated a good understanding of the main ideas. Your summary
            is clear and well-structured. Keep working on some grammar details and
            try to use more advanced vocabulary.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-secondary/50 p-4">
          <h5 className="mb-2 text-xs font-semibold text-foreground">
            Better Version (Example)
          </h5>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The video explains how small habits can transform our lives. By
            starting tiny and building consistency, we can achieve big results
            over time. The key is to make the habit so easy that you can&apos;t say
            no.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-secondary/50 p-4">
          <h5 className="mb-2 text-xs font-semibold text-foreground">
            Vocabulary Feedback
          </h5>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">
                consistent
              </span>{" "}
              (adjective) — always behaving or doing something in the same way.
              <br />
              <span className="text-xs italic">
                Example: She is consistent in her work.
              </span>
            </li>
            <li>
              <span className="font-semibold text-foreground">outcome</span>{" "}
              (noun) — the result of an action or event.
              <br />
              <span className="text-xs italic">
                Example: The outcome was better than expected.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-accent p-3">
        <p className="text-xs text-primary">
          You used some great expressions! Try to avoid repetitions and use more
          linking words.
        </p>
      </div>
    </div>
  )
}

function GrammarFeedback() {
  return (
    <ul className="space-y-3 text-sm text-muted-foreground">
      <li className="rounded-lg border border-border bg-secondary/50 p-3">
        <span className="font-semibold text-destructive line-through">
          can has
        </span>{" "}
        →{" "}
        <span className="font-semibold text-success">can have</span> — after a
        modal verb, use the base form.
      </li>
      <li className="rounded-lg border border-border bg-secondary/50 p-3">
        Watch your subject-verb agreement: &quot;habits <em>has</em>&quot; should be
        &quot;habits <strong>have</strong>&quot;.
      </li>
      <li className="rounded-lg border border-border bg-secondary/50 p-3">
        Good use of the present simple to describe general truths!
      </li>
    </ul>
  )
}

function VocabularyFeedback() {
  return (
    <ul className="space-y-3 text-sm text-muted-foreground">
      <li className="rounded-lg border border-border bg-secondary/50 p-3">
        Instead of &quot;big&quot;, try{" "}
        <span className="font-semibold text-foreground">significant</span> or{" "}
        <span className="font-semibold text-foreground">substantial</span>.
      </li>
      <li className="rounded-lg border border-border bg-secondary/50 p-3">
        Replace &quot;a lot of&quot; with{" "}
        <span className="font-semibold text-foreground">numerous</span> for a more
        formal tone.
      </li>
      <li className="rounded-lg border border-border bg-secondary/50 p-3">
        Great use of <span className="font-semibold text-foreground">impact</span>{" "}
        and <span className="font-semibold text-foreground">routine</span>.
      </li>
    </ul>
  )
}

function SuggestionsFeedback() {
  return (
    <ul className="space-y-3 text-sm text-muted-foreground">
      <li className="rounded-lg border border-border bg-secondary/50 p-3">
        Add a personal example to make your summary more engaging.
      </li>
      <li className="rounded-lg border border-border bg-secondary/50 p-3">
        Use linking words like <em>therefore</em>, <em>however</em>, and{" "}
        <em>as a result</em> to connect ideas.
      </li>
      <li className="rounded-lg border border-border bg-secondary/50 p-3">
        Try summarizing in 3-4 sentences to practice being concise.
      </li>
    </ul>
  )
}

export function AiFeedback() {
  const [active, setActive] = useState("overall")

  return (
    <Section step={4} title="AI Feedback">
      <Card>
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

        {active === "overall" && <OverallFeedback />}
        {active === "grammar" && <GrammarFeedback />}
        {active === "vocabulary" && <VocabularyFeedback />}
        {active === "suggestions" && <SuggestionsFeedback />}
      </Card>
    </Section>
  )
}
