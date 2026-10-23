import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import { ScheduleItem } from '../models/timetable.models';
import { EXAM_STAGES } from '../data/college-default.data';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-exam-stages',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="product-card rounded-2xl p-5 mb-6" aria-labelledby="exam-stages-title">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 id="exam-stages-title" class="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <app-icon name="clipboard" [size]="16" className="text-indigo-400"></app-icon>
            <span>Semester Examination Schedules</span>
          </h2>
          <p class="text-xs text-zinc-400 mt-0.5">
            Multi-stage academic evaluation: Cycle Tests (CT-1 & CT-2), End-Sem Practicals, and Theory exams.
          </p>
        </div>

        <span class="px-2.5 py-1 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Zero Back-to-Back Clashes
        </span>
      </div>

      <!-- Stage Selector Tabs -->
      <div class="flex flex-wrap gap-1.5 mb-4 border-b border-zinc-800 pb-3" role="tablist" aria-label="Exam Stages">
        <button
          *ngFor="let stage of examStages"
          type="button"
          (click)="activeStageKey = stage.key"
          role="tab"
          [attr.aria-selected]="activeStageKey === stage.key"
          [class]="activeStageKey === stage.key
            ? 'bg-zinc-800 text-zinc-100 font-semibold border-b-2 border-indigo-500'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 font-medium'"
          class="px-3.5 py-1.5 rounded-lg text-xs transition-all focus-ring">
          <span>{{ stage.name }}</span>
        </button>
      </div>

      <!-- Stage Description Banner -->
      <div class="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs flex items-center justify-between gap-4 mb-4">
        <p class="text-zinc-300 font-medium">
          {{ getActiveStageDescription() }}
        </p>
        <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60 whitespace-nowrap">
          {{ getActiveStageItems().length }} Exams
        </span>
      </div>

      <!-- Exam Table -->
      <div class="overflow-x-auto rounded-xl border border-zinc-800/80 bg-zinc-950/60">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-zinc-900/80 border-b border-zinc-800/80 font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
              <th scope="col" class="p-3">Date</th>
              <th scope="col" class="p-3">Session</th>
              <th scope="col" class="p-3">Timing</th>
              <th scope="col" class="p-3">Course</th>
              <th scope="col" class="p-3">Course Title</th>
              <th scope="col" class="p-3">Batch</th>
              <th scope="col" class="p-3">Facility</th>
              <th scope="col" class="p-3">Invigilator</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800/60">
            <tr *ngFor="let item of getActiveStageItems()" class="hover:bg-zinc-900/40 transition-colors">
              <td class="p-3 font-mono font-medium text-zinc-200 tabular-nums">{{ item.day_date }}</td>
              <td class="p-3">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                  [ngClass]="item.slot === 'FN' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'">
                  {{ item.slot }} ({{ item.slot === 'FN' ? 'Forenoon' : 'Afternoon' }})
                </span>
              </td>
              <td class="p-3 font-mono text-zinc-400 tabular-nums">{{ item.timing }}</td>
              <td class="p-3 font-mono font-bold text-indigo-400">{{ item.course }}</td>
              <td class="p-3 font-medium text-zinc-200">{{ item.course_name }}</td>
              <td class="p-3">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-medium"
                  [ngClass]="item.batch === 'ALL' ? 'bg-zinc-800 text-zinc-300' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'">
                  {{ item.batch }}
                </span>
              </td>
              <td class="p-3 font-mono font-medium text-zinc-200">
                <span class="inline-flex items-center gap-1">
                  <app-icon name="map-pin" [size]="12" className="text-zinc-400"></app-icon>
                  <span>{{ item.room }}</span>
                </span>
              </td>
              <td class="p-3 text-zinc-300">{{ item.faculty }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class ExamStagesComponent {
  ts = inject(TimetableService);
  examStages = EXAM_STAGES;
  activeStageKey: string = 'cycle_test_1';

  getActiveStageItems(): ScheduleItem[] {
    const stageObj = this.examStages.find(s => s.key === this.activeStageKey);
    if (!stageObj) return [];
    return this.ts.schedules()
      .filter(item => item.category === 'EXAM' && item.stage === stageObj.name)
      .sort((a, b) => a.day_date.localeCompare(b.day_date));
  }

  getActiveStageDescription(): string {
    switch (this.activeStageKey) {
      case 'cycle_test_1':
        return 'Cycle Test 1: Conducted after Month 1 for all 6 theory subjects in Forenoon (FN) sessions.';
      case 'cycle_test_2':
        return 'Cycle Test 2: Conducted after Month 2 across 6 dates to evaluate mid-term syllabus progress.';
      case 'end_sem_practical':
        return 'Practical Exams: Scheduled batch-wise in LAB-01 and LAB-02 across FN and AN sessions.';
      case 'end_sem_theory':
        return 'End-Sem Theory Exams: Final comprehensive university examinations with preparation break intervals.';
      default:
        return '';
    }
  }
}
