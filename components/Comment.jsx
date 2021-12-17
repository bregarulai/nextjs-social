import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import React from 'react';
import Moment from 'react-moment';

const Comment = ({ comment }) => {
  return (
    <div className='flex cursor-pointer p-3 border-b border-gray-700'>
      <img
        className='rounded-full h-11 w-11 mr-4'
        src={comment.userImg}
        alt='user'
      />
      <div className='flex flex-col space-y-2 w-full'>
        <div className='flex justify-between'>
          <div className='text-[#6e767d]'>
            <div className='group inline-block'>
              <h4 className='text-[#d9d9d9] font-bold text-[15px] sm:text-base inline-block group-hover:underline'>
                {comment?.username}
              </h4>
              <span className='text-sm ml-1.5 sm:text-[15px]'>
                @{comment.tag}{' '}
              </span>
            </div>{' '}
            .{' '}
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>{comment.timestamp.toDate()}</Moment>
            </span>
            <p className='mt-0.5 text-[#d9d9d9] max-w-lg overflow-scroll text-[15px] sm:text-base scrollbar-hide'>
              {comment.comment}
            </p>
          </div>
          <div className='group icon flex-shrink-0'>
            <DotsHorizontalIcon className='h-5 text-[#63767d] group-hover:text-indigo-500' />
          </div>
        </div>
        <div className='flex justify-between w-10/12 text-[#6e767d]'>
          <div className='group icon'>
            <ChatIcon className='h-5 group-hover:text-[#1d9bf0]' />
          </div>
          <div className='flex items-center group space-x-1'>
            <div className='group icon group-hover:bg-pink-600/10'>
              <HeartIcon className='h-5 group-hover:text-pink-600' />
            </div>
            <span className='group-hover:text-pink-600'></span>
          </div>
          <div className='group icon'>
            <ShareIcon className='h-5 group-hover:text-[#1d9bf0]' />
          </div>
          <div className='group icon'>
            <ChartBarIcon className='h-5 group-hover:text-[#1d9bf0] rotate-90' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
