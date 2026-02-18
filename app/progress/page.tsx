"use client";

import Link from "next/link";
import { ALL_TASKS } from "@/lib/roadmap";
import { useStudy, moduleById } from "@/app/providers";

export default function ProgressPage() {
  const { state, getTaskStatus, completionPercent, streakDays, missedDays } = useStudy();

  const completedRows = ALL_TASKS.map((task) => {
    const progress = state.progressByTaskId[task.id];
    if (!progress?.completedAt) {
      return null;
    }
    return {
      id: task.id,
      title: task.title,
      completedAt: progress.completedAt,
      moduleId: task.moduleId,
    };
  })
    .filter(Boolean)
    .sort((a, b) => (a!.completedAt < b!.completedAt ? 1 : -1)) as {
    id: string;
    title: string;
    completedAt: string;
    moduleId: string;
  }[];

  const checkins = Object.values(state.checkinsByDate).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );

  return (
    <section className="page-stack">
      <header className="page-head">
        <h1>Progress Timeline</h1>
        <p>
          Completion: <strong>{completionPercent}%</strong> | Streak: <strong>{streakDays}</strong> |
          Missed days: <strong>{missedDays}</strong>
        </p>
      </header>

      <section className="panel">
        <h2>Task Status</h2>
        <div className="status-grid">
          {ALL_TASKS.map((task) => (
            <article key={task.id} className="status-row">
              <p>{task.title}</p>
              <p className={`status-badge ${getTaskStatus(task.id)}`}>{getTaskStatus(task.id)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Completed Tasks</h2>
        {completedRows.length === 0 ? (
          <p className="muted">No completed tasks yet.</p>
        ) : (
          <ul className="timeline-list">
            {completedRows.map((row) => (
              <li key={row.id}>
                <strong>{row.completedAt.slice(0, 10)}</strong> - {row.title} ({" "}
                <Link href={`/module/${row.moduleId}`}>{moduleById[row.moduleId].title}</Link>)
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel">
        <h2>Daily Check-ins</h2>
        {checkins.length === 0 ? (
          <p className="muted">No check-ins yet.</p>
        ) : (
          <ul className="timeline-list">
            {checkins.map((item) => (
              <li key={item.id}>
                <strong>{item.date}</strong> - {item.note}
                {item.moduleId ? (
                  <>
                    {" "}
                    (<Link href={`/module/${item.moduleId}`}>{moduleById[item.moduleId].title}</Link>)
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
