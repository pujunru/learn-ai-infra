"use client";

import { useStudy } from "@/app/providers";

export function WeekProgress({ weekId }: { weekId: string }) {
  const { weeklyPercent } = useStudy();
  return <p className="mono">Completion: {weeklyPercent[weekId] || 0}%</p>;
}
