"use client";

import Link from "next/link";
import { SummaryCards } from "./components/summary-cards";
import { CheckinPanel } from "./components/checkin-panel";
import { useStudy, taskById, moduleById } from "./providers";
import { ROADMAP } from "@/lib/roadmap";

export default function DashboardPage() {
  const { weeklyPercent, nextTaskId } = useStudy();
  const nextTask = nextTaskId ? taskById[nextTaskId] : undefined;
  const nextModule = nextTask ? moduleById[nextTask.moduleId] : undefined;

  return (
    <section className="page-stack">
      <header className="hero">
        <p className="eyebrow">Productive Learning System</p>
        <h1>Master AI Infra in 30 days</h1>
        <p>
          Track concepts, reading, and coding tasks across the full 4-week plan.
          Keep momentum with daily check-ins and on-track feedback.
        </p>
      </header>

      <SummaryCards />

      <section className="panel">
        <h3>Next Action</h3>
        {nextTask && nextModule ? (
          <p>
            Continue <strong>{nextTask.title}</strong> in{" "}
            <Link href={`/module/${nextModule.id}`}>{nextModule.title}</Link>.
          </p>
        ) : (
          <p>You completed all tasks. Review notes in Progress.</p>
        )}
      </section>

      <section className="panel">
        <h3>Weekly Snapshot</h3>
        <div className="week-grid">
          {ROADMAP.map((week) => (
            <Link key={week.id} className="week-card" href={`/week/${week.id}`}>
              <p className="muted">{week.title}</p>
              <p>{week.goal}</p>
              <div className="meter">
                <span style={{ width: `${weeklyPercent[week.id] || 0}%` }} />
              </div>
              <p className="mono">{weeklyPercent[week.id] || 0}% completed</p>
            </Link>
          ))}
        </div>
      </section>

      <CheckinPanel />
    </section>
  );
}
