"use client";

import { useStudy } from "@/app/providers";

export function SummaryCards() {
  const {
    completionPercent,
    currentDay,
    onTrack,
    expectedCompletionPercent,
    completedTasks,
    totalTasks,
    streakDays,
    missedDays,
  } = useStudy();

  return (
    <section className="summary-grid">
      <article className="metric-card">
        <h3>Overall Completion</h3>
        <p className="value">{completionPercent}%</p>
        <p className="muted">
          {completedTasks}/{totalTasks} tasks
        </p>
      </article>
      <article className="metric-card">
        <h3>Current Day</h3>
        <p className="value">Day {currentDay}</p>
        <p className="muted">Expected progress: {expectedCompletionPercent}%</p>
      </article>
      <article className="metric-card">
        <h3>Status</h3>
        <p className={`value ${onTrack ? "ok" : "warn"}`}>{onTrack ? "On Track" : "Behind"}</p>
        <p className="muted">Based on your start date</p>
      </article>
      <article className="metric-card">
        <h3>Momentum</h3>
        <p className="value">{streakDays}d streak</p>
        <p className="muted">Missed days: {missedDays}</p>
      </article>
    </section>
  );
}
