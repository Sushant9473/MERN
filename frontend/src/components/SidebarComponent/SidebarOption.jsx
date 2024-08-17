import React from 'react';

function SidebarOption({ icon, optionName, isActive, onClick }) {
  return (
    <div
      className={`flex items-center pl-10 py-2 rounded-md transition-colors mr-10 cursor-pointer ${
        isActive && 'bg-[#f9f3ff] text-[#7e22ce]' 
      }`}
      onClick={onClick} // Handle click event
    >
      <div className='mx-3'>
        {icon} {/* Render the icon */}
      </div>
      <span className={`text-gray-700 font-medium text-[24px] ${
        isActive && 'bg-[#f9f3ff] text-[#7e22ce]' 
      }`}>
        {optionName}
      </span> {/* Render the option name */}
    </div>
  );
}

export default SidebarOption;
