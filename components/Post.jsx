import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from '@heroicons/react/solid';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

import { db } from '../firebase';
import { modalState, postIdState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';

const Post = ({ post, postPage, id }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [postId, setPostId] = useRecoilState(postIdState);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id, db]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likeAPost = async () => {
    if (liked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.name,
      });
    }
  };

  return (
    <div
      className='flex p-3 cursor-pointer border-b border-gray-700'
      onClick={() => router.push(`/${id}`)}
    >
      {!postPage && (
        <img
          src={post?.userImg}
          alt={post?.username}
          className='w-11 h-11 mr-4 rounded-full'
        />
      )}
      <div className='flex flex-col space-y-2 w-full'>
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt='Profile Pic'
              className='h-11 w-11 rounded-full mr-4'
            />
          )}
          <div className='text-[#6e767d]'>
            <div className='group inline-block'>
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && 'inline-block'
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && 'ml-1.5'}`}
              >
                @{post?.tag}
              </span>
            </div>
            .{' '}
            <span className='hover:underline text-sm sm:text-[15px]'>
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {!postPage && (
              <p className='text-[15px] text-[#d9d9d9] sm:text-base mt-0.5'>
                {post?.text}
              </p>
            )}
          </div>
          <div className='icon flex-shrink-0 group ml-auto'>
            <DotsHorizontalIcon className='h-5 text-[#6e767d] group-hover:text-[#1d9bf0]' />
          </div>
        </div>
        {postPage && (
          <p className='text-[#d9d9d9] mt-0.5 text-xl'>{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt={post?.text}
          className='rounded-2xl max-h-[700px] object-cover mr-2'
        />
        <div
          className={`flex justify-between w-10/12 ${postPage && 'mx-auto'}`}
        >
          <div
            className='group flex items-center space-x-1'
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
              setPostId(id);
            }}
          >
            <div className='icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10'>
              <ChatIcon className='group-hover:text-[#1d9bf0] h-5' />
            </div>
            {comments.length > 0 && (
              <span className='text-sm group-hover:text-[#1d9bf0]'>
                {comments.length}
              </span>
            )}
          </div>
          {session.user.uid === post?.id ? (
            <div
              className='group space-x-1 flex items-center'
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, 'posts', id));
                router.push('/');
              }}
            >
              <div className='group-hover:bg-red-600/10 icon'>
                <TrashIcon className='group-hover:text-red-600 h-5' />
              </div>
            </div>
          ) : (
            <div className='group space-x-1 flex items-center'>
              <div className='group-hover:bg-green-500/10 icon'>
                <SwitchHorizontalIcon className='group-hover:text-green-500 h-5' />
              </div>
            </div>
          )}
          <div
            className='group space-x-1 flex items-center'
            onClick={(e) => {
              e.stopPropagation();
              likeAPost();
            }}
          >
            <div className='group-hover:bg-pink-600/10 icon'>
              {liked ? (
                <HeartIconFilled className='h-5 text-pink-600' />
              ) : (
                <HeartIcon className='h-5 group-hover:text-pink-600' />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  likes && 'text-pink-600'
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <div className='group icon'>
            <ShareIcon className='h-5 group-hover:text-[#1d9bf0]' />
          </div>
          <div className='group icon'>
            <ChartBarIcon className='h-5 group-hover:text-[#1d9bf0]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
