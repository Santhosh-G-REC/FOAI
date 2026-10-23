import { Component, Output, EventEmitter, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { TimetableService } from '../services/timetable.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-supabase-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="supabase-modal-title"
      (click)="onBackdropClick($event)">
      
      <div class="product-panel rounded-2xl p-5 sm:p-6 max-w-lg w-full relative" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3.5 border-b border-zinc-800 mb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-sm font-mono font-bold">
              <app-icon name="database" [size]="16"></app-icon>
            </div>
            <div>
              <h3 id="supabase-modal-title" class="font-bold text-sm text-zinc-100 tracking-tight">
                Permanent Supabase Cloud Sync
              </h3>
              <p class="text-[11px] text-zinc-400">PostgreSQL cloud persistence configuration</p>
            </div>
          </div>

          <button
            type="button"
            (click)="close.emit()"
            class="w-7 h-7 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 flex items-center justify-center text-xs transition-colors focus-ring"
            aria-label="Close dialog">
            <app-icon name="x" [size]="14"></app-icon>
          </button>
        </div>

        <!-- Connection Status Banner -->
        <div class="p-3 rounded-xl mb-4 text-xs font-mono flex items-center justify-between"
          [ngClass]="sb.isConnected() ? 'bg-emerald-950/20 border border-emerald-900/50 text-emerald-300' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" [ngClass]="sb.isConnected() ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'"></span>
            <span class="font-semibold">{{ sb.connectionMode() }}: Active</span>
          </div>
          <span class="text-[10px] text-zinc-500">Last Synced: {{ sb.lastSyncTime() }}</span>
        </div>

        <!-- Credentials Form -->
        <form (ngSubmit)="saveAndConnect()" class="space-y-3.5 mb-4 text-xs">
          <div>
            <label for="sb-url-input" class="block font-mono text-[11px] font-medium text-zinc-300 mb-1">
              Project URL
            </label>
            <input
              id="sb-url-input"
              type="text"
              name="urlInput"
              [(ngModel)]="urlInput"
              placeholder="https://your-project.supabase.co"
              class="w-full input-recessed p-2.5 rounded-lg font-mono text-xs focus-ring" />
          </div>

          <div>
            <label for="sb-key-input" class="block font-mono text-[11px] font-medium text-zinc-300 mb-1">
              Public Anon Key
            </label>
            <input
              id="sb-key-input"
              type="password"
              name="keyInput"
              [(ngModel)]="keyInput"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              class="w-full input-recessed p-2.5 rounded-lg font-mono text-xs focus-ring" />
          </div>

          <div *ngIf="sb.syncError()" class="p-2.5 rounded-lg bg-red-950/30 border border-red-900/50 text-red-400 text-[11px] font-mono">
            {{ sb.syncError() }}
          </div>
        </form>

        <!-- Migration Info Box -->
        <div class="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-[11px] text-zinc-400 font-mono mb-4 leading-relaxed">
          <p class="font-bold text-zinc-300 mb-1 flex items-center gap-1.5">
            <app-icon name="info" [size]="14" className="text-indigo-400"></app-icon>
            <span>Permanent Cloud Persistence:</span>
          </p>
          <p>
            Your credentials are permanently stored in local storage and environment. All schedules auto-persist to your Supabase tables in the background. SQL schema is located in <code class="text-indigo-400 font-semibold">supabase_schema.sql</code>.
          </p>
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center justify-between pt-2 border-t border-zinc-800">
          <button
            type="button"
            (click)="resetDefaults()"
            class="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors focus-ring">
            Reset to Permanent Default
          </button>

          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="close.emit()"
              class="btn-secondary text-xs font-semibold px-3 py-1.5 rounded-lg focus-ring">
              Close
            </button>

            <button
              type="button"
              (click)="saveAndConnect()"
              class="btn-primary text-xs font-semibold px-4 py-1.5 rounded-lg focus-ring">
              Save & Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SupabaseModalComponent {
  sb = inject(SupabaseService);
  ts = inject(TimetableService);

  @Output() close = new EventEmitter<void>();

  urlInput = this.sb.supabaseUrl();
  keyInput = this.sb.supabaseAnonKey();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    this.close.emit();
  }

  async saveAndConnect() {
    this.sb.saveCredentials(this.urlInput, this.keyInput);
    const connected = await this.sb.testConnection();
    if (connected) {
      await this.sb.saveSchedules(this.ts.schedules());
    }
  }

  resetDefaults() {
    this.sb.resetToDefault();
    this.urlInput = this.sb.supabaseUrl();
    this.keyInput = this.sb.supabaseAnonKey();
  }
}
