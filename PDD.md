# Product Definition Document (PDD)

## Product Name
Learn AI Infra Study Tracker

## 1) Purpose
Build a website that turns the 4-week AI infra roadmap in `Plan.md` into a structured, trackable learning system with daily tasks, progress visibility, and motivation loops.

## 2) Goals
- Organize the roadmap by week, day range, concept, reading, and coding tasks.
- Let learners mark work complete and track progress over time.
- Surface blockers and missed days early.
- Provide clear weekly outcomes and end-of-plan completion status.

## 3) Target User
- Primary: Self-directed learner studying distributed training and inference systems.
- Secondary: Mentor/peer who wants to review learner progress.

## 4) Scope
### In Scope (MVP)
- Dashboard with overall completion and current week/day.
- Curriculum view (Week 1-4) with day-range modules.
- Task cards for Concept, Reading, and Code for each module.
- Mark complete/in-progress/not started.
- Daily check-in notes.
- Progress timeline/history.

### Out of Scope (MVP)
- Multi-user teams and role permissions.
- Automated GitHub/reading verification.
- Mobile app.
- AI tutor/chat features.

## 5) Core User Stories
- As a learner, I can see the full 4-week roadmap in one place.
- As a learner, I can open each day-range module and view required concept/reading/code tasks.
- As a learner, I can mark tasks complete and see my updated progress instantly.
- As a learner, I can add a short daily note on what I learned or where I got stuck.
- As a learner, I can see if I am on track, behind, or ahead of schedule.

## 6) Information Architecture
- `/` Dashboard
- `/plan` Full roadmap
- `/week/:weekId` Week details
- `/module/:moduleId` Day-range module details
- `/progress` Timeline + streaks + completion logs
- `/settings` Preferences (start date, reminders, timezone)

## 7) UX Requirements
- Visual hierarchy: Week -> Module (day range) -> Tasks.
- One-click task state changes.
- Strong progress cues: percentage bars, status chips, current-day indicator.
- Empty states with next suggested action.
- Responsive layout for desktop and mobile browsers.

## 8) Curriculum Model (Derived from `Plan.md`)
- Week 1: Foundation (memory + data parallelism)
  - Days 1-3: Transformer workload & memory anatomy
  - Days 4-7: DDP & FSDP
- Week 2: Scaling Up (3D parallelism)
  - Days 8-10: Tensor parallelism
  - Days 11-14: Pipeline parallelism & optimizer
- Week 3: Hardware & communication
  - Days 15-21: GPU architecture & NCCL
- Week 4: Post-training & inference
  - Days 22-25: RLHF & fine-tuning
  - Days 26-30: Efficient inference

Each module stores:
- Learning goal
- Concept items
- Reading items
- Code/practice items
- Target day range

## 9) Functional Requirements
1. Plan ingestion
- System stores the predefined 4-week curriculum from `Plan.md`.

2. Task tracking
- Task states: `not_started`, `in_progress`, `completed`, `blocked`.
- Completion timestamp captured for completed tasks.

3. Progress calculations
- Overall completion % = completed tasks / total tasks.
- Weekly completion %.
- On-track status based on elapsed days since user start date.

4. Daily check-ins
- User can submit one note per day (editable).
- Notes linked to date and optional module.

5. Reminders (MVP-light)
- Browser/local reminder setting (no email backend required initially).

6. Basic analytics
- Streak count (consecutive days with at least one completed task or note).
- Missed-day count.

## 10) Non-Functional Requirements
- Performance: Dashboard load < 2s on broadband.
- Reliability: No loss of progress updates.
- Accessibility: Keyboard navigable, semantic structure, sufficient contrast.
- Security: Auth required for personal progress data.
- Privacy: Minimal personal data (email + profile preferences only).

## 11) Data Model (MVP)
- `User(id, email, name, start_date, timezone, created_at)`
- `Week(id, title, goal, order_index)`
- `Module(id, week_id, title, day_start, day_end, goal, order_index)`
- `Task(id, module_id, type[concept|reading|code], title, resource_url, order_index)`
- `TaskProgress(id, user_id, task_id, status, completed_at, updated_at)`
- `DailyCheckin(id, user_id, date, module_id?, note, created_at, updated_at)`

## 12) API Endpoints (Example)
- `GET /api/plan`
- `GET /api/weeks/:id`
- `PATCH /api/tasks/:id/progress`
- `GET /api/progress/summary`
- `GET /api/checkins?from=&to=`
- `POST /api/checkins`
- `PATCH /api/checkins/:id`

## 13) Success Metrics
- 7-day active usage rate.
- % of users completing Week 1, Week 2, Week 4.
- Average daily check-ins per active user.
- 30-day roadmap completion rate.

## 14) Milestones
1. Week A: MVP foundation
- Auth, plan schema, dashboard, task state updates.

2. Week B: Progress depth
- On-track logic, timeline, daily check-ins.

3. Week C: Polish
- Responsive UX, accessibility pass, metrics instrumentation.

## 15) Risks and Mitigations
- Risk: User drops after Week 1.
  - Mitigation: Weekly goals, streaks, and clear next action prompts.
- Risk: Progress feels manual-heavy.
  - Mitigation: Fast one-click updates and keyboard shortcuts.
- Risk: Scope creep into LMS features.
  - Mitigation: Keep strict MVP boundaries above.

## 16) Acceptance Criteria (MVP)
- User can view all 4 weeks and every module/task from the original plan.
- User can update any task status and see progress recalculate instantly.
- User can add/edit a daily check-in note.
- User can view current completion %, week completion %, and on-track status.
- Core flows work on desktop and mobile browser sizes.
