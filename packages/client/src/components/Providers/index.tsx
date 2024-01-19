"use client";
import { wagmiConfig } from "@/config/wagmiConfig";
import { ConnectKitProvider } from 'connectkit';
import { WagmiConfig } from "wagmi";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider debugMode>
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
