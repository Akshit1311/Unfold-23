import { cn } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import ThreeDButton from "../ThreeDButton";
import { TGameType } from "@/constants";

// SUI
import { useWallet } from "@suiet/wallet-kit";
import { googleSignIn } from "@/app/actions";

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

  useEffect(() => {
    const addr = localStorage.getItem("userAddress");
    addr && setIsGlassDoorOpen(true);
  }, []);

  return (
    <div
      className={cn(
        "font-proto grid place-items-center bg-slate-300/30 backdrop-blur-xl fixed inset-0 z-50 transition-all ease-in  duration-500",
        (isGlassDoorOpen || wallet.connected) && "-translate-y-full",
      )}
    >
      <div className="text-center bg-white p-8 border-2 border-black rounded-2xl w-2/5">
        <div className=" text-7xl font-semibold uppercase mb-10">
          {title || "retroarc"} {gameType ? emojis[gameType] : "👾"}
        </div>
        {/* 👾🚗👾🐍👾🎮👾🕹 */}
        <div className="mb-10 text-4xl">
          👾 🎮 🕹 {gameType ? emojis[gameType] : "👾"} 🕹 🎮 👾
        </div>

        <div className="flex mx-auto  gap-4 justify-center">
          <form action={googleSignIn}>
            <ThreeDButton
              variant="btn-magick"
              className="text-2xl py-3 px-5 rounded-lg my-4 text-white"
              onClick={() => setIsGlassDoorOpen(true)}
              title="zkLogin 🌍"
              isSubmit
            />
          </form>
          {wallet.allAvailableWallets.map((wal) => (
            <ThreeDButton
              variant="btn-primary"
              className="text-2xl py-3 px-5 rounded-lg my-4 text-white"
              onClick={() => {
                // check if user installed the wallet
                if (!wal.installed) {
                  // do something like guiding users to install
                  return;
                }
                wallet.select(wal.name);
              }}
              title="connect sui💧"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlassGate;
