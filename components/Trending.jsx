import { DotsHorizontalIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { Result } from 'postcss';
import React from 'react';

const Trending = ({ trending }) => {
  return (
    <div className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between'>
      <div className='space-y-0.5'>
        <p className='text-sm text-[#6e767d] font-medium'>{trending.heading}</p>
        <h6 className='text-sm font-bold max-w-[250px]'>
          {trending.description}
        </h6>
        <p className='text-xs text-[#6e767d] font-medium max-w-[250px]'>
          Trending with{' '}
          {trending.tags.map((tag, index) => (
            <span key={index} className='tag'>
              {tag}
            </span>
          ))}
        </p>
      </div>
      {trending.img ? (
        <Image
          width={70}
          height={70}
          src={trending.img}
          objectFit='cover'
          className='rounded-2xl'
        />
      ) : (
        <div className='group icon'>
          <DotsHorizontalIcon className='h-5 text-indigo-400 group-hover:text-indigo-500' />
        </div>
      )}
    </div>
  );
};

export default Trending;
