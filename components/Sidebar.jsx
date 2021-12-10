import React from 'react';
import { HomeIcon } from '@heroicons/react/solid';

import { SidebarLink } from '../components';

const Sidebar = () => {
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:flex-1 p-2 fixed h-full mt-12'>
      <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24'>
        <img className='h-14 rounded-full' src='/logo.png' alt='logo' />
      </div>
      <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
        <SidebarLink text='Home' active Icon={HomeIcon} />
      </div>
    </div>
  );
};

export default Sidebar;
