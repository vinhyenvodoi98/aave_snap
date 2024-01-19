import { AppProps } from 'next/app';

import { ToastContainer } from "react-toastify";

import '@/styles/globals.css';
import '@/styles/colors.css';
import "react-toastify/ReactToastify.min.css";

import Header from '@/components/layout/Header';

import { useIsSsr } from '../utils/ssr';
import Providers from '@/components/Providers';

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
        '
      >
      <Providers>
        <Header />
          <Component {...pageProps} />
        <ToastContainer position="bottom-right" newestOnTop />
      </Providers>
    </div>
  );
}

export default MyApp;
