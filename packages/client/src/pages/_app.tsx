'use client';
import { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/colors.css';

import { MetaMaskProvider } from '@/hooks';

import Header from '@/components/layout/Header';
import Providers from '@/components/Providers';

import { useIsSsr } from '../utils/ssr';

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <div
      className='
          min-h-screen
          w-full
          bg-[#0F1923]
          bg-[url("/svg/background.svg")]
          text-white
        '
    >
      <Providers>
        <MetaMaskProvider>
          <Header />
          <Component {...pageProps} />
        </MetaMaskProvider>
      </Providers>
    </div>
  );
}

export default MyApp;
