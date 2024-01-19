'use client';
import { ConnectKitButton } from 'connectkit';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 z-50'>
      <div className='layout flex items-center justify-between'>
        <div className='navbar rounded-box m-5 bg-[#1e2832] border-[#00BFA5] border-b border-l'>
          <div className='flex-1'>
          <Link href='/'>
            <button className='btn btn-ghost text-xl text-white'>Home</button>
          </Link>
          </div>
          <div className='flex-none'>
          <ConnectKitButton />
          </div>
        </div>
      </div>
    </header>
  );
}
