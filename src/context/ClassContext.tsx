import { createContext, ReactNode, useContext, useRef, useState } from "react";
import axios from "axios"

const ClassContext = createContext<ClassType | undefined>(undefined)

export interface Classroom {
  id:           string;
  roomName:     string;
  userEmail?:   string;
  building:     string;
  floor:        number;
  capacity:     number;
  hasProjector: boolean;
  hasComputers: boolean;
}

interface ClassType {
    classes: Classroom[];
    setClasses: any
    getClasses: (selectedClassroom: string) => void
}



export const ClassProvider: React.FC<{ children: ReactNode }> = ({children})=>{
    const [classes, setClasses] = useState<Classroom[]>([])
    const timeoutRefs = useRef<NodeJS.Timeout[]>([]);


    const getClasses = async(selectedClassroom: string)=>{
        const response = await axios.get(`https://classroom.exceleed.in/api/v1/class/classList/${selectedClassroom}`)
        const rawMeetings = response.data.classes as any[]
    
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

    return <ClassContext.Provider value={{classes, setClasses, getClasses}}>
        {children}
    </ClassContext.Provider>
}

export function useClassroom(){
    const context = useContext(ClassContext)
    if (context === undefined) {
        throw new Error('useClassroom must be used within a ClassProvider');
    }
    return context
}