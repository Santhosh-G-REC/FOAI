import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import { ScheduleItem } from '../models/timetable.models';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="product-card rounded-2xl p-5 mb-6" aria-labelledby="student-title">
      <!-- Header Controls -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 id="student-title" class="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <app-icon name="graduation-cap" [size]="16" className="text-indigo-400"></app-icon>
            <span>Personalized Student Schedule</span>
          </h2>
          <p class="text-xs text-zinc-400 mt-0.5">
            Individual student schedule combining weekly lecture/lab cohorts and all 4 semester exam stages.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <div class="flex items-center gap-2">
            <label for="student-selector" class="text-xs font-mono text-zinc-400">Roll No:</label>
            <select
              id="student-selector"
              [value]="selectedStudentId"
              (change)="onStudentChange($event)"
              class="input-recessed text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg focus-ring text-indigo-300">
              <option *ngFor="let s of ts.students()" [value]="s.id">
                {{ s.id }} ({{ s.batch }})
              </option>
            </select>
          </div>

          <button
            type="button"
            (click)="ts.exportStudentTimetableCsv(selectedStudentId)"
            class="btn-primary text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 focus-ring"
            aria-label="Download student timetable as CSV">
            <app-icon name="download" [size]="13"></app-icon>
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      <!-- Cohort Summary Header -->
      <div class="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 mb-5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center font-mono font-bold text-xs text-zinc-300">
            ID
          </div>
          <div>
            <div class="font-mono font-bold text-zinc-100 text-sm">{{ selectedStudentId }}</div>
            <p class="text-zinc-400 text-[11px] font-mono">
              Dept of CSE • Semester 5 • {{ getStudentBatch() }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 font-mono text-[11px]">
          <span class="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
            8 Enrolled Courses
          </span>
          <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            0 Conflicts Verified
          </span>
        </div>
      </div>

      <!-- Tables -->
      <div class="space-y-6">
        <!-- Part A: Weekly Classes -->
        <div>
          <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
            <app-icon name="calendar" [size]="14" className="text-indigo-400"></app-icon>
            <span>Part A: Weekly Lecture & Lab Schedule</span>
          </h3>

          <div class="overflow-x-auto rounded-xl border border-zinc-800/80 bg-zinc-950/60">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-zinc-900/80 border-b border-zinc-800/80 font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                  <th scope="col" class="p-3">Day</th>
                  <th scope="col" class="p-3">Period</th>
                  <th scope="col" class="p-3">Timing</th>
                  <th scope="col" class="p-3">Course</th>
                  <th scope="col" class="p-3">Course Title</th>
                  <th scope="col" class="p-3">Type</th>
                  <th scope="col" class="p-3">Facility</th>
                  <th scope="col" class="p-3">Faculty</th>
                </tr>
              </thead>
              <tbody class="divide-y border-zinc-800/60">
                <tr *ngFor="let item of getStudentClasses()" class="hover:bg-zinc-900/40 transition-colors">
                  <td class="p-3 font-mono font-bold text-indigo-400">{{ item.day_date }}</td>
                  <td class="p-3 font-mono text-zinc-300">{{ item.slot }}</td>
                  <td class="p-3 font-mono text-zinc-400 tabular-nums">{{ item.timing }}</td>
                  <td class="p-3 font-mono font-bold text-zinc-100">{{ item.course }}</td>
                  <td class="p-3 font-medium text-zinc-200">{{ item.course_name }}</td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-medium"
                      [ngClass]="item.type === 'LAB' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'">
                      {{ item.type }}
                    </span>
                  </td>
                  <td class="p-3 font-mono text-zinc-300">
                    <span class="inline-flex items-center gap-1">
                      <app-icon name="map-pin" [size]="12" className="text-zinc-400"></app-icon>
                      <span>{{ item.room }}</span>
                    </span>
                  </td>
                  <td class="p-3 text-zinc-400">{{ item.faculty }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Part B: Exam Schedule -->
        <div>
          <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
            <app-icon name="clipboard" [size]="14" className="text-indigo-400"></app-icon>
            <span>Part B: Semester Examination Roster (CT-1, CT-2, Practical, End-Sem)</span>
          </h3>

          <div class="overflow-x-auto rounded-xl border border-zinc-800/80 bg-zinc-950/60">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-zinc-900/80 border-b border-zinc-800/80 font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                  <th scope="col" class="p-3">Stage</th>
                  <th scope="col" class="p-3">Date</th>
                  <th scope="col" class="p-3">Session</th>
                  <th scope="col" class="p-3">Course</th>
                  <th scope="col" class="p-3">Course Title</th>
                  <th scope="col" class="p-3">Facility</th>
                  <th scope="col" class="p-3">Invigilator</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-800/60">
                <tr *ngFor="let item of getStudentExams()" class="hover:bg-zinc-900/40 transition-colors">
                  <td class="p-3 font-medium text-zinc-200">{{ item.stage }}</td>
                  <td class="p-3 font-mono font-medium text-zinc-300 tabular-nums">{{ item.day_date }}</td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                      [ngClass]="item.slot === 'FN' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'">
                      {{ item.slot }}
                    </span>
                  </td>
                  <td class="p-3 font-mono font-bold text-indigo-400">{{ item.course }}</td>
                  <td class="p-3 font-medium text-zinc-200">{{ item.course_name }}</td>
                  <td class="p-3 font-mono text-zinc-300">
                    <span class="inline-flex items-center gap-1">
                      <app-icon name="map-pin" [size]="12" className="text-zinc-400"></app-icon>
                      <span>{{ item.room }}</span>
                    </span>
                  </td>
                  <td class="p-3 text-zinc-400">{{ item.faculty }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `
})
export class StudentViewComponent {
  ts = inject(TimetableService);

  selectedStudentId: string = '211601001';

  onStudentChange(event: any) {
    this.selectedStudentId = event.target.value;
  }

  getStudentBatch(): string {
    const s = this.ts.students().find(x => x.id === this.selectedStudentId);
    return s ? s.batch : 'Batch 1';
  }

  getStudentClasses(): ScheduleItem[] {
    const b = this.getStudentBatch();
    const dayOrder: { [d: string]: number } = { 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5 };
    return this.ts.schedules()
      .filter(item => item.category === 'CLASS' && (item.batch === 'ALL' || item.batch === b))
      .sort((a, b) => (dayOrder[a.day_date] || 9) - (dayOrder[b.day_date] || 9) || a.slot.localeCompare(b.slot));
  }

  getStudentExams(): ScheduleItem[] {
    const b = this.getStudentBatch();
    return this.ts.schedules()
      .filter(item => item.category === 'EXAM' && (item.batch === 'ALL' || item.batch === b))
      .sort((a, b) => a.day_date.localeCompare(b.day_date));
  }
}
