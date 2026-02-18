export type TaskType = "concept" | "reading" | "code";

export type TaskStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "blocked";

export type Task = {
  id: string;
  moduleId: string;
  type: TaskType;
  title: string;
  resourceUrl?: string;
};

export type Module = {
  id: string;
  weekId: string;
  title: string;
  goal: string;
  dayStart: number;
  dayEnd: number;
  tasks: Task[];
};

export type Week = {
  id: string;
  title: string;
  goal: string;
  order: number;
  modules: Module[];
};

export type TaskProgress = {
  taskId: string;
  status: TaskStatus;
  completedAt?: string;
  updatedAt: string;
};

export type DailyCheckin = {
  id: string;
  date: string;
  moduleId?: string;
  note: string;
  updatedAt: string;
};

export type Settings = {
  startDate: string;
  timezone: string;
  reminderEnabled: boolean;
  reminderTime: string;
};
