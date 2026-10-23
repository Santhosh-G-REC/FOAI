import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import { ScheduleItem } from '../models/timetable.models';
import { CLASS_DAYS, CLASS_PERIODS } from '../data/college-default.data';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-timetable-grid',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="product-card rounded-2xl p-5 mb-6" aria-labelledby="matrix-title">
      <!-- Header Controls -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 id="matrix-title" class="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <app-icon name="calendar" [size]="16" className="text-indigo-400"></app-icon>
            <span>Weekly Class Timetable Matrix</span>
          </h2>
          <p class="text-xs text-zinc-400 mt-0.5">
            Regular semester lecture and lab sessions with automated batch split.
          </p>
        </div>

        <!-- Filter Controls -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono text-zinc-400">Cohort:</span>
          <div class="bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 flex items-center text-xs" role="group" aria-label="Batch Filter">
            <button
              type="button"
              (click)="selectedBatch = 'ALL'"
              [class]="selectedBatch === 'ALL' ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'"
              class="px-2.5 py-1 rounded-md transition-all focus-ring text-xs">
              All Students
            </button>
            <button
              type="button"
              (click)="selectedBatch = 'Batch 1'"
              [class]="selectedBatch === 'Batch 1' ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'"
              class="px-2.5 py-1 rounded-md transition-all focus-ring text-xs">
              Batch 1
            </button>
            <button
              type="button"
              (click)="selectedBatch = 'Batch 2'"
              [class]="selectedBatch === 'Batch 2' ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'"
              class="px-2.5 py-1 rounded-md transition-all focus-ring text-xs">
              Batch 2
            </button>
          </div>
        </div>
      </div>

      <!-- Matrix Table with Linear Craft -->
      <div class="overflow-x-auto rounded-xl border border-zinc-800/80 bg-zinc-950/60">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-zinc-900/80 border-b border-zinc-800/80">
              <th scope="col" class="p-3 font-mono font-semibold text-zinc-400 w-20 text-center uppercase tracking-wider text-[11px]">Day</th>
              <th *ngFor="let p of periods" scope="col" class="p-3 font-mono text-center min-w-[140px] border-l border-zinc-800/60">
                <div class="font-bold text-zinc-200">{{ p.id }}</div>
                <div class="text-[10px] text-zinc-400 font-normal tabular-nums">{{ p.time }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800/60">
            <tr *ngFor="let day of days" class="hover:bg-zinc-900/30 transition-colors">
              <!-- Day Header -->
              <th scope="row" class="p-3 text-center font-mono font-bold text-zinc-300 bg-zinc-900/40 border-r border-zinc-800/60">
                <span class="px-2 py-1 rounded bg-zinc-850 border border-zinc-750 text-zinc-200 text-xs font-semibold">
                  {{ day }}
                </span>
              </th>

              <!-- Period Slots -->
              <td *ngFor="let p of periods" class="p-2 border-r border-zinc-800/40 align-top">
                <ng-container *ngIf="getItemsForSlot(day, p.id).length > 0; else freeCell">
                  <div class="space-y-1.5">
                    <div
                      *ngFor="let item of getItemsForSlot(day, p.id)"
                      (click)="selectItem.emit(item)"
                      (keydown.enter)="selectItem.emit(item)"
                      (keydown.space)="selectItem.emit(item)"
                      tabindex="0"
                      role="button"
                      [attr.aria-label]="item.course + ': ' + item.course_name + ' in ' + item.room"
                      class="rounded-lg p-2.5 border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus-ring"
                      [ngClass]="getCardClasses(item)">
                      
                      <div class="flex items-center justify-between gap-1 mb-1">
                        <span class="font-mono font-bold tracking-tight text-[11px]">{{ item.course }}</span>
                        <span *ngIf="item.batch !== 'ALL'" class="text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold bg-white/10">
                          {{ item.batch }}
                        </span>
                        <span *ngIf="item.type === 'LAB'" class="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-teal-400/20 text-teal-200 border border-teal-400/30">
                          LAB
                        </span>
                      </div>

                      <div class="text-[10px] font-medium line-clamp-1 opacity-90 mb-1.5">
                        {{ item.course_name }}
                      </div>

                      <div class="flex items-center justify-between text-[10px] pt-1 border-t border-white/10 font-mono opacity-80">
                        <span>{{ item.room }}</span>
                        <span class="truncate max-w-[80px]" [title]="item.faculty">
                          {{ item.faculty }}
                        </span>
                      </div>
                    </div>
                  </div>
                </ng-container>

                <ng-template #freeCell>
                  <div class="h-full min-h-[58px] flex items-center justify-center text-zinc-400 text-[10px] font-mono select-none">
                    vacant
                  </div>
                </ng-template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class TimetableGridComponent {
  ts = inject(TimetableService);

  @Output() selectItem = new EventEmitter<ScheduleItem>();

  days = CLASS_DAYS;
  periods = CLASS_PERIODS;
  selectedBatch: 'ALL' | 'Batch 1' | 'Batch 2' = 'ALL';

  getItemsForSlot(day: string, period: string): ScheduleItem[] {
    const list = this.ts.schedules().filter(item =>
      item.category === 'CLASS' && item.day_date === day && item.slot === period
    );

    if (this.selectedBatch === 'ALL') {
      return list;
    }
    return list.filter(item => item.batch === 'ALL' || item.batch === this.selectedBatch);
  }

  getCardClasses(item: ScheduleItem): string {
    if (item.type === 'LAB') {
      return 'bg-teal-950/40 text-teal-200 border-teal-800/60 hover:border-teal-600/80';
    }
    switch (item.theme) {
      case 'sky':
        return 'bg-sky-950/40 text-sky-200 border-sky-800/60 hover:border-sky-600/80';
      case 'indigo':
        return 'bg-indigo-950/40 text-indigo-200 border-indigo-800/60 hover:border-indigo-600/80';
      case 'blue':
        return 'bg-blue-950/40 text-blue-200 border-blue-800/60 hover:border-blue-600/80';
      case 'amber':
        return 'bg-amber-950/40 text-amber-200 border-amber-800/60 hover:border-amber-600/80';
      case 'emerald':
        return 'bg-emerald-950/40 text-emerald-200 border-emerald-800/60 hover:border-emerald-600/80';
      default:
        return 'bg-zinc-900/80 text-zinc-200 border-zinc-700/60 hover:border-zinc-500/80';
    }
  }
}
