import { Result } from 'postcss';
import React from 'react';

const Trending = ({ trending }) => {
  return (
    <div className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between'>
      <div className='space-y-0.5'>
        <p className='text-sm text-[#6e767d] font-medium'>{trending.heading}</p>
      </div>
    </div>
  );
};

export default Trending;
