import { getDefaultConfig } from 'connectkit';
import { configureChains, createConfig } from "wagmi";
import {
    sepolia,
  } from 'wagmi/chains';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains } = configureChains(
  [
    ...(process.env.NODE_ENV === "development"
      ? [sepolia]
      : [sepolia]),
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === sepolia.id)
          return {
            http: sepolia.rpcUrls.public.http[0],
          };

        return null;
      },
    }),
  ]
);

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'RainbowKit demo',
    chains,
    walletConnectProjectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
  })
);

export { chains };
