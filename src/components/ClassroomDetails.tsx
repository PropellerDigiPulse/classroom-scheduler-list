import React, { useEffect, useState } from 'react';
import { Users, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';
import { InfoSection } from './InfoSection';
// import { Classroom } from '../types';

interface ClassroomDetailsProps {
  classroom: any;
}

const ClassroomDetails: React.FC<ClassroomDetailsProps> = ({ classroom }) => {
  const [classroomData, setClassroomData] = useState({
    id: "",
    roomName: "",
    building: "",
    userEmail: "",
    floor: 0,
    capacity: 0,
    hasProjector: false,
    hasComputers: false
  })

  const getClassroom = async() => {
    // console.log("roomName", classroom)
    const response = await axios.get(`https://classroom.exceleed.in/api/v1/classRoom/${classroom}`, {
      headers: {
          token: localStorage.getItem('token') 
        }
    })
    const fetchedData = response.data.classRoom
    setClassroomData(fetchedData)
  };

  console.log("classroom", classroom);

  const fullDate = String(new Date())
  const shortDate = fullDate.split(' ').slice(0, 4).join(' ');

  useEffect(()=>{
    getClassroom()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoSection 
            icon={<MapPin className="h-6 w-6 text-blue-600" />}
            title="Location"
            content={`${classroomData.building}, Floor ${classroomData.floor}`}
            bgColor="bg-blue-50"
          />
          <InfoSection 
            icon={<Users className="h-6 w-6 text-green-600" />}
            title="Capacity"
            content={`${classroomData.capacity} students`}
            bgColor="bg-green-50"
          />
          <InfoSection 
            icon={<Calendar className="h-6 w-6 text-indigo-600" />}
            title={shortDate}
            content={<CurrentTime />}
            bgColor="bg-indigo-50"
          />
        </div>
    </div>
  );
};

export default ClassroomDetails;

function CurrentTime() {
  const [time, setTime] = React.useState<string>('');
  
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`Current Time: ${formattedHours}:${formattedMinutes} ${ampm}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return <span>{time}</span>;
}