"use client";

import React, { useEffect, useState } from "react";

// SUI
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

// Libraries
import { Toaster } from "react-hot-toast";

// rainbow
import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  goerli,
  sepolia,
  localhost,
  zoraTestnet,
  baseGoerli,
  optimismGoerli,
  avalancheFuji,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// Utils
import { cn } from "@/utils/helpers";

// Components
import Navbar from "../common/Navbar";
import { publicClient } from "@/client/client";
import GlassGate from "../common/GlassGate/GlassGate";
// import GlassGate from "../common/GlassGate/GlassGate";

import { useParams } from "next/navigation";
import { TGameType } from "@/constants";

type ClientProviderProps = {
  children: React.ReactNode;
};

const { chains } = configureChains(
  [
    avalancheFuji,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [{ ...localhost, id: 31337 }]
      : []),
  ],
  [publicProvider()],
);

const projectId = "YOUR_PROJECT_ID";

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: wallets[0].wallets.filter(({ id }) =>
      ["metaMask", "injected", "coinbase", "safe", "brave"].includes(id),
    ),
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  const params = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <WalletProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <main
            className={cn(
              "w-full font-raleway transition-all duration-700 ease-in-out",
            )}
          >
            <Navbar />
            <main className="min-h-screen bg-[#F4F4F5]">{children}</main>
          </main>
          <GlassGate title={params.id} gameType={params.id as TGameType} />
          <Toaster
            containerStyle={{
              bottom: "70px",
              animation: "ease-in-out",
              animationFillMode: "forwards",
            }}
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                padding: "1.2rem 1rem",
              },
              duration: 5000,
              success: {
                style: {
                  border: "1px solid #3CCB7F",
                  backgroundColor: "#121214",
                  color: "#3CCB7F",
                },
              },
              error: {
                style: {
                  border: "1px solid #F87171",
                  background: "black",
                  color: "#F87171",
                },
              },
            }}
          />
        </RainbowKitProvider>
      </WagmiConfig>
    </WalletProvider>
  );
};
export default React.memo(ClientProvider);
