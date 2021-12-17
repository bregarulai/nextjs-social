import { doc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const PostPage = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() =>
    onSnapshot(doc(db, 'post', id), (snapshot) => setPosts(snapshot.data()), [
      db,
    ])
  );
  return (
    <div>
      <Head></Head>
    </div>
  );
};

export default PostPage;
