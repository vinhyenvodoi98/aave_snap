"use client";
import { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/colors.css';

import Header from '@/components/layout/Header';

import { useIsSsr } from '../utils/ssr';
import Providers from '@/components/Providers';
import { MetaMaskProvider } from '@/hooks';

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <div
        className='
          w-full
          min-h-screen
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
