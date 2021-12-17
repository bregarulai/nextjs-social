import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className='flex cursor-pointer p-3 border-b border-gray-700'>
      <img
        className='rounded-full h-11 w-11 mr-4'
        src={comment.userImg}
        alt='user'
      />
    </div>
  );
};

export default Comment;
