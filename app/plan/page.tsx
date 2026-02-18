"use client";

import Link from "next/link";
import { ROADMAP } from "@/lib/roadmap";
import { useStudy } from "@/app/providers";

export default function PlanPage() {
  const { getTaskStatus } = useStudy();

  return (
    <section className="page-stack">
      <header className="page-head">
        <h1>Full 4-Week Plan</h1>
        <p>Week {"->"} module {"->"} task structure sourced from Plan.md.</p>
      </header>
      {ROADMAP.map((week) => (
        <section key={week.id} className="panel">
          <h2>
            <Link href={`/week/${week.id}`}>{week.title}</Link>
          </h2>
          <p className="muted">{week.goal}</p>
          <div className="module-list">
            {week.modules.map((module) => (
              <article key={module.id} className="module-card">
                <h3>
                  <Link href={`/module/${module.id}`}>
                    Days {module.dayStart}-{module.dayEnd}: {module.title}
                  </Link>
                </h3>
                <p>{module.goal}</p>
                <ul>
                  {module.tasks.map((task) => (
                    <li key={task.id}>
                      <span className={`dot ${getTaskStatus(task.id)}`} />
                      {task.title}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
