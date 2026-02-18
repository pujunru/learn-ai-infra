import Link from "next/link";
import { ALL_MODULES } from "@/lib/roadmap";
import { TaskList } from "@/app/components/task-list";

type ModuleDetailPageProps = {
  params: Promise<{ moduleId: string }>;
};

export function generateStaticParams() {
  return ALL_MODULES.map((moduleItem) => ({ moduleId: moduleItem.id }));
}

export default async function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const { moduleId } = await params;
  const moduleItem = ALL_MODULES.find((entry) => entry.id === moduleId);

  if (!moduleItem) {
    return <section className="panel">Unknown module.</section>;
  }

  return (
    <section className="page-stack">
      <header className="page-head">
        <p className="eyebrow">
          Days {moduleItem.dayStart}-{moduleItem.dayEnd}
        </p>
        <h1>{moduleItem.title}</h1>
        <p>{moduleItem.goal}</p>
        <Link href={`/week/${moduleItem.weekId}`}>Back to week</Link>
      </header>
      <section className="panel">
        <h2>Tasks</h2>
        <TaskList tasks={moduleItem.tasks} />
      </section>
    </section>
  );
}
