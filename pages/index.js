import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Feed, Sidebar, Widget, Modal } from '../components';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';

export default function Home({ trending, follow }) {
  const router = useRouter();
  const [isOpen] = useRecoilState(modalState);
  const { data: session, status } = useSession();
  console.log('session: ', useSession());

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/auth/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Jovan Social</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {session && (
        <main className='flex'>
          <Sidebar />
          <Feed />
          <Widget trending={trending} follow={follow} />
          {isOpen && <Modal />}
        </main>
      )}
    </>
  );
}

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

{
  /* <a href="https://iconscout.com/icons/google" target="_blank">Google Icon</a> by <a href="https://iconscout.com/contributors/icon-mafia" target="_blank">Icon Mafia</a> */
}
