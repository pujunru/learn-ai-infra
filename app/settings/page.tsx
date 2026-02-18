"use client";

import { ChangeEvent } from "react";
import { useStudy } from "@/app/providers";

export default function SettingsPage() {
  const { state, updateSettings } = useStudy();

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    updateSettings({ [name]: type === "checkbox" ? checked : value });
  };

  return (
    <section className="page-stack">
      <header className="page-head">
        <h1>Settings</h1>
        <p>Control schedule baseline and reminder preference.</p>
      </header>
      <section className="panel form-panel">
        <div className="field-row">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={state.settings.startDate}
            onChange={onInput}
          />
        </div>

        <div className="field-row">
          <label htmlFor="timezone">Timezone</label>
          <input
            id="timezone"
            name="timezone"
            value={state.settings.timezone}
            onChange={onInput}
            placeholder="America/Los_Angeles"
          />
        </div>

        <div className="field-row">
          <label htmlFor="reminderEnabled">Reminder Enabled</label>
          <input
            id="reminderEnabled"
            name="reminderEnabled"
            type="checkbox"
            checked={state.settings.reminderEnabled}
            onChange={onInput}
          />
        </div>

        <div className="field-row">
          <label htmlFor="reminderTime">Reminder Time</label>
          <input
            id="reminderTime"
            name="reminderTime"
            type="time"
            value={state.settings.reminderTime}
            onChange={onInput}
            disabled={!state.settings.reminderEnabled}
          />
        </div>
      </section>
    </section>
  );
}
