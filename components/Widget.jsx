import { SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React from 'react';

import { Trending } from '../components';

const Widget = ({ trending, follow }) => {
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
        {trending.map((item, index) => (
          <Trending trending={item} key={index} />
        ))}
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-center w-full text-indigo-400 font-light'>
          show more
        </button>
      </div>
      <div className='space-y-3 text-[#d9d9d9] bg-[#15181c] rounded-t-xl pt-2 w-11/12 xl:w-9/12'>
        <h4 className='text-xl font-bold px-4'>Who to follow</h4>
        {follow.map((item, index) => (
          <div
            key={index}
            className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center'
          >
            <Image
              width={50}
              height={50}
              src={item.userImg}
              objectFit='cover'
              className='rounded-full'
            />
            <div className='group ml-4 leading-5'>
              <h4 className='group-hover:underline font-bold'>
                {item.username}
              </h4>
              <h5 className='text-gray-500 text-[15px]'>{item.tag}</h5>
            </div>
            <button className='ml-auto bg-white text-black rounded-full font-bold text-sm px-3.5 py-1.5'>
              Follow
            </button>
          </div>
        ))}
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-center w-full text-indigo-400 font-light'>
          show more
        </button>
      </div>
    </div>
  );
};

export default Widget;
