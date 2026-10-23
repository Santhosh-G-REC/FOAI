import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleItem } from '../models/timetable.models';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-course-detail-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div
      *ngIf="item"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-detail-title"
      (click)="onBackdropClick($event)">
      
      <div class="product-panel rounded-2xl p-5 sm:p-6 max-w-md w-full relative" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="flex items-start justify-between pb-3.5 border-b border-zinc-800 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/60">
                {{ item.course }}
              </span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                [ngClass]="item.type === 'LAB' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'">
                {{ item.type }}
              </span>
            </div>
            <h3 id="course-detail-title" class="font-bold text-base text-zinc-100 leading-snug">
              {{ item.course_name }}
            </h3>
          </div>

          <button
            type="button"
            (click)="close.emit()"
            class="w-7 h-7 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 flex items-center justify-center text-xs transition-colors focus-ring"
            aria-label="Close dialog">
            <app-icon name="x" [size]="14"></app-icon>
          </button>
        </div>

        <!-- Details Grid -->
        <div class="space-y-2 mb-5 text-xs font-mono">
          <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <span class="text-zinc-400">Phase / Stage:</span>
            <span class="font-medium text-zinc-200">{{ item.stage }}</span>
          </div>

          <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <span class="text-zinc-400">Scheduled Coordinate:</span>
            <span class="font-medium text-indigo-300">{{ item.day_date }} • {{ item.slot }} ({{ item.timing }})</span>
          </div>

          <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <span class="text-zinc-400">Assigned Facility:</span>
            <span class="font-bold text-zinc-100 flex items-center gap-1.5">
              <app-icon name="map-pin" [size]="12" className="text-zinc-400"></app-icon>
              <span>{{ item.room }}</span>
            </span>
          </div>

          <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <span class="text-zinc-400">Faculty Assigned:</span>
            <span class="font-medium text-zinc-200">{{ item.faculty }}</span>
          </div>

          <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <span class="text-zinc-400">Student Cohort:</span>
            <span class="font-medium text-teal-300">{{ item.batch === 'ALL' ? 'Full Class (60 Students)' : item.batch }}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end pt-2 border-t border-zinc-800">
          <button
            type="button"
            (click)="close.emit()"
            class="btn-primary text-xs font-semibold px-4 py-2 rounded-lg focus-ring">
            Done
          </button>
        </div>
      </div>
    </div>
  `
})
export class CourseDetailModalComponent {
  @Input() item: ScheduleItem | null = null;
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    this.close.emit();
  }
}
