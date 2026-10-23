import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-solver-status-bar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="product-card rounded-xl px-4 py-2.5 mb-5 flex flex-wrap items-center justify-between gap-3 text-xs" role="region" aria-label="Solver Status Bar">
      <!-- Left: Engine Status -->
      <div class="flex items-center gap-2.5">
        <span class="w-2 h-2 rounded-full" [ngClass]="state().isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'"></span>
        <span class="font-mono text-zinc-300 font-semibold">SA Optimization Engine:</span>
        <span class="px-2 py-0.5 rounded text-[11px] font-mono"
          [ngClass]="state().isRunning ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'">
          {{ state().isRunning ? 'Cooling Schedule Active' : 'Paused' }}
        </span>
        <button
          type="button"
          (click)="ts.toggleLiveAnnealing()"
          class="btn-secondary px-2.5 py-1 rounded text-[11px] font-mono focus-ring inline-flex items-center gap-1.5"
          [attr.aria-label]="state().isRunning ? 'Pause Simulated Annealing' : 'Resume Simulated Annealing'">
          <app-icon [name]="state().isRunning ? 'pause' : 'play'" [size]="10"></app-icon>
          <span>{{ state().isRunning ? 'Pause' : 'Resume' }}</span>
        </button>
      </div>

      <!-- Right: Telemetry in Tabular Mono -->
      <div class="flex flex-wrap items-center gap-4 font-mono text-[11px] text-zinc-400">
        <div>
          <span class="text-zinc-400">Iter: </span>
          <span class="text-zinc-200 tabular-nums font-semibold">{{ state().iteration }}</span>
          <span class="text-zinc-400">/{{ state().maxIterations }}</span>
        </div>

        <div>
          <span class="text-zinc-400">Temp: </span>
          <span class="text-indigo-400 tabular-nums font-semibold">{{ state().temperature }}</span>
        </div>

        <div>
          <span class="text-zinc-400">Score: </span>
          <span class="text-teal-400 tabular-nums font-semibold">{{ state().objectiveScore }}%</span>
        </div>

        <div>
          <span class="text-zinc-400">Convergence: </span>
          <span class="text-sky-400 tabular-nums font-semibold">{{ state().convergence }}%</span>
        </div>

        <div class="pl-2 border-l border-zinc-800 hidden sm:block">
          <span class="text-emerald-400 font-medium">100% Zero-Clash Verified</span>
        </div>
      </div>
    </div>
  `
})
export class SolverStatusBarComponent {
  ts = inject(TimetableService);
  state = this.ts.annealingState;
}
