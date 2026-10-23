import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconName =
  | 'logo'
  | 'zap'
  | 'database'
  | 'cloud'
  | 'calendar'
  | 'clipboard'
  | 'building'
  | 'users'
  | 'graduation-cap'
  | 'cpu'
  | 'shield-check'
  | 'shield-alert'
  | 'check'
  | 'check-circle'
  | 'alert-circle'
  | 'download'
  | 'search'
  | 'book-open'
  | 'user-check'
  | 'map-pin'
  | 'x'
  | 'refresh'
  | 'play'
  | 'pause'
  | 'terminal'
  | 'sliders'
  | 'info'
  | 'clock'
  | 'chevron-down'
  | 'file-code'
  | 'flask';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="className">
      
      <!-- Logo: Geometric Layered Cube / Precision Clock -->
      <ng-container *ngIf="name === 'logo'">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </ng-container>

      <!-- Zap / Lightning -->
      <ng-container *ngIf="name === 'zap'">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </ng-container>

      <!-- Database -->
      <ng-container *ngIf="name === 'database'">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </ng-container>

      <!-- Cloud -->
      <ng-container *ngIf="name === 'cloud'">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </ng-container>

      <!-- Calendar -->
      <ng-container *ngIf="name === 'calendar'">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </ng-container>

      <!-- Clipboard / Notes -->
      <ng-container *ngIf="name === 'clipboard'">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M9 12h6M9 16h4" />
      </ng-container>

      <!-- Building / Facility -->
      <ng-container *ngIf="name === 'building'">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
      </ng-container>

      <!-- Users -->
      <ng-container *ngIf="name === 'users'">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </ng-container>

      <!-- Graduation Cap -->
      <ng-container *ngIf="name === 'graduation-cap'">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </ng-container>

      <!-- CPU / Compute -->
      <ng-container *ngIf="name === 'cpu'">
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <rect width="6" height="6" x="9" y="9" rx="1" />
        <path d="M15 2v2M9 2v2M20 15h2M20 9h2M9 20v2M15 20v2M2 9h2M2 15h2" />
      </ng-container>

      <!-- Shield Check -->
      <ng-container *ngIf="name === 'shield-check'">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </ng-container>

      <!-- Shield Alert -->
      <ng-container *ngIf="name === 'shield-alert'">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="M12 8v4M12 16h.01" />
      </ng-container>

      <!-- Check -->
      <ng-container *ngIf="name === 'check'">
        <polyline points="20 6 9 17 4 12" />
      </ng-container>

      <!-- Check Circle -->
      <ng-container *ngIf="name === 'check-circle'">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </ng-container>

      <!-- Alert Circle -->
      <ng-container *ngIf="name === 'alert-circle'">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </ng-container>

      <!-- Download -->
      <ng-container *ngIf="name === 'download'">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </ng-container>

      <!-- Search -->
      <ng-container *ngIf="name === 'search'">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </ng-container>

      <!-- Book Open -->
      <ng-container *ngIf="name === 'book-open'">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </ng-container>

      <!-- User Check -->
      <ng-container *ngIf="name === 'user-check'">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </ng-container>

      <!-- Map Pin / Location / Room -->
      <ng-container *ngIf="name === 'map-pin'">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </ng-container>

      <!-- X / Close -->
      <ng-container *ngIf="name === 'x'">
        <path d="M18 6 6 18M6 6l12 12" />
      </ng-container>

      <!-- Refresh / Sync -->
      <ng-container *ngIf="name === 'refresh'">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </ng-container>

      <!-- Play -->
      <ng-container *ngIf="name === 'play'">
        <polygon points="5 3 19 12 5 21 5 3" />
      </ng-container>

      <!-- Pause -->
      <ng-container *ngIf="name === 'pause'">
        <rect width="4" height="16" x="6" y="4" />
        <rect width="4" height="16" x="14" y="4" />
      </ng-container>

      <!-- Terminal -->
      <ng-container *ngIf="name === 'terminal'">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </ng-container>

      <!-- Sliders -->
      <ng-container *ngIf="name === 'sliders'">
        <line x1="4" x2="4" y1="21" y2="14" />
        <line x1="4" x2="4" y1="10" y2="3" />
        <line x1="12" x2="12" y1="21" y2="12" />
        <line x1="12" x2="12" y1="8" y2="3" />
        <line x1="20" x2="20" y1="21" y2="16" />
        <line x1="20" x2="20" y1="12" y2="3" />
        <line x1="1" x2="7" y1="14" y2="14" />
        <line x1="9" x2="15" y1="8" y2="8" />
        <line x1="17" x2="23" y1="16" y2="16" />
      </ng-container>

      <!-- Info -->
      <ng-container *ngIf="name === 'info'">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </ng-container>

      <!-- Clock -->
      <ng-container *ngIf="name === 'clock'">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </ng-container>

      <!-- Chevron Down -->
      <ng-container *ngIf="name === 'chevron-down'">
        <path d="m6 9 6 6 6-6" />
      </ng-container>

      <!-- File Code -->
      <ng-container *ngIf="name === 'file-code'">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4M10 13l-2 2 2 2M14 17l2-2-2-2" />
      </ng-container>

      <!-- Flask / Lab -->
      <ng-container *ngIf="name === 'flask'">
        <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
      </ng-container>
    </svg>
  `
})
export class IconComponent {
  @Input() name: IconName = 'logo';
  @Input() size: number | string = 16;
  @Input() strokeWidth: number | string = 1.75;
  @Input() className: string = 'inline-block flex-shrink-0';
}
