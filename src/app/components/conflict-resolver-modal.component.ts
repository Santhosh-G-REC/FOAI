import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import confetti from 'canvas-confetti';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-conflict-resolver-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="product-card rounded-2xl p-5 mb-6" aria-labelledby="conflict-title">
      <div class="flex items-center justify-between pb-3.5 border-b border-zinc-800 mb-5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs"
            [ngClass]="ts.conflicts().length === 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'">
            <app-icon [name]="ts.conflicts().length === 0 ? 'shield-check' : 'shield-alert'" [size]="15"></app-icon>
          </div>
          <div>
            <h2 id="conflict-title" class="text-base font-bold text-zinc-100 tracking-tight">Independent Conflict Auditor (Module 8)</h2>
            <p class="text-xs text-zinc-400">Deterministic verification across all student cohorts, faculty, and room allocations.</p>
          </div>
        </div>

        <button
          type="button"
          (click)="reRunAudit()"
          class="btn-primary text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 focus-ring"
          aria-label="Re-verify schedules for clashes">
          <app-icon name="search" [size]="13"></app-icon>
          <span>Re-Verify Schedules</span>
        </button>
      </div>

      <!-- Zero Conflict State -->
      <div *ngIf="ts.conflicts().length === 0" class="p-6 text-center rounded-xl bg-zinc-950/70 border border-zinc-800">
        <div class="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-2.5">
          <app-icon name="check" [size]="20"></app-icon>
        </div>
        <h3 class="font-bold text-sm text-zinc-100 mb-1 font-mono">Zero Residual Clashes Detected</h3>
        <p class="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
          The CSP Forward Checking engine and Simulated Annealing optimizer have verified that no student, faculty member, or classroom facility has double-booked assignments across any period.
        </p>
      </div>

      <!-- Active Conflicts List (if any) -->
      <div *ngIf="ts.conflicts().length > 0" class="space-y-3">
        <div
          *ngFor="let c of ts.conflicts()"
          class="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-red-300">{{ c.title }}</span>
              <span class="px-1.5 py-0.2 rounded text-[10px] bg-red-900/40 text-red-300 border border-red-800/50">{{ c.type }}</span>
            </div>
            <p class="text-red-400 text-[11px] font-sans">{{ c.description }}</p>
            <div class="text-[11px] text-zinc-500">
              Location: {{ c.location }} • Slot: {{ c.day_date }} ({{ c.slot }})
            </div>
          </div>

          <button
            type="button"
            (click)="ts.reallocateConflict(c.id)"
            class="btn-primary text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 focus-ring">
            <app-icon name="zap" [size]="13"></app-icon>
            <span>Auto-Reallocate</span>
          </button>
        </div>
      </div>
    </section>
  `
})
export class ConflictResolverModalComponent {
  ts = inject(TimetableService);

  reRunAudit() {
    this.ts.runFullSolverPipeline();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#4f46e5', '#34d399', '#ffffff']
      });
    } catch {}
  }
}
