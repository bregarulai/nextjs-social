import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Feed, Sidebar, Widget, Modal } from '../components';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';

export default function Home({ trending }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
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
          <Widget trending={trending} />
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
  const session = await getSession(context);
  return {
    props: {
      session,
      trending,
    },
  };
}

{
  /* <a href="https://iconscout.com/icons/google" target="_blank">Google Icon</a> by <a href="https://iconscout.com/contributors/icon-mafia" target="_blank">Icon Mafia</a> */
}
