import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimetableService } from '../services/timetable.service';
import { CLASS_DAYS, CLASS_PERIODS } from '../data/college-default.data';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-rooms-view',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-6 mb-6">
      <!-- Section 1: Facilities Roster -->
      <section class="product-card rounded-2xl p-5" aria-labelledby="rooms-title">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 id="rooms-title" class="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
              <app-icon name="building" [size]="16" className="text-indigo-400"></app-icon>
              <span>Facility Capacity & Allocation Matrix</span>
            </h2>
            <p class="text-xs text-zinc-400 mt-0.5">
              Physical classrooms and laboratories with verified capacity bounds and utilization metrics.
            </p>
          </div>

          <button
            type="button"
            (click)="ts.exportRoomUtilizationCsv()"
            class="btn-secondary text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 focus-ring"
            aria-label="Download room utilization report as CSV">
            <app-icon name="download" [size]="13"></app-icon>
            <span>Export Utilization CSV</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div
            *ngFor="let room of ts.rooms()"
            class="product-card product-card-hover rounded-xl p-4 border border-zinc-800">
            <div class="flex items-start justify-between mb-2.5">
              <div>
                <span class="text-xs font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-800/60">
                  {{ room.id }}
                </span>
                <h3 class="font-bold text-zinc-100 text-sm mt-1.5">{{ room.name }}</h3>
                <p class="text-[11px] text-zinc-400 font-mono">{{ room.building }}</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-medium"
                [ngClass]="room.type === 'LAB' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'">
                {{ room.type }}
              </span>
            </div>

            <div class="space-y-1.5 pt-2 border-t border-zinc-800/80 text-xs">
              <div class="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
                <span>Seating:</span>
                <span class="font-bold text-zinc-200 tabular-nums">{{ room.capacity }} seats</span>
              </div>
              <div class="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
                <span>Status:</span>
                <span class="font-medium text-emerald-400 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {{ room.status }}
                </span>
              </div>
              <div class="pt-1">
                <div class="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                  <span>Utilization:</span>
                  <span class="font-bold text-zinc-200 tabular-nums">{{ room.utilization }}%</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
                    [style.width.%]="room.utilization"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Slot-by-Slot Room Inspector -->
      <section class="product-card rounded-2xl p-5" aria-labelledby="inspector-title">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 id="inspector-title" class="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
              <app-icon name="search" [size]="16" className="text-indigo-400"></app-icon>
              <span>Slot-by-Slot Room Inspector</span>
            </h2>
            <p class="text-xs text-zinc-400 mt-0.5">
              Real-time audit of allocated vs. vacant rooms for any schedule coordinate.
            </p>
          </div>

          <!-- Slot Selector -->
          <div class="flex items-center gap-2">
            <label for="inspector-day" class="text-xs font-mono text-zinc-400">Day:</label>
            <select
              id="inspector-day"
              [(ngModel)]="selectedDay"
              class="input-recessed text-xs font-mono px-2.5 py-1.5 rounded-lg focus-ring">
              <option *ngFor="let d of days" [value]="d">{{ d }}</option>
            </select>

            <label for="inspector-period" class="text-xs font-mono text-zinc-400 ml-1">Period:</label>
            <select
              id="inspector-period"
              [(ngModel)]="selectedPeriod"
              class="input-recessed text-xs font-mono px-2.5 py-1.5 rounded-lg focus-ring">
              <option *ngFor="let p of periods" [value]="p.id">{{ p.id }} ({{ p.time }})</option>
            </select>
          </div>
        </div>

        <!-- Summary KPIs for Selected Slot -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5 font-mono">
          <div class="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div class="text-[11px] text-zinc-400 mb-0.5">Total Rooms Available</div>
            <div class="text-xl font-bold text-zinc-100 tabular-nums">
              {{ getTotalCount() }}
            </div>
            <p class="text-[10px] text-zinc-400 mt-0.5">4 Lecture Halls • 2 Labs</p>
          </div>

          <div class="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div class="text-[11px] text-zinc-400 mb-0.5">Allocated Rooms</div>
            <div class="text-xl font-bold text-indigo-400 tabular-nums">
              {{ getAllocatedCount() }}
            </div>
            <p class="text-[10px] text-zinc-400 mt-0.5">
              {{ getUtilizationPct() }}% Occupancy Rate
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div class="text-[11px] text-zinc-400 mb-0.5">Vacant / Free Rooms</div>
            <div class="text-xl font-bold text-emerald-400 tabular-nums">
              {{ getFreeCount() }}
            </div>
            <p class="text-[10px] text-emerald-400/80 mt-0.5">Ready for alternate use</p>
          </div>
        </div>

        <!-- Allocated vs Free Lists -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Allocated Rooms -->
          <div class="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-850">
            <h3 class="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>●</span> Allocated Facilities
            </h3>

            <div *ngIf="getAllocatedList().length > 0; else noAllocated" class="space-y-1.5">
              <div
                *ngFor="let item of getAllocatedList()"
                class="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <span class="font-mono font-bold text-indigo-400">{{ item.room_id }}</span>
                  <span class="text-zinc-400 font-mono text-[11px]"> ({{ item.room_type }})</span>
                  <div class="font-medium text-zinc-200 text-[11px] mt-0.5">
                    {{ item.course }} • Cohort: {{ item.batch }}
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-zinc-400 text-[11px] block">{{ item.faculty }}</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Occupied</span>
                </div>
              </div>
            </div>
            <ng-template #noAllocated>
              <div class="p-4 text-center text-zinc-400 text-xs font-mono bg-zinc-900/40 rounded-lg">
                No rooms allocated in this slot. All rooms are vacant.
              </div>
            </ng-template>
          </div>

          <!-- Free Rooms -->
          <div class="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-850">
            <h3 class="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>○</span> Vacant Facilities
            </h3>

            <div *ngIf="getFreeList().length > 0; else noFree" class="grid grid-cols-2 gap-2">
              <div
                *ngFor="let rid of getFreeList()"
                class="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 flex items-center justify-between text-xs">
                <div>
                  <span class="font-mono font-bold text-emerald-300">{{ rid }}</span>
                  <div class="text-[10px] font-mono text-zinc-400">{{ getRoomType(rid) }} • Cap: {{ getRoomCap(rid) }}</div>
                </div>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  VACANT
                </span>
              </div>
            </div>
            <ng-template #noFree>
              <div class="p-4 text-center text-zinc-400 text-xs font-mono bg-zinc-900/40 rounded-lg">
                All facilities are in use during this period.
              </div>
            </ng-template>
          </div>
        </div>
      </section>
    </div>
  `
})
export class RoomsViewComponent {
  ts = inject(TimetableService);

  days = CLASS_DAYS;
  periods = CLASS_PERIODS;

  selectedDay: string = 'Mon';
  selectedPeriod: string = 'P3';

  currentStatus() {
    const key = `${this.selectedDay} ${this.selectedPeriod}`;
    return this.ts.roomStatusBySlot()[key];
  }

  getTotalCount(): number {
    const s = this.currentStatus();
    return s ? s.total_count : 6;
  }

  getAllocatedCount(): number {
    const s = this.currentStatus();
    return s ? s.allocated_count : 0;
  }

  getUtilizationPct(): number {
    const s = this.currentStatus();
    return s ? s.utilization_pct : 0;
  }

  getFreeCount(): number {
    const s = this.currentStatus();
    return s ? s.free_count : 6;
  }

  getAllocatedList() {
    const status = this.currentStatus();
    if (!status) return [];
    const list: any[] = [];
    for (const [rid, items] of Object.entries(status.allocated_rooms)) {
      list.push({
        room_id: rid,
        room_type: items[0].room_type,
        course: items[0].course,
        batch: items[0].batch,
        faculty: items[0].faculty
      });
    }
    return list;
  }

  getFreeList(): string[] {
    const status = this.currentStatus();
    return status ? status.free_rooms : this.ts.rooms().map(r => r.id);
  }

  getRoomType(rid: string): string {
    const r = this.ts.rooms().find(x => x.id === rid);
    return r ? r.type : 'CLASSROOM';
  }

  getRoomCap(rid: string): number {
    const r = this.ts.rooms().find(x => x.id === rid);
    return r ? r.capacity : 65;
  }
}
