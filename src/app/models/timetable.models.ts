export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
export type PeriodId = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7';
export type ExamSession = 'FN' | 'AN';

export type EventCategory = 'CLASS' | 'EXAM';
export type CourseType = 'THEORY' | 'LAB';

export type CourseTheme = 'sky' | 'teal' | 'amber' | 'coral' | 'indigo' | 'emerald' | 'blue' | 'purple';

export interface Course {
  code: string;
  name: string;
  type: CourseType;
  credits: number;
  sessions_per_week: number;
  faculty_id: string;
  requires_batch?: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  email?: string;
  max_hours: number;
  weeklyHours?: number;
  status?: 'Optimal' | 'Overallocated' | 'Available';
}

export interface AcademicRoom {
  id: string;
  name: string;
  type: 'CLASSROOM' | 'LAB';
  capacity: number;
  building: string;
  status: 'Active' | 'Maintenance' | 'Reserved';
  utilization?: number;
}

export interface BatchInfo {
  total_students: number;
  students_per_batch: number;
  batch_names: string[];
}

export interface Student {
  id: string;
  name: string;
  batch: string;
  department: string;
  semester: number;
}

export interface ScheduleItem {
  id: string;
  category: EventCategory;
  stage: string;          // 'Weekly Classes', 'Cycle Test 1 (CT-1)', 'Cycle Test 2 (CT-2)', 'End Semester Practical', 'End Semester Theory'
  course: string;
  course_name: string;
  type: CourseType;
  batch: string;          // 'ALL' | 'Batch 1' | 'Batch 2'
  day_date: string;       // Day 'Mon'-'Fri' or Date '2026-09-21'
  slot: string;           // 'P1'-'P7' or 'FN'/'AN'
  timing: string;         // '08:30-09:20' or '09:30-12:30'
  room: string;
  faculty: string;
  faculty_id?: string;
  theme: CourseTheme;
  isConflict?: boolean;
  conflictReason?: string;
}

export interface ScheduleConflict {
  id: string;
  title: string;
  type: 'room_double_booking' | 'instructor_overlap' | 'capacity_overload' | 'batch_overlap';
  course1: string;
  course2?: string;
  description: string;
  location: string;
  day_date: string;
  slot: string;
  suggestedFix: string;
  alternateRooms?: string[];
  resolved: boolean;
}

export interface AnnealingState {
  iteration: number;
  maxIterations: number;
  objectiveScore: number;
  temperature: number;
  convergence: number;
  isRunning: boolean;
  cspEfficiency: number;
}

export interface SlotRoomAllocation {
  var: string;
  course: string;
  batch: string;
  faculty: string;
  room_type: string;
  capacity: number;
}

export interface SlotRoomStatus {
  total_rooms: string[];
  total_count: number;
  allocated_rooms: { [room_id: string]: SlotRoomAllocation[] };
  allocated_count: number;
  free_rooms: string[];
  free_count: number;
  utilization_pct: number;
}

export interface AcademicMetrics {
  classCspNodes: number;
  classCspBacktracks: number;
  classSaBefore: number;
  classSaAfter: number;
  examStages: {
    name: string;
    nodes: number;
    backtracks: number;
    examsCount: number;
  }[];
  totalResidualConflicts: number;
}
