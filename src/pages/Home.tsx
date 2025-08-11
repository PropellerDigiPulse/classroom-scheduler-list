import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

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

const Home = () => {
    const [selectedClassroom, setSelectedClassroom] = useState<string>("");
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const navigate = useNavigate()

    async function fetchClassRooms(){
      const response = await axios.get("https://classroom.exceleed.in/api/v1/classRoom/classRoomList", {
        headers: {
          token: localStorage.getItem('token'),
          "Content-Type": "application/json"
        }
      })
    
      setClassrooms(response.data.classRooms)
    }

    const token = localStorage.getItem('token')
    
    useEffect(() => {
      if(!token){
        navigate("/login")
      }
      fetchClassRooms()
    }, [selectedClassroom]);

    
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className='absolute top-0 right-0 px-4 py-2 m-2 rounded-full border-[1px] border-gray-300 '>
          <button onClick={()=>{localStorage.removeItem("token"); navigate("/login")} }>Logout</button>
        </div>
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Select a Classroom
          </h1>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            onChange={(e) => {
              setSelectedClassroom(e.target.value)
              localStorage.setItem("roomName", e.target.value)
              navigate(`/class/${e.target.value}`)
            }}
            defaultValue=""
          >
            <option value="" disabled>Choose a classroom...</option>
            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.roomName} - {classroom.building}
              </option>
            ))}
          </select>
        </div>
      </div>
  )
}

export default Home