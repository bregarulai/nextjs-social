import { useSession, signOut } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';

const CreatePost = () => {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const filePickerRef = useRef(null);
  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide`}
    >
      <img
        className='h-11 w-11 rounded-full cursor-pointer'
        src={session.user.image}
        alt='user'
        onClick={signOut}
      />
      <div className='divide-y divide-gray-700 w-full'>
        <div>
          <textarea
            className='bg-transparent outline-none w-full text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide min-h-[50px]'
            placeholder="What's happening?"
            rows='2'
          />
          {selectedFile && (
            <div className='relative'>
              <div className='absolute w-8 h-8 hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'>
                <XIcon className='text-white h-5' />
              </div>
              <img
                className='rounded-2xl max-h-80 object-contain'
                src=''
                alt='post'
              />
            </div>
          )}
        </div>
        {isloading && (
          <div>
            <div className='flex items-center'>
              <div
                className='icon'
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className='text-[#1d9bf0] h-[22px]' />
                <input
                  type='file'
                  ref={filePickerRef}
                  hidden
                  //   onChange={addImageToPost}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
