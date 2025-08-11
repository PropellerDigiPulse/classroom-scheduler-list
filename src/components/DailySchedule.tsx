import React, { useEffect, useRef, useState } from 'react';
import ClassItem from './ClassItem';
import { webSocketService } from '../services/websocket';
import type { Classroom } from '../types';
import axios from 'axios';
import { Calendar } from 'lucide-react';

interface DailyScheduleProps {
  selectedClassroom: any;
}

const DailySchedule: React.FC<DailyScheduleProps> = ({ selectedClassroom }) => {
      const [classes, setClasses] = useState<Classroom[]>([])
      const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
      
  

  // const { getClasses, classes } = useClassroom()

  const getClasses = async(selectedClassroom: string)=>{
        const response = await axios.get(`https://classroom.exceleed.in/api/v1/class/classList/${selectedClassroom}`)
        const rawMeetings = response.data.classes as any[]
    
      console.log("response", response.data)

        // Get 6 AM of today
      const today6AM = new Date();
      today6AM.setHours(6, 0, 0, 0); // Set to 6 AM today
    
      // Get 6 AM of the next day
      const tomorrow6AM = new Date(today6AM);
      tomorrow6AM.setDate(today6AM.getDate() + 1); // Move to the next day
    
      // Get current time
      const now = new Date();
    
      // Parse, filter, sort, and format meetings
      const sortedMeetings = rawMeetings
        .map((meeting: any) => {
          // Convert DD-MM-YYYY to YYYY-MM-DD format for Date parsing
          const startTimeDate = new Date(meeting.startTime.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1"));
          const endTimeDate = new Date(meeting.endTime.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1"));
    
          return { ...meeting, startTimeDate, endTimeDate };
        })
        .filter(({ startTimeDate, endTimeDate }: any) => 
          startTimeDate >= today6AM && startTimeDate < tomorrow6AM && endTimeDate > now // Remove past meetings
        )
        .sort((a: any, b: any) => a.startTimeDate.getTime() - b.startTimeDate.getTime()) // Sort by startTime
        .map(({ startTimeDate, endTimeDate, ...meeting }: any) => ({
          ...meeting,
          startTime: startTimeDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
          endTime: endTimeDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
        }));
    
        setClasses(sortedMeetings)
    //   setMeetings(sortedMeetings);
      console.log("Meetings", sortedMeetings);

       // Clear old timeouts
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];

      // Schedule a re-fetch after each meeting ends
      rawMeetings.forEach((meeting: any) => {
        const endTimeDate = new Date(meeting.endTime.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1"));
        const delay = endTimeDate.getTime() - Date.now();

        if (delay > 0) {
          const timeoutId = setTimeout(() => {
            getClasses(selectedClassroom);
          }, delay);

          timeoutRefs.current.push(timeoutId);
        }
      });
        // console.log("asnknsakj", response.data.classes)
        // const data = response.data.classes
        // setClasses(data)
    }

  useEffect(() => {
    getClasses(selectedClassroom)
    const roomName = localStorage.getItem("roomName") as string
    webSocketService.connect(roomName);
      console.log("roomNames", roomName)
      console.log("inside use", selectedClassroom)

    const unsubscribe = webSocketService.onMessage((message) => {
      if (message.type === 'EVENT_UPDATE' && message.roomName === roomName) {
          getClasses(selectedClassroom)
      }
    });
      console.log("inside useEffect", selectedClassroom)

    return () => {
      // webSocketService.disconnect(); // <-- Important
      unsubscribe();
    };
  }, [selectedClassroom]);

  console.log("classes", selectedClassroom)

  return (
    <div className="space-y-1 animate-fadeIn ">
      {classes.length > 0 
      ? <div className='min-h-md '>
        {classes.map((classItem: any) => (
          <div key={classItem.id} className="py-1">
            <ClassItem classItem={classItem} />
          </div>
        ))}
      </div>
      : <div className="text-center py-12">
          <div>
            <Calendar className="w-12 h-12 mx-auto text-gray-300" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No classes scheduled</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no classes scheduled for Today
          </p>
          </div> 
        </div> }
    </div>
  );
};

export default DailySchedule;