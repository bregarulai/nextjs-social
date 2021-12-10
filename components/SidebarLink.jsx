import React from 'react';

const SidebarLink = ({ Icon, text, active, disable }) => {
  return (
    <button
      disabled={disable}
      className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation disabled:cursor-not-allowed ${
        active && 'font-bold'
      }`}
      onClick={() => active && router.push('/')}
    >
      <Icon className='h-7 text-[#d9d9d9]' />
      <span className='hidden xl:inline'>{text}</span>
    </button>
  );
};

export default SidebarLink;
