import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const PostPage = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div>
      <Head></Head>
    </div>
  );
};

export default PostPage;
