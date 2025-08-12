import React from 'react';
import type { DayOfWeek } from '../types';
import { AlertCircle } from 'lucide-react';

interface WeeklyScheduleProps {
  classes: any[];
  days: DayOfWeek[];
}

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ classes, days }) => {
  // Filter out Sunday if no classes on that day
  const hasSundayClasses = classes.some(c => c.dayOfWeek === 0);
  const filteredDays = hasSundayClasses ? days : days.slice(1);
  const dayIndices = filteredDays.map((_, i) => hasSundayClasses ? i : i + 1);

  // Prepare classes for rendering
  const getClassesForTimeAndDay = (time: string, day: number) => {
    return classes.filter(c => {
      const startHour = parseInt(c.startTime.split(':')[0], 10);
      const timeHour = parseInt(time.split(':')[0], 10);
      return c.dayOfWeek === day && startHour === timeHour;
    });
  };

  if (classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-12 w-12 text-gray-300 mb-2" />
        <h3 className="text-lg font-medium text-gray-500">No classes scheduled</h3>
        <p className="text-gray-400 mt-1">This classroom is available all week</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-6 animate-fadeIn">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="w-24 bg-gray-50 border-b border-r p-4">
              <span className="text-gray-500 text-sm font-medium">Time</span>
            </th>
            {filteredDays.map((day) => (
              <th key={day} className="w-48 bg-gray-50 border-b border-r p-4">
                <span className="text-gray-700 font-medium">{day}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td className="border-b border-r bg-gray-50 p-4 text-center">
                <span className="text-sm text-gray-500">{time}</span>
              </td>
              {dayIndices.map((dayIndex) => {
                const classesForSlot = getClassesForTimeAndDay(time, dayIndex);
                return (
                  <td key={`${time}-${dayIndex}`} className="border-b border-r p-1 h-20 relative">
                    {classesForSlot.map((classItem) => (
                      <div
                        key={classItem.id}
                        className="absolute inset-1 p-2 rounded-md overflow-hidden text-white text-xs shadow-sm"
                        style={{ backgroundColor: classItem.color }}
                      >
                        <div className="font-medium truncate">{classItem.subject}</div>
                        <div className="truncate">{classItem.instructor}</div>
                        <div className="truncate">
                          {classItem.startTime} - {classItem.endTime}
                        </div>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklySchedule;