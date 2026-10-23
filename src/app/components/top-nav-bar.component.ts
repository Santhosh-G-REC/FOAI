import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import { SupabaseService } from '../services/supabase.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <header class="sticky top-0 z-30 w-full bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-6 py-2.5">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <!-- Brand & Context -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md border border-white/10">
            <app-icon name="logo" [size]="16" class="text-white"></app-icon>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm tracking-tight text-zinc-100 font-sans">
                AeroChronos Pro
              </span>
              <span class="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                v2.4
              </span>
            </div>
            <p class="text-[11px] text-zinc-400 truncate max-w-[280px] sm:max-w-none">
              {{ ts.institution() }} • {{ ts.department() }} • Sem {{ ts.semester() }}
            </p>
          </div>
        </div>

        <!-- Center: Permanent Cloud Sync & Telemetry Badge -->
        <div class="hidden md:flex items-center gap-2">
          <!-- Permanent Cloud Connection Indicator -->
          <button
            type="button"
            (click)="openSupabaseModal.emit()"
            class="px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-zinc-300 focus-ring"
            title="Supabase PostgreSQL Cloud Sync Active">
            <span class="w-2 h-2 rounded-full" [ngClass]="sb.isConnected() ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'"></span>
            <span class="text-[11px] font-medium text-zinc-300">{{ sb.connectionMode() }}</span>
            <span class="text-[10px] text-zinc-500 font-normal">({{ sb.lastSyncTime() }})</span>
          </button>
        </div>

        <!-- Right: Role Switcher & Action Controls -->
        <div class="flex items-center gap-2.5">
          <!-- Role Switcher -->
          <div class="bg-zinc-900/90 p-0.5 rounded-lg border border-zinc-800 flex items-center text-xs font-medium" role="group" aria-label="View Mode">
            <button
              type="button"
              (click)="onRoleClick('admin')"
              [class]="currentRole === 'admin' ? 'bg-zinc-800 text-zinc-100 shadow-sm font-semibold' : 'text-zinc-400 hover:text-zinc-200'"
              class="px-2.5 py-1 rounded-md transition-all focus-ring text-xs">
              Admin
            </button>
            <button
              type="button"
              (click)="onRoleClick('student')"
              [class]="currentRole === 'student' ? 'bg-zinc-800 text-zinc-100 shadow-sm font-semibold' : 'text-zinc-400 hover:text-zinc-200'"
              class="px-2.5 py-1 rounded-md transition-all focus-ring text-xs">
              Student
            </button>
          </div>

          <!-- 1-Click Auto Solve Button (Linear Indigo) -->
          <button
            type="button"
            (click)="ts.runFullSolverPipeline()"
            [disabled]="ts.isSolving()"
            class="btn-primary text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 focus-ring disabled:opacity-50"
            aria-label="Execute Autonomous CSP Solver">
            <app-icon *ngIf="ts.isSolving()" name="refresh" [size]="13" className="animate-spin"></app-icon>
            <app-icon *ngIf="!ts.isSolving()" name="zap" [size]="13"></app-icon>
            <span>{{ ts.isSolving() ? 'Solving CSP...' : 'Auto-Solve' }}</span>
          </button>
        </div>
      </div>
    </header>
  `
})
export class TopNavBarComponent {
  ts = inject(TimetableService);
  sb = inject(SupabaseService);

  @Output() setRole = new EventEmitter<'admin' | 'student'>();
  @Output() openSupabaseModal = new EventEmitter<void>();
  currentRole: 'admin' | 'student' = 'admin';

  onRoleClick(role: 'admin' | 'student') {
    this.currentRole = role;
    this.setRole.emit(role);
  }
}
