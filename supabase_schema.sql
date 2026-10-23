-- =========================================================================
-- AeroChronos - Autonomous College Timetable & Exam Scheduler
-- Supabase PostgreSQL Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- =========================================================================

-- 1. Faculty Table
CREATE TABLE IF NOT EXISTS faculty (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT DEFAULT 'Assistant Professor',
    department TEXT DEFAULT 'CSE',
    email TEXT,
    max_hours INT DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('CLASSROOM', 'LAB')),
    capacity INT NOT NULL DEFAULT 60,
    building TEXT DEFAULT 'Tech Block A',
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('THEORY', 'LAB')),
    credits INT DEFAULT 3,
    sessions_per_week INT DEFAULT 3,
    faculty_id TEXT REFERENCES faculty(id) ON DELETE SET NULL,
    requires_batch BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Batches Table
CREATE TABLE IF NOT EXISTS batches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    student_count INT DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Students Table
CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    batch_id TEXT REFERENCES batches(id) ON DELETE SET NULL,
    department TEXT DEFAULT 'CSE',
    semester INT DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Generated Master Schedules Table
CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schedule_type TEXT NOT NULL CHECK (schedule_type IN ('CLASS', 'CT1', 'CT2', 'PRACTICAL', 'ENDSEM')),
    stage_name TEXT NOT NULL,
    course_code TEXT REFERENCES courses(code) ON DELETE CASCADE,
    room_id TEXT REFERENCES rooms(id) ON DELETE SET NULL,
    faculty_id TEXT REFERENCES faculty(id) ON DELETE SET NULL,
    batch TEXT NOT NULL DEFAULT 'ALL',
    day_or_date TEXT NOT NULL,
    slot_period TEXT NOT NULL,
    timing TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Conflicts / Audit Table
CREATE TABLE IF NOT EXISTS conflicts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    course1_code TEXT,
    course2_code TEXT,
    location TEXT,
    day_or_date TEXT,
    slot_period TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    suggested_fix TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- =========================================================================
-- Initial Seed Data: Rajalakshmi Engineering College (REC) CSE 5th Semester
-- =========================================================================

-- Insert Faculty
INSERT INTO faculty (id, name, designation, department, email) VALUES
('F01', 'Dr. K. Ramesh', 'Professor', 'CSE', 'ramesh.k@rec.edu'),
('F02', 'Prof. M. Priya', 'Assistant Professor', 'CSE', 'priya.m@rec.edu'),
('F03', 'Dr. S. Anitha', 'Associate Professor', 'CSE', 'anitha.s@rec.edu'),
('F04', 'Prof. R. Karthik', 'Assistant Professor', 'CSE', 'karthik.r@rec.edu'),
('F05', 'Dr. V. Rajesh', 'Associate Professor', 'CSE', 'rajesh.v@rec.edu'),
('F06', 'Prof. N. Divya', 'Assistant Professor', 'CSE', 'divya.n@rec.edu')
ON CONFLICT (id) DO NOTHING;

-- Insert Rooms
INSERT INTO rooms (id, name, type, capacity, building) VALUES
('CR-101', 'Lecture Hall 101', 'CLASSROOM', 65, 'Main Block'),
('CR-102', 'Lecture Hall 102', 'CLASSROOM', 65, 'Main Block'),
('CR-103', 'Lecture Hall 103', 'CLASSROOM', 70, 'Main Block'),
('CR-104', 'Lecture Hall 104', 'CLASSROOM', 70, 'Main Block'),
('LAB-01', 'Networks & Systems Lab', 'LAB', 35, 'IT Annex'),
('LAB-02', 'Database & AI Lab', 'LAB', 35, 'IT Annex')
ON CONFLICT (id) DO NOTHING;

-- Insert Courses
INSERT INTO courses (code, name, type, credits, sessions_per_week, faculty_id, requires_batch) VALUES
('CS3501', 'Compiler Design', 'THEORY', 3, 3, 'F01', FALSE),
('CS3502', 'Database Management Systems', 'THEORY', 3, 3, 'F02', FALSE),
('CS3503', 'Artificial Intelligence', 'THEORY', 3, 3, 'F03', FALSE),
('CS3504', 'Computer Networks', 'THEORY', 3, 3, 'F04', FALSE),
('CS3505', 'Web Technologies', 'THEORY', 3, 3, 'F05', FALSE),
('GE3501', 'Professional Ethics', 'THEORY', 2, 2, 'F06', FALSE),
('CS3511', 'DBMS Laboratory', 'LAB', 2, 1, 'F02', TRUE),
('CS3512', 'Networks Laboratory', 'LAB', 2, 1, 'F04', TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Batches
INSERT INTO batches (id, name, student_count) VALUES
('Batch 1', 'Batch 1 (Roll 001-030)', 30),
('Batch 2', 'Batch 2 (Roll 031-060)', 30)
ON CONFLICT (id) DO NOTHING;
