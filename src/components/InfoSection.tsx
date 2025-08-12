import React from 'react';
import type { ReactNode } from 'react';

interface InfoSectionProps {
  icon: ReactNode;
  title: string;
  content: string | ReactNode;
  bgColor: string;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ icon, title, content, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-xl p-4 flex items-center transition-all duration-300 hover:shadow-md`}>
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-gray-700 font-medium">{title}</h3>
        <div className="text-gray-900 font-semibold">
          {content}
        </div>
      </div>
    </div>
  );
};