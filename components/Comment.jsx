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
        </div>
      </div>
    </div>
  );
};

export default Comment;
