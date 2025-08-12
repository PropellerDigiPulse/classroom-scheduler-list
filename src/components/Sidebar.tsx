import React from 'react';
import { Building2, Info, Search, X } from 'lucide-react';

interface SidebarProps {
  classrooms: any[];
  selectedClassroom: any | null;
  setSelectedClassroom: (classroom: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  classrooms,
  selectedClassroom,
  setSelectedClassroom,
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [expandedClassroom, setExpandedClassroom] = React.useState<string | null>(null);

  const filteredClassrooms = React.useMemo(() => {
    if (!searchTerm) return classrooms;
    return classrooms.filter((classroom) =>
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [classrooms, searchTerm]);

  const toggleClassroomDetails = (id: string) => {
    setExpandedClassroom(expandedClassroom === id ? null : id);
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden z-20 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white shadow-lg transform transition-transform z-30 lg:translate-x-0 lg:static lg:h-[calc(100vh-64px)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Classrooms</h2>
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="px-4 mb-4">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search classrooms..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {filteredClassrooms.map((classroom) => (
                <li key={classroom.id} className="rounded-lg overflow-hidden">
                  <div
                    className={`p-3 cursor-pointer transition-colors ${
                      selectedClassroom?.id === classroom.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className="flex justify-between items-center"
                      onClick={() => setSelectedClassroom(classroom)}
                    >
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-gray-400" />
                        <span className="font-medium">{classroom.name}</span>
                      </div>
                      <button
                        className="p-1 rounded-full hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleClassroomDetails(classroom.id);
                        }}
                      >
                        <Info className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>

                    {expandedClassroom === classroom.id && (
                      <div className="mt-2 pl-7 text-sm text-gray-600 space-y-1 animate-fadeIn">
                        <p>Building: {classroom.building}</p>
                        <p>Floor: {classroom.floor}</p>
                        <p>Capacity: {classroom.capacity} students</p>
                        <p>Features: {classroom.features.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;