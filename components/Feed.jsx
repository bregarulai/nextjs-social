import React, { useEffect, useState } from 'react';
import { SparklesIcon } from '@heroicons/react/outline';
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  getDocs,
} from '@firebase/firestore';
import { db } from '../firebase';

import { CreatePost, Post } from '../components';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   async function getPosts() {
  //     const postsCol = collection(db, 'posts');
  //     const postsSnapshot = await getDocs(postsCol);
  //     const postsList = postsSnapshot.docs.map((doc) => doc.data());
  //     setPosts(postsList);
  //   }

  //   getPosts();
  //   return () => {
  //     getPosts();
  //   };
  // }, [db]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className='xl:ml-[20rem] sm:ml-[5rem] flex-grow max-w-4xl border-l border-r border-gray-700 min-h-screen'>
      <div className='text-[#d9d9d9] flex items-center bg-slate-900 sm:justify-between py-4 px-3 sticky top-0 z-50 border-b border-gray-700'>
        <h2 className='text-lg sm:text-lg font-bold'>Home</h2>
        <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
          <SparklesIcon className='h-5 text-white' />
        </div>
      </div>
      <CreatePost />
      <div className='pb-72'>
        {posts.map((post) => (
          <Post key={post.data().timestamp} post={post.data()} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
