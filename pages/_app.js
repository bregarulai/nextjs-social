import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider
      options={{
        staleTime: 0,
        refetchInterval: 0,
      }}
      session={pageProps.session}
    >
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
