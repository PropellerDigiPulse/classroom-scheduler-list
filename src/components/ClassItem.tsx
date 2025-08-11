import React, { useEffect, useState } from 'react';
import { Clock, User, BookOpen } from 'lucide-react';
import type { Classitem } from '../types';
import axios from 'axios';

interface ClassItemProps {
  classItem: Classitem;
}

function uint8ArrayToBase64(buffer: Uint8Array): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

function objectToUint8Array(obj: any): Uint8Array {
  const values: any = Object.values(obj); // Get all values
  return new Uint8Array(values); // Construct Uint8Array
}

const ClassItem: React.FC<ClassItemProps> = ({ classItem }) => {
  // const defaultInstructorPhoto = "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150";
  const [instructorDetails, setInstructorDetails] = useState({
    id: null,
    userEmail: "",
    name: "",
    email: "",
    department: "",
    subjects: [""],
    image: null
  })

 const base64 = instructorDetails.image
  ? uint8ArrayToBase64(objectToUint8Array(instructorDetails.image))
  : '';

const imageSrc = base64
  ? `data:image/png;base64,${base64}`
  : 'fallback.png'; // optional fallback

  async function getInstructor(){
    const response = await axios.get(`https://classroom.exceleed.in/api/v1/instructor/${classItem.instructorName}`, {
    headers: {
      token: localStorage.getItem('token') ,
      "Content-Type": "application/json"
    }
  })
    setInstructorDetails(response.data.instructor)
  }

  useEffect(()=>{
    getInstructor()
  }, [])

  return (
    <div
      className="p-12 rounded-xl shadow-md bg-white border-l-4 mb-4 transform transition-all  hover:shadow-lg"
      style={{ borderLeftColor: classItem.color }}
    >
      <div className="flex items-center gap-4">
        <div className='flex justify-center items-center text-center w-1/3'>
          <h3 className="text-4xl font-bold text-gray-900 mb-3">
            {classItem.subject}
          </h3>
        </div>
        <div className="flex items-center gap-10">
          <img
            src={imageSrc}
            alt={classItem.instructorName}
            className="border-2 border-white max-w-32 h-28 rounded-full shadow-md mb-2 object-cover "
          />
          <div className=''>
            <div className="flex items-center text-gray-600 text-sm">
              <User className="h-5 w-5 mr-1 " />
              <span className='text-xl font-bold'>{classItem.instructorName}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <Clock className="h-5 w-5 mr-1" />
              <span className='text-xl font-bold'>
                {classItem.startTime} - {classItem.endTime}
              </span>
            </div>
          </div>
        </div>

        
        
        <div className="flex-1 ml-10">
          {classItem.topic && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-700 mb-2">
                <BookOpen className="h-5 w-5 mr-2" />
                <span className="font-bold">Today's Topic</span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {classItem.topic}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassItem;