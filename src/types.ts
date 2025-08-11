export interface Classitem {
  id: string;
  subject: string;
  instructorName: string;
  image?: string;
  topic?: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  room: string;
  color: string;
}

export interface Classroom {
  id:         string;
  name:       string;
  building:   string;
  floor:      number;
  capacity:   number;
  features:   string[];
}

export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface ViewMode {
  type: 'daily' | 'weekly';
  label: string;
}