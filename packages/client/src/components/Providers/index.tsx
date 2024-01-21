'use client';
import { ConnectKitProvider } from 'connectkit';
import { WagmiConfig } from 'wagmi';

import { wagmiConfig } from '@/config/wagmiConfig';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
