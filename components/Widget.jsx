import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';

const Widget = ({ trending }) => {
  return (
    <div className=' lg:w-[20rem] hidden lg:inline ml-8  py-1 space-y-5'>
      <div className='sticky top-0 py-1.5 bg-slate-900 z-50 w-11/12 xl:w-9/12'>
        <div className='flex items-center bg-[#202327] p-3 rounded-full relative'>
          <SearchIcon className='h-5 text-gray-500 z-50' />
          <input
            type='text'
            placeholder='Search Jovan Social'
            className='placeholder-gray-500 bg-transparent text-[#d9d9d9] outline-none absolute inset-0 pl-11 border border-transparent w-full focus:border-indigo-500 rounded-full focus:bg-slate-900 focus:shadow-lg'
          />
        </div>
      </div>
      <div className='space-y-3 text-[#d9d9d9] bg-[#15181c] rounded-t-xl pt-2 w-11/12 xl:w-9/12'>
        <h4 className='text-xl font-bold px-4'>What's happening</h4>
      </div>
    </div>
  );
};

export default Widget;
