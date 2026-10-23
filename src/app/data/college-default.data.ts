import { Course, FacultyMember, AcademicRoom, BatchInfo, CourseTheme } from '../models/timetable.models';

export const THEME_PALETTE: { [code: string]: CourseTheme } = {
  'CS3501': 'sky',
  'CS3502': 'teal',
  'CS3503': 'indigo',
  'CS3504': 'blue',
  'CS3505': 'amber',
  'GE3501': 'emerald',
  'CS3511': 'teal',
  'CS3512': 'coral'
};

export const DEFAULT_FACULTY: FacultyMember[] = [
  { id: 'F01', name: 'Dr. K. Ramesh', designation: 'Professor & Head', department: 'CSE', email: 'ramesh.k@rec.edu', max_hours: 18, weeklyHours: 12, status: 'Optimal' },
  { id: 'F02', name: 'Prof. M. Priya', designation: 'Assistant Professor (Sr.G)', department: 'CSE', email: 'priya.m@rec.edu', max_hours: 18, weeklyHours: 14, status: 'Optimal' },
  { id: 'F03', name: 'Dr. S. Anitha', designation: 'Associate Professor', department: 'CSE', email: 'anitha.s@rec.edu', max_hours: 18, weeklyHours: 12, status: 'Optimal' },
  { id: 'F04', name: 'Prof. R. Karthik', designation: 'Assistant Professor', department: 'CSE', email: 'karthik.r@rec.edu', max_hours: 18, weeklyHours: 14, status: 'Optimal' },
  { id: 'F05', name: 'Dr. V. Rajesh', designation: 'Associate Professor', department: 'CSE', email: 'rajesh.v@rec.edu', max_hours: 18, weeklyHours: 12, status: 'Optimal' },
  { id: 'F06', name: 'Prof. N. Divya', designation: 'Assistant Professor', department: 'CSE', email: 'divya.n@rec.edu', max_hours: 18, weeklyHours: 8, status: 'Available' }
];

export const DEFAULT_ROOMS: AcademicRoom[] = [
  { id: 'CR-101', name: 'Lecture Hall 101', type: 'CLASSROOM', capacity: 65, building: 'Main Block 1st Floor', status: 'Active', utilization: 68 },
  { id: 'CR-102', name: 'Lecture Hall 102', type: 'CLASSROOM', capacity: 65, building: 'Main Block 1st Floor', status: 'Active', utilization: 45 },
  { id: 'CR-103', name: 'Lecture Hall 103', type: 'CLASSROOM', capacity: 70, building: 'Main Block 2nd Floor', status: 'Active', utilization: 30 },
  { id: 'CR-104', name: 'Lecture Hall 104', type: 'CLASSROOM', capacity: 70, building: 'Main Block 2nd Floor', status: 'Active', utilization: 15 },
  { id: 'LAB-01', name: 'Networks & Systems Lab', type: 'LAB', capacity: 35, building: 'IT Annex Ground Floor', status: 'Active', utilization: 55 },
  { id: 'LAB-02', name: 'Database & AI Lab', type: 'LAB', capacity: 35, building: 'IT Annex 1st Floor', status: 'Active', utilization: 60 }
];

export const DEFAULT_COURSES: Course[] = [
  { code: 'CS3501', name: 'Compiler Design', type: 'THEORY', credits: 3, sessions_per_week: 3, faculty_id: 'F01' },
  { code: 'CS3502', name: 'Database Management Systems', type: 'THEORY', credits: 3, sessions_per_week: 3, faculty_id: 'F02' },
  { code: 'CS3503', name: 'Artificial Intelligence', type: 'THEORY', credits: 3, sessions_per_week: 3, faculty_id: 'F03' },
  { code: 'CS3504', name: 'Computer Networks', type: 'THEORY', credits: 3, sessions_per_week: 3, faculty_id: 'F04' },
  { code: 'CS3505', name: 'Web Technologies', type: 'THEORY', credits: 3, sessions_per_week: 3, faculty_id: 'F05' },
  { code: 'GE3501', name: 'Professional Ethics in Engineering', type: 'THEORY', credits: 2, sessions_per_week: 2, faculty_id: 'F06' },
  { code: 'CS3511', name: 'DBMS Laboratory', type: 'LAB', credits: 2, sessions_per_week: 1, faculty_id: 'F02', requires_batch: true },
  { code: 'CS3512', name: 'Networks Laboratory', type: 'LAB', credits: 2, sessions_per_week: 1, faculty_id: 'F04', requires_batch: true }
];

export const DEFAULT_BATCH_INFO: BatchInfo = {
  total_students: 60,
  students_per_batch: 30,
  batch_names: ['Batch 1', 'Batch 2']
};

export const CLASS_PERIODS = [
  { id: 'P1', time: '08:30 - 09:20' },
  { id: 'P2', time: '09:20 - 10:10' },
  { id: 'P3', time: '10:30 - 11:20' },
  { id: 'P4', time: '11:20 - 12:10' },
  { id: 'P5', time: '01:00 - 01:50' },
  { id: 'P6', time: '01:50 - 02:40' },
  { id: 'P7', time: '02:40 - 03:30' }
];

export const CLASS_DAYS: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri')[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const EXAM_STAGES = [
  {
    key: 'cycle_test_1',
    name: 'Cycle Test 1 (CT-1)',
    dates: ['2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25', '2026-09-26'],
    sessions: ['FN'],
    timing: '09:30 - 12:30',
    target_courses: ['CS3501', 'CS3502', 'CS3503', 'CS3504', 'CS3505', 'GE3501'],
    is_batch_wise: false,
    room_type: 'CLASSROOM'
  },
  {
    key: 'cycle_test_2',
    name: 'Cycle Test 2 (CT-2)',
    dates: ['2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29', '2026-10-30', '2026-10-31'],
    sessions: ['FN'],
    timing: '09:30 - 12:30',
    target_courses: ['CS3501', 'CS3502', 'CS3503', 'CS3504', 'CS3505', 'GE3501'],
    is_batch_wise: false,
    room_type: 'CLASSROOM'
  },
  {
    key: 'end_sem_practical',
    name: 'End Semester Practical Examination',
    dates: ['2026-11-16', '2026-11-17'],
    sessions: ['FN', 'AN'],
    timing: 'FN: 09:30-12:30 | AN: 01:30-04:30',
    target_courses: ['CS3511', 'CS3512'],
    is_batch_wise: true,
    room_type: 'LAB'
  },
  {
    key: 'end_sem_theory',
    name: 'End Semester Theory Examination',
    dates: ['2026-11-25', '2026-11-27', '2026-11-30', '2026-12-02', '2026-12-04', '2026-12-07'],
    sessions: ['FN'],
    timing: '09:30 - 12:30',
    target_courses: ['CS3501', 'CS3502', 'CS3503', 'CS3504', 'CS3505', 'GE3501'],
    is_batch_wise: false,
    room_type: 'CLASSROOM'
  }
];
