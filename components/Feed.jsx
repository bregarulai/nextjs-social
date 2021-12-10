import React from 'react';
import { SparklesIcon } from '@heroicons/react/outline';

import { CreatePost } from '../components';

const Feed = () => {
  return (
    <div className='xl:ml-[20rem] sm:ml-[5rem] flex-grow max-w-4xl border-l border-r border-gray-700 min-h-screen'>
      <div className='text-[#d9d9d9] flex items-center sm:justify-between py-4 px-3 sticky top-0 z-50 border-b border-gray-700'>
        <h2 className='text-lg sm:text-lg font-bold'>Home</h2>
        <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
          <SparklesIcon className='h-5 text-white' />
        </div>
      </div>
      <CreatePost />
    </div>
  );
};

export default Feed;
