# AeroChronos — Autonomous College Timetable & Exam Scheduler
**Angular 21 + Supabase + Heuristic AI Engine (Units I, II, III)**

A complete, user-friendly Web GUI for academic timetable generation and multi-stage exam scheduling, designed with **Frutiger Aero glass aesthetics** inspired by modern academic portals.

---

## Key Features

1. **Frutiger Aero Glass Aesthetics**:
   - Modern glassmorphism panels, specular light reflections, and cyan/sky gradient accents.
   - Smooth transitions, responsive layout with collapsible sidebar and top status bar.
2. **Multi-Stage Academic Lifecycle**:
   - **Weekly Class Timetable Matrix**: Day (Mon–Fri) vs Period (P1–P7) grid with theory lectures and batch-wise practical labs.
   - **Cycle Test 1 (CT-1)**: Scheduled after Month 1 for all subjects.
   - **Cycle Test 2 (CT-2)**: Scheduled after Month 2 for all subjects.
   - **End-Semester Practical Examination**: Batch-wise lab scheduling in dedicated laboratories (`LAB-01`, `LAB-02`).
   - **End-Semester Theory Examination**: University final examinations in standard classrooms.
3. **Room Allocation & Free Rooms Tracker**:
   - Computes for every period: **Total Rooms**, **Allocated Rooms** (with course, faculty, room capacity, and student count), and **Free Rooms** (vacant rooms available for other activities).
   - 1-Click CSV export of room availability.
4. **Faculty Directory**:
   - Profiles for 6 faculty members with subject allocations, weekly teaching load, and workload balance status.
5. **Personalized Student Timetables**:
   - Dropdown roll number selector (e.g. `211601001` to `211601060`) generating a personal timetable combining weekly classes and all 4 exam stages.
   - Download student timetable as CSV.
6. **Smart Allocator & AI Search Metrics (Units I, II, III)**:
   - **Unit I (Problem-Solving Agent)**: Goal-based state space formulation.
   - **Unit II (Local Search & Optimization)**: **Simulated Annealing** live ticker (iterations, temperature cooling schedule, objective score, convergence) minimizing student schedule gaps.
   - **Unit III (Constraint Satisfaction Problems)**: **CSP Backtracking + MRV Heuristic + Forward Checking** engine running with real-time statistics (nodes expanded, backtracks, zero-clash verification).
7. **Supabase Cloud Database Integration**:
   - Configurable Project URL and Public Anon Key via in-app modal.
   - Saves schedules to Supabase PostgreSQL database.
   - Full PostgreSQL migration schema ready in `supabase_schema.sql`.

---

## Getting Started

### 1. Launch the Angular GUI
```bash
cd aerochronos-angular
npm start
```
Open your browser and navigate to:
```
http://localhost:4200/
```

### 2. Connect Supabase (Optional)
1. Open your Supabase Dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. In the **SQL Editor**, paste and execute the contents of `supabase_schema.sql`.
3. In the GUI, click the **Connect Supabase** button in the top navigation bar.
4. Enter your **Project URL** and **Public Anon Key**, then click **Save & Connect**.

---

## Project Structure

```
aerochronos-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── top-nav-bar.component.ts       # Top header, role switcher, Supabase button
│   │   │   ├── side-nav-bar.component.ts      # Sidebar navigation & live AI engine status
│   │   │   ├── solver-status-bar.component.ts # Live Simulated Annealing ticker & pause/play
│   │   │   ├── overview-hero.component.ts     # Academic hero banner & quick solve actions
│   │   │   ├── stat-cards.component.ts        # KPIs (Courses, Students, Rooms, Faculty, Clashes)
│   │   │   ├── timetable-grid.component.ts    # Weekly class matrix with batch filtering
│   │   │   ├── exam-stages.component.ts       # Multi-stage exams (CT-1, CT-2, Practical, Theory)
│   │   │   ├── rooms-view.component.ts        # Total, Allocated, Free Rooms tracker
│   │   │   ├── faculty-view.component.ts      # Staff directory & teaching workload
│   │   │   ├── student-view.component.ts      # Personalized student timetable generator
│   │   │   ├── smart-allocator.component.ts   # CSP + SA solver controls & search metrics
│   │   │   ├── conflict-resolver-modal.component.ts # Independent conflict auditor
│   │   │   ├── course-detail-modal.component.ts     # Course popup details
│   │   │   └── supabase-modal.component.ts    # Supabase cloud database settings
│   │   ├── models/
│   │   │   └── timetable.models.ts            # TypeScript interfaces & types
│   │   ├── services/
│   │   │   ├── timetable.service.ts           # Master timetable state & pipeline orchestrator
│   │   │   ├── csp-solver.service.ts          # Unit III: CSP Backtracking + MRV + FC
│   │   │   ├── sa-optimizer.service.ts        # Unit II: Simulated Annealing search
│   │   │   └── supabase.service.ts            # Supabase database client service
│   │   ├── data/
│   │   │   └── college-default.data.ts        # Realistic REC CSE Semester 5 default dataset
│   │   ├── app.ts                             # Root application component
│   │   └── app.html                           # Root layout template
│   ├── styles.css                             # Frutiger Aero glass styles & gradients
│   └── index.html                             # App entrypoint with Plus Jakarta Sans font
├── supabase_schema.sql                        # PostgreSQL migration schema for Supabase
└── angular.json                               # Angular CLI configuration
```
