import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-stat-cards',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="grid grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6" aria-label="Key Performance Indicators">
      <!-- Card 1: Courses -->
      <div class="product-card rounded-xl p-4">
        <div class="flex items-center justify-between text-zinc-400 mb-1.5 text-xs font-medium">
          <span>Total Courses</span>
          <app-icon name="book-open" [size]="14" className="text-zinc-500"></app-icon>
        </div>
        <div class="font-mono text-2xl font-bold tracking-tight text-zinc-100 tabular-nums">
          {{ ts.courses().length }}
        </div>
        <p class="text-[11px] text-zinc-400 mt-1 font-mono">6 Theory • 2 Labs</p>
      </div>

      <!-- Card 2: Cohorts -->
      <div class="product-card rounded-xl p-4">
        <div class="flex items-center justify-between text-zinc-400 mb-1.5 text-xs font-medium">
          <span>Student Cohorts</span>
          <app-icon name="users" [size]="14" className="text-zinc-500"></app-icon>
        </div>
        <div class="font-mono text-2xl font-bold tracking-tight text-zinc-100 tabular-nums">
          {{ ts.batchInfo().total_students }}
        </div>
        <p class="text-[11px] text-zinc-400 mt-1 font-mono">30 / Batch (2 Batches)</p>
      </div>

      <!-- Card 3: Facilities -->
      <div class="product-card rounded-xl p-4">
        <div class="flex items-center justify-between text-zinc-400 mb-1.5 text-xs font-medium">
          <span>Total Facilities</span>
          <app-icon name="building" [size]="14" className="text-zinc-500"></app-icon>
        </div>
        <div class="font-mono text-2xl font-bold tracking-tight text-zinc-100 tabular-nums">
          {{ ts.rooms().length }}
        </div>
        <p class="text-[11px] text-zinc-400 mt-1 font-mono">4 Halls • 2 Labs</p>
      </div>

      <!-- Card 4: Faculty -->
      <div class="product-card rounded-xl p-4">
        <div class="flex items-center justify-between text-zinc-400 mb-1.5 text-xs font-medium">
          <span>Faculty Roster</span>
          <app-icon name="user-check" [size]="14" className="text-zinc-500"></app-icon>
        </div>
        <div class="font-mono text-2xl font-bold tracking-tight text-zinc-100 tabular-nums">
          {{ ts.faculty().length }}
        </div>
        <p class="text-[11px] text-emerald-400 mt-1 font-mono font-medium">100% Balanced</p>
      </div>

      <!-- Card 5: Conflict Rate -->
      <div class="product-card rounded-xl p-4 col-span-2 sm:col-span-1">
        <div class="flex items-center justify-between text-zinc-400 mb-1.5 text-xs font-medium">
          <span>Clash Status</span>
          <app-icon
            [name]="ts.conflicts().length === 0 ? 'shield-check' : 'shield-alert'"
            [size]="14"
            [className]="ts.conflicts().length === 0 ? 'text-emerald-400' : 'text-red-400'"></app-icon>
        </div>
        <div class="font-mono text-2xl font-bold tracking-tight tabular-nums" [ngClass]="ts.conflicts().length === 0 ? 'text-emerald-400' : 'text-red-400'">
          {{ ts.conflicts().length }}
        </div>
        <p class="text-[11px] mt-1 font-mono font-semibold" [ngClass]="ts.conflicts().length === 0 ? 'text-emerald-400/90' : 'text-red-400/90'">
          {{ ts.conflicts().length === 0 ? 'Zero Clash Verified' : 'Action Required' }}
        </p>
      </div>
    </section>
  `
})
export class StatCardsComponent {
  ts = inject(TimetableService);
}
