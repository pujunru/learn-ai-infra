"use client";

import Link from "next/link";
import { Task, TaskStatus } from "@/lib/types";
import { useStudy } from "@/app/providers";

const STATUS_OPTIONS: TaskStatus[] = [
  "not_started",
  "in_progress",
  "blocked",
  "completed",
];

const LABELS: Record<TaskStatus, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  blocked: "Blocked",
  completed: "Completed",
};

export function TaskList({ tasks }: { tasks: Task[] }) {
  const { getTaskStatus, updateTaskStatus } = useStudy();

  return (
    <div className="task-stack">
      {tasks.map((task) => {
        const status = getTaskStatus(task.id);
        return (
          <article key={task.id} className="task-card">
            <header>
              <span className={`type-chip ${task.type}`}>{task.type}</span>
              <strong>{task.title}</strong>
            </header>
            <div className="task-controls">
              {task.resourceUrl ? (
                <Link href={task.resourceUrl} target="_blank" rel="noreferrer">
                  Resource
                </Link>
              ) : (
                <span className="muted">No link provided</span>
              )}
              <select
                aria-label={`Update status for ${task.title}`}
                value={status}
                onChange={(event) => updateTaskStatus(task.id, event.target.value as TaskStatus)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {LABELS[option]}
                  </option>
                ))}
              </select>
            </div>
          </article>
        );
      })}
    </div>
  );
}
