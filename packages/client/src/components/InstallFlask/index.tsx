import Link from 'next/link';

import { CustomButton } from '../Button';
import FlaskBox from '../FlaskBox';

export default function InstallFlask() {
  return (
    <div className='card layout border-b border-l border-[#00BFA5] bg-[#1e2832]'>
      <div className='card-body gap-6 text-left'>
        <h2 className='card-title'>Install</h2>
        <p>
          Snaps is pre-release software only available in MetaMask Flask, a
          canary distribution for developers with access to upcoming features.
        </p>
        <Link href='https://metamask.io/flask/' target='_blank'>
          <CustomButton>
            <FlaskBox />
            Install Metamask Flask
          </CustomButton>
        </Link>
      </div>
    </div>
  );
}
