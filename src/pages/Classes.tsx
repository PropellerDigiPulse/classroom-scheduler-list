import Header from '../components/Header';
import DailySchedule from '../components/DailySchedule';
import ClassroomDetails from '../components/ClassroomDetails';
import { useParams } from 'react-router-dom';

function Classes() {
    const { roomId } = useParams<{roomId: string}>() 
    
  return (
    
    <div className="min-h-screen flex flex-col">
      <Header selectedClassroom={roomId} />

      <main className="flex-1 overflow-y-auto p-4 lg:p-3">
        <ClassroomDetails classroom={roomId} />

        <DailySchedule
          selectedClassroom={roomId}
        />
      </main>
    </div>
  );
}

export default Classes;