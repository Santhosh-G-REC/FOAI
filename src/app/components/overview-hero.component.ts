import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-overview-hero',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="product-card rounded-2xl p-6 sm:p-7 mb-6 relative overflow-hidden" aria-labelledby="hero-title">
      <!-- Subtle Raycast-style background gradient wash -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div class="space-y-3 max-w-2xl">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              AI Syllabus: Units I, II & III
            </span>
            <span class="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Zero Clashes Guaranteed
            </span>
          </div>

          <h1 id="hero-title" class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 leading-tight">
            Autonomous Academic <span class="bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-300 bg-clip-text text-transparent">Timetable & Exam Engine</span>
          </h1>

          <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
            High-performance Constraint Satisfaction Problem (CSP) Backtracking with MRV heuristic and Forward Checking, coupled with Simulated Annealing search to generate reliable, conflict-free schedules across lectures, labs, and examination phases.
          </p>

          <div class="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-zinc-400">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <app-icon name="building" [size]="13" className="text-zinc-400"></app-icon>
              <span>{{ ts.institution() }}</span>
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <app-icon name="terminal" [size]="13" className="text-zinc-400"></app-icon>
              <span>Dept of {{ ts.department() }}</span>
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <app-icon name="users" [size]="13" className="text-zinc-400"></app-icon>
              <span>60 Students • 2 Batches</span>
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <app-icon name="map-pin" [size]="13" className="text-zinc-400"></app-icon>
              <span>4 Classrooms • 2 Labs</span>
            </span>
          </div>
        </div>

        <!-- Action Controls -->
        <div class="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto flex-shrink-0">
          <button
            type="button"
            (click)="ts.runFullSolverPipeline()"
            [disabled]="ts.isSolving()"
            class="btn-primary text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 focus-ring disabled:opacity-50"
            aria-label="Re-execute autonomous solver pipeline">
            <app-icon name="zap" [size]="14"></app-icon>
            <span>{{ ts.isSolving() ? 'Computing Search State...' : 'Re-Run Heuristic Solver' }}</span>
          </button>

          <button
            type="button"
            (click)="exportRoomReport.emit()"
            class="btn-secondary text-xs font-semibold px-4 py-2 rounded-lg flex items-center justify-center gap-2 focus-ring"
            aria-label="Export room utilization report as CSV">
            <app-icon name="download" [size]="14"></app-icon>
            <span>Export Room Availability CSV</span>
          </button>
        </div>
      </div>
    </section>
  `
})
export class OverviewHeroComponent {
  ts = inject(TimetableService);
  @Output() exportRoomReport = new EventEmitter<void>();
}
