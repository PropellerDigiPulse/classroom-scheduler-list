import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DayOfWeek } from '../types';

interface DaySelectorProps {
  days: DayOfWeek[];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ days, selectedDay, setSelectedDay }) => {
  const goToPreviousDay = () => {
    setSelectedDay(selectedDay === 0 ? 6 : selectedDay - 1);
  };

  const goToNextDay = () => {
    setSelectedDay(selectedDay === 6 ? 0 : selectedDay + 1);
  };

  // Get current week's dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    return days.map((_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - currentDay + index);
      return date;
    });
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="flex items-center justify-between mb-6">
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={goToPreviousDay}
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>

      <div className="flex space-x-2">
        {days.map((day, index) => {
          const date = weekDates[index];
          const isSelected = selectedDay === index;
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={day}
              className={`px-4 py-3 rounded-xl text-sm transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'hover:bg-gray-100 text-gray-700'
              } ${isToday && !isSelected ? 'border-2 border-blue-500' : ''}`}
              onClick={() => setSelectedDay(index)}
            >
              <div className="flex flex-col items-center">
                <span className={`text-xs mb-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="font-medium">{day}</span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={goToNextDay}
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
};

export default DaySelector