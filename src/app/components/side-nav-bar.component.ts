import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import { IconComponent, IconName } from './icon.component';

@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <aside class="w-60 flex-shrink-0 product-card rounded-2xl p-3 flex flex-col justify-between h-[calc(100vh-5.5rem)] sticky top-16" aria-label="Main Navigation">
      <nav class="space-y-1">
        <div class="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
          Infrastructure
        </div>

        <button
          *ngFor="let item of navItems; let i = index"
          type="button"
          (click)="selectTab.emit(item.id)"
          [class]="activeTab === item.id 
            ? 'bg-zinc-800 text-zinc-100 font-semibold border-l-2 border-indigo-500 shadow-sm' 
            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 font-medium'"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all text-left focus-ring"
          [attr.aria-current]="activeTab === item.id ? 'page' : null">
          <div class="flex items-center gap-2.5 min-w-0">
            <app-icon
              [name]="item.icon"
              [size]="14"
              [className]="activeTab === item.id ? 'text-indigo-400' : 'text-zinc-400'"></app-icon>
            <span class="truncate">{{ item.label }}</span>
          </div>

          <div class="flex items-center gap-1.5 flex-shrink-0">
            <span *ngIf="item.badge" class="px-1.5 py-0.2 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700/50">
              {{ item.badge }}
            </span>
            <span *ngIf="item.id === 'conflicts'" class="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold"
              [ngClass]="ts.conflicts().length === 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'">
              {{ ts.conflicts().length }}
            </span>
            <kbd class="text-[9px] font-mono text-zinc-400 border border-zinc-800 px-1 rounded bg-zinc-900/60 hidden xl:inline">
              {{ i + 1 }}
            </kbd>
          </div>
        </button>
      </nav>

      <!-- Bottom Engine Status -->
      <div class="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-mono text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            CSP Engine
          </span>
          <span class="text-[10px] font-mono text-zinc-400">MRV + FC</span>
        </div>
        <div class="flex items-center justify-between text-[11px] pt-1.5 border-t border-zinc-800/80">
          <span class="text-zinc-400">Conflict Rate:</span>
          <span class="font-mono font-bold text-emerald-400">0.00%</span>
        </div>
      </div>
    </aside>
  `
})
export class SideNavBarComponent {
  ts = inject(TimetableService);

  @Input() activeTab: string = 'overview';
  @Output() selectTab = new EventEmitter<string>();

  navItems: { id: string; label: string; icon: IconName; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'sliders' },
    { id: 'timetable', label: 'Weekly Matrix', icon: 'calendar', badge: 'P1–P7' },
    { id: 'exams', label: 'Exam Stages', icon: 'clipboard', badge: '4 Phases' },
    { id: 'rooms', label: 'Room Inspector', icon: 'building', badge: '6 Rooms' },
    { id: 'faculty', label: 'Faculty Roster', icon: 'users', badge: '6 Staff' },
    { id: 'student', label: 'Student View', icon: 'graduation-cap', badge: '60 Roll' },
    { id: 'allocator', label: 'Smart Allocator', icon: 'zap' },
    { id: 'conflicts', label: 'Conflict Auditor', icon: 'shield-check' }
  ];
}
