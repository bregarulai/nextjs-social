import React from 'react';

const SidebarLink = ({ Icon, text, active }) => {
  return (
    <div
      className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
        active && 'font-bold'
      }`}
      onClick={() => active && router.push('/')}
    >
      <Icon className='h-7 text-[#d9d9d9]' />
      <span className='hidden xl:inline'>{text}</span>
    </div>
  );
};

export default SidebarLink;
