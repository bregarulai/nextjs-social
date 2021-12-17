import { doc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { postIdState } from '../atoms/modalAtom';
import { db } from '../firebase';

const PostPage = () => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
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
      <main className='min-h-screen bg-slate-900 flex max-w-[1500px] mx-auto'></main>
    </div>
  );
};

export default PostPage;
