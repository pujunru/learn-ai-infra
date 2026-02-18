import Link from "next/link";
import { ROADMAP } from "@/lib/roadmap";
import { TaskList } from "@/app/components/task-list";
import { WeekProgress } from "@/app/components/week-progress";

type WeekDetailPageProps = {
  params: Promise<{ weekId: string }>;
};

export function generateStaticParams() {
  return ROADMAP.map((week) => ({ weekId: week.id }));
}

export default async function WeekDetailPage({ params }: WeekDetailPageProps) {
  const { weekId } = await params;
  const week = ROADMAP.find((entry) => entry.id === weekId);

  if (!week) {
    return <section className="panel">Unknown week.</section>;
  }

  return (
    <section className="page-stack">
      <header className="page-head">
        <h1>{week.title}</h1>
        <p>{week.goal}</p>
        <WeekProgress weekId={week.id} />
      </header>
      {week.modules.map((module) => (
        <section key={module.id} className="panel">
          <h2>
            <Link href={`/module/${module.id}`}>
              Days {module.dayStart}-{module.dayEnd}: {module.title}
            </Link>
          </h2>
          <p className="muted">{module.goal}</p>
          <TaskList tasks={module.tasks} />
        </section>
      ))}
    </section>
  );
}
