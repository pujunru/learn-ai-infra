"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ALL_MODULES, ALL_TASKS, ROADMAP } from "@/lib/roadmap";
import { DailyCheckin, Settings, TaskProgress, TaskStatus } from "@/lib/types";

type StudyState = {
  progressByTaskId: Record<string, TaskProgress>;
  checkinsByDate: Record<string, DailyCheckin>;
  settings: Settings;
};

type StudyContextValue = {
  state: StudyState;
  totalTasks: number;
  completedTasks: number;
  completionPercent: number;
  currentDay: number;
  expectedCompletionPercent: number;
  onTrack: boolean;
  streakDays: number;
  missedDays: number;
  weeklyPercent: Record<string, number>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  saveCheckin: (date: string, note: string, moduleId?: string) => void;
  updateSettings: (next: Partial<Settings>) => void;
  getTaskStatus: (taskId: string) => TaskStatus;
  nextTaskId?: string;
};

const STORAGE_KEY = "study-tracker-v1";

const StudyContext = createContext<StudyContextValue | undefined>(undefined);

const todayIso = () => {
  const today = new Date();
  const tzOffset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - tzOffset).toISOString().slice(0, 10);
};

const defaultSettings = (): Settings => ({
  startDate: todayIso(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  reminderEnabled: false,
  reminderTime: "20:00",
});

const emptyState = (): StudyState => ({
  progressByTaskId: {},
  checkinsByDate: {},
  settings: defaultSettings(),
});

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const daysBetween = (startDate: string, endDate: string) => {
  const a = new Date(`${startDate}T00:00:00`);
  const b = new Date(`${endDate}T00:00:00`);
  return Math.floor((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000));
};

export function StudyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudyState>(() => emptyState());
  const [hydrated, setHydrated] = useState(false);
  const progressByTaskId = state.progressByTaskId;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StudyState;
        setState({
          progressByTaskId: parsed.progressByTaskId || {},
          checkinsByDate: parsed.checkinsByDate || {},
          settings: parsed.settings || defaultSettings(),
        });
      }
    } catch {
      setState(emptyState());
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const getTaskStatus = (taskId: string): TaskStatus =>
    state.progressByTaskId[taskId]?.status || "not_started";

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setState((prev) => {
      const now = new Date().toISOString();
      const existing = prev.progressByTaskId[taskId];
      const completedAt = status === "completed" ? now : undefined;
      return {
        ...prev,
        progressByTaskId: {
          ...prev.progressByTaskId,
          [taskId]: {
            taskId,
            status,
            completedAt,
            updatedAt: now,
            ...(existing?.completedAt && status !== "completed"
              ? { completedAt: existing.completedAt }
              : {}),
          },
        },
      };
    });
  };

  const saveCheckin = (date: string, note: string, moduleId?: string) => {
    setState((prev) => ({
      ...prev,
      checkinsByDate: {
        ...prev.checkinsByDate,
        [date]: {
          id: `checkin-${date}`,
          date,
          note,
          moduleId,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
  };

  const updateSettings = (next: Partial<Settings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...next },
    }));
  };

  const completedTasks = useMemo(
    () =>
      ALL_TASKS.filter((task) => progressByTaskId[task.id]?.status === "completed")
        .length,
    [progressByTaskId],
  );

  const totalTasks = ALL_TASKS.length;
  const completionPercent = Math.round((completedTasks / totalTasks) * 100);

  const elapsedDays = daysBetween(state.settings.startDate, todayIso()) + 1;
  const currentDay = clamp(elapsedDays, 1, 30);
  const expectedCompletionPercent = Math.round((clamp(currentDay, 1, 30) / 30) * 100);
  const onTrack = completionPercent >= expectedCompletionPercent;

  const weeklyPercent = useMemo(() => {
    const entries = ROADMAP.map((week) => {
      const weekTasks = week.modules.flatMap((module) => module.tasks);
      const weekDone = weekTasks.filter(
        (task) => progressByTaskId[task.id]?.status === "completed",
      ).length;
      const pct = Math.round((weekDone / weekTasks.length) * 100);
      return [week.id, pct] as const;
    });
    return Object.fromEntries(entries);
  }, [progressByTaskId]);

  const activityDates = useMemo(() => {
    const completedDateSet = new Set<string>();
    for (const progress of Object.values(progressByTaskId)) {
      if (progress.completedAt) {
        completedDateSet.add(progress.completedAt.slice(0, 10));
      }
    }
    const checkinDateSet = new Set(Object.keys(state.checkinsByDate));
    return {
      completedDateSet,
      checkinDateSet,
    };
  }, [progressByTaskId, state.checkinsByDate]);

  const streakDays = useMemo(() => {
    let streak = 0;
    const now = new Date(`${todayIso()}T00:00:00`);
    while (streak < 365) {
      const d = new Date(now);
      d.setDate(now.getDate() - streak);
      const iso = d.toISOString().slice(0, 10);
      const active =
        activityDates.checkinDateSet.has(iso) ||
        activityDates.completedDateSet.has(iso);
      if (!active) {
        break;
      }
      streak += 1;
    }
    return streak;
  }, [activityDates]);

  const missedDays = useMemo(() => {
    const totalSpan = clamp(elapsedDays, 1, 30);
    let missed = 0;
    const start = new Date(`${state.settings.startDate}T00:00:00`);
    for (let i = 0; i < totalSpan; i += 1) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const active =
        activityDates.checkinDateSet.has(iso) ||
        activityDates.completedDateSet.has(iso);
      if (!active) {
        missed += 1;
      }
    }
    return missed;
  }, [elapsedDays, state.settings.startDate, activityDates]);

  const nextTaskId = useMemo(
    () =>
      ALL_TASKS.find((task) => progressByTaskId[task.id]?.status !== "completed")
        ?.id,
    [progressByTaskId],
  );

  const value: StudyContextValue = {
    state,
    totalTasks,
    completedTasks,
    completionPercent,
    currentDay,
    expectedCompletionPercent,
    onTrack,
    streakDays,
    missedDays,
    weeklyPercent,
    updateTaskStatus,
    saveCheckin,
    updateSettings,
    getTaskStatus,
    nextTaskId,
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) {
    throw new Error("useStudy must be used inside StudyProvider");
  }
  return ctx;
}

export const moduleById = Object.fromEntries(
  ALL_MODULES.map((module) => [module.id, module]),
);

export const taskById = Object.fromEntries(ALL_TASKS.map((task) => [task.id, task]));
