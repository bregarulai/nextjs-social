import { ArrowLeftIcon } from '@heroicons/react/outline';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { Comment, Modal, Post, Sidebar, Widget } from '../components';
import { db } from '../firebase';

const PostPage = ({ trending, follow }) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [isOpen] = useRecoilState(modalState);

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
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

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/auth/login');
    }
  }, []);
  return (
    <div>
      <Head>
        <title>
          {post.username} on Jovan Social: {post.text}
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='min-h-screen bg-slate-900 flex max-w-[1500px] mx-auto'>
        <Sidebar />
        <div className='flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[5rem] xl:ml-[20rem]'>
          <div className='flex items-center py-2 px-1.5 border-gray-700 border-b text-[#d9d9d9] text-xl font-semibold gap-x-4 sticky top-0 z-50 bg-slate-900'>
            <div
              className='h-9 w-9 hoverAnimation flex items-center justify-center xl:px-0'
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon className='text-white h-5' />
            </div>
            Post
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className='pb-72'>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment.data()} />
              ))}
            </div>
          )}
        </div>
        <Widget trending={trending} follow={follow} />
        {isOpen && <Modal />}
      </main>
    </div>
  );
};

export default PostPage;

export async function getServerSideProps(context) {
  const trending = await fetch('https://jsonkeeper.com/b/XOKF').then((data) =>
    data.json()
  );
  const follow = await fetch('https://jsonkeeper.com/b/3R00').then((data) =>
    data.json()
  );
  const session = await getSession(context);
  return {
    props: {
      session,
      trending,
      follow,
    },
  };
}
