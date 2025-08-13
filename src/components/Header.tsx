import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { webSocketService } from '../services/websocket';
import Dialog from './Dialog';


const Header = ({ selectedClassroom }: any) => {
  const navigate = useNavigate()
  const [classroom, setClassroom] = useState({
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
    const response = await axios.get(`https://classroom.exceleed.in/api/v1/classRoom/${selectedClassroom}`, {
      headers: {
        token: localStorage.getItem('token')  
      }
    })
    const fetchedData = response.data.classRoom
    setClassroom(fetchedData)
  };

  useEffect(()=>{
    getClassroom()
  }, [])
  
  return (
    <header className="bg-white shadow-sm z-10 sticky top-0">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            {/* <img className='w-40 h-20' src={PesLogo} alt="PES" /> */}
            <Dialog handleClose={handleCloseClick} />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-800 tracking-tight">{classroom?.roomName}</h1>

        <div className="flex items-center gap-24"> 
          <button
          onClick={() => { webSocketService.disconnect(); navigate("/");localStorage.removeItem("roomName"); window.location.reload(); }}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
        </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

export const handleCloseClick = async () => {
  window.electronAPI.closeApp()
  console.log("Hello above is the error")
}