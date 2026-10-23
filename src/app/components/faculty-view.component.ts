import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../services/timetable.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-faculty-view',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="product-card rounded-2xl p-5 mb-6" aria-labelledby="faculty-title">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 id="faculty-title" class="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <app-icon name="users" [size]="16" className="text-indigo-400"></app-icon>
            <span>Faculty Roster & Teaching Load Distribution</span>
          </h2>
          <p class="text-xs text-zinc-400 mt-0.5">
            Academic faculty profiles, course allocations, and balanced weekly workload distribution.
          </p>
        </div>

        <span class="px-2.5 py-1 rounded text-xs font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
          {{ ts.faculty().length }} Active Staff Members
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div
          *ngFor="let fac of ts.faculty()"
          class="product-card product-card-hover rounded-xl p-4 border border-zinc-800">
          <div class="flex items-start gap-3 mb-3">
            <div class="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center font-mono font-bold text-xs text-zinc-200">
              {{ getInitials(fac.name) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1">
                <span class="text-xs font-mono font-bold text-indigo-400">
                  {{ fac.id }}
                </span>
                <span class="text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold"
                  [ngClass]="fac.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'">
                  {{ fac.status }}
                </span>
              </div>
              <h3 class="font-bold text-zinc-100 text-sm mt-0.5 truncate">{{ fac.name }}</h3>
              <p class="text-[11px] text-zinc-400 truncate">{{ fac.designation }} • {{ fac.department }}</p>
            </div>
          </div>

          <div class="space-y-1.5 pt-2 border-t border-zinc-800/80 text-xs font-mono">
            <div class="flex items-center justify-between text-zinc-400 text-[11px]">
              <span>Assigned:</span>
              <span class="font-bold text-zinc-200">{{ getCoursesForFaculty(fac.id) }}</span>
            </div>

            <div class="flex items-center justify-between text-zinc-400 text-[11px]">
              <span>Email:</span>
              <span class="text-zinc-400 truncate max-w-[170px]">{{ fac.email || '-' }}</span>
            </div>

            <div class="pt-1">
              <div class="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                <span>Teaching Load</span>
                <span class="font-bold text-zinc-200 tabular-nums">{{ fac.weeklyHours || 12 }} / {{ fac.max_hours }} hrs</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  class="h-full rounded-full bg-indigo-500"
                  [style.width.%]="((fac.weeklyHours || 12) / fac.max_hours) * 100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FacultyViewComponent {
  ts = inject(TimetableService);

  getInitials(name: string): string {
    return name
      .split(' ')
      .filter(w => !['Dr.', 'Prof.', 'Mr.', 'Mrs.'].includes(w))
      .map(w => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getCoursesForFaculty(facId: string): string {
    const list = this.ts.courses().filter(c => c.faculty_id === facId).map(c => c.code);
    return list.length > 0 ? list.join(', ') : 'None';
  }
}
