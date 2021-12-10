import React from 'react';
import { HomeIcon } from '@heroicons/react/solid';
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline';

import { SidebarLink } from '../components';

const Sidebar = () => {
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[20rem] p-2 fixed h-full mt-12'>
      <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24'>
        <img
          className='h-14 rounded-full xl:ml-24'
          src='/logo.png'
          alt='logo'
        />
      </div>
      <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
        <SidebarLink text='Home' active Icon={HomeIcon} />
        <SidebarLink text='Explore' Icon={HashtagIcon} disable />
        <SidebarLink text='Notifications' Icon={BellIcon} disable />
        <SidebarLink text='Messages' Icon={InboxIcon} disable />
        <SidebarLink text='Bookmarks' Icon={BookmarkIcon} disable />
        <SidebarLink text='Lists' Icon={ClipboardListIcon} disable />
        <SidebarLink text='Profile' Icon={UserIcon} disable />
        <SidebarLink text='More' Icon={DotsCircleHorizontalIcon} disable />
      </div>
      <button className='hidden xl:inline ml-auto bg-indigo-400 text-white text-lg font-bold shadow-md hover:bg-indigo-500 transition duration-200 rounded-full w-52 h-12'>
        Make a post
      </button>
    </div>
  );
};

export default Sidebar;
