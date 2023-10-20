import { cn } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import ThreeDButton from "../ThreeDButton";
import { TGameType } from "@/constants";

// SUI
import { useWallet } from "@suiet/wallet-kit";

const emojis: Record<TGameType, string> = {
  cars: "🚘",
  snake: "🐍",
  tetris: "🟦🟪",
  cards: "🃏",
};

type Props = {
  title?: string;
  gameType?: TGameType;
};

const GlassGate = ({ title, gameType }: Props) => {
  const [isGlassDoorOpen, setIsGlassDoorOpen] = useState(false);
  const wallet = useWallet();

  return (
    <div
      className={cn(
        "font-proto grid place-items-center bg-slate-300/30 backdrop-blur-xl fixed inset-0 z-50 transition-all ease-in  duration-500",
        (isGlassDoorOpen || wallet.connected) && "-translate-y-full",
      )}
    >
      <div className="text-center">
        <div className=" text-9xl font-semibold uppercase mb-10">
          {title || "retroarc"} {gameType ? emojis[gameType] : "👾"}
        </div>

        <div className="flex gap-4 justify-center">
          <ThreeDButton
            variant="btn-magick"
            className="text-3xl py-5 px-10 rounded-lg my-4 text-white"
            onClick={() => setIsGlassDoorOpen(true)}
            title="Sign In 🌍"
          />
          {wallet.allAvailableWallets.map((wal) => (
            <ThreeDButton
              variant="btn-primary"
              className="text-3xl py-5 px-10 rounded-lg my-4 text-white"
              onClick={() => {
                // check if user installed the wallet
                if (!wal.installed) {
                  // do something like guiding users to install
                  return;
                }
                wallet.select(wal.name);
              }}
              title="LOGIN with SUI 💧"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlassGate;
