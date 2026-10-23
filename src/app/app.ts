import { Component, signal, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from './services/timetable.service';
import { ScheduleItem } from './models/timetable.models';

import { TopNavBarComponent } from './components/top-nav-bar.component';
import { SideNavBarComponent } from './components/side-nav-bar.component';
import { SolverStatusBarComponent } from './components/solver-status-bar.component';
import { OverviewHeroComponent } from './components/overview-hero.component';
import { StatCardsComponent } from './components/stat-cards.component';
import { TimetableGridComponent } from './components/timetable-grid.component';
import { ExamStagesComponent } from './components/exam-stages.component';
import { RoomsViewComponent } from './components/rooms-view.component';
import { FacultyViewComponent } from './components/faculty-view.component';
import { StudentViewComponent } from './components/student-view.component';
import { SmartAllocatorComponent } from './components/smart-allocator.component';
import { ConflictResolverModalComponent } from './components/conflict-resolver-modal.component';
import { SupabaseModalComponent } from './components/supabase-modal.component';
import { CourseDetailModalComponent } from './components/course-detail-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TopNavBarComponent,
    SideNavBarComponent,
    SolverStatusBarComponent,
    OverviewHeroComponent,
    StatCardsComponent,
    TimetableGridComponent,
    ExamStagesComponent,
    RoomsViewComponent,
    FacultyViewComponent,
    StudentViewComponent,
    SmartAllocatorComponent,
    ConflictResolverModalComponent,
    SupabaseModalComponent,
    CourseDetailModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  ts = inject(TimetableService);

  activeTab = signal<string>('overview');
  role = signal<'admin' | 'student'>('admin');

  isSupabaseModalOpen = signal<boolean>(false);
  selectedCourseDetail = signal<ScheduleItem | null>(null);

  private tabKeys = ['overview', 'timetable', 'exams', 'rooms', 'faculty', 'student', 'allocator', 'conflicts'];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    // If typing in an input or select, skip hotkeys
    const target = event.target as HTMLElement;
    if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
      return;
    }

    // Number keys 1-8 switch tabs
    const keyNum = parseInt(event.key, 10);
    if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= this.tabKeys.length) {
      this.activeTab.set(this.tabKeys[keyNum - 1]);
      event.preventDefault();
    }

    // Escape closes modals
    if (event.key === 'Escape') {
      if (this.isSupabaseModalOpen()) {
        this.isSupabaseModalOpen.set(false);
      }
      if (this.selectedCourseDetail()) {
        this.selectedCourseDetail.set(null);
      }
    }
  }

  onRoleChanged(newRole: 'admin' | 'student') {
    this.role.set(newRole);
    if (newRole === 'student') {
      this.activeTab.set('student');
    } else {
      this.activeTab.set('overview');
    }
  }

  onTabSelected(tab: string) {
    this.activeTab.set(tab);
  }

  onExportRoomReport() {
    this.ts.exportRoomUtilizationCsv();
  }

  onSelectCourse(item: ScheduleItem) {
    this.selectedCourseDetail.set(item);
  }
}
