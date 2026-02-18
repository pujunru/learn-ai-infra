"use client";

import { useState } from "react";
import { ALL_MODULES } from "@/lib/roadmap";
import { useStudy } from "@/app/providers";

const todayIso = () => {
  const today = new Date();
  const tzOffset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - tzOffset).toISOString().slice(0, 10);
};

export function CheckinPanel() {
  const { state, saveCheckin } = useStudy();
  const date = todayIso();
  const initial = state.checkinsByDate[date];
  const [note, setNote] = useState(initial?.note || "");
  const [moduleId, setModuleId] = useState(initial?.moduleId || "");
  const [saved, setSaved] = useState(false);

  const onSave = () => {
    saveCheckin(date, note.trim(), moduleId || undefined);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <section className="panel">
      <h3>Daily Check-in ({date})</h3>
      <p className="muted">Capture what you learned or where you got blocked today.</p>
      <div className="field-row">
        <label htmlFor="module-select">Module</label>
        <select
          id="module-select"
          value={moduleId}
          onChange={(event) => setModuleId(event.target.value)}
        >
          <option value="">No module</option>
          {ALL_MODULES.map((module) => (
            <option key={module.id} value={module.id}>
              Day {module.dayStart}-{module.dayEnd}: {module.title}
            </option>
          ))}
        </select>
      </div>
      <div className="field-row">
        <label htmlFor="checkin-note">Note</label>
        <textarea
          id="checkin-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={4}
          placeholder="Today I learned..., I got stuck at..., next I will..."
        />
      </div>
      <div className="row-end">
        <button type="button" onClick={onSave} disabled={note.trim().length === 0}>
          Save check-in
        </button>
        {saved ? <span className="ok">Saved</span> : null}
      </div>
    </section>
  );
}
